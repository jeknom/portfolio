import { FC } from "react";
import { signIn, useSession } from "next-auth/react";
import VerticalLayout from "../VerticalLayout";
import Title from "../Title";
import Button from "../Button";
import { permissions as permissionsList } from "constants/index";
import { ReactNode } from "react-markdown/lib/react-markdown";

interface ProtectedProps {
  children?: ReactNode;
  permissions?: string[];
}

const Protected: FC<ProtectedProps> = ({ children, permissions = [] }) => {
  const { data: session, status } = useSession();

  if (typeof window !== "undefined" && status === "loading") {
    return null;
  }

  if (!session) {
    return (
      <VerticalLayout alignItems="center" justifyContent="center" gap={12}>
        <Title text="Login required" />
        <Button onClick={() => signIn()}>Login</Button>
      </VerticalLayout>
    );
  } else if (
    !permissions.every((p) => session?.user?.permissions.includes(p)) &&
    !session?.user?.permissions.includes(permissionsList.ADMIN)
  ) {
    return <Title text="You lack permissions to access this content" />;
  }

  return <>{children}</>;
};

export default Protected;
