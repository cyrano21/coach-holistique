"use client";

import Particles from "@tsparticles/react";
import { useMemo } from "react";

const ParticleBackground = () => {
  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      preset: "links",
      background: {
        color: { value: "#0f0f1a" },
      },
      particles: {
        number: { value: 60, density: { enable: true, area: 800 } },
        color: {
          value: [
            "#ff0000",
            "#ff7f00",
            "#ffff00",
            "#00ff00",
            "#0000ff",
            "#4b0082",
            "#8b00ff",
          ],
        },
        links: {
          enable: true,
          distance: 120,
          color: "#ffffff",
          opacity: 0.4,
          "inline-size": 1,
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none" as const, // ✅ Force le bon type ici
          outModes: "bounce" as const,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          repulse: { distance: 80 },
          push: { quantity: 4 },
        },
      },
    }),
    []
  );

  return <Particles id="chakra-particles" options={options} />;
};

export default ParticleBackground;
