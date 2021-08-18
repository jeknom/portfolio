import { Fragment, FC } from "react";
import { VerticalLine } from "../Core";
import styles from "./Timeline.module.css";
import YearRecord from "./YearRecord";

interface TimelineProps {
  achievements?: Achievement[];
  highlights?: Highlight[];
  minYear?: number;
}

const Timeline: FC<TimelineProps> = ({
  achievements,
  highlights,
  minYear = 2010,
}) => {
  const renderTimeline = () => {
    const yearRecords = [];
    const currentYear = new Date().getFullYear();
    const lastYearToRender = currentYear - (currentYear - minYear);

    for (let i = currentYear; i >= lastYearToRender; i--) {
      const isSameYear = (date: string | number | Date, year: number) =>
        new Date(date).getFullYear() === year;
      const yearsAchievements = achievements?.filter((a) =>
        isSameYear(a.startDate, i)
      );
      const yearsHighlights = highlights?.filter((h) => isSameYear(h.date, i));
      const componentToRender = (
        <Fragment key={i}>
          {i !== currentYear && i !== lastYearToRender + 1 ? (
            <VerticalLine height={8} />
          ) : null}
          <YearRecord
            key={i}
            year={i}
            achievements={yearsAchievements}
            highlights={yearsHighlights}
          />
        </Fragment>
      );

      yearRecords.push(componentToRender);
    }

    return <div className={styles.timelineContent}>{yearRecords}</div>;
  };

  return <section className="fullWidth">{renderTimeline()}</section>;
};

export default Timeline;
