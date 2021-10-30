import React, { FC } from "react";
import Image from "next/image";
import { HorizontalLayout, VerticalLayout } from "../Core";
import { DATE_NULL_REPLACEMENT } from "@constants/index";
import styles from "./Timeline.module.css";
import { getShortDateOr } from "utils";

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: FC<AchievementItemProps> = ({ achievement }) => {
  return (
    <HorizontalLayout
      key={achievement.title + achievement.startDate}
      className="fullWidth"
    >
      <VerticalLayout className={styles.entry}>
        <span className="primaryText">{achievement.title}</span>
        <span className="secondaryText">{achievement.subtitle}</span>
        <span className="captionText">{`${getShortDateOr(
          achievement.startDate,
          DATE_NULL_REPLACEMENT
        )} - ${getShortDateOr(
          achievement.endDate,
          DATE_NULL_REPLACEMENT
        )}`}</span>
      </VerticalLayout>
      <Image
        className={styles.achievementImage}
        width="75"
        height="75"
        src={achievement?.imageUrl || ""}
        alt={`${achievement?.title} image.`}
        layout="fixed"
      />
    </HorizontalLayout>
  );
};

export default AchievementItem;
