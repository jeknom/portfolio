import { FC } from "react";
import styles from "./GridMenu.module.css";

interface GridMenuProps {}

const GridMenu: FC<GridMenuProps> = ({ children }) => {
  return (
    <>
      <div className={styles.gridMenuRoot}>{children}</div>
    </>
  );
};

export default GridMenu;
