"use client";

import { useRef, useState, useEffect } from "react";

const videos = [
  "/videos/client-interview.mp4",
  "/videos/family-dinner.mp4",
  "/videos/family-photos.mp4",
];

export const TestimonialVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.src = videos[currentIndex];
    if (isPlaying) videoRef.current.play();
  }, [currentIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] bg-black overflow-hidden">
      <video
        ref={videoRef}
        playsInline
        onEnded={handleEnded}
        className="w-full h-full object-cover"
        src={videos[currentIndex]}
      />

      {/* Overlay — always visible when paused, hidden when playing */}
      <button
        onClick={togglePlay}
        className={`
          absolute inset-0 cursor-pointer
          flex items-center justify-center
          bg-black/20 hover:bg-black/30
          transition-colors
          ${isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"}
        `}
      >
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
              <rect x="5" y="4" width="4" height="16" rx="1" />
              <rect x="15" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
              <path d="M6 4l14 8-14 8V4z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};
