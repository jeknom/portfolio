import { FC, useState } from "react";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import { Head } from "components/Core";
import { GridMenu, GridMenuItem, Dialog, Paragraph } from "components/Core";
import { MediaCarousel } from "components/Projects";
import styles from "../styles/Projects.module.css";
import { fetchAllProjects } from "@endpoints/projects";

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
      <div className={styles.projectsRoot}>
        <GridMenu>{projectItems}</GridMenu>
      </div>
      <Dialog
        title={selectedProject?.name || ""}
        open={selectedProject !== null}
        onClose={handleCloseSelectedProjectDialog}
        contentProps={{
          className: styles.dialogContent,
        }}
      >
        <MediaCarousel project={selectedProject} />
        <Paragraph
          className={styles.paragraph}
          text={selectedProject?.content}
        />
      </Dialog>
    </>
  );
};

export async function getServerSideProps() {
  const openGraphData = await fetchOpenGraphData(prisma);
  const projects = await fetchAllProjects(prisma);

  return {
    props: {
      openGraphData,
      projects,
    },
  };
}

export default Projects;
