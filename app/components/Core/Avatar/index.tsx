import { FC } from "react";
import Image from "next/image";
import styles from "./avatar.module.css";
import classNames from "classnames";

interface AvatarProps {
  image?: string;
  size?: number;
}

const Avatar: FC<AvatarProps> = ({ image, size = 64 }) => {
  if (image) {
    return (
      <Image
        className={styles.image}
        src={image || ""}
        alt={"Avatar image"}
        width={size}
        height={size}
        objectFit="contain"
      />
    );
  }

  return (
    <>
      <div className={classNames("avatar", styles.image)}>?</div>
      <style jsx>{`
        .avatar {
          width: ${size}px;
          height: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #d1d1d1;
          color: white;
          font-size: 2rem;
        }
      `}</style>
    </>
  );
};

export default Avatar;
