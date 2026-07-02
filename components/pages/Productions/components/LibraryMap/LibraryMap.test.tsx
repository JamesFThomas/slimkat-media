/**
 * Story: Library Map
 *
 * As a site visitor
 * I want to see a map of libraries that hold Farming Freedom
 * So that I can find a copy near me or discover how far the film has reached
 */
describe("LibraryMap", () => {
  // Given the library data set
  // When the map renders
  // Then it displays a marker for each library location
  it.todo("renders a marker for every library in the data set");

  // Given the library data set
  // When the map renders
  // Then it displays the underlying US state geography
  it.todo("renders the US map geography");

  // Given a rendered map
  // When the user hovers over a marker
  // Then the corresponding LibraryLocationCard is displayed
  it.todo("shows the LibraryLocationCard for a marker on mouse enter");

  // Given a LibraryLocationCard is showing for a marker
  // When the user moves the mouse away from that marker
  // Then the LibraryLocationCard is hidden
  it.todo("hides the LibraryLocationCard for a marker on mouse leave");

  // Given the user hovers over a second marker before leaving the first
  // When the mouse enters the new marker
  // Then only the new marker's LibraryLocationCard is shown, not both
  it.todo(
    "shows only one LibraryLocationCard at a time when hovering between markers",
  );

  // Given a library entry with a "consortium" type
  // When its marker is rendered
  // Then it is visually distinguishable from "public" and "academic" markers
  it.todo("renders consortium-type markers with distinct styling");

  /**
   * Story: Library Data Integrity
   *
   * As a developer maintaining the library tracking feature
   * I want the library data set to be structurally sound
   * So that the map never silently breaks from a bad data entry
   */
  describe("libraries.data", () => {
    // Given the libraries data set
    // When it is loaded
    // Then it contains exactly 67 entries
    it.todo("contains 67 library entries");

    // Given the libraries data set
    // When checking each entry's id
    // Then no two entries share the same id
    it.todo("has no duplicate ids");

    // Given the libraries data set
    // When checking each entry's coordinates
    // Then no two entries share the exact same coordinates
    it.todo("has no duplicate coordinates");

    // Given the libraries data set
    // When checking each entry's coordinates
    // Then every latitude and longitude falls within valid real-world ranges
    it.todo("has valid latitude and longitude values for every entry");

    // Given the libraries data set
    // When checking each entry's type field
    // Then every entry is one of "public", "academic", or "consortium"
    it.todo("has a valid type for every entry");
  });
});
