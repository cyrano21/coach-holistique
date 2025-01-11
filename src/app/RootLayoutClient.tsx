"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ChatBot from "@/components/ChatBot"; // Added import for ChatBot

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {children}
      <ChatBot /> {/* Added ChatBot component */}
    </>
  );
}

// Placeholder ChatBot component
// This component needs further implementation to fetch data from the blog and handle user interaction.
//This component will need to be created in a file named `components/ChatBot.js`
export const ChatBot = () => {
  return (
      <div>
          {/* Chatbot UI will go here */}
          <p>This is a placeholder for the chatbot.</p>
      </div>
  )
};