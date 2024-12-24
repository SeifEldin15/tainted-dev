import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRecoilState } from "recoil";
import { modalState, modalStateType } from "@/global/modal-states";
import { purchasePlansTypes } from "@/constants/DashboardStrings";
import { useState } from "react";
import { Loader } from "lucide-react";
import {
  createSellixInvoice,
  getCoupon,
  getProxyPrice,
} from "@/constants/functions";
import toast from "react-hot-toast";
import { PROMISE_MESSAGES } from "@/constants/Messages";
import { useRouter } from "next/navigation";

export function PurchaseModal() {
  const { push } = useRouter();

  const [currentModal, setcurrentModal] = useRecoilState(modalState);
  const [isInvoiceCreating, setisInvoiceCreating] = useState(false);
  const [coupon, setcoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState({ percent: 0 } as any);

  // console.log("[MODAL] PurchaseModal", currentModal.modalData);

  const handleClose = () => {
    setcurrentModal({ modalName: null } as modalStateType);
  };

  //  Plan type according to play type we will generate the inoivce for user
  const modalData: purchasePlansTypes = currentModal?.modalData;

  const handleCreateInvoice = async () => {
    setisInvoiceCreating(true);

    if (!coupon) {
      setAppliedCoupon({ percent: 0 } as any);
    }

    let promise = new Promise(async (resolve, reject) => {
      // here make request to create invoice
      const response = await createSellixInvoice({
        name: "Residential Proxies",
        type: "RESIDENTIAL",
        totalGB: modalData?.totalGB,
        coupon: coupon ? appliedCoupon?.code : null,
      } as any);

      if (response.status === "success") {
        resolve(response?.message);
        // now we will take url from response and open it in new tab after 2 seconds
        setTimeout(() => {
          push(response?.data?.url);
        }, 2000);
      } else {
        reject(response?.message);
        setisInvoiceCreating(false);
      }
    });

    // Showing Toast To User
    toast.promise(promise, {
      loading: PROMISE_MESSAGES.invoiceCreated.loading,
      success: (msg: any) => PROMISE_MESSAGES.invoiceCreated.success(msg),
      error: (err: any) => PROMISE_MESSAGES.invoiceCreated.error(err),
    });
  };

  async function checkCoupon() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await getCoupon(coupon, "ipv4_resi");
      if (response.status === "success") {
        setAppliedCoupon(response.data);
        resolve(`Coupon Applied with ${response?.data?.percent}% discount`);
      } else {
        setAppliedCoupon({ percent: 0 } as any);
        reject(response.message);
      }
    });

    // Showing Toast To User
    toast.promise(promise, {
      loading: PROMISE_MESSAGES.coupon.loading,
      success: (msg: any) => PROMISE_MESSAGES.coupon.success(msg),
      error: (err: any) => PROMISE_MESSAGES.coupon.error(err),
    });
  }
  const couponDiscount =
    (appliedCoupon?.percent / 100) *
      getProxyPrice(Number(modalData?.totalGB)) || 0;

  return (
    <Dialog open={currentModal.modalName === "purchaseModal"}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`Purchase Residential Proxy`}</DialogTitle>
          <DialogDescription className="text-xs">{`Bandwidth is automatically added after the payment has confirmed.`}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex flex-col w-full py-2 text-[#c7c7c7] gap-1.5">
            <div className="flex flex-row items-center justify-between">
              <div>{`Plan Name`}</div>
              <div>{`Proxy Bandwidth`}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>{`Plan Type`}</div>
              <div className="text-brand font-semibold">{`Residential Proxies`}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>{`Amount (in USD)`}</div>
              <div
                className={`${appliedCoupon.percent > 0 ? "line-through" : ""}`}
              >{`$${getProxyPrice(Number(modalData?.totalGB))}`}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>{`Bandwidth Limit`}</div>
              <div>{`${modalData?.totalGB} GB`}</div>
            </div>

            {appliedCoupon?.percent > 0 && (
              <>
                <div className="flex flex-row items-center justify-between">
                  <div>{`Coupon Discount`}</div>
                  <div>
                    {`${appliedCoupon?.percent}% x ${getProxyPrice(
                      Number(modalData?.totalGB)
                    )}`}{" "}
                    = ${couponDiscount.toFixed(1) || "0.0"}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div>{`Final Amount`}</div>
                  <div>{`$${(
                    getProxyPrice(Number(modalData?.totalGB)) - couponDiscount
                  ).toFixed(1)}`}</div>
                </div>
              </>
            )}
          </div>
          {/* Devider */}
          <div className="h-[0.5px] bg-borderColor w-full" />
          {/* Payment Method */}
          <div className="flex flex-col w-full py-2  text-[#c7c7c7] gap-1.5">
            <div className="flex flex-row items-center justify-between">
              <div>{`Payment Method`}</div>
              <div className="text-yellow-400 font-semibold">{`Crypto or CashApp`}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>{`Gateway`}</div>
              <div className="text-purple-400 font-semibold">{`Sellix Pay`}</div>
            </div>
          </div>

          {/* Devider */}
          <div className="h-[0.5px] bg-borderColor w-full" />

          {/* Coupon */}
          <div className="grid gap-2">
            <Label
              className="h-[15px] flex flex-row items-center justify-between"
              htmlFor="password"
            >
              <span>Coupon</span>
            </Label>
            <div className="flex w-full gap-2">
              <Input
                name="coupon"
                onChange={(e) => setcoupon(e.target.value)}
                id="coupon"
                type="text"
                className="w-4/5"
              />
              <Button
                className="disabled:cursor-not-allowed"
                variant={"brand"}
                disabled={isInvoiceCreating}
                onClick={checkCoupon}
                type="submit"
              >
                {/* <Loader size={18} color="#09090b" className="animate-spin" /> */}
                <span>Apply</span>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => handleClose()}
            type="submit"
          >
            Cancel
          </Button>
          <Button
            className="w-full disabled:cursor-not-allowed"
            variant={"brand"}
            disabled={isInvoiceCreating}
            onClick={async () => await handleCreateInvoice()}
            type="submit"
          >
            {isInvoiceCreating ? (
              <Loader size={18} color="#09090b" className="animate-spin" />
            ) : (
              <span>Create Invoice</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
