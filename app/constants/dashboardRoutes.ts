import { DASHBOARD_POSTS, PROFILE } from "@constants/routes";

const dashboardRoutes = [
  {
    label: "Profile",
    path: PROFILE,
    iconPath: "/profile.svg",
  },
  {
    label: "Posts",
    path: DASHBOARD_POSTS,
    iconPath: "/post.svg",
  },
];

export default dashboardRoutes;
