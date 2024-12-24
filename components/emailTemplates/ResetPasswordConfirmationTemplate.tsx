//@ts-nocheck

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordConfirmationTemplateType {
  username?: string;
}

export const ResetPasswordConfirmationTemplate = ({
  username = "Eclipse Proxy User",
}: ResetPasswordConfirmationTemplateType) => (
  <Html>
    <Head />
    <Preview>Congrats, you have successfully reset your password!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://i.imgur.com/uKp4INU.png`}
          width="600"
          height="160"
          alt="Eclipse Proxy Logo"
          style={logo}
        />
        <Heading
          style={heading}
        >{`Hey, ${username} your password has changed!`}</Heading>
        <Heading style={heading2}>
          Your password has been updated successfully{" "}
        </Heading>
        <Section style={buttonContainer}>
          <Button
            py={11}
            px={23}
            style={button}
            href={`https://eclipseproxy.com/login`}
          >
            Login Now
          </Button>
        </Section>
        <Text style={paragraph}>
          {`If the button above did not work, login to EclipseProxy and enjoy the services!`}
        </Text>
        <Hr style={hr} />
        <Link href="https://eclipseproxy.com" style={reportLink}>
          {`Eclipse Proxy | World's Leading Proxy Provider`}
        </Link>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordConfirmationTemplate;

const logo = {
  width: 40,
  height: 40,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const heading2 = {
  fontSize: "20px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const paragraph2 = {
  margin: "15px 0 0 0",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const button = {
  backgroundColor: "#00ecfc",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#000",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "8px 20px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "5px 5px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "18px",
  borderRadius: "5px",
  color: "#3c4149",
};
