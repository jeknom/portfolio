import { FC, useState } from "react";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import { Head } from "components/Core";
import { GridMenu, GridMenuItem, Dialog, Paragraph } from "components/Core";
import { MediaCarousel } from "components/Projects";
import styles from "../styles/Projects.module.css";

interface ProjectsProps {
  openGraphData: OpenGraphData;
}

const templateData: Project[] = [
  {
    name: "Portfolio",
    description: "This portfolio. I made it mainly with Typescript Next.js.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
    content:
      "Lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum \n\n ![Dog](https://i.imgur.com/qe4Xp0R.jpeg) terbe",
    media: [
      {
        type: "youtubeVideo",
        url: "https://www.youtube.com/embed/toZW65rksYY",
      },
      {
        type: "image",
        url: "https://i.imgur.com/ot2lCVl.png",
      },
    ],
  },
  {
    name: "Best Fiends: Stars",
    description: "Match 3 mobile puzzle game.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
    content:
      "Lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum",
    media: [],
  },
  {
    name: "Seriously dashboard",
    description:
      "The company dashboard that provides a variety of tools for most disciplines of the company.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
    content:
      "Lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum",
    media: [],
  },
  {
    name: "Best Fiends",
    description: "Match 3 mobile puzzle game.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
    content:
      "Lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum",
    media: [],
  },
  {
    name: "TeamSpeak 3 hosting",
    description:
      "I've hosted a TeamSpeak server for my friends for over 10 years. It's running on an Ubuntu VPS.",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
    content:
      "Lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum, lorem lorem ipssssuuuuum, lorem ipsum",
    media: [],
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
        contentProps={{
          className: styles.dialogContent,
        }}
      >
        <MediaCarousel project={selectedProject} />
        <Paragraph text={selectedProject?.content} />
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
