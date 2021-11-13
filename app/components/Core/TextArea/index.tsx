import { FC, HTMLProps } from "react";
import classNames from "classnames";
import styles from "./textArea.module.css";

interface TextAreaProps {}

const TextArea: FC<TextAreaProps & HTMLProps<HTMLTextAreaElement>> = ({
  className,
  ...rest
}) => {
  return (
    <textarea {...rest} className={classNames(className, styles.textArea)} />
  );
};

export default TextArea;
