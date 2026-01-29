import KeyboardScroll from "@/components/KeyboardScroll";
import Navbar from "@/components/Navbar";
import VideoScaleSection from "@/components/VideoScaleSection";
import ImageGridSection from "@/components/ImageGridSection";
import PerformanceCollection from "@/components/PerformanceCollection";
import RealGolfersSection from "@/components/RealGolfersSection";
import ExperienceSection from "@/components/ExperienceSection";
import InnovationSection from "@/components/InnovationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <KeyboardScroll />
      <VideoScaleSection />
      <ImageGridSection />

      {/* New sections overlap the ImageGrid */}
      <div className="relative z-20 -mt-[50vh]">
        <PerformanceCollection />
        <RealGolfersSection />
        <ExperienceSection />
        {/* <InnovationSection /> */}
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}

