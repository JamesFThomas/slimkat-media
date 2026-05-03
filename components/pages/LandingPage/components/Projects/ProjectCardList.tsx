import {
  ProjectCard,
  ProjectCardData,
} from '@/components/shared/ProjectCard/ProjectCard';

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
  // activeProjectId: number;
};

export const ProjectCardList = ({
  projects = projectsList,
  // activeProjectId,
}: ProjectCardListProps) => {
  return (
    <div
      id='projectCardList-wrapper'
      className='w-full flex flex-col lg:flex-row items-center justify-center gap-6 md:mt-8'
    >
      {projects?.map((project) => (
        <div
          key={project.id}
          // hidden={project.id !== activeProjectId}
          className='w-full max-w-[875px] lg:max-w-[400px]'
        >
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
  );
};
