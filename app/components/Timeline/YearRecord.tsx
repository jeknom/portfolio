import { FC } from "react";
import AchievementItem from "./AchievementItem";
import SmallItem from "./SmallItem";

export interface YearRecordProps {
  year?: number;
  achievements?: Achievement[];
  highlights?: Highlight[];
  projects?: Project[];
  onProjectSelected: (project: Project) => void;
}

const YearRecord: FC<YearRecordProps> = ({
  year,
  achievements,
  highlights,
  projects,
  onProjectSelected,
}) => {
  if (
    achievements?.length === 0 &&
    highlights?.length === 0 &&
    projects?.length === 0
  ) {
    return null;
  }

  const renderAchievements = achievements?.map((a, i) => (
    <AchievementItem key={i} achievement={a} />
  ));

  const renderProjects = projects?.map((p, i) => (
    <SmallItem
      key={i}
      title={p.name}
      description={p.description}
      action={{
        label: "Learn more",
        onItemClick: () => onProjectSelected(p),
      }}
    />
  ));

  const renderHighlights = highlights?.map((h, i) => (
    <SmallItem key={i} title={h.name} description={h.description} />
  ));

  return (
    <div className="fullWidth">
      <p>{year}</p>
      {renderAchievements}
      {renderProjects}
      {renderHighlights}
    </div>
  );
};

export default YearRecord;
