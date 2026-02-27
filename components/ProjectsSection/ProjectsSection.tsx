"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Cpu, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { IconType } from "react-icons";
import Image from "next/image";
import {
  SiAmazonwebservices,
  SiExpo,
  SiFirebase,
  SiNextdotjs,
  SiOpenai,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import CustomPrevArrow from "./CustomPrevArrow";
import CustomNextArrow from "./CustomNextArrow";
import { projects } from "./data";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const techIcons: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  AWS: SiAmazonwebservices,
  "React Native": SiReact,
  Expo: SiExpo,
  "OpenAI API": SiOpenai,
  "Firebase Auth": SiFirebase,
};

export default function ProjectsSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dotsClass: "slick-dots !bottom-8",
    customPaging: () => (
      <div className="h-3 w-3 rounded-full bg-gray-600 transition-colors hover:bg-teal-500"></div>
    ),
  };

  return (
    <Tooltip.Provider>
      <section className="relative overflow-hidden px-4 py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-10 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center text-2xl sm:mb-16 sm:text-4xl lg:text-5xl"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="project-carousel"
          >
            <Slider {...settings}>
              {projects.map((project) => (
                <div key={project.id} className="px-4">
                  <div className="overflow-hidden rounded-3xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-2xl backdrop-blur-sm transition-all hover:border-teal-500/50">
                    {project.media && (
                      <div className="relative h-44 overflow-hidden bg-gray-900 sm:h-64 md:h-80">
                        <Image
                          src={project.media}
                          alt={project.name}
                          className="h-full w-full object-cover"
                          width={1000}
                          height={1000}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      </div>
                    )}

                    <div className="p-4 sm:p-8 lg:p-12">
                      <div className="mb-4 flex items-start justify-between sm:mb-6">
                        <div className="flex-1">
                          <h3 className="mb-2 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-xl text-transparent sm:mb-3 sm:text-3xl lg:text-4xl">
                            {project.name}
                          </h3>
                          <div className="mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600"></div>
                        </div>

                        <div className="flex gap-2 sm:gap-3">
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn flex h-9 w-9 items-center justify-center rounded-full border border-gray-600 bg-gray-700/50 transition-all hover:scale-110 hover:border-teal-500 hover:bg-teal-600 sm:h-12 sm:w-12"
                              >
                                <Github className="h-4 w-4 text-teal-400 transition-colors group-hover/btn:text-white sm:h-6 sm:w-6" />
                              </a>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                className="z-[9999] rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white shadow-xl"
                                sideOffset={5}
                              >
                                View on GitHub
                                <Tooltip.Arrow className="fill-gray-800" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-teal-700 shadow-lg shadow-teal-500/30 transition-all hover:scale-110 sm:h-12 sm:w-12"
                              >
                                <ExternalLink className="h-4 w-4 text-white sm:h-6 sm:w-6" />
                              </a>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content
                                className="z-[9999] rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white shadow-xl"
                                sideOffset={5}
                              >
                                View live demo
                                <Tooltip.Arrow className="fill-gray-800" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </div>
                      </div>

                      <p className="mb-4 text-sm leading-relaxed text-gray-300 sm:mb-8 sm:text-base lg:text-lg">
                        {project.description}
                      </p>

                      <div>
                        <p className="mb-4 text-sm tracking-wider text-gray-500 uppercase">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {project.techStack.map((tech, techIndex) => {
                            const TechIcon = techIcons[tech];

                            return (
                              <span
                                key={techIndex}
                                className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 px-2.5 py-1 font-mono text-xs text-teal-400 transition-colors hover:border-teal-500/50 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                              >
                                {TechIcon ? (
                                  <TechIcon className="h-4 w-4 shrink-0" />
                                ) : (
                                  <Cpu className="h-4 w-4 shrink-0" />
                                )}
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </div>

        <style>{`
              .project-carousel .slick-dots li button:before {
                display: none;
              }
              .project-carousel .slick-dots li.slick-active > div {
                background: linear-gradient(to right, #14b8a6, #06b6d4);
                transform: scale(1.5);
              }
              .project-carousel .slick-list {
                padding: 20px 0 !important;
              }
            `}</style>
      </section>
    </Tooltip.Provider>
  );
}
