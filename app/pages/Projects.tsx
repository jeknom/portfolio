import { FC, useState } from "react";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import { Head } from "components/Core";
import { GridMenu, GridMenuItem, Dialog } from "components/Core";
import styles from "../styles/Projects.module.css";

interface ProjectsProps {
  openGraphData: OpenGraphData;
}

const templateData: Project[] = [
  {
    name: "Portfolio",
    description:
      "This portfolio. I made it mainly with Next.js and Typescript.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
  },
  {
    name: "Best Fiends: Stars",
    description: "Match 3 mobile puzzle game.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
  },
  {
    name: "Seriously dashboard",
    description: "Match 3 mobile puzzle game.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
  },
  {
    name: "Best Fiends",
    description: "Match 3 mobile puzzle game.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
  },
  {
    name: "TeamSpeak 3 server",
    description:
      "I've hosted a TeamSpeak server for my friends for over 10 years. It's running on an Ubuntu VPS.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
  },
];

const Projects: FC<ProjectsProps> = ({ openGraphData }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleCloseSelectedProjectDialog = () => setSelectedProject(null);

  const { title, description, type, imageUrl } = openGraphData;
  const projects = templateData.map((d, i) => (
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
        <GridMenu>{projects}</GridMenu>
      </div>
      <Dialog
        title={selectedProject?.name || ""}
        open={selectedProject !== null}
        onClose={handleCloseSelectedProjectDialog}
      >
        <p className="secondaryText">Test text</p>
      </Dialog>
    </>
  );
};

export async function getServerSideProps() {
  const openGraphData = await fetchOpenGraphData(prisma);

  return {
    props: {
      openGraphData,
    },
  };
}

export default Projects;
