import {
  DASHBOARD_ACHIEVEMENTS,
  DASHBOARD_CONTACT_INFORMATION,
  DASHBOARD_HIGHLIGHTS,
  DASHBOARD_IMAGES,
  DASHBOARD_POSTS,
  DASHBOARD_SKILLS,
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
  {
    label: "Skills",
    path: DASHBOARD_SKILLS,
    iconPath: "/skill.svg",
  },
  {
    label: "Contact information",
    path: DASHBOARD_CONTACT_INFORMATION,
    iconPath: "/contact.svg",
  },
];

export default dashboardRoutes;
