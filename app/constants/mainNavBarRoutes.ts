import { HOME, PROJECTS, TIMELINE } from "./routes";

const mainRoutes: NavBarRoute[] = [
  { path: HOME, label: "Home", iconPath: "/home.svg" },
  { path: PROJECTS, label: "Projects", iconPath: "/projects.svg" },
  { path: TIMELINE, label: "Timeline", iconPath: "/timeline.svg" },
];

export default mainRoutes;
