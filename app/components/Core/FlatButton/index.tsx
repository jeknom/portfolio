import { FC, ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./FlatButton.module.css";

interface FlatButtonProps {
  className?: string;
}

const FlatButton: FC<
  FlatButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...rest }) => {
  return (
    <button className={classNames(styles.flatButton, className)} {...rest}>
      <span className={styles.child}>{children}</span>
    </button>
  );
};

export default FlatButton;
