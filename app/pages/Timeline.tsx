import { FC } from "react";
import Image from "next/image";
import { Head, FlatButton } from "../components/Core";
import TimelineComponent from "../components/Timeline";
import styles from "../styles/Timeline.module.css";
import { fetchOpenGraphData } from "server/endpoints/openGraphData";
import { fetchAllAchievements } from "@endpoints/achievements";
import { fetchAllHighlights } from "@endpoints/highlights";
import prisma from "../server/prismaClient";

interface TimelineProps {
  achievements?: Achievement[];
  highlights?: Highlight[];
  minYear?: number;
  openGraphData?: OpenGraphData;
}

const Timeline: FC<TimelineProps> = ({
  openGraphData,
  achievements,
  highlights,
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
      <div className="scaledBodyRoot">
        <a href="/">
          <FlatButton className={styles.closeButton}>
            <Image
              src="/x.svg"
              alt="Close button X"
              width="64"
              height="64"
              priority
            />
          </FlatButton>
        </a>
        <TimelineComponent
          highlights={highlights}
          achievements={achievements}
        />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const openGraphData = await fetchOpenGraphData(prisma);
  const achievements = await fetchAllAchievements(prisma);
  const highlights = await fetchAllHighlights(prisma);

  return {
    props: {
      openGraphData,
      achievements,
      highlights,
    },
  };
}

export default Timeline;
