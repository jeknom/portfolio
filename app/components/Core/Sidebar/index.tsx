import { FC, HTMLProps } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./sidebar.module.css";
import classNames from "classnames";

interface SidebarProps {
  routes: NavBarRoute[];
  selectedRoute: string;
}

interface SidebarItem {
  route: NavBarRoute;
  isSelected: boolean;
}

const SidebarItem: FC<SidebarItem> = ({ route, isSelected, ...rest }) => {
  return (
    <Link href={route.path}>
      <div
        className={classNames(styles.itemLayout, isSelected && styles.selected)}
        {...rest}
      >
        <Image src={route.iconPath} alt={route.label} width={32} height={32} />
        <p className={classNames(styles.itemText)}>{route.label}</p>
      </div>
    </Link>
  );
};

const Sidebar: FC<SidebarProps & HTMLProps<HTMLDivElement>> = ({
  className,
  routes,
  selectedRoute,
}) => {
  const items = routes.map((i) => (
    <SidebarItem key={i.path} route={i} isSelected={i.path === selectedRoute} />
  ));
  return <div className={classNames(styles.root, className)}>{items}</div>;
};

export default Sidebar;
