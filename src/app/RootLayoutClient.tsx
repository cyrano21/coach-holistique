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
    AOS.init();
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