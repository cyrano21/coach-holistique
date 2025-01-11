import React, { useRef, useEffect } from 'react';

const ParallaxEffect = ({ children, speed = 0.5 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        containerRef.current.style.transform = `translateY(${scrollY * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

export default ParallaxEffect;
