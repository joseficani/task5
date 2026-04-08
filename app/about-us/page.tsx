import AboutUsPageContent from "./AboutUsPageContent";

export const dynamic = "force-dynamic";

type ApiListItem = {
  id: number;
  order: number;
  title: string;
  subtitle: string;
  text: string;
  image: string | string[];
  mobile_image?: string[] | string;
  cta_text?: string;
  cta_link?: string;
  cta_page_alias?: string;
  is_active: number;
};

type ApiSection = {
  id: number;
  section_type: string;
  title: string;
  subtitle: string;
  handle: string;
  order: number;
  details?: {
    id: number;
    subtitle?: string;
    text?: string;
    image?: string | string[];
    mobile_image?: string[] | string;
    image_position?: string;
    cta_text?: string;
    cta_link?: string;
    cta_page_alias?: string;
    is_active?: number;
    list?: ApiListItem[];
  };
};

type HomeApiResponse = {
  success: boolean;
  data?: {
    title: string;
    alias: string;
    sections: ApiSection[];
  };
};

type AboutHeroData = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
};

type StorySlide = {
  id: number;
  order: number;
  title: string;
  text: string;
  lottieUrl: string;
  lottieData: object | null;
};

type StorySectionData = {
  slides: StorySlide[];
};

type ServicesImageCard = {
  id: number;
  order: number;
  title: string;
  imageUrl: string;
};

type ServicesShowcaseData = {
  eyebrow: string;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  ctaText: string;
  ctaHref: string;
  cards: ServicesImageCard[];
};

type GlobalPresenceStat = {
  id: number;
  order: number;
  title: string;
  value: string;
};

type GlobalPresenceData = {
  title: string;
  subtitle: string;
  mapLottieUrl: string;
  mapLottieData: object | null;
  ctaText: string;
  ctaHref: string;
  stats: GlobalPresenceStat[];
};

type WhyChooseUsCard = {
  id: number;
  order: number;
  title: string;
  subtitle: string;
  lottieUrl: string;
  lottieData: object | null;
};

type WhyChooseUsData = {
  title: string;
  subtitle: string;
  cards: WhyChooseUsCard[];
};

type AboutPageData = {
  hero: AboutHeroData | null;
  story: StorySectionData | null;
  servicesShowcase: ServicesShowcaseData | null;
  globalPresence: GlobalPresenceData | null;
  whyChooseUs: WhyChooseUsData | null;
};

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function cleanText(value?: string) {
  if (!value) return "";
  return value.replace(/<\/?p>/g, "").trim();
}

function getFirstAsset(value?: string | string[]) {
  if (!value) return "";
  return typeof value === "string" ? value : value[0] || "";
}

function resolveHref(link?: string, alias?: string) {
  if (link?.trim()) return link.trim();
  if (alias?.trim()) return `/${alias.trim()}`;
  return "#";
}

