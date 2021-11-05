import React, { FC, HTMLProps, ReactNode } from "react";
import Image from "next/image";
import styles from "./GridMenu.module.css";
import classNames from "classnames";

interface GridMenuItemProps {
  imageUrl?: string;
  primary: string;
  secondary: string;
}

const GridMenuItem: FC<GridMenuItemProps & HTMLProps<HTMLDivElement>> = ({
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
          <div className={styles.imageRoot}>
            <Image
              className={styles.menuItemImage}
              src={imageUrl}
              alt={`${primary} image`}
              layout="responsive"
              height={200}
              width={200}
              objectFit="contain"
            />
          </div>
        )}
        <div className={styles.menuItemText}>
          <h3 className="primaryText">{primary}</h3>
          <p className="captionText">{secondary}</p>
        </div>
      </div>
    </>
  );
};

export default GridMenuItem;
