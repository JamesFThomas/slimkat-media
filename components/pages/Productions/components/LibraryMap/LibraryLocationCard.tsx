// LibraryLocationCard.tsx
import type { LibraryLocation } from "@/types/map";

interface LibraryLocationCardProps {
  library: LibraryLocation;
  position: { x: number; y: number };
}

export const LibraryLocationCard = ({
  library,
  position,
}: LibraryLocationCardProps) => {
  return (
    <div
      className="absolute bg-black text-white p-2 text-xs pointer-events-none"
      style={{ top: position.y + 12, left: position.x + 12 }}
    >
      <p>{library.name}</p>
      <p>
        {library.address}, {library.city}, {library.state}
      </p>
      {library.note && (
        <p className="mt-1 text-[var(--muted-foreground,#aaa)] italic">
          {library.note}
        </p>
      )}
    </div>
  );
};
