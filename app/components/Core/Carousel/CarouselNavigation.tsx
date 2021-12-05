import { FC } from "react";
import FlatButton from "../FlatButton";
import HorizontalLayout from "../HorizontalLayout";
import classNames from "classnames";
import styles from "./Carousel.module.css";

interface CarouselNavigationProps {
  index: number;
  count: number;
  onChangeIndex: (index: number) => void;
}

const CarouselNavigation: FC<CarouselNavigationProps> = ({
  index,
  count,
  onChangeIndex,
}) => {
  if (count <= 1) {
    return null;
  }

  const prevItem = () => {
    if (count < 2) {
      return;
    }

    if (index === 0) {
      onChangeIndex(count - 1);
    } else {
      onChangeIndex(index - 1);
    }
  };

  const nextItem = () => {
    if (count < 2) {
      return;
    }

    const isLastIndex = index === count - 1;

    if (isLastIndex) {
      onChangeIndex(0);
    } else {
      onChangeIndex(index + 1);
    }
  };

  return (
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.buttonIcon}
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </FlatButton>
      <p className={styles.pageIndicatorText}>
        {index + 1} / {count}
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.buttonIcon}
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </FlatButton>
    </HorizontalLayout>
  );
};

export default CarouselNavigation;
