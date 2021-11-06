import { FC } from "react";

interface LoadingContainerProps {
  loading: boolean;
}

const LoadingContainer: FC<LoadingContainerProps> = ({ loading, children }) => {
  if (loading) {
    return <p className="primaryText">Loading...</p>;
  }

  return <>{children}</>;
};

export default LoadingContainer;
