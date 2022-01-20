import { ChangeEvent, FC, useState, ReactNode } from "react";
import { useRequest } from "hooks/requests";
import Link from "next/link";
import Image from "next/image";
import { Video } from ".prisma/client";
import {
  List,
  LoadingContainer,
  ListItem,
  ListItemText,
  ListItemIcon,
  Sidebar,
  TextField,
  ListItemActions,
  Button,
  Dialog,
  Alert,
  Protected,
  VerticalLayout,
} from "components/Core";
import {
  createDeleteVideoRequest,
  createFetchVideosRequest,
} from "requests/videos";
import dashboardRoutes from "@constants/dashboardRoutes";
import { DASHBOARD_VIDEOS, DASHBOARD_VIDEOS_CREATE } from "@constants/routes";
import DialogActions from "components/Core/Dialog/DialogActions";
import { permissions } from "@constants/index";
import { getYoutubeVideoIdFromEmbedUrl } from "utils/stringUtils";

interface VideosPageProps {}

interface VideoItemProps {
  video: Video;
  onDelete: (video: Video) => void;
}

const VideoItem: FC<VideoItemProps> = ({ video, onDelete }) => {
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
        <Link href={`${DASHBOARD_VIDEOS}/${video.id}`}>
          <span>
            <Button>Edit</Button>
          </span>
        </Link>
        <Button onClick={() => onDelete(video)}>Delete</Button>
      </ListItemActions>
    </ListItem>
  );
};

const VideosPage: FC<VideosPageProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [videoToDelete, setVideoToDelete] = useState<Video>(null);
  const fetchVideosHandler = useRequest<PortfolioAPIResponse<Video[]>>(
    createFetchVideosRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );
  const deleteVideosHandler = useRequest<PortfolioAPIResponse<Video>>(
    createDeleteVideoRequest(videoToDelete?.id)
  );

  const videoElements = fetchVideosHandler.data
    .filter((video) =>
      video.description.toLocaleLowerCase().includes(searchText.toLowerCase())
    )
    .map((video) => (
      <VideoItem key={video.id} video={video} onDelete={setVideoToDelete} />
    ));

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCloseDeleteConfirmation = () => {
    setVideoToDelete(null);
  };

  const handleDeleteVideo = async () => {
    await deleteVideosHandler.doRequest();
    fetchVideosHandler.doRequest();

    handleCloseDeleteConfirmation();
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchVideosHandler?.error) {
      errorMessage = fetchVideosHandler.error;
    } else if (deleteVideosHandler?.error) {
      errorMessage = deleteVideosHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_MEDIA]}>
      <Sidebar routes={dashboardRoutes} selectedRoute={DASHBOARD_VIDEOS} />
      <LoadingContainer loading={fetchVideosHandler.isLoading}>
        <VerticalLayout className="fullWidth" alignItems="center" gap={12}>
          <TextField
            className="fullWidth"
            placeholder="Search for videos"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          {getAlert()}
          {videoElements.length === 0 && (
            <p className="captionText">
              There seems to be no videos here, create a new one!
            </p>
          )}
          <List>{videoElements}</List>
          <Link href={DASHBOARD_VIDEOS_CREATE}>
            <span>
              <Button>Add new</Button>
            </span>
          </Link>
        </VerticalLayout>
      </LoadingContainer>
      <Dialog
        title="Delete video"
        open={videoToDelete !== null}
        onClose={handleCloseDeleteConfirmation}
      >
        <p className="secondaryText">
          Are you sure you would like to delete this video?
        </p>
        <DialogActions>
          <Button onClick={handleDeleteVideo}>Delete</Button>
          <Button onClick={handleCloseDeleteConfirmation}>Close</Button>
        </DialogActions>
      </Dialog>
      <style jsx global>{`
        .__appRoot {
          margin-top: 1rem;
        }
      `}</style>
    </Protected>
  );
};

export default VideosPage;
