import { FC, HTMLProps } from "react";
import classNames from "classnames";
import styles from "./root.module.css";

interface RootProps {
  flexDirection?: "column" | "row";
  alignItems?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "initial"
    | "inherit";
  gap?: number;
}

const Root: FC<RootProps & HTMLProps<HTMLDivElement>> = ({
  className,
  children,
  flexDirection = "column",
  alignItems = "stretch",
  justifyContent = "initial",
  gap = 0,
  ...rest
}) => {
  return (
    <>
      <div {...rest} className={classNames(className, styles.root, "dynamic")}>
        {children}
      </div>
      <style jsx>{`
        .dynamic {
          align-items: ${alignItems};
          flex-direction: ${flexDirection};
          justify-content: ${justifyContent};
          gap: ${gap}px;
        }
      `}</style>
    </>
  );
};

export default Root;
