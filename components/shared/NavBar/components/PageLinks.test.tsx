import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageLinks, links } from "./PageLinks";
import "@testing-library/jest-dom";

describe("PageLinks Component", () => {
  it("renders the page links container section", () => {
    // Arrange
    render(<PageLinks links={links} pathname="/" />);

    // Act
    const pageLinksContainer = screen.getByLabelText("Page links");

    // Assert
    expect(pageLinksContainer).toBeInTheDocument();
  });

  it("renders all desktop links", () => {
    // Arrange
    render(<PageLinks links={links} pathname="/" />);

    // Act
    const renderedLinks = screen.getAllByRole("link");

    // Assert
    expect(renderedLinks.length).toBe(links.length);
  });

  it("renders the mobile Pages button", () => {
    // Arrange
    render(<PageLinks links={links} pathname="/" />);

    // Act
    const pagesButton = screen.getByRole("button", { name: /pages/i });

    // Assert
    expect(pagesButton).toBeInTheDocument();
  });

  it("opens dropdown and displays links when Pages button is clicked", async () => {
    // Arrange
    render(<PageLinks links={links} pathname="/" />);
    const user = userEvent.setup();

    // Act
    const pagesButton = screen.getByRole("button", { name: /pages/i });
    await user.click(pagesButton);

    // Assert
    // Note: both desktop and mobile link sets exist in the DOM in tests,
    // so after opening the dropdown we expect duplicate link text (2 instances)
    // link names: Documentaries, Productions, Foundation, Contact
    links.forEach((link) => {
      expect(screen.getAllByText(link.name)).toHaveLength(2);
    });
  });
});
