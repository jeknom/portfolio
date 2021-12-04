import { FC, useState } from "react";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import { Contact, Head, NavBar } from "components/Core";
import { GridMenu, GridMenuItem } from "components/Core";
import { ProjectDialog } from "components/Projects";
import { fetchAllProjects } from "@endpoints/projects";
import mainRoutes from "@constants/mainNavBarRoutes";
import { PROJECTS } from "@constants/routes";
import { fetchAllContactInformation } from "@endpoints/contactInformation";

interface ProjectsProps {
  openGraphData: OpenGraphData;
  projects: Project[];
  contactInformation: ContactInformation[];
}

const Projects: FC<ProjectsProps> = ({
  openGraphData,
  projects,
  contactInformation,
}) => {
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
      <NavBar selectedRoute={PROJECTS} routes={mainRoutes} />
      <GridMenu>{projectItems}</GridMenu>
      <ProjectDialog
        title={selectedProject?.name || ""}
        open={selectedProject !== null}
        selectedProject={selectedProject}
        onClose={handleCloseSelectedProjectDialog}
      />
      <Contact information={contactInformation} />
    </>
  );
};

export async function getServerSideProps() {
  try {
    const [openGraphData, projects, contactInformation] = await Promise.all([
      fetchOpenGraphData(prisma),
      fetchAllProjects(prisma),
      fetchAllContactInformation(prisma),
    ]);

    return {
      props: {
        openGraphData,
        projects,
        contactInformation,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default Projects;
