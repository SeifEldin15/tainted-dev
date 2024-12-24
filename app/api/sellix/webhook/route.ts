import { SERVER_ERROR_RESPONSES } from "@/constants/Messages";
import {
  getCustomIPv4ProxyPrice,
  getIPv6ProxyPrice,
  getUserDetailsAdminAccess,
  validateSellixSignature,
} from "@/constants/functions";
import { ResponseObjectType } from "@/constants/types";
import prisma from "@/prisma";
import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { Invoices, StatusHistory, User } from "@prisma/client";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/prisma/serverConnector";
import FormData from "form-data";
import { v4 as uuid } from "uuid";

// Define a function to calculate the balance
function calculateBalance(
  days: number,
  threadCount: number,
  type?: "ipv4" | "ipv6"
) {
  const price =
    type === "ipv6"
      ? getIPv6ProxyPrice(threadCount, days)
      : getCustomIPv4ProxyPrice(threadCount, days);
  const tb = price / 10;
  const bytesInTB = tb * 953700;
  return bytesInTB;
}

export const POST = async (request: Request) => {
  try {
    // Request header signature to verify if request came from sellix only or diffrent source
    const headerSignature: any = request.headers.get(
      "x-sellix-unescaped-signature"
    );
    // Request body payload
    const payload = await request.json();
    const payloadData = payload?.data;

    // Checking if Request came from sellix via checking the signature
    //! make it un commented before pushing to production
    const isValid =
      process.env.NODE_ENV === "production"
        ? await validateSellixSignature(headerSignature, payload)
        : true;

    // If signature is not valid then return error response to the user
    if (!isValid) {
      try {
        if (payloadData?.status == "COMPLETED") {
          // Prepare data to send to Discord webhook
          const discordPayload = {
            content: `A request failed validation.\nCustomer Email: ${
              payloadData?.customer_email || "N/A"
            }`,
          };

          // Send to Discord webhook
          await fetch(
            "https://discord.com/api/webhooks/1283460869623382046/YhidCsePGyjQNxu3epkYhdBfXLWRpC2PFYnNDTdGWw8cWD_6XjoY9ad427cPdMYg7kUy",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(discordPayload),
            }
          );
        }
      } catch (discordError) {
        console.error("Error sending to Discord webhook:", discordError);
      }

      return NextResponse.json<ResponseObjectType>(
        {
          status: "error",
          message: SERVER_ERROR_RESPONSES.invalidSignature.message,
          messageCode: SERVER_ERROR_RESPONSES.invalidSignature.messageCode,
          data: null,
        },
        { status: SERVER_ERROR_RESPONSES.invalidSignature.status }
      );
    }

    // console.log("[SELLIX] payload", payload);

    // connecting to the database
    await connectToDatabase();

    const user: any = await getUserDetailsAdminAccess(
      payloadData?.customer_email
    );

    // Now we can ADD FUNDS TO THE USER ACCOUNT on infinite proxies account aka sub user

    //! if order:paid then add funds to user account
    if (payload.event === "order:paid") {
      // If Plan Type is RESIDENTIAL ======================================================================================================================>
      if (payloadData?.custom_fields?.planType === "RESIDENTIAL") {
        // First we will check if user exists in our database is a customer or not
        if (user?.userPlans?.residential === false) {
          try {
            // beacuse now user is not a customer we have to create new user in infinite proxies sub user database
            // and then we will add funds to the user account

            const subUserObject = {
              email: payloadData?.custom_fields?.email,
              username: payloadData?.custom_fields?.username,
              balance: payloadData?.custom_fields?.planGB * 1000, // multiplying by 1000 beacuse input comes by GB 0.2 * 1000 = 200 MB
            };

            // console.log("[INFINITE PROXIES] subUserObject", subUserObject);

            const subUserResponse = await fetch(
              "https://api.infiniteproxies.com/v1/reseller/sub_users/create",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "X-API-KEY": process.env.RESELLER_API_KEY || "",
                },
                body: JSON.stringify(subUserObject),
              }
            );

            const subUserResponseData = await subUserResponse.json();

            console.log(
              "[INFINITE PROXIES] Residential - subUserResponse",
              subUserResponseData
            );

            if (subUserResponseData.status === 201) {
              // beacuse now user is created in infinite proxies sub user database we will update the user in our database
              const updateUserCustomer = await prisma.user.update({
                where: { id: user?.id },
                data: {
                  userPlans: {
                    update: {
                      data: {
                        residential: true,
                      },
                    },
                  },
                },
              });

              console.log(
                "[PRISMA] Residential - updateUserCustomer",
                updateUserCustomer
              );
            }
          } catch (error) {
            console.log(
              "[INFINITE PROXIES] Residential - new user adding error",
              error
            );
          }
        } else {
          try {
            // console.log("[INFINITE PROXIES] user is already a customer");
            // beacuse user is already a customer now we will add balance to user account
            const subUserObject = {
              username: payloadData?.custom_fields?.username,
              balance: payloadData?.custom_fields?.planGB * 1000, // multiplying by 1000 beacuse input comes by GB 0.2 * 1000 = 200 MB
            };

            const subUserResponse = await fetch(
              "https://api.infiniteproxies.com/v1/reseller/sub_users/give_balance",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-API-KEY": process.env.RESELLER_API_KEY || "",
                },
                body: JSON.stringify(subUserObject),
              }
            );

            const subUserResponseData = await subUserResponse.json();

            console.log(
              "[INFINITE PROXIES ADDING BALANCE] Residential - subUserResponse",
              subUserResponseData
            );
          } catch (error) {
            console.log(
              "[INFINITE PROXIES] Residential - adding balance error",
              error
            );
          }
        }
      }
      // If Plan Type is CORE-RESIDENTIAL ======================================================================================================================>
      else if (payloadData?.custom_fields?.planType === "CORE-RESIDENTIAL") {
        // First we will check if user exists in our database is a customer or not
        if (user?.userPlans?.core_residential === false) {
          try {
            // beacuse now user is not a customer we have to create new user in infinite proxies sub user database
            // and then we will add funds to the user account

            const subUserObject = {
              username: user?.username,
              password: uuid(),
              email: `${generateRandomString(15)}@eclipseproxy.com`,
              serviceType: "RESIDENTIAL-PREMIUM",
              traffic_limit: payloadData?.custom_fields?.planGB * 1000 || 1000, //mb
            };

            // console.log("[INFINITE PROXIES] subUserObject", subUserObject);

            const subUserResponse = await fetch(
              "https://app-api.geonode.com/api/reseller/user/create",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "r-api-key": process.env.GEONODE_RESELLER_API_KEY || "",
                },
                body: JSON.stringify(subUserObject),
              }
            );

            const subUserResponseData = await subUserResponse.json();

            // console.log(
            //   "[INFINITE PROXIES] Residential - subUserResponse",
            //   subUserResponseData
            // );

            // beacuse now user is created in infinite proxies sub user database we will update the user in our database
            const expiryDate = new Date();
            expiryDate.setDate(
              expiryDate.getDate() + (1000000)
            );
            const addCoreResiPlan = await prisma.user.update({
              where: { email: user?.email }, // updating user in our database
              data: {
                userCoreResiPlans: {
                  create: {
                    resellerId: subUserResponseData?.data?.resellerId || "",
                    userResellerId: subUserResponseData?.data?.id || "",
                    configurationId: subUserResponseData?.data?.configurationId,
                    created_at: subUserResponseData?.data?.created_at,
                    email: payloadData?.custom_fields?.email,
                    username: subUserObject.username,
                    password: subUserObject.password,
                    daysCount: payloadData?.custom_fields?.days,
                    traffic_limit: subUserResponseData?.data?.traffic_limit,
                    banwidth_left: subUserResponseData?.data?.traffic_limit,
                    subscription_status:
                      subUserResponseData?.data?.subscription_status,
                    expires_at: subUserResponseData?.data?.current_period_end,
                  },
                },
              },
            });
            // console.log("[PRISMA] CoreResi - addCoreResiPlan", addCoreResiPlan);

            // beacuse now user is created in infinite proxies sub user database we will update the user in our database
            const updateUserCustomer = await prisma.user.update({
              where: { id: user?.id },
              data: {
                userPlans: {
                  update: {
                    data: {
                      core_residential: true,
                    },
                  },
                },
              },
            });
          } catch (error) {
            console.log(
              "[INFINITE PROXIES] Residential - new user adding error",
              error
            );
          }
        } else {
          // sending the requset to update balance proxy for current user
          const currentTrafficLimit = user?.userCoreResiPlans[0]?.traffic_limit || 0;
          const subUserObject = {
            traffic_limit: currentTrafficLimit + (payloadData?.custom_fields?.planGB * 1000 || 1000), //mb
          };

          const userResellerId = user?.userCoreResiPlans[0]?.userResellerId;
          console.log("USER", user)
          console.log("USER2", user?.userCoreResiPlans[0])

          console.log("[GEONODE PROXIES] subUserObject", subUserObject);

          const subUserResponse = await fetch(
            `https://app-api.geonode.com/api/reseller/user/${userResellerId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "r-api-key": process.env.GEONODE_RESELLER_API_KEY || "",
              },
              body: JSON.stringify(subUserObject),
            }
          );

          const subUserResponseData = await subUserResponse.json();

          console.log(
             "[GEONODE PROXIES] Residential - subUserResponse balance update data",
             subUserResponseData
           );

          // save updated password in the database
          await prisma.coreResiPlans.update({
            where: {
              userResellerId: userResellerId,
            },
            data: {
              traffic_limit: subUserObject.traffic_limit,
            },
          });
        }
      }
      // If Plan Type is IPV6        ======================================================================================================================>
      else if (payloadData?.custom_fields?.planType === "IPV6") {
        // beacause now user is not a customer we have to create new user in infinite proxies sub user database
        // and then we will add funds to the user account
        const subUserObject = {
          username: `eclipse_ipv6_${generateRandomString(8)}`,
          password: generateRandomString(8),
        };

        const urlencoded = new URLSearchParams();
        urlencoded.append("username", subUserObject.username);
        urlencoded.append("password", subUserObject.password);

        console.log("[INFINITE PROXIES] IPV6 - subUserObject", subUserObject);
        // creating new user in infinite proxies sub user database
        const subUserResponse = await fetch(
          "https://us1.proxylogic.org/createuser",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.PROXYLOGIC_API_KEY}`,
            },
            body: urlencoded,
          }
        );

        const subUserResponseData = await subUserResponse.json();

        console.log(
          "[INFINITE PROXIES] IPV6 - subUserResponse",
          subUserResponseData
        );

        const uid = subUserResponseData?.uid;

        if (uid) {
          const urlencoded = new URLSearchParams();
          urlencoded.append("days", String(payloadData?.custom_fields?.days));
          urlencoded.append(
            "threads",
            String(payloadData?.custom_fields?.threadCount * 2)
          );
          urlencoded.append("enable_static", "0");

          // beacuse now user is created in proxylogic sub user database we add balance to it
          const addIPv6Balance = await fetch(
            `https://us1.proxylogic.org/purchasedays/${uid}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.PROXYLOGIC_API_KEY}`,
              },
              body: urlencoded,
            }
          );

          const addIPv6BalanceData = await addIPv6Balance.json();

          console.log(
            "[INFINITE PROXIES ADDING BALANCE] IPV6 - addIPv6BalanceData",
            addIPv6BalanceData
          );

          if (addIPv6BalanceData?.success) {
            // get plan expiry date
            const fetchUserDetailsRes = await fetch(
              `https://us1.proxylogic.org/user/${uid}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${process.env.PROXYLOGIC_API_KEY}`,
                },
              }
            );

            const userDetails = await fetchUserDetailsRes.json();

            if (userDetails?.id) {
              const expiryString = userDetails?.expiry;
              const expiryDate = new Date(expiryString);
              const formattedExpiry = expiryDate.toISOString();

              // beacuse now user is created in infinite proxies sub user database we will update the user in our database
              const addIPv6Plan = await prisma.user.update({
                where: { email: user?.email }, // updating user in our database
                data: {
                  userIPv6Plans: {
                    create: {
                      created_at: new Date().toISOString(),
                      email: payloadData?.custom_fields?.email,
                      username: subUserObject.username,
                      password: subUserObject.password,
                      planId: userDetails?.id,
                      daysCount: payloadData?.custom_fields?.days,
                      threadCount: payloadData?.custom_fields?.threadCount,
                      price: addIPv6BalanceData?.price,
                      expires_at: formattedExpiry,
                    },
                  },
                },
              });
              console.log("[PRISMA] IPV6 - addIPv6Plan", addIPv6Plan);
            }

            // also making user ipv6 true in our database beacuse customer bought our IPv6 plan
            if (user?.userPlans?.ipv6 === false) {
              // beacuse now user is created in infinite proxies sub user database we will update the user in our database
              await prisma.user.update({
                where: { email: user?.email },
                data: {
                  userPlans: {
                    update: {
                      data: {
                        ipv6: true,
                      },
                    },
                  },
                },
              });
            }
          }
        }
      }

      // If Plan Type is IPV4        ======================================================================================================================>
      else if (payloadData?.custom_fields?.planType === "IPV4") {
        // beacause now user is not a customer we have to create new user in infinite proxies sub user database
        // and then we will add funds to the user account
        const subUserObject = {
          email: payloadData?.custom_fields?.email,
          username: `eclipse_ipv4_${generateRandomString(8)}`,
        };

        console.log("[INFINITE PROXIES] IPV4 - subUserObject", subUserObject);
        // creating new user in infinite proxies sub user database
        const subUserResponse = await fetch(
          "https://api.infiniteproxies.com/v2/reseller/sub_users/create",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": process.env.RESELLER_API_KEY || "",
            },
            body: JSON.stringify(subUserObject),
          }
        );

        const subUserResponseData = await subUserResponse.json();

        console.log(
          "[INFINITE PROXIES] IPV4 - subUserResponse",
          subUserResponseData
        );

        if (subUserResponseData.status === 201) {
          // beacuse now user is created in infinite proxies sub user database we add balance to it
          const addIPv4Balance = await fetch(
            "https://api.infiniteproxies.com/v2/reseller/sub_users/add_dcp_time",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.RESELLER_API_KEY || "",
              },
              body: JSON.stringify({
                username: subUserObject.username,
                hours: payloadData?.custom_fields?.days * 24,
                threads: payloadData?.custom_fields?.threadCount,
              }),
            }
          );

          const addIPv4BalanceData = await addIPv4Balance.json();

          console.log(
            "[INFINITE PROXIES ADDING BALANCE] IPV4 - addIPv4BalanceData",
            addIPv4BalanceData
          );

          if (addIPv4BalanceData.status === 200) {
            // beacuse now user is created in infinite proxies sub user database we will update the user in our database
            const addIPv4Plan = await prisma.user.update({
              where: { email: user?.email }, // updating user in our database
              data: {
                userIPv4Plans: {
                  create: {
                    created_at: addIPv4BalanceData?.data?.created_at,
                    email: addIPv4BalanceData?.data?.email,
                    username: addIPv4BalanceData?.data?.username,
                    daysCount: payloadData?.custom_fields?.days,
                    threadCount: payloadData?.custom_fields?.threadCount,
                    expires_at:
                      addIPv4BalanceData?.data?.products?.dataCenter?.expiresAt,
                  },
                },
              },
            });

            console.log("[PRISMA] IPV6 - addIPv4Plan", addIPv4Plan);

            // also making user ipv6 true in our database beacuse customer bought our IPv6 plan
            if (user?.userPlans?.ipv4 === false) {
              // beacuse now user is created in infinite proxies sub user database we will update the user in our database
              await prisma.user.update({
                where: { email: user?.email },
                data: {
                  userPlans: {
                    update: {
                      data: {
                        ipv4: true,
                      },
                    },
                  },
                },
              });
            }
          }
        }
      }
    }
    //! now we add invoices to user database

    const invoiceObject: Invoices = {
      id: new ObjectId().toString(),
      userId: user?.id || null,
      uniqid: payloadData.uniqid,
      planPrice: String(payloadData.custom_fields.planPrice),
      planName: payloadData.custom_fields.planName,
      planType: payloadData.custom_fields.planType,
      currency: payloadData.currency,
      customer_email: payloadData.customer_email,
      created_at: payloadData.created_at,
      updated_at: payloadData.updated_at,
      status: payloadData.status,
      couponId: payloadData.custom_fields.couponId,
    };

    const statusHistory: StatusHistory = payloadData.status_history.map(
      (item: any) => ({
        status: item.status,
        id: new ObjectId().toString(),
        details: item.details,
        created_at: item.created_at,
        invoice_number: item.invoice_id,
      })
    );

    // if order:created then create new invoice
    if (payload.event === "order:created") {
      // adding invoice to the user account in database
      await prisma.invoices.create({
        data: {
          ...invoiceObject,
          status_history: {
            create: statusHistory,
          },
        },
      });
    } else if (payload.event === "order:paid") {
      // if order:paid then update the invoice

      const invoiceDetails = await prisma.invoices.findFirst({
        where: { uniqid: payloadData?.uniqid },
      });

      // now we will set empty array to status history
      // because we will create new status history
      await prisma.invoices.update({
        where: { id: invoiceDetails?.id },
        data: {
          status_history: {
            set: [],
          },
        },
      });

      await prisma.invoices.update({
        where: { id: invoiceDetails?.id },
        data: {
          status: payloadData.status,
          updated_at: payloadData.updated_at,
          status_history: {
            createMany: {
              data: statusHistory,
            },
          },
        },
      });
    } else if (payload.event === "order:cancelled") {
      // if order:cancelled then update the invoice

      const invoiceDetails = await prisma.invoices.findFirst({
        where: { uniqid: payloadData?.uniqid },
      });

      // now we will set empty array to status history
      // because we will create new status history
      await prisma.invoices.update({
        where: { id: invoiceDetails?.id },
        data: {
          status_history: {
            set: [],
          },
        },
      });

      await prisma.invoices.update({
        where: { id: invoiceDetails?.id },
        data: {
          status: payloadData.status,
          updated_at: payloadData.updated_at,
          status_history: {
            createMany: {
              data: statusHistory,
            },
          },
        },
      });
    }

    // dummy seuccess reponse
    return NextResponse.json<ResponseObjectType>(
      {
        status: "success",
        message: "Webhook Received",
        messageCode: "WEBHOOK_RECEIVED",
        data: null,
      },
      { status: 200 }
    );
  } catch (error) {
    // console logging the error for debugging purpose
    console.log("SELLIX WEBHOOK ROUTE ERROR:", error);

    // Returning the error response to the user
    return NextResponse.json<ResponseObjectType>(
      {
        status: "error",
        message: SERVER_ERROR_RESPONSES.serverError.message,
        messageCode: SERVER_ERROR_RESPONSES.serverError.messageCode,
        data: null,
      },
      { status: SERVER_ERROR_RESPONSES.serverError.status }
    );
  } finally {
    // disconnecting from the database
    await prisma.$disconnect();
  }
};

function generateRandomString(length: any) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}
