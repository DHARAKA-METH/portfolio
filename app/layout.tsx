import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
    "Dharaka",
    "Dharaka Meth",
    "Backend Developer",
    "Linux",
    "Software Engineer",
    "Next.js",
    "Java",
    "Sri Lanka",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
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
    url: site.url,
    images: [{ url: "/profile.png", alt: "Dharaka Meth" }],
  },
  twitter: {
    card: "summary",
    title: "Dharaka Meth | Aspiring Backend Developer",
    description:
      "A software developer and Linux enthusiast exploring new technologies through projects, technical writing, and continuous learning.",
    images: ["/profile.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": site.personId,
        name: "Dharaka Meth",
        url: site.url,
        image: `${site.url}/profile.png`,
        jobTitle: "Aspiring Backend Developer",
        sameAs: site.profiles,
        knowsAbout: [
          "Java",
          "Spring Boot",
          "Next.js",
          "Docker",
          "Microservices",
          "Firebase",
          "React Native",
          "Flutter",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": site.personId },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[#FAFAF7] transition-colors duration-300 dark:bg-[#10110F]">
        <JsonLd data={structuredData} />
        <ThemeProvider>
          <SiteNavigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
