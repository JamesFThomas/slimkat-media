/**
 * Story: Library Location Card
 *
 * As a site visitor hovering a map marker
 * I want to see the library's name and address
 * So that I know which specific library holds a copy of the film
 */
describe("LibraryLocationCard", () => {
  // Given a library location object
  // When the card renders
  // Then it displays the library's name
  it.todo("renders the library name");

  // Given a library location object
  // When the card renders
  // Then it displays the full street address, city, and state
  it.todo("renders the library address");

  // Given a library location with type "consortium"
  // When the card renders
  // Then it displays a note clarifying this is a system headquarters, not a public branch
  it.todo("renders a consortium notice for consortium-type libraries");

  // Given a library location with an imageUrl
  // When the card renders
  // Then it displays the associated image
  it.todo("renders an image when imageUrl is present");

  // Given a library location without an imageUrl
  // When the card renders
  // Then it does not attempt to render a broken image element
  it.todo("does not render an image element when imageUrl is absent");
});
