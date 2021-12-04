import React, { FC, Children } from "react";
import Image from "next/image";
import FlatButton from "../FlatButton";
import VerticalLayout from "../VerticalLayout";
import HorizontalLayout from "../HorizontalLayout";
import styles from "./Carousel.module.css";
import classNames from "classnames";

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
    <VerticalLayout alignItems="center" className={styles.container}>
      <VerticalLayout className="fullWidth">
        {children[currentIndex]}
      </VerticalLayout>
      <HorizontalLayout
        className="fullWidth"
        alignItems="center"
        justifyContent="space-between"
      >
        <FlatButton
          onClick={prevItem}
          className={classNames(styles.button, styles.leftButton)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={styles.buttonIcon}
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </FlatButton>
        <p className={styles.pageIndicatorText}>
          {currentIndex + 1} / {childrenCount}
        </p>
        <FlatButton
          onClick={nextItem}
          className={classNames(styles.button, styles.rightButton)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={styles.buttonIcon}
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </FlatButton>
      </HorizontalLayout>
    </VerticalLayout>
  );
};

export default Carousel;
