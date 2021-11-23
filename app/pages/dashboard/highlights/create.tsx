import { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  DatePicker,
  HorizontalLayout,
  Root,
  TextField,
  Title,
  VerticalLayout,
} from "components/Core";
import { DASHBOARD_HIGHLIGHTS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import { createHighlightRequest } from "requests/highlights";
import { Highlights, Images } from ".prisma/client";
import { createFetchImagesRequest } from "requests/images";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";
import ImagePicker from "components/Dashboard/ImagePicker";

interface CreateProps {}

const Create: FC<CreateProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState<Images>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );

  const createHighlightHandler = useRequest<PortfolioAPIResponse<Highlights>>(
    createHighlightRequest(name, description, date, image?.id)
  );
  const router = useRouter();

  const handleImageNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleOpenImagePicker = () => {
    setIsImagePickerOpen(true);
  };

  const handleCloseImagePicker = () => {
    setIsImagePickerOpen(false);
  };

  const handleImageChange = (image: Images) => {
    setImage(image);
    handleCloseImagePicker();
  };

  const handleCreateHighlight = async () => {
    const response = await createHighlightHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_HIGHLIGHTS);
    }
  };

  return (
    <Root alignItems="center" gap={12}>
      <Title text="Create new highlight" />
      {createHighlightHandler.error && (
        <Alert type="error">{createHighlightHandler.error.toString()}</Alert>
      )}
      <HorizontalLayout
        className="fullWidth"
        gap={12}
        justifyContent="flex-start"
      >
        <ImagePreviewButton
          selectedImage={image}
          onClick={handleOpenImagePicker}
        />
        <VerticalLayout className="fullWidth">
          <TextField
            className="fullWidth"
            value={name}
            onChange={handleImageNameChange}
            placeholder="Highlight name"
          />
          <TextField
            className="fullWidth"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Highlight description"
          />
          <DatePicker value={date} onChange={setDate} />
        </VerticalLayout>
      </HorizontalLayout>
      <HorizontalLayout gap={8}>
        <Button
          onClick={handleCreateHighlight}
          disabled={name === "" || description === "" || !image}
        >
          Create
        </Button>
        <Link href={DASHBOARD_HIGHLIGHTS}>
          <span>
            <Button>Cancel</Button>
          </span>
        </Link>
      </HorizontalLayout>
      <ImagePicker
        title="Pick highlight image"
        open={isImagePickerOpen}
        onClose={handleCloseImagePicker}
        images={fetchImagesHandler.data}
        onImageSelected={handleImageChange}
      />
      <style jsx>{`
        .image {
          border: 1px solid black;
          border-radius: 8px;
        }
      `}</style>
    </Root>
  );
};

export default Create;
