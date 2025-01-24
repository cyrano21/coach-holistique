"use client";

import React from "react";
import { approchesData } from "../data/approchesData";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("../components/HeroSection"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
      <div className="text-white text-2xl">Chargement...</div>
    </div>
  )
});

const Services = dynamic(() => import("../components/Services"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
      <div className="text-white text-2xl">Chargement...</div>
    </div>
  )
});

const VideoSection = dynamic(() => import("../components/VideoSection"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
      <div className="text-white text-2xl">Chargement...</div>
    </div>
  )
});

const Testimonials = dynamic(() => import("../components/Testimonials"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
      <div className="text-white text-2xl">Chargement...</div>
    </div>
  )
});

export default function HomePage() {
  return (
    <main className="bg-[#1A1A2E] min-h-screen w-screen max-w-[100vw] overflow-x-hidden">
      <HeroSection />
      <Services />
      <VideoSection videos={approchesData.videos} />
      <Testimonials />
    </main>
  );
}
