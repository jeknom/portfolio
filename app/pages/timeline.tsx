import React, { FC } from "react";
import { Head, NavBar } from "../components/Core";
import { Timeline as TimelineComponent } from "../components/Timeline";
import { fetchOpenGraphData } from "server/endpoints/openGraphData";
import { fetchAllAchievements } from "@endpoints/achievements";
import { fetchAllHighlights } from "@endpoints/highlights";
import prisma from "../server/prismaClient";
import { TIMELINE } from "@constants/routes";
import mainRoutes from "@constants/mainNavBarRoutes";
import { fetchAllProjects } from "@endpoints/projects";

interface TimelineProps {
  achievements?: Achievement[];
  highlights?: Highlight[];
  projects?: Project[];
  minYear?: number;
  openGraphData?: OpenGraphData;
}

const Timeline: FC<TimelineProps> = ({
  openGraphData,
  achievements,
  highlights,
  projects,
}) => {
  const { title, description, type, imageUrl } = openGraphData;

  return (
    <>
      <Head
        title={title}
        description={description}
        type={type}
        imagePath={imageUrl}
      />
      <NavBar selectedRoute={TIMELINE} routes={mainRoutes} />
      <TimelineComponent
        highlights={highlights}
        achievements={achievements}
        projects={projects}
      />
    </>
  );
};

export async function getServerSideProps() {
  try {
    const [openGraphData, achievements, highlights, projects] =
      await Promise.all([
        fetchOpenGraphData(prisma),
        fetchAllAchievements(prisma),
        fetchAllHighlights(prisma),
        fetchAllProjects(prisma),
      ]);

    return {
      props: {
        openGraphData,
        achievements,
        highlights,
        projects,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default Timeline;
