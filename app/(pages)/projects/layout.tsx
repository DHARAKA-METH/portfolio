import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software projects by Dharaka Meth, including MindSpace, RescuePaws, and Kazu.",
  alternates: { canonical: "/projects" },
};

export default function ProjectSectionLayout({ children }: LayoutProps<"/projects">) {
  return children;
}
