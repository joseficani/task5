import FixedNavbar from "./sections/FixedNavbar";
import HeroSection from "./sections/HeroSection";
import NextSection from "./sections/NextSection";
import TeamsSection from "./sections/TeamsSection";

export default function Home() {
  return (
    <main className="bg-[#efefef]">
      <FixedNavbar />
      <HeroSection />
      <NextSection />
      <TeamsSection />
    </main>
  );
}