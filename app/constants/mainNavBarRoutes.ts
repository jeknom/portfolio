import { HOME_ROUTE, PROJECTS_ROUTE, TIMELINE_ROUTE } from "./mainRoutes";

const mainRoutes: NavBarRoute[] = [
  { path: HOME_ROUTE, label: "Home", iconPath: "/home.svg" },
  { path: TIMELINE_ROUTE, label: "Timeline", iconPath: "/timeline.svg" },
  { path: PROJECTS_ROUTE, label: "Projects", iconPath: "/projects.svg" },
];

export default mainRoutes;
