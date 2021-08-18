import { FC } from "react";
import classNames from "classnames";
import Skill from "./Skill";
import { Title, Divider, ResponsiveLayoutGrid } from "../../Core";
import { fetchAllSkills } from "server/endpoints/skills";
import { Skills as SkillsModel, Images } from "@prisma/client";

interface SkillsProps {
  skills?: Skill[];
  className?: string;
}

const Skills: FC<SkillsProps> = ({ skills, className, ...rest }) => {
  if (!skills) {
    return <p className="subtitle">Loading...</p>;
  }

  const renderSkills = skills.map((s, index) => (
    <Skill key={index} name={s.name} imageUrl={s.imageUrl} />
  ));

  return (
    <section {...rest} className={classNames(className, "fullWidth")}>
      <Title text="Skills" />
      <Divider />
      <ResponsiveLayoutGrid>{renderSkills}</ResponsiveLayoutGrid>
    </section>
  );
};

export default Skills;
