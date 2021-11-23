import { FC, HTMLProps } from "react";
import Image from "next/image";
import { Images } from ".prisma/client";
import classNames from "classnames";
import styles from "./imagePreviewButton.module.css";

interface ImagePreviewButtonProps {
  selectedImage?: Images | null;
  width?: number;
  height?: number;
}

const ImagePreviewButton: FC<
  ImagePreviewButtonProps & HTMLProps<HTMLDivElement>
> = ({ className, selectedImage, width = 128, height = 128, ...rest }) => {
  return (
    <div className={classNames("size", className, styles.root)} {...rest}>
      {!selectedImage && (
        <Image
          src="/image.svg"
          alt="Image icon"
          layout="intrinsic"
          width={width}
          height={height}
          objectFit="cover"
        />
      )}
      {selectedImage && (
        <Image
          src={selectedImage.path}
          alt={selectedImage.description}
          layout="responsive"
          width={width}
          height={height}
          objectFit="revert"
        />
      )}
      <style jsx>{`
        .size {
          width: ${width}px;
        }
      `}</style>
    </div>
  );
};

export default ImagePreviewButton;
