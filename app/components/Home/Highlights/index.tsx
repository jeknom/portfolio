import React, { FC } from "react";
import classNames from "classnames";
import { Title, Divider, Carousel } from "../../Core";
import Highlight from "./Highlight";

interface HighlightsProps {
  recentHighlights?: Highlight[];
  className?: string;
}

const Highlights: FC<HighlightsProps> = ({
  recentHighlights,
  className,
  ...rest
}) => {
  if (!recentHighlights) {
    return <p className="subtitle">Loading...</p>;
  }

  const renderHighlights = recentHighlights.map((h, index) => (
    <Highlight
      key={index}
      title={h.name}
      description={h.description}
      image={h.imageUrl}
    />
  ));

  renderHighlights.push(
    <Highlight
      key={"seemore"}
      title="Wish to see more?"
      description="Check out my full story at the bottom of the page!"
      image={null}
    />
  );

  return (
    <section {...rest} className={classNames(className, "fullWidth")}>
      <Title text="Highlights" />
      <Divider />
      <Carousel>{renderHighlights}</Carousel>
    </section>
  );
};

export default Highlights;
