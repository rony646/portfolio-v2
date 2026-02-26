"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import CustomPrevArrow from "./CustomPrevArrow";
import CustomNextArrow from "./CustomNextArrow";
import { projects } from "./data";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

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
            className="mb-16 text-center text-4xl lg:text-5xl"
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
                    {/* Media Section */}
                    {project.media && (
                      <div className="relative h-80 overflow-hidden bg-gray-900">
                        {project.media.type === "image" ? (
                          <img
                            src={project.media.url}
                            alt={project.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <video
                            src={project.media.url}
                            controls
                            className="h-full w-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      </div>
                    )}

                    <div className="p-8 lg:p-12">
                      <div className="mb-6 flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-3 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-3xl text-transparent lg:text-4xl">
                            {project.name}
                          </h3>
                          <div className="mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600"></div>
                        </div>

                        <div className="flex gap-3">
                          {project.links.github && (
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <a
                                  href={project.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/btn flex h-12 w-12 items-center justify-center rounded-full border border-gray-600 bg-gray-700/50 transition-all hover:scale-110 hover:border-teal-500 hover:bg-teal-600"
                                >
                                  <Github className="h-6 w-6 text-teal-400 transition-colors group-hover/btn:text-white" />
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
                          )}
                          {project.links.demo && (
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <a
                                  href={project.links.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-teal-700 shadow-lg shadow-teal-500/30 transition-all hover:scale-110"
                                >
                                  <ExternalLink className="h-6 w-6 text-white" />
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
                          )}
                        </div>
                      </div>

                      <p className="mb-8 text-lg leading-relaxed text-gray-300">
                        {project.description}
                      </p>

                      <div>
                        <p className="mb-4 text-sm tracking-wider text-gray-500 uppercase">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {project.techStack.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="rounded-full border border-teal-500/30 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 px-4 py-2 font-mono text-sm text-teal-400 transition-colors hover:border-teal-500/50"
                            >
                              {tech}
                            </span>
                          ))}
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
