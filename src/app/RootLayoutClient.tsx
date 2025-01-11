"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ChatBot from "@/components/ChatBot";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        once: true,
        disable: 'phone',
        duration: 700,
        easing: 'ease-out-cubic',
      });
    }
  }, []);

  return (
    <div className="relative">
      {children}
      <div style={{ position: 'relative', zIndex: 9999 }}>
        <ChatBot />
      </div>
    </div>
  );
}