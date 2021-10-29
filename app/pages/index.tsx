import React, { FC } from "react";
import { Head, VerticalLayout, NavBar } from "../components/Core";
import {
  Header,
  Intro,
  Skills,
  Achievements,
  Highlights,
  ContactInformation as Contact,
} from "../components/Home";
import styles from "@styles/Home.module.css";
import { fetchMaintainer } from "@endpoints/maintainer";
import { fetchOpenGraphData } from "server/endpoints/openGraphData";
import { fetchRecentAchievements } from "@endpoints/achievements";
import { fetchRecentHighlights } from "@endpoints/highlights";
import { fetchAllSkills } from "@endpoints/skills";
import { fetchAllContactInformation } from "@endpoints/contactInformation";
import { ContactInformation } from "@prisma/client";
import prisma from "../server/prismaClient";
import mainRoutes from "@constants/mainNavBarRoutes";
import { HOME_ROUTE } from "@constants/mainRoutes";
import classNames from "classnames";

interface HomeProps {
  maintainer?: Maintainer;
  openGraphData?: OpenGraphData;
  recentAchievements?: Achievement[];
  recentHighlights?: Highlight[];
  skills?: Skill[];
  contactInformation?: ContactInformation[];
}

const Home: FC<HomeProps> = ({
  maintainer,
  openGraphData,
  recentAchievements,
  recentHighlights,
  skills,
  contactInformation,
}) => {
  const { name, headline, imageUrl, bio } = maintainer;
  const { title, type, description } = openGraphData;

  return (
    <>
      <Head
        title={title}
        type={type}
        description={description}
        imagePath={openGraphData.imageUrl}
      />
      <VerticalLayout className={styles.homeRoot} alignItems="center">
        <Header
          className={styles.section}
          name={name}
          headline={headline}
          image={imageUrl}
        />
        <VerticalLayout
          className={classNames(styles.section, styles.navBar)}
          alignItems="center"
        >
          <NavBar selectedRoute={HOME_ROUTE} routes={mainRoutes} />
        </VerticalLayout>
        <Intro className={styles.section} bio={bio} />
        <Highlights
          className={styles.section}
          recentHighlights={recentHighlights}
        />
        <Skills className={styles.section} skills={skills} />
        <Achievements
          className={styles.section}
          recentAchievements={recentAchievements}
        />
        <footer>
          <Contact information={contactInformation} />
        </footer>
      </VerticalLayout>
    </>
  );
};

export async function getServerSideProps() {
  const result = await Promise.all([
    fetchMaintainer(prisma),
    fetchRecentAchievements(prisma),
    fetchRecentHighlights(prisma),
    fetchOpenGraphData(prisma),
    fetchAllSkills(prisma),
    fetchAllContactInformation(prisma),
  ]);

  return {
    props: {
      maintainer: result[0],
      recentAchievements: result[1],
      recentHighlights: result[2],
      openGraphData: result[3],
      skills: result[4],
      contactInformation: result[5],
    },
  };
}

export default Home;
