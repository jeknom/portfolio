import {
  DASHBOARD_ACHIEVEMENTS,
  DASHBOARD_HIGHLIGHTS,
  DASHBOARD_IMAGES,
  DASHBOARD_POSTS,
  DASHBOARD_VIDEOS,
  PROFILE,
} from "@constants/routes";

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
    label: "Videos",
    path: DASHBOARD_VIDEOS,
    iconPath: "/video.svg",
  },
  {
    label: "Posts",
    path: DASHBOARD_POSTS,
    iconPath: "/post.svg",
  },
  {
    label: "Highlights",
    path: DASHBOARD_HIGHLIGHTS,
    iconPath: "/highlight.svg",
  },
  {
    label: "Achievements",
    path: DASHBOARD_ACHIEVEMENTS,
    iconPath: "/achievement.svg",
  },
];

export default dashboardRoutes;
