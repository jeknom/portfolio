import { FC } from "react";
import { VerticalLayout, Paragraph } from "components/Core";

interface PreviewProps {
  titleText: string;
  contentText: string;
}

const Preview: FC<PreviewProps> = ({ titleText, contentText }) => {
  const titleElement =
    titleText === "" ? (
      <p className="primaryText">No title</p>
    ) : (
      <p className="primaryText">{titleText}</p>
    );
  const contentElement =
    contentText === "" ? (
      <p className="secondaryText">No content to show here</p>
    ) : (
      <Paragraph text={contentText} />
    );

  return (
    <VerticalLayout alignItems="center">
      {titleElement}
      {contentElement}
    </VerticalLayout>
  );
};

export default Preview;
