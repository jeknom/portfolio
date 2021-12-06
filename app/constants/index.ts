import mainNavBarRoutes from "./mainNavBarRoutes";
import dashboardRoutes from "./dashboardRoutes";
import * as mainRoutes from "./routes";
import * as permissions from "./permissions";
import mapPermissionToPrettyName from "./permissionPrettyNames";

export const NO_DATA = "Unknown";
export const DATE_NULL_REPLACEMENT = "Present";
export const MOBILE_SIZE = 768;

export {
  mainNavBarRoutes,
  dashboardRoutes,
  mainRoutes,
  permissions,
  mapPermissionToPrettyName,
};
