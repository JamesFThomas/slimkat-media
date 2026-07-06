"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Base US states topology, served via CDN per react-simple-maps' standard
// usage pattern (Geographies fetches this URL directly rather than bundling
// the json locally).
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export const LibraryMap = () => {
  return (
    <div className="w-full rounded-lg border border-[var(--border)] overflow-hidden bg-[var(--background)]">
      <ComposableMap
        projection="geoAlbersUsa"
        className="w-full h-auto"
        projectionConfig={{ scale: 1000 }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--surface, #1a1a1a)"
                stroke="var(--border, #333333)"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};
