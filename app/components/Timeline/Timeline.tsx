import { Fragment, FC, useState, useCallback } from "react";
import { VerticalLine } from "../Core";
import { ProjectDialog } from "components/Projects";
import YearRecord from "./YearRecord";
import styles from "./Timeline.module.css";

interface TimelineProps {
  achievements?: Achievement[];
  highlights?: Highlight[];
  projects?: Project[];
  minYear?: number;
}

const isSameYear = (date: string | number | Date, year: number) =>
  new Date(date).getFullYear() === year;

const Timeline: FC<TimelineProps> = ({
  achievements,
  highlights,
  projects,
  minYear = 2010,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleCloseProjectDialog = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const renderTimeline = () => {
    const yearRecords = [];
    const currentYear = new Date().getFullYear();
    const lastYearToRender = currentYear - (currentYear - minYear);

    for (let i = currentYear; i >= lastYearToRender; i--) {
      const yearsAchievements = achievements?.filter((a) =>
        isSameYear(a.startDate, i)
      );
      const yearsHighlights = highlights?.filter((h) => isSameYear(h.date, i));
      const yearsProjects = projects?.filter((p) => isSameYear(p.date, i));

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
            projects={yearsProjects}
            onProjectSelected={setSelectedProject}
          />
        </Fragment>
      );

      yearRecords.push(componentToRender);
    }

    return (
      <div className={styles.timelineContent}>
        {yearRecords}
        <ProjectDialog
          title={selectedProject?.name || ""}
          open={selectedProject !== null}
          onClose={handleCloseProjectDialog}
          selectedProject={selectedProject}
        />
      </div>
    );
  };

  return <section className="fullWidth">{renderTimeline()}</section>;
};

export default Timeline;
