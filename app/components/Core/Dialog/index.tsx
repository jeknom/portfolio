import useOutsideAlerter from "hooks/useOutsideAlerter";
import {
  FC,
  HTMLProps,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  Children,
} from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "./Dialog.module.css";

export interface DialogProps {
  title: string;
  open: boolean;
  contentProps?: HTMLProps<HTMLDivElement>;
  onClose: () => void;
}

const Dialog: FC<DialogProps & HTMLProps<HTMLDivElement>> = ({
  title,
  open,
  onClose,
  children,
  contentProps,
  ...rest
}) => {
  const topRef = useRef(null);
  const outsideAlerterRef = useRef(null);
  const scrollToTop = useCallback(() => topRef.current.scrollTo(0, 0), []);
  let dialogActions: ReactNode | null = null;
  const restChildren: ReactNode[] = [];

  Children.forEach(children, (child: { type?: { displayName?: string } }) => {
    const type = child?.type?.displayName || "";

    switch (type) {
      case "DialogActions":
        dialogActions = child;
        break;
      default:
        restChildren.push(child);
        break;
    }
  });

  useOutsideAlerter(outsideAlerterRef, onClose);
  useEffect(scrollToTop, [open]);

  return (
    <div {...rest} className={open ? styles.dialogRoot : styles.hidden}>
      <div ref={outsideAlerterRef} className={styles.dialogLayout}>
        <div className={styles.dialogHeader}>
          <p className="primaryText">{title}</p>
          <button className={styles.closeButton} onClick={onClose}>
            <Image
              src="/x.svg"
              alt="Close button X"
              width="64"
              height="64"
              priority
            />
          </button>
        </div>
        <div
          {...contentProps}
          ref={topRef}
          className={classNames(styles.dialogContent, contentProps?.className)}
        >
          {restChildren}
          <div className={styles.dialogActions}>{dialogActions}</div>
        </div>
      </div>

      <style jsx global>{`
        body {
          ${open ? "overflow: hidden;" : ""}
        }
      `}</style>
    </div>
  );
};

export default Dialog;
