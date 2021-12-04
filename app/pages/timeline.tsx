import React, { FC } from "react";
import { Head, NavBar, Contact } from "../components/Core";
import { Timeline as TimelineComponent } from "../components/Timeline";
import { fetchOpenGraphData } from "server/endpoints/openGraphData";
import { fetchAllAchievements } from "@endpoints/achievements";
import { fetchAllHighlights } from "@endpoints/highlights";
import prisma from "../server/prismaClient";
import { TIMELINE } from "@constants/routes";
import mainRoutes from "@constants/mainNavBarRoutes";
import { fetchAllProjects } from "@endpoints/projects";
import { fetchAllContactInformation } from "@endpoints/contactInformation";

interface TimelineProps {
  achievements?: Achievement[];
  highlights?: Highlight[];
  projects?: Project[];
  minYear?: number;
  openGraphData?: OpenGraphData;
  contactInformation: ContactInformation[];
}

const Timeline: FC<TimelineProps> = ({
  openGraphData,
  achievements,
  highlights,
  projects,
  contactInformation,
  minYear,
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
        minYear={minYear}
      />
      <Contact information={contactInformation} />
    </>
  );
};

export async function getServerSideProps() {
  try {
    const [
      openGraphData,
      achievements,
      highlights,
      projects,
      contactInformation,
    ] = await Promise.all([
      fetchOpenGraphData(prisma),
      fetchAllAchievements(prisma),
      fetchAllHighlights(prisma),
      fetchAllProjects(prisma),
      fetchAllContactInformation(prisma),
    ]);

    const achievementsLength = achievements.length;
    let achievementsMinYear = 2010;
    if (achievementsLength > 0) {
      achievementsMinYear = new Date(
        achievements[achievementsLength - 1]?.startDate
      ).getFullYear();
    }

    const highlightsLength = highlights.length;
    let highlightsMinYear = 2010;
    if (highlightsLength > 0) {
      highlightsMinYear = new Date(
        highlights[highlightsLength - 1].date
      ).getFullYear();
    }

    const projectsLength = projects.length;
    let projectsMinYear = 2010;
    if (projectsLength > 0) {
      projectsMinYear = new Date(
        projects[projectsLength - 1].date
      ).getFullYear();
    }

    const minYear = Math.min(
      achievementsMinYear,
      highlightsMinYear,
      projectsMinYear
    );

    return {
      props: {
        openGraphData,
        achievements,
        highlights,
        projects,
        minYear,
        contactInformation,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default Timeline;
