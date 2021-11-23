import { FC, HTMLProps } from "react";
import classNames from "classnames";
import styles from "./textField.module.css";

interface TextFieldProps {}

const TextField: FC<TextFieldProps & HTMLProps<HTMLInputElement>> = ({
  className,
  label,
  ...rest
}) => {
  return (
    <div className="fullWidth">
      {label && <p className="secondaryText">{label}</p>}
      <input {...rest} className={classNames(className, styles.input)} />
    </div>
  );
};

export default TextField;
