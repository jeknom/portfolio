import { FC, HTMLProps } from "react";
import classNames from "classnames";
import styles from "./textField.module.css";

interface TextFieldProps {}

const TextField: FC<TextFieldProps & HTMLProps<HTMLInputElement>> = ({
  className,
  ...rest
}) => {
  return <input {...rest} className={classNames(className, styles.input)} />;
};

export default TextField;
