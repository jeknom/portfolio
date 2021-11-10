import { FC } from "react";
import classNames from "classnames";
import styles from "./toggle.module.css";

interface ToggleProps {
  label?: string;
  enabled: boolean;
  onToggle: (newValue: boolean) => void;
}

const Toggle: FC<ToggleProps> = ({ enabled, onToggle, label }) => {
  const backgroundColor = enabled ? styles.onColor : styles.offColor;
  const handleToggle = () => onToggle(!enabled);

  return (
    <div className={styles.toggleRoot}>
      <div
        className={classNames(styles.background, backgroundColor)}
        onClick={handleToggle}
      >
        <div className={enabled ? styles.empty : styles.switch} />
        <div className={enabled ? styles.switch : styles.empty} />
      </div>
      {label && <p className="captionText">{label}</p>}
    </div>
  );
};

export default Toggle;
