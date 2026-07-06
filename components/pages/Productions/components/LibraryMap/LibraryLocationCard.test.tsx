import { render, screen } from "@testing-library/react";
import { LibraryLocationCard } from "./LibraryLocationCard";
import { createMapCoordinates, type LibraryLocation } from "@/types/map";

const baseLibrary: LibraryLocation = {
  id: "test-library",
  name: "Test Public Library",
  address: "123 Main St",
  city: "Testville",
  state: "TS",
  coordinates: createMapCoordinates(-90, 40),
  type: "public",
};

const position = { x: 0, y: 0 };

describe("LibraryLocationCard", () => {
  it("renders the library name", () => {
    render(<LibraryLocationCard library={baseLibrary} position={position} />);
    expect(screen.getByText(baseLibrary.name)).toBeInTheDocument();
  });

  it("renders the library address", () => {
    render(<LibraryLocationCard library={baseLibrary} position={position} />);
    expect(
      screen.getByText(
        `${baseLibrary.address}, ${baseLibrary.city}, ${baseLibrary.state}`,
      ),
    ).toBeInTheDocument();
  });

  it("renders a note when one is present (e.g. consortium/ambiguous entries)", () => {
    const consortiumLibrary: LibraryLocation = {
      ...baseLibrary,
      id: "test-consortium",
      type: "consortium",
      note: "Administrative headquarters, not a public branch.",
    };
    render(
      <LibraryLocationCard library={consortiumLibrary} position={position} />,
    );
    expect(screen.getByText(consortiumLibrary.note!)).toBeInTheDocument();
  });

  it("does not render a note when note is absent", () => {
    render(<LibraryLocationCard library={baseLibrary} position={position} />);
    expect(
      screen.queryByText(/administrative|headquarters/i),
    ).not.toBeInTheDocument();
  });

  it.todo("renders an image when imageUrl is present");
  it.todo("does not render an image element when imageUrl is absent");
});
