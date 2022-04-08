import { FC, ReactNode } from "react";
import styles from "./Dialog.module.css";

interface DialogActionsProps {
  children?: ReactNode;
}

const DialogActions: FC<DialogActionsProps> = ({ children }) => {
  return <div className={styles.dialogActions}>{children}</div>;
};

DialogActions.displayName = "DialogActions";

export default DialogActions;
