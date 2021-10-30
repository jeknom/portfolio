import React, { FC, HTMLProps, ReactNode } from "react";
import Image from "next/image";
import styles from "./GridMenu.module.css";
import classNames from "classnames";

interface ListItemProps {
  imageUrl?: string;
  primary: string;
  secondary: string;
}

const ListItem: FC<ListItemProps & HTMLProps<HTMLDivElement>> = ({
  className,
  imageUrl,
  primary,
  secondary,
  ...rest
}) => {
  return (
    <>
      <div {...rest} className={classNames(className, styles.menuItemRoot)}>
        {imageUrl && (
          <Image
            className={styles.menuItemImage}
            src={imageUrl}
            alt={`${primary} image`}
            width={300}
            height={300}
          />
        )}
        <div className={styles.menuItemText}>
          <h3 className="primaryText">{primary}</h3>
          <p className="captionText">{secondary}</p>
        </div>
      </div>
    </>
  );
};

export default ListItem;
