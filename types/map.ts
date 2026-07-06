// Branded primitives — same underlying type (number), but TypeScript
// treats them as incompatible with each other and with plain numbers.
type Latitude = number & { readonly __brand: "Latitude" };
type Longitude = number & { readonly __brand: "Longitude" };

// Constructors do runtime validation, then "cast" into the branded type.
// This is the only place a raw number is allowed to become a Latitude/Longitude.
export function createLatitude(value: number): Latitude {
  if (value < -90 || value > 90) {
    throw new Error(`Invalid latitude: ${value}. Must be between -90 and 90.`);
  }
  return value as Latitude;
}

export function createLongitude(value: number): Longitude {
  if (value < -180 || value > 180) {
    throw new Error(
      `Invalid longitude: ${value}. Must be between -180 and 180.`,
    );
  }
  return value as Longitude;
}

export const toPoint = (coordinates: MapCoordinates): [number, number] => {
  return [coordinates[0], coordinates[1]];
};

// react-simple-maps expects [longitude, latitude], in that order.
// Naming the tuple type explicitly makes that order self-documenting.
type MapCoordinates = readonly [Longitude, Latitude];

export function createMapCoordinates(lng: number, lat: number): MapCoordinates {
  return [createLongitude(lng), createLatitude(lat)] as const;
}

// location type for map feature
export interface LibraryLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  coordinates: MapCoordinates;
  type: "public" | "academic" | "consortium";
  note?: string;
  imageUrl?: string;
}
