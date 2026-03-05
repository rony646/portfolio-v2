import Image from "next/image";

import ProfileSection from "@/components/ProfileSection";
import ProjectsSection from "@/components/ProjectsSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow x-hidden min-h-screen bg-black text-white">
      <ProfileSection />
      <ProjectsSection />
      <WorkExperienceSection />
      <Footer />
      {/* <section>
        projects section
      </section>
      <section>
        work experience section
      </section> */}
    </main>
  );
}
