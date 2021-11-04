import { FC } from "react";
import { signIn, useSession } from "next-auth/client";

interface ProtectedProps {}

const Protected: FC<ProtectedProps> = ({ children }) => {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) {
    return null;
  }

  if (!session) {
    return (
      <div>
        <h1>Access denied</h1>
        <p>
          <a
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Please sign in to access this page.
          </a>
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Protected;
