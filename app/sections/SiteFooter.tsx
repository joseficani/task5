import Link from "next/link";

type SiteFooterProps = {
  aboutHref?: string;
  whyChooseUsHref?: string;
};

export default function SiteFooter({
  aboutHref = "/about-us",
  whyChooseUsHref = "/about-us#why-choose-us",
}: SiteFooterProps) {
  return (
    <footer
      id="site-footer"
      className="border-t border-[#20304d] bg-[#081326] text-white"
    >
      <div className="container mx-auto grid gap-10 px-6 py-12 md:grid-cols-3 md:px-12">
        <div>
          <h3 className="text-lg font-semibold">Home</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Delivering integrated connectivity and managed services with scalable
            and tailored solutions for global operations.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Links
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">
            <Link href="/">Home</Link>
            <Link href={aboutHref}>About Us</Link>
            <Link href={whyChooseUsHref}>Why Choose Us</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            Contact
          </h4>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Contact us for more information.
          </p>
        </div>
      </div>
    </footer>
  );
}