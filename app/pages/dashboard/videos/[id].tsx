import { ChangeEvent, FC, useState, useEffect } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  HorizontalLayout,
  LoadingContainer,
  Root,
  TextField,
  Title,
} from "components/Core";
import { DASHBOARD_VIDEOS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import {
  createFetchVideosRequest,
  createUpdateVideoRequest,
} from "requests/videos";
import { Video } from ".prisma/client";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { id } = router.query;
  let currentId: number = -1;

  try {
    currentId = parseInt(id as string);
  } catch (error) {
    console.warn("Failed to parse image ID from query params");
  }

  const fetchVideoHandler = useRequest<PortfolioAPIResponse<Video>>(
    createFetchVideosRequest(currentId)
  );

  const updateVideoHandler = useRequest<PortfolioAPIResponse<Video>>(
    createUpdateVideoRequest(currentId, url, description)
  );

  const handleVideoUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleUpdateVideo = async () => {
    const response = await updateVideoHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_VIDEOS);
    }
  };

  const handleFetchVideo = async () => {
    const response = await fetchVideoHandler.doRequest();
    if (!response.error) {
      setUrl(response.url);
      setDescription(response.description || "");
    }
  };

  useEffect(() => {
    handleFetchVideo();
  }, []);

  return (
    <Root alignItems="center" gap={12}>
      <Title text="Edit video" />
      <LoadingContainer
        loading={fetchVideoHandler.isLoading || updateVideoHandler.isLoading}
      >
        {fetchVideoHandler.error ||
          (updateVideoHandler.error && (
            <Alert type="error">
              {fetchVideoHandler.error.toString() ||
                updateVideoHandler.error.toString()}
            </Alert>
          ))}
        <iframe
          width="560"
          height="315"
          src={url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <TextField
          className="fullWidth"
          value={url}
          onChange={handleVideoUrlChange}
          placeholder="Video URL"
        />
        <TextField
          className="fullWidth"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Video description"
        />
        <HorizontalLayout gap={8}>
          <Button
            onClick={handleUpdateVideo}
            disabled={url === "" || description === ""}
          >
            Update
          </Button>
          <Link href={DASHBOARD_VIDEOS}>
            <span>
              <Button>Cancel</Button>
            </span>
          </Link>
        </HorizontalLayout>
      </LoadingContainer>
    </Root>
  );
};

export default Edit;
