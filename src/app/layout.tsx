import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import StyledComponentsRegistry from "@/lib/registry";

import { GlobalStyle } from "@/styles/global";

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
      <body className={`${plusJakartaSans.variable} antialiased`}>
        <StyledComponentsRegistry>
          <>
            {children}
            <GlobalStyle />
          </>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
