import FixedNavbar from "./sections/FixedNavbar";
import HeroSection from "./sections/HeroSection";
import NextSection from "./sections/NextSection";
import TeamsSection from "./sections/TeamsSection";
import VisionSection from "./sections/VisionSection";
import AwardsSection from "./sections/AwardsSection";
import ProcessSection from "./sections/ProcessSection";

export default function Home() {
  return (
    <main className="bg-[#efefef]">
      <FixedNavbar />
      <HeroSection />
      <NextSection />
      <TeamsSection />
      <VisionSection />
      <AwardsSection />
      <ProcessSection />
    </main>
  );
}