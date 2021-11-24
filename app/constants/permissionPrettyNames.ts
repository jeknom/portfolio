import * as permissions from "./permissions";

const mapPermissionToPrettyName = (permission: string) => {
  switch (permission) {
    case permissions.ADMIN:
      return "Admin";
    case permissions.ALLOWED_TO_SEE_DASHBOARD:
      return "Allowed to see dashboard pages";
    case permissions.ALLOWED_TO_EDIT_POSTS:
      return "Allowed to edit posts";
    case permissions.ALLOWED_TO_EDIT_MEDIA:
      return "Allowed to edit images and videos";
    case permissions.ALLOWED_TO_EDIT_HIGHLIGHTS:
      return "Allowed to edit highlights";
    case permissions.ALLOWED_TO_EDIT_ACHIEVEMENTS:
      return "Allowed to edit achievements";
    case permissions.ALLOWED_TO_EDIT_SKILLS:
      return "Allowed to edit skills";
    case permissions.ALLOWED_TO_EDIT_CONTACT_INFORMATION:
      return "Allowed to edit contact information";
    case permissions.ALLOWED_TO_EDIT_MAINTAINER:
      return "Allowed to edit maintainer";
    default:
      return permission;
  }
};

export default mapPermissionToPrettyName;
