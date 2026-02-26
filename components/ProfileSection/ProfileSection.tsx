import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Linkedin, Github, Mail, MessageCircle } from "lucide-react";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import { data } from "./data";

export default function ProfileSection() {
  const { name, title, bio, imageUrl, links } = data;

  return (
    <Tooltip.Provider>
      <div className="relative flex min-h-screen items-center justify-center py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl"></div>
          <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mb-8 inline-block">
            <div className="h-40 w-40 overflow-hidden rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 p-1">
              <div className="h-full w-full overflow-hidden rounded-full bg-black">
                <Image
                  src="/profile.png"
                  alt={name}
                  width={160}
                  height={160}
                  className="h-full w-full scale-110 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text text-5xl leading-[1.15] text-transparent lg:text-7xl">
              &lt;{name}/&gt;
            </h1>
            <p className="mb-6 text-2xl text-gray-400 lg:text-3xl">{title}</p>
            <p className="mx-auto mt-1 mb-12 max-w-2xl leading-relaxed text-gray-500">{bio}</p>
          </div>

          <div className="flex justify-center gap-5">
            {links.linkedin && (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-cyan-700 shadow-lg shadow-teal-500/30 transition-transform hover:scale-110"
                  >
                    <Linkedin className="h-6 w-6 text-white" />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white shadow-xl"
                    sideOffset={5}
                  >
                    LinkedIn
                    <Tooltip.Arrow className="fill-gray-800" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            )}
            {links.github && (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg transition-transform hover:scale-110"
                  >
                    <Github className="h-6 w-6 text-teal-400" />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white shadow-xl"
                    sideOffset={5}
                  >
                    GitHub
                    <Tooltip.Arrow className="fill-gray-800" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            )}
            {links.whatsapp && (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href={links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30 transition-transform hover:scale-110"
                  >
                    <MessageCircle className="h-6 w-6 text-teal-400" />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white shadow-xl"
                    sideOffset={5}
                  >
                    WhatsApp
                    <Tooltip.Arrow className="fill-gray-800" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            )}
            {links.email && (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href={`mailto:${links.email}`}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-teal-700 shadow-lg shadow-cyan-500/30 transition-transform hover:scale-110"
                  >
                    <Mail className="h-6 w-6 text-white" />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white shadow-xl"
                    sideOffset={5}
                  >
                    Email
                    <Tooltip.Arrow className="fill-gray-800" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            )}
          </div>
        </div>

        <ScrollIndicator />
      </div>
    </Tooltip.Provider>
  );
}
