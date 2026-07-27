import { render, screen } from "@testing-library/react";
import { Trailer } from "./Trailer";

describe("Trailer", () => {
  const defaultProps = {
    videoId: "1212487625",
    title: "Farming Freedom",
    thumbnailUrl: "/logo/Farming_Freedom_Horizontal.png",
    thumbnailAlt: "Farming Freedom trailer thumbnail",
  };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Given a Trailer component with thumbnail props
  // When it first renders
  // Then it should show the facade (thumbnail + play button), not the iframe
  it.todo("renders the facade thumbnail and play button by default");

  // Given the facade is showing
  // When the user clicks the play button
  // Then the Vimeo iframe should mount with the correct videoId and autoplay=1
  it.todo("swaps in the Vimeo iframe with autoplay when play is clicked");

  // Given the Trailer has not been clicked
  // When it renders
  // Then no iframe should be present in the DOM (facade pattern lazy-loads it)
  it.todo("does not render an iframe before the play button is clicked");

  // Given the component has rendered
  // When inspecting the play button
  // Then its aria-label should include the passed title for accessibility
  it.todo("includes the title in the play button's aria-label");

  // Given the component has rendered
  // When inspecting the iframe after clicking play
  // Then its title attribute should match the passed title prop
  it.todo("sets the iframe title to the passed title prop");
});
