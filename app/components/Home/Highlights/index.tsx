import React, { FC, useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);

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
      description="Check out my projects and the Timeline!"
      image={null}
    />
  );

  return (
    <section {...rest} className={classNames(className, "fullWidth")}>
      <Title text="Highlights" />
      <Divider />
      <Carousel currentIndex={currentIndex} onChangeIndex={setCurrentIndex}>
        {renderHighlights}
      </Carousel>
    </section>
  );
};

export default Highlights;
