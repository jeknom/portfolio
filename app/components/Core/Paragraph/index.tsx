import { FC } from "react";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";
import { Prism } from "react-syntax-highlighter";
import codeBlockStyle from "styles/codeBlockStyle";
import styles from "./paragraph.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import { MOBILE_SIZE } from "@constants/index";

interface ParagraphProps {
  className?: string;
  text: string;
}

const Paragraph: FC<ParagraphProps> = ({ className, text }) => {
  const { width } = useWindowDimensions();

  return (
    <ReactMarkdown
      className={classNames(className, "secondaryText")}
      components={{
        code({ node, inline, className, children, ref, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <Prism
              lineProps={{
                style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
              }}
              wrapLines={true}
              useInlineStyles
              children={children}
              style={codeBlockStyle}
              customStyle={{
                fontSize: width <= MOBILE_SIZE ? "0.5rem" : "1rem",
              }}
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
