"use client";

import { motion } from "framer-motion";
import { experiences } from "./data";

export default function WorkExperienceSection() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-4xl lg:text-5xl"
        >
          <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Work Experience
          </span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-0 bottom-0 left-1/2 hidden w-px origin-top bg-gradient-to-b from-teal-500/50 via-cyan-500/50 to-transparent lg:block"
          ></motion.div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  className="absolute top-8 left-1/2 hidden -translate-x-1/2 lg:block"
                >
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/50"></div>
                </motion.div>

                <div
                  className={`flex-1 ${index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}
                >
                  <div className="group rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm transition-all hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/10">
                    <div className="flex flex-col items-start justify-between gap-2">
                      <h3 className="text-xl text-teal-400 transition-colors group-hover:text-teal-300">
                        {exp.title}
                      </h3>
                      <div className="text-cyan-400">{exp.company}</div>
                    </div>

                    <div className="mt-2 text-sm text-gray-500">
                      {exp.location} • {exp.period} {exp.current && "• Present"}
                    </div>

                    <p className="mt-4 text-sm leading-normal text-gray-400">{exp.description}</p>
                  </div>
                </div>

                <div className="hidden flex-1 lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
