import { FC } from "react";
import classNames from "classnames";
import Image from "next/image";

interface AlertProps {
  type: "info" | "warning" | "error";
}

const Alert: FC<AlertProps> = ({ type, children }) => {
  const svg =
    type === "error"
      ? "/error.svg"
      : type === "warning"
      ? "/warning.svg"
      : "/info.svg";
  const icon = <Image src={svg} width={16} height={16} />;
  return (
    <>
      <div className={classNames("fullWidth", "alert", "secondaryText")}>
        {icon}
        {children}
      </div>
      <style jsx>{`
        .alert {
          display: flex;
          flexdirection: row;
          gap: 8px;
          border: 1px solid black;
          border-radius: 8px;
          padding: 6px;
          border-color: ${type === "error"
            ? "#ff5959"
            : type === "warning"
            ? "#ffa700"
            : "#00abff"};
          box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,
            rgba(17, 17, 26, 0.05) 0px 8px 32px;
        }
      `}</style>
    </>
  );
};

export default Alert;
