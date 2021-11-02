import { FC, useState } from "react";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import { Head, NavBar, VerticalLayout } from "components/Core";
import { GridMenu, GridMenuItem } from "components/Core";
import { ProjectDialog } from "components/Projects";
import { fetchAllProjects } from "@endpoints/projects";
import mainRoutes from "@constants/mainNavBarRoutes";
import { PROJECTS_ROUTE } from "@constants/mainRoutes";
import styles from "../styles/Projects.module.css";

interface ProjectsProps {
  openGraphData: OpenGraphData;
  projects: Project[];
}

const Projects: FC<ProjectsProps> = ({ openGraphData, projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleCloseSelectedProjectDialog = () => setSelectedProject(null);

  const { title, description, type, imageUrl } = openGraphData;
  const projectItems = (projects || []).map((d, i) => (
    <GridMenuItem
      key={i}
      onClick={() => setSelectedProject(d)}
      imageUrl={d.imageUrl}
      primary={d.name}
      secondary={d.description}
    />
  ));

  return (
    <>
      <Head
        title={title}
        description={description}
        type={type}
        imagePath={imageUrl}
      />
      <VerticalLayout gap={32} alignItems="center">
        <NavBar selectedRoute={PROJECTS_ROUTE} routes={mainRoutes} />
        <GridMenu>{projectItems}</GridMenu>
      </VerticalLayout>
      <ProjectDialog
        title={selectedProject?.name || ""}
        open={selectedProject !== null}
        selectedProject={selectedProject}
        onClose={handleCloseSelectedProjectDialog}
      />
    </>
  );
};

export async function getServerSideProps() {
  const [openGraphData, projects] = await Promise.all([
    fetchOpenGraphData(prisma),
    fetchAllProjects(prisma),
  ]);

  return {
    props: {
      openGraphData,
      projects,
    },
  };
}

export default Projects;
