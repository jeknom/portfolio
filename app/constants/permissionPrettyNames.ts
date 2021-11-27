import { formatUpperCaseSnakeCaseToSentence } from "utils/stringUtils";
import * as permissions from "./permissions";

const mapPermissionToPrettyName = (permission: string) => {
  switch (permission) {
    case permissions.ALLOWED_TO_EDIT_MEDIA:
      return "Allowed to edit images and videos";
    default:
      return formatUpperCaseSnakeCaseToSentence(permission);
  }
};

export default mapPermissionToPrettyName;
