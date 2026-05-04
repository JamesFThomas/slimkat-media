import {
  ProjectCard,
  ProjectCardData,
} from '@/components/shared/ProjectCard/ProjectCard';

import { ProjectLinks } from './ProjectLinks';

const projectsList: ProjectCardData[] = [
  {
    id: 1,
    title: 'projects.project1.title',
    description: 'projects.project1.description',
    imageUrl: '/images/projects/placeholder-1.png',
    imageAlt: 'projects.project1.imageAlt',
  },
  {
    id: 2,
    title: 'projects.project2.title',
    description: 'projects.project2.description',
    imageUrl: '/images/projects/placeholder-2.png',
    imageAlt: 'projects.project2.imageAlt',
  },
  {
    id: 3,
    title: 'projects.project3.title',
    description: 'projects.project3.description',
    imageUrl: '/images/projects/placeholder-3.png',
    imageAlt: 'projects.project3.imageAlt',
  },
];

type ProjectCardListProps = {
  projects?: ProjectCardData[];
  activeCardId: number | null;
  handleProjectCardClick: (id: number) => void;
};

export const ProjectCardList = ({
  projects = projectsList,
  activeCardId,
  handleProjectCardClick,
}: ProjectCardListProps) => {
  return (
    <div
      id='projectCardList-wrapper'
      className='w-full max-w-[1280px] flex flex-col lg:flex-row items-center justify-center gap-10 md:mt-8'
    >
      {projects.map((project) => {
        const hasActiveCard = activeCardId !== null;
        const isActiveCard = project.id === activeCardId;

        if (hasActiveCard && !isActiveCard) return null;

        return (
          <div
            key={project.id}
            className='w-full max-w-[875px] lg:max-w-none flex flex-col lg:flex-row items-start justify-center gap-8'
          >
            <div className='w-full lg:max-w-[400px]'>
              <ProjectCard
                {...project}
                handleProjectCardClick={handleProjectCardClick}
              />
            </div>

            {isActiveCard && (
              <div className='w-full lg:max-w-[520px]'>
                <ProjectLinks activeCardId={activeCardId} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
