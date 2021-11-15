import { DASHBOARD_IMAGES, DASHBOARD_POSTS, PROFILE } from "@constants/routes";

const dashboardRoutes = [
  {
    label: "Profile",
    path: PROFILE,
    iconPath: "/profile.svg",
  },
  {
    label: "Images",
    path: DASHBOARD_IMAGES,
    iconPath: "/image.svg",
  },
  {
    label: "Posts",
    path: DASHBOARD_POSTS,
    iconPath: "/post.svg",
  },
];

export default dashboardRoutes;
