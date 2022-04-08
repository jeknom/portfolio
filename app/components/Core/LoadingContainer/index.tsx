import { FC, ReactNode } from "react";
import styles from "./loadingContainer.module.css";

interface LoadingContainerProps {
  children?: ReactNode;
  loading: boolean;
}

const LoadingContainer: FC<LoadingContainerProps> = ({ loading, children }) => {
  if (loading) {
    return <div className={styles.ldsDualRing}></div>;
  }

  return <>{children}</>;
};

export default LoadingContainer;
