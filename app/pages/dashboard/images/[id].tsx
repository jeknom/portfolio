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
import { DASHBOARD_IMAGES } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import {
  createFetchImagesRequest,
  createUpdateImageRequest,
} from "requests/images";
import { Images } from ".prisma/client";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { id } = router.query;
  let currentId: number = -1;

  try {
    currentId = parseInt(id as string);
  } catch (error) {
    console.warn("Failed to parse image ID from query params");
  }

  const fetchImageHandler = useRequest<PortfolioAPIResponse<Images>>(
    createFetchImagesRequest(currentId)
  );

  const updateImageHandler = useRequest<PortfolioAPIResponse<Images>>(
    createUpdateImageRequest(currentId, path, description)
  );

  const handleImagePathChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleUpdateImage = async () => {
    const response = await updateImageHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_IMAGES);
    }
  };

  const handleFetchImage = async () => {
    const response = await fetchImageHandler.doRequest();
    if (!response.error) {
      setPath(response.path);
      setDescription(response.description || "");
    }
  };

  useEffect(() => {
    handleFetchImage();
  }, []);

  return (
    <Root alignItems="center" gap={12}>
      <Title text="Edit image" />
      <LoadingContainer
        loading={fetchImageHandler.isLoading || updateImageHandler.isLoading}
      >
        {fetchImageHandler.error ||
          (updateImageHandler.error && (
            <Alert type="error">
              {fetchImageHandler.error.toString() ||
                updateImageHandler.error.toString()}
            </Alert>
          ))}
        <img
          className="image"
          src={path}
          alt="Type in the URL and the image will show here"
        />
        <TextField
          className="fullWidth"
          value={path}
          onChange={handleImagePathChange}
          placeholder="Image URL"
        />
        <TextField
          className="fullWidth"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Image description"
        />
        <HorizontalLayout gap={8}>
          <Button
            onClick={handleUpdateImage}
            disabled={path === "" || description === ""}
          >
            Update
          </Button>
          <Link href={DASHBOARD_IMAGES}>
            <span>
              <Button>Cancel</Button>
            </span>
          </Link>
        </HorizontalLayout>
      </LoadingContainer>
      <style jsx>{`
        .image {
          max-width: 128px;
          border: 1px solid black;
          border-radius: 8px;
        }
      `}</style>
    </Root>
  );
};

export default Edit;
