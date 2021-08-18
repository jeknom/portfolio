import { FC, Fragment } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Title, Divider } from "../../Core";
import { getShortDateOr } from "utils";
import { DATE_NULL_REPLACEMENT } from "utils/constants";
import styles from "./Achievements.module.css";

interface AchievementProps {
  className?: string;
  recentAchievements: Achievement[];
}

const AMOUNT_TO_SHOW = 4;

const Achievements: FC<AchievementProps> = ({
  recentAchievements,
  className,
  ...rest
}) => {
  if (!recentAchievements) {
    return <p className="subtitle">Loading...</p>;
  }

  const actualAmountToShow = Math.min(
    recentAchievements.length,
    AMOUNT_TO_SHOW
  );
  const renderAchievements = recentAchievements
    .slice(0, actualAmountToShow)
    .map((a) => (
      <Fragment key={a.title + a.subtitle + a.endDate}>
        <div className={styles.achievement}>
          <span className={styles.info}>
            <p className="subtitle">{a.title}</p>
            <span className="secondaryText">{a.subtitle}</span>
            <span className="secondaryText">
              {getShortDateOr(a.startDate, DATE_NULL_REPLACEMENT)} -{" "}
              {getShortDateOr(a.endDate, DATE_NULL_REPLACEMENT)}
            </span>
          </span>
          <Image
            className={styles.achievementImage}
            src={a.imageUrl}
            alt={`${a.title} image.`}
            width="75"
            height="75"
          />
        </div>
        <br />
      </Fragment>
    ));

  return (
    <section {...rest} className={classNames(className, "fullWidth")}>
      <Title text="Experience" />
      <Divider />
      {renderAchievements}
    </section>
  );
};

export default Achievements;
