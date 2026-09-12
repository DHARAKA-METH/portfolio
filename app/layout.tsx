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
  title: {
    default: "Dharaka Meth | Aspiring Backend Developer",
    template: "%s | Dharaka Meth",
  },
  description:
    "Portfolio of Dharaka Meth, an undergraduate developer exploring backend engineering, DevOps, cloud technologies, and meaningful digital experiences.",
  applicationName: "Dharaka Meth Portfolio",
  authors: [{ name: "Dharaka Meth" }],
  creator: "Dharaka Meth",
  publisher: "Dharaka Meth",
  keywords: [
    "Dharaka Meth",
    "Backend Developer",
    "Linux",
    "Software Engineer",
    "Next.js",
    "Java",
    "Sri Lanka",
  ],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Dharaka Meth | Aspiring Backend Developer",
    description:
      "A software developer and Linux enthusiast exploring new technologies through projects, technical writing, and continuous learning.",
    siteName: "Dharaka Meth Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dharaka Meth | Aspiring Backend Developer",
    description:
      "A software developer and Linux enthusiast exploring new technologies through projects, technical writing, and continuous learning.",
  },
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
