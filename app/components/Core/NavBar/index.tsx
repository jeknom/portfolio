import { FC, HTMLProps, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import styles from "./navbar.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import FlatButton from "../FlatButton";

interface RouteItemProps {
  selectedRoute: string;
  route: NavBarRoute;
  onRouteClicked?: (route: NavBarRoute) => void;
}

interface NavBarProps {
  selectedRoute: string;
  routes: NavBarRoute[];
}

interface DesktopNavBarProps {
  selectedRoute: string;
  routes: NavBarRoute[];
}

interface MobileNavBarProps {
  selectedRoute: string;
  routes: NavBarRoute[];
}

const MOBILE_SIZE = 768;

const RouteItem: FC<RouteItemProps> = ({
  selectedRoute,
  route,
  onRouteClicked,
}) => {
  return (
    <Link href={route.path}>
      <div
        className={classNames(
          styles.routeItem,
          route.path === selectedRoute ? styles.selectedRoute : ""
        )}
        onClick={() => {
          if (onRouteClicked) {
            onRouteClicked(route);
          }
        }}
      >
        <Image
          src={route.iconPath}
          alt={`${route.label} icon`}
          height={22}
          width={22}
        />
        <p className={styles.routeLabel}>{route.label}</p>
      </div>
    </Link>
  );
};

const DesktopNavBar: FC<DesktopNavBarProps & HTMLProps<HTMLDivElement>> = ({
  className,
  selectedRoute,
  routes,
  ...rest
}) => {
  const routeElements = routes.map((r, i) => (
    <RouteItem key={i} route={r} selectedRoute={selectedRoute} />
  ));

  return (
    <div {...rest} className={classNames(className, styles.navbarRoot)}>
      {routeElements}
    </div>
  );
};

const MobileNavBar: FC<MobileNavBarProps> = ({
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
    <RouteItem
      key={i}
      route={r}
      selectedRoute={selectedRoute}
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

const NavBar: FC<NavBarProps & HTMLProps<HTMLDivElement>> = ({
  className,
  selectedRoute,
  routes,
  ...rest
}) => {
  const { width } = useWindowDimensions();

  if (width <= MOBILE_SIZE) {
    return (
      <MobileNavBar {...rest} selectedRoute={selectedRoute} routes={routes} />
    );
  }

  return (
    <DesktopNavBar
      {...rest}
      className={className}
      selectedRoute={selectedRoute}
      routes={routes}
    />
  );
};

export default NavBar;
