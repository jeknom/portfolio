import Protected from "components/Core/Protected";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <Protected>
      <div>Stuff</div>
    </Protected>
  );
};

export default Dashboard;
