import * as permissions from "./permissions";

const mapPermissionToPrettyName = (permission: string) => {
  switch (permission) {
    case permissions.ADMIN:
      return "Admin";
    case permissions.ALLOWED_TO_SEE_POSTS:
      return "Allowed to see posts";
    case permissions.ALLOWED_TO_EDIT_POSTS:
      return "Allowed to edit posts";
  }
};

export default mapPermissionToPrettyName;