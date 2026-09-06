import { ArrowUpRight } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { projects } from "@/data/projects";

const displayFont =
  "[font-family:var(--font-courier-prime),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace]";

export default function ProjectSectionPage() {
  return (
    <main className="mx-auto w-full max-w-[1120px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
      <section className="py-14 sm:py-20">
        <h1 className={`${displayFont} text-[32px] font-bold tracking-[-0.055em] text-[#20221F] sm:text-[42px] dark:text-[#F2F3EE]`}>
          Projects
        </h1>
      </section>

      <div className="divide-y divide-[#E5E6E1] border-t border-[#E5E6E1] dark:divide-[#282B26] dark:border-[#282B26]">
        {projects.map((project) => (
          <article className="grid gap-7 py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12 lg:py-14" key={project.title}>
            <div className="max-w-[62ch]">
              <p className={`${displayFont} text-[14px] text-[#898E86] dark:text-[#7D8279]`}>
                {project.period.join(" - ")}
              </p>
              <h2 className={`${displayFont} mt-3 text-[24px] leading-tight font-bold tracking-[-0.04em] text-[#292C28] sm:text-[28px] dark:text-[#E8EAE5]`}>
                {project.title}
              </h2>
              <p className={`${displayFont} mt-2 text-[15px] text-[#62675F] dark:text-[#A6ABA1]`}>
                {project.role}
              </p>
              <p className="mt-4 text-[16px] leading-7 text-[#62675F] sm:text-[17px] dark:text-[#A6ABA1]">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span className={`${displayFont} rounded-md border border-[#D8DAD4] px-2.5 py-1.5 text-[14px] text-[#40443E] dark:border-[#363932] dark:text-[#C5C9C0]`} key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a className={`${displayFont} inline-flex items-center gap-1.5 text-[15px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={project.url} target="_blank" rel="noreferrer">
                  {project.linkLabel}
                  <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                </a>
                {project.demoUrl && (
                  <a className={`${displayFont} inline-flex items-center gap-1.5 text-[15px] font-bold text-[#62675F] transition-colors hover:text-[#20221F] dark:text-[#A6ABA1] dark:hover:text-[#F2F3EE]`} href={project.demoUrl} target="_blank" rel="noreferrer">
                    <SiYoutube className="size-3.5" />
                    Demo video
                    <ArrowUpRight className="size-3.5 stroke-[1.75]" />
                  </a>
                )}
              </div>
            </div>

            <div className={`grid self-start rounded-2xl bg-[#F2F2EC] dark:bg-[#181A17] ${project.screenshotCount === 4 ? "grid-cols-2" : "grid-cols-3"} ${project.screenType === "mobile" ? "gap-2 p-4 sm:gap-3 sm:p-6" : "gap-3 p-3"}`}>
              {Array.from({ length: project.screenshotCount }, (_, index) => String(index + 1).padStart(2, "0")).map((screen) => (
                <div className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-br ${project.accent} text-white ${project.screenType === "mobile" ? "aspect-[9/16] p-2 sm:p-3" : "aspect-[4/3] p-3"}`} key={screen}>
                  <span className={`${displayFont} text-[11px] tracking-[0.12em] text-white/70 uppercase`}>
                    {project.screenType === "mobile" ? "Mobile" : "Desktop"} {screen}
                  </span>
                  <span className={`${displayFont} absolute right-3 bottom-2 text-[22px] font-bold tracking-[-0.06em]`}>
                    {project.mark}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