async function getAboutPageData(): Promise<AboutPageData> {
  const json = await fetchJson<HomeApiResponse>(
    "https://bcom-api.on-forge.com/api/page/home"
  );

  const sections = json?.data?.sections || [];

  const heroSection =
    sections.find((item) => item.handle === "home-section-banner-1") || null;

  const storySection =
    sections.find((item) => item.handle === "home-section-list-1") || null;

  const servicesIntroSection =
    sections.find((item) => item.handle === "home-section-image-3") || null;

  const servicesStatSection =
    sections.find((item) => item.handle === "home-section-image-4") || null;

  const servicesCardsSection =
    sections.find((item) => item.handle === "home-section-list-5") || null;

  const globalPresenceImageSection =
    sections.find((item) => item.handle === "home-section-image-5") || null;

  const globalPresenceStatsSection =
    sections.find((item) => item.handle === "home-section-list-6") || null;

  const whyChooseUsSection =
    sections.find((item) => item.handle === "home-section-list-7") || null;

  const hero: AboutHeroData | null = heroSection
    ? {
        title:
          heroSection.title ||
          "Transforming Satellite Capacity into Reliable, Delivered Connectivity.",
        subtitle:
          heroSection.subtitle ||
          "Beyond simple connectivity. We design, deploy, and manage the complete ground segment and terrestrial integration for complex global enterprises and MNOs.",
        ctaText: heroSection.details?.cta_text || "EXPLORE OUR SERVICES",
        ctaHref: resolveHref(
          heroSection.details?.cta_link,
          heroSection.details?.cta_page_alias
        ),
      }
    : null;

  let story: StorySectionData | null = null;

  if (storySection?.details?.list?.length) {
    const activeSlides = storySection.details.list
      .filter((item) => item.is_active === 1)
      .sort((a, b) => a.order - b.order);

    const slides: StorySlide[] = await Promise.all(
      activeSlides.map(async (item) => {
        const lottieUrl = getFirstAsset(item.image);
        const lottieData = lottieUrl ? await fetchJson<object>(lottieUrl) : null;

        return {
          id: item.id,
          order: item.order,
          title: item.title,
          text: cleanText(item.text),
          lottieUrl,
          lottieData,
        };
      })
    );

    story = { slides };
  }

  let servicesShowcase: ServicesShowcaseData | null = null;

  if (servicesIntroSection && servicesCardsSection?.details?.list?.length) {
    const activeCards = servicesCardsSection.details.list
      .filter((item) => item.is_active === 1)
      .sort((a, b) => a.order - b.order);

    const cards: ServicesImageCard[] = activeCards.map((item) => ({
      id: item.id,
      order: item.order,
      title: item.title,
      imageUrl: getFirstAsset(item.image),
    }));

    servicesShowcase = {
      eyebrow: servicesIntroSection.title || "OUR PROVIDED SERVICES",
      title:
        servicesIntroSection.subtitle ||
        servicesIntroSection.details?.subtitle ||
        "Services Engineered for Reliability and Scale",
      description:
        cleanText(servicesIntroSection.details?.text) ||
        "As a leading Managed Services Provider, we deliver fully integrated, high-performance solutions.",
      statValue: cleanText(servicesStatSection?.details?.text) || "30+",
      statLabel: servicesStatSection?.title || "MNOs under Managed Services",
      ctaText: servicesIntroSection.details?.cta_text || "EXPLORE OUR SERVICES",
      ctaHref: resolveHref(
        servicesIntroSection.details?.cta_link,
        servicesIntroSection.details?.cta_page_alias
      ),
      cards,
    };
  }

  let globalPresence: GlobalPresenceData | null = null;

  if (globalPresenceImageSection) {
    const mapLottieUrl = getFirstAsset(globalPresenceImageSection.details?.image);
    const mapLottieData = mapLottieUrl
      ? await fetchJson<object>(mapLottieUrl)
      : null;

    const stats: GlobalPresenceStat[] =
      globalPresenceStatsSection?.details?.list
        ?.filter((item) => item.is_active === 1)
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          id: item.id,
          order: item.order,
          title: item.title,
          value: cleanText(item.text),
        })) || [];

    globalPresence = {
      title: globalPresenceImageSection.title || "GLOBAL PRESENCE",
      subtitle:
        globalPresenceImageSection.subtitle ||
        "Globally Certified Operations Across ::120+ Countries::",
      mapLottieUrl,
      mapLottieData,
      ctaText: globalPresenceImageSection.details?.cta_text || "VIEW USE CASES",
      ctaHref: resolveHref(
        globalPresenceImageSection.details?.cta_link,
        globalPresenceImageSection.details?.cta_page_alias
      ),
      stats,
    };
  }

  let whyChooseUs: WhyChooseUsData | null = null;

  if (whyChooseUsSection?.details?.list?.length) {
    const activeCards = whyChooseUsSection.details.list
      .filter((item) => item.is_active === 1)
      .sort((a, b) => a.order - b.order);

    const cards: WhyChooseUsCard[] = await Promise.all(
      activeCards.map(async (item) => {
        const lottieUrl = getFirstAsset(item.image);
        const lottieData = lottieUrl ? await fetchJson<object>(lottieUrl) : null;

        return {
          id: item.id,
          order: item.order,
          title: item.title,
          subtitle: item.subtitle,
          lottieUrl,
          lottieData,
        };
      })
    );

    whyChooseUs = {
      title: whyChooseUsSection.title || "WHY CHOOSE US",
      subtitle: whyChooseUsSection.subtitle || "Built Around How;;; You Operate",
      cards,
    };
  }

  return {
    hero,
    story,
    servicesShowcase,
    globalPresence,
    whyChooseUs,
  };
}

export default async function AboutUsPage() {
  const pageData = await getAboutPageData();

  return (
    <AboutUsPageContent
      hero={pageData.hero}
      storySection={pageData.story}
      servicesShowcaseSection={pageData.servicesShowcase}
      globalPresenceSection={pageData.globalPresence}
      whyChooseUsSection={pageData.whyChooseUs}
    />
  );
}