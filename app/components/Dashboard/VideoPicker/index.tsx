import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { Video } from ".prisma/client";
import {
  Button,
  List,
  ListItem,
  ListItemActions,
  ListItemText,
  ListItemIcon,
} from "components/Core";
import Dialog, { DialogProps } from "components/Core/Dialog";
import DialogActions from "components/Core/Dialog/DialogActions";
import { getYoutubeVideoIdFromEmbedUrl } from "utils/stringUtils";

interface VideoPickerProps {
  videos: Video[];
  onVideoSelected: (video: Video) => void;
}

interface VideoItemProps {
  video: Video;
  onSelected: (video: Video) => void;
}

const VideoItem: FC<VideoItemProps> = ({ video, onSelected }) => {
  let imageUrl:
    | string
    | null = `http://img.youtube.com/vi/${getYoutubeVideoIdFromEmbedUrl(
    video.url
  )}/0.jpg`;
  let imageElement: ReactNode | null = null;

  if (imageUrl && imageUrl !== "") {
    imageElement = (
      <ListItemIcon>
        <Image
          src={imageUrl}
          alt={video.description}
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
      <ListItemText primary={video.description} secondary={video.url} />
      <ListItemActions>
        <Button onClick={() => onSelected(video)}>Select</Button>
      </ListItemActions>
    </ListItem>
  );
};

const VideoPicker: FC<VideoPickerProps & DialogProps> = ({
  videos,
  onVideoSelected,
  onClose,
  ...rest
}) => {
  const videoItems = videos.map((v) => (
    <VideoItem key={v.id} video={v} onSelected={onVideoSelected} />
  ));

  return (
    <Dialog {...rest} onClose={onClose}>
      {videoItems.length === 0 && (
        <p className="secondaryText">Nothing to see here.</p>
      )}
      <List>{videoItems}</List>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VideoPicker;
