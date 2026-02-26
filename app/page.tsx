import Image from "next/image";

import ProfileSection from "@/components/ProfileSection";

export default function Home() {
  return (
    <main className="overflow x-hidden min-h-screen bg-black text-white">
      <ProfileSection />
      {/* <section>
        projects section
      </section>
      <section>
        work experience section
      </section> */}
    </main>
  );
}
