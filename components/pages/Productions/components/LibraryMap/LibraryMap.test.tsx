import { render, screen, fireEvent } from "@testing-library/react";
import { LibraryMap } from "./LibraryMap";
import { libraries } from "../../data/libraries.data";

// react-simple-maps' Geographies fetches real topojson over the network at
// runtime — not something we want in tests. Mock the module so we're
// testing our own hover/state logic, not the library's rendering.
jest.mock("react-simple-maps", () => ({
  ComposableMap: ({ children }: { children: React.ReactNode }) => (
    <svg>{children}</svg>
  ),
  Geographies: ({ children }: any) => children({ geographies: [] }),
  Geography: () => null,
  Marker: ({ children, onMouseEnter, onMouseLeave }: any) => (
    <g
      data-testid="marker"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </g>
  ),
}));

describe("LibraryMap", () => {
  it("renders a marker for every library in the data set", () => {
    render(<LibraryMap />);
    expect(screen.getAllByTestId("marker")).toHaveLength(libraries.length);
  });

  it("renders the US map geography", () => {
    render(<LibraryMap />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("shows the LibraryLocationCard for a marker on mouse enter", () => {
    render(<LibraryMap />);
    fireEvent.mouseEnter(screen.getAllByTestId("marker")[0]);
    expect(screen.getByText(libraries[0].name)).toBeInTheDocument();
  });

  it("hides the LibraryLocationCard for a marker on mouse leave", () => {
    render(<LibraryMap />);
    const marker = screen.getAllByTestId("marker")[0];
    fireEvent.mouseEnter(marker);
    fireEvent.mouseLeave(marker);
    expect(screen.queryByText(libraries[0].name)).not.toBeInTheDocument();
  });

  it("shows only one LibraryLocationCard at a time when hovering between markers", () => {
    render(<LibraryMap />);
    const markers = screen.getAllByTestId("marker");
    fireEvent.mouseEnter(markers[0]);
    fireEvent.mouseEnter(markers[1]);
    expect(screen.queryByText(libraries[0].name)).not.toBeInTheDocument();
    expect(screen.getByText(libraries[1].name)).toBeInTheDocument();
  });

  // consortium-marker styling is deferred until the custom SVG/dot artwork
  // from the designer replaces react-simple-maps — leaving as todo
  it.todo("renders consortium-type markers with distinct styling");

  describe("libraries.data", () => {
    it("contains 68 library entries", () => {
      expect(libraries).toHaveLength(68);
    });

    it("has no duplicate ids", () => {
      const ids = libraries.map((library) => library.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("has no duplicate coordinates", () => {
      const pairs = libraries.map((library) => library.coordinates.join(","));
      expect(new Set(pairs).size).toBe(pairs.length);
    });

    it("has valid latitude and longitude values for every entry", () => {
      libraries.forEach((library) => {
        const [lng, lat] = library.coordinates;
        expect(lng).toBeGreaterThanOrEqual(-180);
        expect(lng).toBeLessThanOrEqual(180);
        expect(lat).toBeGreaterThanOrEqual(-90);
        expect(lat).toBeLessThanOrEqual(90);
      });
    });

    it("has a valid type for every entry", () => {
      const validTypes = ["public", "academic", "consortium"];
      libraries.forEach((library) => {
        expect(validTypes).toContain(library.type);
      });
    });
  });
});
