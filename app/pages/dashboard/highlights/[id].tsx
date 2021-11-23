import { ChangeEvent, FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  DatePicker,
  HorizontalLayout,
  LoadingContainer,
  Root,
  TextField,
  Title,
  VerticalLayout,
} from "components/Core";
import { DASHBOARD_HIGHLIGHTS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import {
  createFetchHighlightsRequest,
  createUpdateHighlightRequest,
} from "requests/highlights";
import { Highlights, Images } from ".prisma/client";
import { createFetchImagesRequest } from "requests/images";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";
import ImagePicker from "components/Dashboard/ImagePicker";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<Images>(null);
  const [date, setDate] = useState(new Date());
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  let currentId: number = -1;

  try {
    currentId = parseInt(id as string);
  } catch (error) {
    console.warn("Failed to parse image ID from query params");
  }

  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );

  const fetchHighlightHandler = useRequest<
    PortfolioAPIResponse<Highlights & { images: Images }>
  >(createFetchHighlightsRequest(currentId));

  const updateHighlightHandler = useRequest<PortfolioAPIResponse<Highlights>>(
    createUpdateHighlightRequest(currentId, name, description, date, image?.id)
  );

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

  const handleUpdateHighlight = async () => {
    const response = await updateHighlightHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_HIGHLIGHTS);
    }
  };

  const handleInit = async () => {
    if (currentId) {
      const highlight = await fetchHighlightHandler.doRequest();
      if (!highlight.error) {
        setName(highlight.name);
        setDescription(highlight.description);
        setImage(highlight.images);
        setDate(highlight.date);
      }
    }
  };

  useEffect(() => {
    handleInit();
  }, [currentId]);

  return (
    <Root alignItems="center" gap={12}>
      <Title text="Update highlight" />
      <LoadingContainer
        loading={
          fetchHighlightHandler.isLoading ||
          fetchImagesHandler.isLoading ||
          updateHighlightHandler.isLoading
        }
      >
        {updateHighlightHandler.error && (
          <Alert type="error">{updateHighlightHandler.error.toString()}</Alert>
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
      </LoadingContainer>
      <HorizontalLayout gap={8}>
        <Button
          onClick={handleUpdateHighlight}
          disabled={name === "" || description === ""}
        >
          Update
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

export default Edit;
