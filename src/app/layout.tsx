'use client'
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <ThemeProvider attribute="class" defaultTheme="dark">
        <TooltipProvider>
          <body
            suppressHydrationWarning
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <Toaster />

            <SessionProvider>{children}</SessionProvider>
          </body>
        </TooltipProvider>
      </ThemeProvider>
    </html>
  );
}
