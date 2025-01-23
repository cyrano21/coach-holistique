import React, { useState } from 'react';
import { motion, Variants, MotionProps } from 'framer-motion';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

interface VideoCarouselProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

// Extended motion props to include mouse events and onClick
type ExtendedMotionProps = Omit<MotionProps, 'variants'> & {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  variants?: Variants;
  className?: string;
};

export const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, onVideoSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  // Determine which videos to show (current and adjacent)
  const visibleVideos = [
    videos[(currentIndex - 1 + videos.length) % videos.length],
    videos[currentIndex],
    videos[(currentIndex + 1) % videos.length]
  ];

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '1200px', 
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      {/* Previous Button */}
      <button 
        onClick={handlePrev}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
          color: 'white',
          zIndex: 10,
          transition: 'transform 0.2s',
          transform: 'scale(1)',
          opacity: 0.7
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.2)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.opacity = '0.7';
        }}
      >
        ←
      </button>

      {/* Carousel Container */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '2rem',
        width: '100%'
      }}>
        {visibleVideos.map((video, index) => {
          const isCenter = index === 1;
          const isHovered = hoveredIndex === index;
          
          const motionProps: ExtendedMotionProps = {
            initial: { 
              opacity: isCenter ? 1 : 0.5, 
              scale: isCenter ? 1 : 0.8 
            },
            animate: { 
              opacity: isCenter ? 1 : 0.5, 
              scale: isCenter ? 1 : 0.8 
            },
            transition: { duration: 0.3 },
            style: {
              width: isCenter ? '400px' : '300px',
              cursor: 'pointer',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: isHovered 
                ? '0 15px 30px rgba(0,0,0,0.3)' 
                : '0 10px 25px rgba(0,0,0,0.2)',
              transform: isCenter 
                ? (isHovered ? 'scale(1.05)' : 'scale(1)') 
                : (isHovered ? 'scale(0.95)' : 'scale(0.9)'),
              position: 'relative',
              transition: 'all 0.3s ease'
            },
            whileTap: isCenter ? { scale: 0.95 } : {},
            onClick: () => onVideoSelect(video),
            onMouseEnter: () => setHoveredIndex(index),
            onMouseLeave: () => setHoveredIndex(null)
          };
          
          return (
            <motion.div 
              key={`video-${video.id}-${index}`}
              {...motionProps}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                height: '225px',
                overflow: 'hidden'
              }}>
                <Image
                  key={`image-${video.id}-${index}`}
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  priority={isCenter}
                  quality={80}
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: '50%',
                  width: isHovered ? '80px' : '70px',
                  height: isHovered ? '80px' : '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 10,
                  transition: 'all 0.3s ease',
                  opacity: isHovered ? 0.8 : 0.5
                }}>
                  <FaPlay 
                    color="white" 
                    size={isHovered ? 35 : 30} 
                    style={{ 
                      marginLeft: '5px',  // Slight offset to center the play icon
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                      transition: 'all 0.3s ease'
                    }} 
                  />
                </div>
              </div>
              <div style={{
                padding: '1rem',
                background: 'white',
                textAlign: 'center',
                transition: 'background-color 0.3s ease'
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: isHovered ? '#3A5A8A' : '#4A4E69',
                  transition: 'color 0.3s ease'
                }}>
                  {video.title}
                </h3>
                <p
                  style={{
                    color: isHovered ? '#5A6B8C' : '#4A4E69', // Deep muted purple
                    fontSize: '0.9rem',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    textAlign: 'center',
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    backgroundColor: isHovered 
                      ? 'rgba(58,90,138,0.1)' 
                      : 'rgba(255,255,255,0.8)', // Soft white background
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {video.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Button */}
      <button 
        onClick={handleNext}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
          color: 'white',
          zIndex: 10,
          transition: 'transform 0.2s',
          transform: 'scale(1)',
          opacity: 0.7
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.2)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.opacity = '0.7';
        }}
      >
        →
      </button>
    </div>
  );
};
