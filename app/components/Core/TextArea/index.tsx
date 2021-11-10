import { FC, HTMLProps } from "react";

interface TextAreaProps {}

const TextArea: FC<TextAreaProps & HTMLProps<HTMLTextAreaElement>> = ({
  ...rest
}) => {
  return <textarea {...rest} />;
};

export default TextArea;
