import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dharaka Meth | Aspiring Backend Developer",
  description: "Portfolio of Dharaka Meth, an Aspiring Backend Developer.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#FAFAF7] transition-colors duration-300 dark:bg-[#10110F]">
        <ThemeProvider>
          <SiteNavigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
