import React, { FC, Children, ReactNode } from "react";
import VerticalLayout from "../VerticalLayout";
import CarouselNavigation from "./CarouselNavigation";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children?: ReactNode;
  currentIndex: number;
  onChangeIndex: (index: number) => void;
}

const Carousel: FC<CarouselProps> = ({
  children,
  currentIndex,
  onChangeIndex,
}) => {
  const childrenCount = Children.count(children);
  const mappedChildren = Children.map(children, (c, i) => (
    <div key={i}>{c}</div>
  ));

  return (
    <VerticalLayout alignItems="center" className={styles.container}>
      <VerticalLayout className="fullWidth">
        {mappedChildren[currentIndex]}
      </VerticalLayout>
      <CarouselNavigation
        index={currentIndex}
        count={childrenCount}
        onChangeIndex={onChangeIndex}
      />
    </VerticalLayout>
  );
};

export default Carousel;
