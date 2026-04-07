import FixedNavbar from "./sections/FixedNavbar";
import SiteFooter from "./sections/SiteFooter";
import HeroSection from "./sections/HeroSection";
import NextSection from "./sections/NextSection";
import TeamsSection from "./sections/TeamsSection";
import VisionSection from "./sections/VisionSection";
import AwardsSection from "./sections/AwardsSection";
import ProcessSection from "./sections/ProcessSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <FixedNavbar
        aboutHref="/about-us"
        whyChooseUsHref="/about-us#why-choose-us"
        contactHref="#site-footer"
      />

      <HeroSection />
      <NextSection />
      <TeamsSection />
      <VisionSection />
      <AwardsSection />
      <ProcessSection />

      <SiteFooter
        aboutHref="/about-us"
        whyChooseUsHref="/about-us#why-choose-us"
      />
    </main>
  );
}