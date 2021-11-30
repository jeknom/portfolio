import { Root } from "components/Core";
import { FC } from "react";

interface UnauthorizedProps {}

const Unauthorized: FC<UnauthorizedProps> = () => {
  return (
    <>
      <Root className="root" alignItems="center" justifyContent="center">
        <p className="primaryText">You are not authorized.</p>
      </Root>
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
