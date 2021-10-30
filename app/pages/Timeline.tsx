import React, { FC } from "react";
import { Head, NavBar, VerticalLayout } from "../components/Core";
import { Timeline as TimelineComponent } from "../components/Timeline";
import { fetchOpenGraphData } from "server/endpoints/openGraphData";
import { fetchAllAchievements } from "@endpoints/achievements";
import { fetchAllHighlights } from "@endpoints/highlights";
import prisma from "../server/prismaClient";
import { TIMELINE_ROUTE } from "@constants/mainRoutes";
import mainRoutes from "@constants/mainNavBarRoutes";
import { fetchAllProjects } from "@endpoints/projects";
import styles from "../styles/Timeline.module.css";

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
      <VerticalLayout className={styles.timelineRoot} alignItems="center">
        <NavBar selectedRoute={TIMELINE_ROUTE} routes={mainRoutes} />
        <TimelineComponent
          highlights={highlights}
          achievements={achievements}
          projects={projects}
        />
      </VerticalLayout>
    </>
  );
};

export async function getServerSideProps() {
  const openGraphData = await fetchOpenGraphData(prisma);
  const achievements = await fetchAllAchievements(prisma);
  const highlights = await fetchAllHighlights(prisma);
  const projects = await fetchAllProjects(prisma);

  return {
    props: {
      openGraphData,
      achievements,
      highlights,
      projects,
    },
  };
}

export default Timeline;
