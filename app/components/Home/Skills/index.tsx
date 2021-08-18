import { FC } from "react";
import classNames from "classnames";
import Skill from "./Skill";
import { Title, Divider, ResponsiveLayoutGrid } from "../../Core";

interface SkillsProps {
  skills: SkillData[];
  className?: string;
}

const Skills: FC<SkillsProps> = ({ skills, className, ...rest }) => {
  const renderSkills = skills.map((s, index) => (
    <Skill key={index} name={s.name} score={s.score} imageUrl={s.imageUrl} />
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
