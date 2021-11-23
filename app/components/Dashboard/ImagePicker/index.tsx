import { FC } from "react";
import Image from "next/image";
import { Images } from ".prisma/client";
import { Button } from "components/Core";
import Dialog, { DialogProps } from "components/Core/Dialog";
import DialogActions from "components/Core/Dialog/DialogActions";
import styles from "./imagePicker.module.css";

interface ImagePickerProps {
  images: Images[];
  onImageSelected: (image: Images) => void;
}

interface ImageItemProps {
  image: Images;
  onSelected: (image: Images) => void;
}

const ImageItem: FC<ImageItemProps> = ({ image, onSelected }) => {
  return (
    <div className={styles.imageItem} onClick={() => onSelected(image)}>
      <Image
        src={image.path}
        alt={image.description}
        layout="responsive"
        width={128}
        height={128}
        objectFit="cover"
      />
    </div>
  );
};

const ImagePicker: FC<ImagePickerProps & DialogProps> = ({
  images,
  onImageSelected,
  onClose,
  ...rest
}) => {
  const imageItems = images.map((i) => (
    <ImageItem key={i.id} image={i} onSelected={onImageSelected} />
  ));

  return (
    <Dialog {...rest} onClose={onClose}>
      <div className={styles.imageGrid}>{imageItems}</div>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImagePicker;
