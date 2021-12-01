import { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  HorizontalLayout,
  Protected,
  TextField,
  Title,
} from "components/Core";
import { DASHBOARD_IMAGES } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import { createImageRequest } from "requests/images";
import { Images } from ".prisma/client";
import { permissions } from "@constants/index";

interface CreateProps {}

const Create: FC<CreateProps> = () => {
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const createImageHandler = useRequest<PortfolioAPIResponse<Images>>(
    createImageRequest(path, description)
  );
  const router = useRouter();

  const handleImagePathChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleCreateImage = async () => {
    const response = await createImageHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_IMAGES);
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_MEDIA]}>
      <Title text="Create new image" />
      {createImageHandler.error && (
        <Alert type="error">{createImageHandler.error.toString()}</Alert>
      )}
      <img
        className="image"
        src={path}
        alt="Type in the URL and the image will show here"
        width={128}
        height={128}
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
          onClick={handleCreateImage}
          disabled={path === "" || description === ""}
        >
          Create
        </Button>
        <Link href={DASHBOARD_IMAGES}>
          <span>
            <Button>Cancel</Button>
          </span>
        </Link>
      </HorizontalLayout>
      <style jsx>{`
        .image {
          border: 1px solid black;
          border-radius: 8px;
        }
      `}</style>
    </Protected>
  );
};

export default Create;
