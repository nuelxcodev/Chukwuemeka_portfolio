import { EDUCATION, SITE } from "@/data/site";
import { BackgroundScene } from "@/components/three/BackgroundScene";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SectionTracker } from "@/components/ui/SectionTracker";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/ui/Preloader";
import { Scrim } from "@/components/ui/Scrim";
import { ThemeSync } from "@/components/ui/ThemeToggle";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Snapshot } from "@/components/sections/Snapshot";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.fullName,
  jobTitle: SITE.role,
  worksFor: { "@type": "Organization", name: SITE.company },
  alumniOf: { "@type": "CollegeOrUniversity", name: EDUCATION.school },
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  email: SITE.email,
  url: SITE.url,
  sameAs: [SITE.socials.github, SITE.socials.linkedin],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Preloader />
      <ThemeSync />
      <ScrollProgress />
      <SmoothScroll />
      <SectionTracker />
      <BackgroundScene />
      <Scrim />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <Snapshot />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
