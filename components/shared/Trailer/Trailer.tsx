import Image from "next/image";
import { useState } from "react";

interface TrailerProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
}

export const Trailer = ({
  videoId,
  title,
  thumbnailUrl,
  thumbnailAlt,
}: TrailerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`}
        className="absolute inset-0 w-full h-full"
        frameBorder={0}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title={title}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className="absolute inset-0 w-full h-full group"
      aria-label={`Play trailer: ${title}`}
    >
      <Image
        src={thumbnailUrl}
        alt={thumbnailAlt}
        fill
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
        <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1 fill-black">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
};
