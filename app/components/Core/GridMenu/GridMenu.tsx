import { FC, HTMLProps } from "react";
import classNames from "classnames";
import styles from "./GridMenu.module.css";

interface GridMenuProps {}

const GridMenu: FC<GridMenuProps & HTMLProps<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <>
      <div {...rest} className={classNames(styles.gridMenuRoot, className)}>
        {children}
      </div>
    </>
  );
};

export default GridMenu;
