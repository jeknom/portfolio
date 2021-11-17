import { FC, HTMLProps } from "react";
import Image from "next/image";
import { Images } from ".prisma/client";
import classNames from "classnames";
import styles from "./imagePreviewButton.module.css";

interface ImagePreviewButtonProps {
  selectedImage?: Images | null;
}

const ImagePreviewButton: FC<
  ImagePreviewButtonProps & HTMLProps<HTMLDivElement>
> = ({ className, selectedImage, ...rest }) => {
  return (
    <div className={classNames(className, styles.root)} {...rest}>
      {!selectedImage && (
        <Image
          src="/image.svg"
          alt="Image icon"
          layout="responsive"
          width={128}
          height={128}
          objectFit="contain"
        />
      )}
      {selectedImage && (
        <Image
          src={selectedImage.path}
          alt={selectedImage.description}
          layout="responsive"
          width={128}
          height={128}
          objectFit="contain"
        />
      )}
    </div>
  );
};

export default ImagePreviewButton;
