import useOutsideAlerter from "hooks/useOutsideAlerter";
import { FC, HTMLProps, useRef } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "./Dialog.module.css";

interface DialogProps {
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
  const outsideAlerterRef = useRef(null);

  useOutsideAlerter(outsideAlerterRef, onClose);

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
          className={classNames(styles.dialogContent, contentProps?.className)}
        >
          {children}
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
