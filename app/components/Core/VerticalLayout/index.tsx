import { FC, HTMLProps } from "react";
import styles from "./VerticalLayout.module.css";
import classNames from "classnames";

interface VerticalLayoutProps extends HTMLProps<HTMLDivElement> {
  children: any;
  className?: any;
  style?: object;
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

const VerticalLayout: FC<VerticalLayoutProps> = ({
  children,
  className,
  alignItems = "stretch",
  justifyContent = "space-between",
  gap,
  ...rest
}) => {
  return (
    <>
      <div {...rest} className={classNames(styles.layout, className)}>
        {children}
      </div>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          gap: ${gap}px;
        }
      `}</style>
    </>
  );
};

export default VerticalLayout;
