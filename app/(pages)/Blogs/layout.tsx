import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Technical writing by Dharaka Meth about software engineering, backend development, and developer tools.",
  alternates: { canonical: "/Blogs" },
};

export default function BlogsLayout({ children }: LayoutProps<"/Blogs">) {
  return children;
}
