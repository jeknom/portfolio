import { FC, ReactNode } from "react";

interface ListItemIconProps {
  children?: ReactNode;
}

const ListItemIcon: FC<ListItemIconProps> = ({ children }) => {
  return <div>{children}</div>;
};

ListItemIcon.displayName = "ListItemIcon";

export default ListItemIcon;
