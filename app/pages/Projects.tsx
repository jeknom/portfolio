import { FC } from "react";
import Image from "next/image";
import prisma from "server/prismaClient";
import { fetchOpenGraphData } from "@endpoints/openGraphData";
import { Head } from "components/Core";
import { List, ListItem } from "components/Core";

interface ProjectsProps {
  openGraphData: OpenGraphData;
}

const templateData: Project[] = [
  {
    name: "Best Fiends Stars",
    description:
      "Fun game where you loerm ipsum loerm ipsum loerm ipsum loerm ipsum loerm ipsum loerm ipsum loerm ipsum",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
  },
  {
    name: "Best Fiends",
    description:
      "Fun game where you loerm ipsum loerm ipsum loerm ipsum loerm ipsum loerm ipsum loerm ipsum loerm ipsum",
    imageUrl: "https://i.imgur.com/8Pcp9mi.gif",
  },
];

const Projects: FC<ProjectsProps> = ({ openGraphData }) => {
  const { title, description, type, imageUrl } = openGraphData;
  const projects = templateData.map((d) => (
    <ListItem
      icon={
        <Image
          layout="fixed"
          src={d.imageUrl}
          alt={`${d.name} project image`}
          height={92}
          width={92}
        />
      }
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
      <List>{projects}</List>
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
