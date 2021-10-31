import { FC } from "react";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";
import { Prism } from "react-syntax-highlighter";
import codeBlockStyle from "styles/codeBlockStyle";
import styles from "./paragraph.module.css";

interface ParagraphProps {
  className?: string;
  text: string;
}

const Paragraph: FC<ParagraphProps> = ({ className, text }) => {
  return (
    <ReactMarkdown
      className={classNames(className, "secondaryText")}
      components={{
        code({ node, inline, className, children, ref, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <Prism
              useInlineStyles
              children={children}
              style={codeBlockStyle}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={classNames(className, styles.code)} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export default Paragraph;
