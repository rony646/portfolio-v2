export const projects = [
  {
    id: "1",
    name: "My Portfolio",
    description:
      "Modern personal portfolio built with Next.js App Router and deployed on AWS using SST. Focused on performance, clean UI, reusable components, and production-ready cloud infrastructure.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SST", "AWS"],
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    links: {
      github: "https://github.com/rony646/portfolio-v2",
      demo: "https://tba.com",
    },
  },
  {
    id: "2",
    name: "Insta Line",
    description:
      "React Native app that lets users upload images and an optional description, then uses the OpenAI API to generate social media captions. Includes Firebase authentication and a history flow for generated content.",
    techStack: ["React Native", "Expo", "TypeScript", "OpenAI API", "Firebase Auth"],
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    },
    links: {
      github: "https://github.com/rony646/insta-line",
      demo: "https://github.com/rony646/insta-line",
    },
  },
];
