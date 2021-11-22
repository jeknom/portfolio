import { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  HorizontalLayout,
  Root,
  TextField,
  Title,
} from "components/Core";
import { DASHBOARD_VIDEOS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import { createVideoRequest } from "requests/videos";
import { Video } from ".prisma/client";

interface CreateProps {}

const Create: FC<CreateProps> = () => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const createVideoHandler = useRequest<PortfolioAPIResponse<Video>>(
    createVideoRequest(url, description)
  );
  const router = useRouter();

  const handleVideoUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleCreateVideo = async () => {
    const response = await createVideoHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_VIDEOS);
    }
  };

  return (
    <Root alignItems="center" gap={12}>
      <Title text="Create new video" />
      {createVideoHandler.error && (
        <Alert type="error">{createVideoHandler.error.toString()}</Alert>
      )}
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
          onClick={handleCreateVideo}
          disabled={url === "" || description === ""}
        >
          Create
        </Button>
        <Link href={DASHBOARD_VIDEOS}>
          <span>
            <Button>Cancel</Button>
          </span>
        </Link>
      </HorizontalLayout>
    </Root>
  );
};

export default Create;