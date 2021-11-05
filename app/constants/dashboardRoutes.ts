import { DASHBOARD_POSTS_ROUTE, PROFILE_ROUTE } from "@constants/routes";

const dashboardRoutes = [
  {
    label: "Profile",
    path: PROFILE_ROUTE,
    iconPath: "/profile.svg",
  },
  {
    label: "Posts",
    path: DASHBOARD_POSTS_ROUTE,
    iconPath: "/post.svg",
  },
];

export default dashboardRoutes;
