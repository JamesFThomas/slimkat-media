import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectCardList } from "@/components/pages/LandingPage/components/Projects/ProjectCardList";
import { ProjectCardData } from "@/components/shared/ProjectCard/ProjectCard";

jest.mock("@/components/shared/ProjectCard/ProjectCard", () => ({
  ProjectCard: ({
    title,
    handleProjectCardClick,
    id,
  }: {
    title: string;
    id: number;
    handleProjectCardClick: (id: number) => void;
  }) => (
    <div data-testid="project-card" onClick={() => handleProjectCardClick(id)}>
      {title}
    </div>
  ),
}));

jest.mock("./ProjectLinks", () => ({
  ProjectLinks: ({ activeCardId }: { activeCardId: number | null }) => (
    <div data-testid="project-links">Links for {activeCardId}</div>
  ),
}));

const mockProjects: ProjectCardData[] = [
  {
    id: 1,
    title: "Project One",
    description: "Description one",
    imageUrl: "/img/1.png",
    imageAlt: "Project one image",
  },
  {
    id: 2,
    title: "Project Two",
    description: "Description two",
    imageUrl: "/img/2.png",
    imageAlt: "Project two image",
  },
];

/*
 * Story: Visitor browses the projects section on the landing page
 * In order to explore Slim Kat Media's work,
 * a visitor wants to see project cards and expand one to view its press links.
 *
 * Scenario: All project cards render when no card is active
 *   Given no card is selected
 *   When the ProjectCardList mounts
 *   Then all project cards should be visible
 *
 * Scenario: Only the active card is shown when one is selected
 *   Given a card has been clicked
 *   When activeCardId is set
 *   Then only that card should be visible
 *
 * Scenario: ProjectLinks renders when a card is active
 *   Given a card is active
 *   When the ProjectCardList renders
 *   Then the ProjectLinks component should be visible
 *
 * Scenario: Clicking a card calls the click handler with the correct id
 *   Given the project cards are rendered
 *   When I click a card
 *   Then the click handler should be called with that card's id
 */
describe("ProjectCardList", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders all project cards when no card is active", () => {
    render(
      <ProjectCardList
        projects={mockProjects}
        activeCardId={null}
        handleProjectCardClick={jest.fn()}
      />
    );
    expect(screen.getAllByTestId("project-card")).toHaveLength(2);
  });

  it("renders only the active card when one is selected", () => {
    render(
      <ProjectCardList
        projects={mockProjects}
        activeCardId={1}
        handleProjectCardClick={jest.fn()}
      />
    );
    expect(screen.getAllByTestId("project-card")).toHaveLength(1);
    expect(screen.getByText("Project One")).toBeInTheDocument();
  });

  it("renders ProjectLinks when a card is active", () => {
    render(
      <ProjectCardList
        projects={mockProjects}
        activeCardId={1}
        handleProjectCardClick={jest.fn()}
      />
    );
    expect(screen.getByTestId("project-links")).toBeInTheDocument();
  });

  it("calls the click handler with the correct card id when a card is clicked", () => {
    const handleClick = jest.fn();
    render(
      <ProjectCardList
        projects={mockProjects}
        activeCardId={null}
        handleProjectCardClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText("Project One"));
    expect(handleClick).toHaveBeenCalledWith(1);
  });
});
