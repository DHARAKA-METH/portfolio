import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Technical writing by Dharaka Meth about software engineering, backend development, and developer tools.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsLayout({ children }: LayoutProps<"/blogs">) {
  return children;
}
