"use client";

import { approchesData } from "../data/approchesData";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import VideoSection from "../components/VideoSection";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  console.log("Approches data in HomePage:", approchesData);
  console.log("Videos passed to VideoSection:", approchesData.videos);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white">
      <HeroSection />
      <Services />
      <VideoSection videos={approchesData.videos} />
      <Testimonials />
    </div>
  );
}
