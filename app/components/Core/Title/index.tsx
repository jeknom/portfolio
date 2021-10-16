import { FC, HTMLProps } from "react";

interface TitleProps {
  text: string;
}

const Title: FC<TitleProps & HTMLProps<HTMLHeadingElement>> = ({
  text,
  ...rest
}) => {
  return (
    <h3 {...rest} className="primaryText">
      {text}
    </h3>
  );
};

export default Title;
