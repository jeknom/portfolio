import { FC } from "react";
import { signOut, useSession } from "next-auth/client";
import { dashboardRoutes } from "constants/index";
import {
  LoadingContainer,
  Sidebar,
  VerticalLayout,
  Avatar,
  Protected,
  Button,
} from "components/Core";
import { PROFILE } from "@constants/routes";
import { mapPermissionToPrettyName } from "constants/index";

interface DashboardProps {}

interface PermissionsListProps {
  permissions?: string[];
}

const PermissionsList: FC<PermissionsListProps> = ({ permissions = [] }) => {
  if (permissions.length === 0) {
    return <p className="secondaryText">You do not have any permissions.</p>;
  }

  return (
    <>
      {permissions.map((p, i) => (
        <p key={i} className="secondaryText">
          {mapPermissionToPrettyName(p)}
        </p>
      ))}
    </>
  );
};

const Profile: FC<DashboardProps> = () => {
  const [session, loading] = useSession();

  return (
    <Protected>
      <LoadingContainer loading={loading}>
        <Sidebar selectedRoute={PROFILE} routes={dashboardRoutes} />
        <VerticalLayout className="fullWidth" alignItems="center">
          <Avatar image={session?.user?.image} />
          <p className="primaryText">Hello, {session?.user?.name || ""}!</p>
          <VerticalLayout>
            <p>Your permissions:</p>
            <PermissionsList permissions={session?.user?.permissions} />
          </VerticalLayout>
        </VerticalLayout>
        <Button onClick={() => signOut()}>Sign out</Button>
      </LoadingContainer>
    </Protected>
  );
};

export default Profile;
