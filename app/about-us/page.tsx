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
    text?: string;
    image?: string | string[];
    mobile_image?: string[] | string;
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

type AboutCard = {
  id: number;
  order: number;
  title: string;
  subtitle: string;
  lottieUrl: string;
  lottieData: object | null;
};

type AboutHeroData = {
  title: string;
  subtitle: string;
};

type AboutSectionData = {
  title: string;
  subtitle: string;
  cards: AboutCard[];
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

type AboutPageData = {
  hero: AboutHeroData | null;
  story: StorySectionData | null;
  whyChooseUs: AboutSectionData | null;
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

async function getAboutPageData(): Promise<AboutPageData> {
  const json = await fetchJson<HomeApiResponse>(
    "https://bcom-api.on-forge.com/api/page/home"
  );

  const sections = json?.data?.sections || [];

  const bannerSection =
    sections.find((item) => item.handle === "home-section-banner-1") || null;

  const storySection =
    sections.find((item) => item.handle === "home-section-list-1") || null;

  const whyChooseUsSection =
    sections.find(
      (item) =>
        item.handle === "home-section-list-7" ||
        item.title?.trim().toLowerCase() === "why choose us"
    ) || null;

  const hero: AboutHeroData | null = bannerSection
    ? {
        title:
          bannerSection.title ||
          "Transforming Satellite Capacity into Reliable, Delivered Connectivity.",
        subtitle:
          bannerSection.subtitle ||
          "Beyond simple connectivity. We design, deploy, and manage the complete ground segment and terrestrial integration for complex global enterprises and MNOs.",
      }
    : null;

  let story: StorySectionData | null = null;

  if (storySection?.details?.list) {
    const activeSlides = storySection.details.list
      .filter((item) => item.is_active === 1)
      .sort((a, b) => a.order - b.order);

    const slides: StorySlide[] = await Promise.all(
      activeSlides.map(async (item) => {
        const lottieUrl =
          typeof item.image === "string" ? item.image : item.image?.[0] || "";

        const lottieData = lottieUrl ? await fetchJson<object>(lottieUrl) : null;

        return {
          id: item.id,
          order: item.order,
          title: item.title,
          text: item.text || "",
          lottieUrl,
          lottieData,
        };
      })
    );

    story = { slides };
  }

  let whyChooseUs: AboutSectionData | null = null;

  if (whyChooseUsSection?.details?.list) {
    const activeCards = whyChooseUsSection.details.list
      .filter((item) => item.is_active === 1)
      .sort((a, b) => a.order - b.order);

    const cards: AboutCard[] = await Promise.all(
      activeCards.map(async (item) => {
        const lottieUrl =
          typeof item.image === "string" ? item.image : item.image?.[0] || "";

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
    whyChooseUs,
  };
}

export default async function AboutUsPage() {
  const pageData = await getAboutPageData();

  return (
    <AboutUsPageContent
      hero={pageData.hero}
      storySection={pageData.story}
      whyChooseUsSection={pageData.whyChooseUs}
    />
  );
}