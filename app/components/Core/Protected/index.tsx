import { FC } from "react";
import { signIn, useSession } from "next-auth/client";
import VerticalLayout from "../VerticalLayout";
import Title from "../Title";
import Button from "../Button";
import { permissions as permissionsList } from "constants/index";

interface ProtectedProps {
  permissions?: string[];
}

const Protected: FC<ProtectedProps> = ({ children, permissions = [] }) => {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) {
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
