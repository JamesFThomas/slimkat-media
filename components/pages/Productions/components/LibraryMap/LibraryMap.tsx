"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { libraries } from "../../data/libraries.data";
import { toPoint } from "@/types/map"; // 5 levels — reaches project root

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
        {/* Add location markers here */}
        {libraries.map((library) => (
          <Marker key={library.id} coordinates={toPoint(library.coordinates)}>
            <circle
              r={4}
              fill="var(--accent-link)"
              stroke="#fff"
              strokeWidth={0.5}
            />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};
