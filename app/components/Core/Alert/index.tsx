import { FC } from "react";
import classNames from "classnames";

interface AlertProps {
  type: "info" | "warning" | "error";
}

const Alert: FC<AlertProps> = ({ type, children }) => {
  return (
    <>
      <div className={classNames("fullWidth", "alert")}>{children}</div>
      <style jsx>{`
        .alert {
          border: 1px solid black;
          border-radius: 8px;
          padding: 6px;
          background-color: ${type === "error"
            ? "red"
            : type === "warning"
            ? "yellow"
            : "blue"};
          color: white;
        }
      `}</style>
    </>
  );
};

export default Alert;
