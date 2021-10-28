import { FC } from "react";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";

interface ParagraphProps {
  className?: string;
  text: string;
}

const Paragraph: FC<ParagraphProps> = ({ className, text }) => {
  return (
    <ReactMarkdown className={classNames(className, "secondaryText")}>
      {text}
    </ReactMarkdown>
  );
};

export default Paragraph;
