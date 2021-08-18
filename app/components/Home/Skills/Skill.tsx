import { FC } from "react";
import Image from "next/image";
import styles from "./skill.module.css";

interface SkillProps {
  name: string;
  imageUrl: string;
}

const Skill: FC<SkillProps> = ({ name, imageUrl }) => {
  return (
    <div className={styles.root}>
      <span>
        <p className={styles.title}>
          <span className="subtitle">{name}</span>
        </p>
      </span>
      <span className={styles.rank}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${name} icon`}
            height="32"
            width="32"
            priority
          />
        )}
      </span>
    </div>
  );
};

export default Skill;
