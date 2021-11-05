import { FC } from "react";
import Image from "next/image";
import { useSession } from "next-auth/client";
import Protected from "components/Core/Protected";
import { dashboardRoutes, permissions } from "constants/index";
import { NavBar, VerticalLayout } from "components/Core";
import { PROFILE_ROUTE } from "@constants/routes";

interface DashboardProps {}

const Profile: FC<DashboardProps> = () => {
  const [session] = useSession();

  return (
    <VerticalLayout gap={32} alignItems="center">
      <Protected permissions={[permissions.ADMIN]}>
        <NavBar selectedRoute={PROFILE_ROUTE} routes={dashboardRoutes} />
        <Image
          src={session?.user?.image || ""}
          alt={`${session?.user?.name || ""}'s image.'`}
          width={64}
          height={64}
          objectFit="contain"
        />
        <VerticalLayout alignItems="center">
          <p className="primaryText">Hello, {session?.user?.name || ""}!</p>
          <VerticalLayout>
            <p className="secondaryText">{session?.user?.email}</p>
            <p className="secondaryText">User permissions:</p>
            {(session?.user?.permissions || []).map((p) => (
              <p className="secondaryText">{p}</p>
            ))}
          </VerticalLayout>
        </VerticalLayout>
      </Protected>
    </VerticalLayout>
  );
};

export default Profile;
