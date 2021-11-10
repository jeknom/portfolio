import { FC } from "react";
import styles from "./Dialog.module.css";

interface DialogActionsProps {}

const DialogActions: FC<DialogActionsProps> = ({ children }) => {
  return <div className={styles.dialogActions}>{children}</div>;
};

DialogActions.displayName = "DialogActions";

export default DialogActions;
