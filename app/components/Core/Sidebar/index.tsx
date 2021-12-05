import { FC, HTMLProps, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./sidebar.module.css";
import classNames from "classnames";
import useWindowDimensions from "hooks/useWindowDimensions";
import FlatButton from "../FlatButton";

const MOBILE_SIZE = 768;

interface SidebarProps {
  routes: NavBarRoute[];
  selectedRoute: string;
}

interface SidebarItem {
  route: NavBarRoute;
  isSelected: boolean;
  onRouteClicked?: (route: NavBarRoute) => void;
}

interface MobileSidebarProps {
  routes: NavBarRoute[];
  selectedRoute: string;
}

const SidebarItem: FC<SidebarItem> = ({
  route,
  isSelected,
  onRouteClicked,
  ...rest
}) => {
  const handleRouteClicked = () => {
    if (onRouteClicked) {
      onRouteClicked(route);
    }
  };

  return (
    <Link href={route.path}>
      <div
        className={classNames(styles.itemLayout, isSelected && styles.selected)}
        onClick={handleRouteClicked}
        {...rest}
      >
        <Image src={route.iconPath} alt={route.label} width={32} height={32} />
        <p className={classNames(styles.itemText)}>{route.label}</p>
      </div>
    </Link>
  );
};

const MobileSidebar: FC<MobileSidebarProps> = ({
  routes,
  selectedRoute,
  ...rest
}) => {
  const { width } = useWindowDimensions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRouteClicked = (route: NavBarRoute) => {
    if (route.path === selectedRoute) {
      setIsMenuOpen(false);
    }
  };

  const routeElements = routes.map((r, i) => (
    <SidebarItem
      key={i}
      route={r}
      isSelected={selectedRoute === r.path}
      onRouteClicked={handleRouteClicked}
    />
  ));

  useEffect(() => {
    if (width <= MOBILE_SIZE) {
      setIsMenuOpen(false);
    }
  }, [width]);

  return (
    <>
      <FlatButton
        className={styles.menuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Image
          src={isMenuOpen ? "/x.svg" : "/menu.svg"}
          alt="Menu button image"
          priority
          width={32}
          height={32}
        />
      </FlatButton>
      {isMenuOpen && (
        <div {...rest} className={styles.mobileMenu}>
          <div className={styles.mobileMenuRoutes}>{routeElements}</div>
        </div>
      )}
      <style jsx global>{`
        body {
          ${isMenuOpen ? "overflow: hidden;" : ""}
        }
      `}</style>
    </>
  );
};

const Sidebar: FC<SidebarProps & HTMLProps<HTMLDivElement>> = ({
  className,
  routes,
  selectedRoute,
}) => {
  const { width } = useWindowDimensions();

  if (width <= MOBILE_SIZE) {
    return <MobileSidebar selectedRoute={selectedRoute} routes={routes} />;
  }

  const items = routes.map((i) => (
    <SidebarItem key={i.path} route={i} isSelected={i.path === selectedRoute} />
  ));
  return <div className={classNames(styles.root, className)}>{items}</div>;
};

export default Sidebar;
