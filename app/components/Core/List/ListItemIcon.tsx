import { FC } from "react";

interface ListItemIconProps {}

const ListItemIcon: FC<ListItemIconProps> = ({ children }) => {
  return <div>{children}</div>;
};

ListItemIcon.displayName = "ListItemIcon";

export default ListItemIcon;
