import React, { FC, HTMLProps } from "react";

interface HorizontalLayoutProps extends HTMLProps<HTMLDivElement> {
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

const HorizontalLayout: FC<HorizontalLayoutProps> = ({
  children,
  alignItems = "stretch",
  justifyContent = "space-between",
  gap = 0,
  ...rest
}) => {
  return (
    <>
      <div {...rest}>{children}</div>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: row;
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          gap: ${gap}px;
        }
      `}</style>
    </>
  );
};

export default HorizontalLayout;
