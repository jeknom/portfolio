import { FC } from "react";
import styles from "./loadingContainer.module.css";

interface LoadingContainerProps {
  loading: boolean;
}

const LoadingContainer: FC<LoadingContainerProps> = ({ loading, children }) => {
  if (loading) {
    return <div className={styles.ldsDualRing}></div>;
  }

  return <>{children}</>;
};

export default LoadingContainer;
