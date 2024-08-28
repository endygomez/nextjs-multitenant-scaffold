import Image from "next/image";
import Home from "../components/Home";
import PricingSection from "@/components/pricing/PricingSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { FooterSection } from "@/components/footer/FooterSection";
import { ShowcaseSection } from "@/components/showcase/ShowcaseSection";
import { ContactSection } from "@/components/contact/ContactSection";
import AnimatedSection from "@/components/animated/AnimatedSection";

export default function Page() {
  return (
    <main className="">
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection>
        <ShowcaseSection />
      </AnimatedSection>

      <AnimatedSection>
        <PricingSection />
      </AnimatedSection>

      <AnimatedSection>
        <ContactSection />
      </AnimatedSection>

      <AnimatedSection>
        <FooterSection />
      </AnimatedSection>
    </main>
  );
}

{
  /* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Home />
      </div> */
}
