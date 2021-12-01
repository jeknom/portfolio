import { Root } from "components/Core";
import { FC } from "react";

interface UnauthorizedProps {}

const Unauthorized: FC<UnauthorizedProps> = () => {
  return (
    <>
      <p className="primaryText">You are not authorized.</p>
      <style jsx>{`
        .root {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Unauthorized;
