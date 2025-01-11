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
    <div className="">
      <div 
        className="bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: `url('/images/home/backgrounds/hero-background.jpg')`}}
      >
        <div className="bg-white bg-opacity-80 ">
          <HeroSection />
        </div>
      </div>

      <div 
        className="bg-cover bg-center bg-no-repeat py-20"
        style={{backgroundImage: `url('/images/home/backgrounds/services-background.jpg')`}}
      >
        <div className="bg-white bg-opacity-80">
          <Services />
        </div>
      </div>

      <div 
        className="bg-cover bg-center bg-no-repeat py-20"
        style={{backgroundImage: `url('/images/home/backgrounds/video-background.jpg')`}}
      >
        <div className="bg-white bg-opacity-10">
          <VideoSection videos={approchesData.videos} />
        </div>
      </div>

      <div 
        className="bg-cover bg-center bg-no-repeat py-20"
        style={{backgroundImage: `url('/images/home/backgrounds/testimonials-background.jpg')`}}
      >
        <div className="bg-white bg-opacity-80">
          <Testimonials />
        </div>
      </div>
    </div>
  );
}
