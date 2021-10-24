import React, { FC, useState, Children } from "react";
import Image from "next/image";
import { FlatButton, VerticalLayout, HorizontalLayout } from "../";
import styles from "./Carousel.module.css";

interface CarouselProps {
  currentIndex: number;
  onChangeIndex: (index: number) => void;
}

const Carousel: FC<CarouselProps> = ({
  children,
  currentIndex,
  onChangeIndex,
}) => {
  const childrenCount = Children.count(children);
  const prevItem = () => {
    if (childrenCount < 2) {
      return;
    }

    if (currentIndex === 0) {
      onChangeIndex(childrenCount - 1);
    } else {
      onChangeIndex(currentIndex - 1);
    }
  };
  const nextItem = () => {
    if (childrenCount < 2) {
      return;
    }

    const isLastIndex = currentIndex === childrenCount - 1;

    if (isLastIndex) {
      onChangeIndex(0);
    } else {
      onChangeIndex(currentIndex + 1);
    }
  };

  return (
    <VerticalLayout>
      {children[currentIndex]}
      <HorizontalLayout className={styles.actions}>
        <FlatButton onClick={prevItem}>
          <Image
            src="/arrow-left.svg"
            alt="Previous carousel item icon."
            height="16"
            width="16"
            priority
          />
        </FlatButton>
        <p className="secondaryText">
          {currentIndex + 1} / {childrenCount}
        </p>
        <FlatButton onClick={nextItem}>
          <Image
            src="/arrow-right.svg"
            alt="Next carousel item icon."
            height="16"
            width="16"
            priority
          />
        </FlatButton>
      </HorizontalLayout>
    </VerticalLayout>
  );
};

export default Carousel;
