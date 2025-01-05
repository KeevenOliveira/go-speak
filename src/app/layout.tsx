import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";

import AuthProvider from "@/providers/AuthProvider";

import StyledComponentsRegistry from "@/lib/registry";

import { GlobalStyle } from "@/styles/global";
import ContextsProvider from "@/contexts";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Go Speak",
  description: "Chat with people from all over the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${plusJakartaSans.variable} antialiased`}>
        <StyledComponentsRegistry>
          <>
            <AuthProvider>
              <ContextsProvider>{children}</ContextsProvider>
            </AuthProvider>
            <GlobalStyle />
            <ToastContainer />
          </>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
