import { FC, ReactNode, useState } from "react";
import Image from "next/image";
import { Images, Video } from ".prisma/client";
import {
  List,
  ListItem,
  ListItemActions,
  ListItemIcon,
  ListItemText,
  VerticalLayout,
  Button,
  HorizontalLayout,
} from "components/Core";
import ImagePicker from "../ImagePicker";
import VideoPicker from "../VideoPicker";
import { getYoutubeVideoIdFromEmbedUrl } from "utils/stringUtils";

export type SelectedMedia = {
  id: number;
  item: MediaItem;
  description: string;
};

interface MediaItemListProps {
  images: Images[];
  videos: Video[];
  selectedMedia: SelectedMedia[];
  onSelectedMediaChange: (items: SelectedMedia[]) => void;
}

interface SelectedMediaItemProps {
  media: SelectedMedia;
  lastIndex: number;
  itemIndex: number;
  onSwap: (a: number, b: number) => void;
  onDelete: (media: SelectedMedia) => void;
}

const SelectedMediaItem: FC<SelectedMediaItemProps> = ({
  media,
  lastIndex,
  itemIndex,
  onSwap,
  onDelete,
}) => {
  let imageUrl: string | null = null;

  if (media.item.type === "image") {
    imageUrl = media.item.url;
  } else if (media.item.type === "youtubeVideo") {
    imageUrl = `http://img.youtube.com/vi/${getYoutubeVideoIdFromEmbedUrl(
      media.item.url
    )}/0.jpg`;
  }

  let imageElement: ReactNode | null = null;
  if (imageUrl && imageUrl !== "") {
    imageElement = (
      <ListItemIcon>
        <Image
          src={imageUrl}
          alt={media.description}
          width={64}
          height={64}
          objectFit="cover"
        />
      </ListItemIcon>
    );
  }

  return (
    <ListItem>
      {imageElement}
      <ListItemText primary={media.description} secondary={media.item.url} />
      <ListItemActions>
        <Button
          disabled={itemIndex === 0}
          onClick={() => onSwap(itemIndex, itemIndex - 1)}
        >
          Up
        </Button>
        <Button
          disabled={itemIndex === lastIndex}
          onClick={() => onSwap(itemIndex, itemIndex + 1)}
        >
          Down
        </Button>
        <Button onClick={() => onDelete(media)}>Remove</Button>
      </ListItemActions>
    </ListItem>
  );
};

const MediaItemList: FC<MediaItemListProps> = ({
  images,
  videos,
  selectedMedia,
  onSelectedMediaChange,
}) => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [isVideoPickerOpen, setIsVideoPickerOpen] = useState(false);

  const handleOpenImagePicker = () => {
    setIsImagePickerOpen(true);
  };

  const handleCloseImagePicker = () => {
    setIsImagePickerOpen(false);
  };

  const handleOpenVideoPicker = () => {
    setIsVideoPickerOpen(true);
  };

  const handleCloseVideoPicker = () => {
    setIsVideoPickerOpen(false);
  };

  const handleAddNewImage = (image: Images) => {
    const changedMedia = selectedMedia.concat({
      id: image.id,
      description: image.description,
      item: { type: "image", url: image.path },
    });
    onSelectedMediaChange(changedMedia);
    handleCloseImagePicker();
  };

  const handleAddNewVideo = (video: Video) => {
    const changedMedia = selectedMedia.concat({
      id: video.id,
      description: video.description,
      item: { type: "youtubeVideo", url: video.url },
    });
    onSelectedMediaChange(changedMedia);
    handleCloseVideoPicker();
  };

  const handleDelete = (media: SelectedMedia) => {
    const changedMedia = selectedMedia.filter(
      (m) =>
        m.item.url !== media.item.url && m.description !== media.description
    );
    onSelectedMediaChange(changedMedia);
  };

  const handleSwap = (a: number, b: number) => {
    const changedImages = [...selectedMedia];
    const aItem = changedImages[a];
    const bItem = changedImages[b];

    changedImages[a] = bItem;
    changedImages[b] = aItem;

    onSelectedMediaChange(changedImages);
  };

  const itemElements = selectedMedia.map((selected, i) => {
    const imageMedia: SelectedMedia[] = images.map(
      (i) =>
        ({
          description: i.description,
          item: { type: "image", url: i.path },
        } as SelectedMedia)
    );
    const videoMedia: SelectedMedia[] = videos.map(
      (v) =>
        ({
          description: v.description,
          item: { type: "youtubeVideo", url: v.url },
        } as SelectedMedia)
    );
    const media = imageMedia
      .concat(videoMedia)
      .find((m) => m.item.url === selected.item.url);

    return (
      <SelectedMediaItem
        key={selected.item.url + selected.description}
        itemIndex={i}
        lastIndex={selectedMedia.length - 1}
        media={media}
        onDelete={handleDelete}
        onSwap={handleSwap}
      />
    );
  });

  return (
    <VerticalLayout>
      <List>
        {selectedMedia.length === 0 && (
          <ListItem>
            <ListItemText
              primary="Media"
              secondary="Add some images and videos to your project to make it pop!"
            />
          </ListItem>
        )}
        {itemElements}
      </List>
      <HorizontalLayout gap={8} justifyContent="center">
        <Button onClick={handleOpenImagePicker}>Add image</Button>
        <Button onClick={handleOpenVideoPicker}>Add video</Button>
      </HorizontalLayout>
      <ImagePicker
        title="Images"
        images={images.filter(
          (img) => !selectedMedia.some((media) => media.item.url === img.path)
        )}
        open={isImagePickerOpen}
        onImageSelected={handleAddNewImage}
        onClose={handleCloseImagePicker}
      />
      <VideoPicker
        title="Videos"
        videos={videos.filter(
          (vid) => !selectedMedia.some((media) => media.item.url === vid.url)
        )}
        open={isVideoPickerOpen}
        onVideoSelected={handleAddNewVideo}
        onClose={handleCloseVideoPicker}
      />
    </VerticalLayout>
  );
};

export default MediaItemList;
