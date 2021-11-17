import { FC, HTMLProps } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import styles from "./navbar.module.css";

interface NavBarProps {
  selectedRoute: string;
  routes: NavBarRoute[];
}

const NavBar: FC<NavBarProps & HTMLProps<HTMLDivElement>> = ({
  className,
  selectedRoute,
  routes,
  ...rest
}) => {
  const routeElements = routes.map((r, i) => (
    <Link key={i} href={r.path}>
      <div
        {...rest}
        className={classNames(
          styles.routeItem,
          r.path === selectedRoute ? styles.selectedRoute : ""
        )}
      >
        <Image
          src={r.iconPath}
          alt={`${r.label} icon`}
          height={22}
          width={22}
        />
        <p className={styles.routeLabel}>{r.label}</p>
      </div>
    </Link>
  ));

  return (
    <div className={classNames(className, styles.navbarRoot)}>
      {routeElements}
    </div>
  );
};

export default NavBar;
