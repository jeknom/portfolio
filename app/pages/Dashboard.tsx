import { FC } from "react";
import Protected from "components/Core/Protected";
import { permissions } from "constants/index";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <Protected permissions={[permissions.ADMIN]}>
      <div>Stuff</div>
    </Protected>
  );
};

export default Dashboard;
