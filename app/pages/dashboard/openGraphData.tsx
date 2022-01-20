import { ChangeEvent, FC, useState, useEffect } from "react";
import { useRequest } from "hooks/requests";
import { OpenGraphData, Images } from ".prisma/client";
import {
  LoadingContainer,
  Sidebar,
  TextField,
  Button,
  Alert,
  Protected,
  VerticalLayout,
} from "components/Core";
import {
  createFetchOpenGraphDataRequest,
  createUpdateOpenGraphDataRequest,
} from "requests/openGraphData";
import dashboardRoutes from "@constants/dashboardRoutes";
import { permissions } from "@constants/index";
import { DASHBOARD_OPEN_GRAPH_DATA } from "@constants/routes";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";
import ImagePicker from "components/Dashboard/ImagePicker";
import { createFetchImagesRequest } from "requests/images";

interface OpenGraphDataPageProps {}

const OpenGraphDataPage: FC<OpenGraphDataPageProps> = () => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState<Images>(null);

  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );

  const fetchOpenGraphDataHandler = useRequest<
    PortfolioAPIResponse<OpenGraphData & { images: Images }>
  >(createFetchOpenGraphDataRequest(), {
    defaultValue: null,
  });

  const updateOpenGraphDataHandler = useRequest(
    createUpdateOpenGraphDataRequest(title, description, type, image?.id)
  );

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
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

  const handleInitWithOpenGraphData = async () => {
    const updated = await fetchOpenGraphDataHandler.doRequest();
    if (updated && !updated.error) {
      setTitle(updated.title);
      setDescription(updated.description);
      setType(updated.type);
      setImage(updated.images);
    }
  };

  const handleUpdateOpenGraphData = async () => {
    await updateOpenGraphDataHandler.doRequest();
    await handleInitWithOpenGraphData();
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchOpenGraphDataHandler?.error) {
      errorMessage = fetchOpenGraphDataHandler.error;
    } else if (updateOpenGraphDataHandler?.error) {
      errorMessage = updateOpenGraphDataHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  const openGraphData = fetchOpenGraphDataHandler.data;
  const isUpdateDisabled =
    title === openGraphData?.title &&
    description === openGraphData?.description &&
    type === openGraphData?.type &&
    image?.id === openGraphData?.image_id;

  useEffect(() => {
    handleInitWithOpenGraphData();
  }, []);

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_OPEN_GRAPH_DATA]}>
      <Sidebar
        routes={dashboardRoutes}
        selectedRoute={DASHBOARD_OPEN_GRAPH_DATA}
      />
      {getAlert()}
      <LoadingContainer loading={fetchOpenGraphDataHandler.isLoading}>
        <VerticalLayout className="fullWidth" gap={8} alignItems="center">
          <ImagePreviewButton
            onClick={handleOpenImagePicker}
            selectedImage={image}
            width={256}
            height={164}
          />
          <ImagePicker
            title="Pick open graph cover image"
            open={isImagePickerOpen}
            onClose={handleCloseImagePicker}
            images={fetchImagesHandler.data}
            onImageSelected={handleImageChange}
          />
          <TextField
            className="fullWidth"
            value={title}
            label="Title"
            placeholder="Jane Doe - The Master of Monopoly"
            onChange={handleTitleChange}
          />
          <TextField
            className="fullWidth"
            value={description}
            label="Description"
            placeholder="Check out the portfolio from the one and only, master of monopoly!"
            onChange={handleDescriptionChange}
          />
          <TextField
            className="fullWidth"
            value={type}
            label="Type"
            placeholder="website"
            onChange={handleTypeChange}
          />
          <Button
            onClick={handleUpdateOpenGraphData}
            disabled={isUpdateDisabled}
          >
            Update
          </Button>
        </VerticalLayout>
      </LoadingContainer>
      <style jsx global>{`
        .__appRoot {
          margin-top: 1rem;
        }
      `}</style>
    </Protected>
  );
};

export default OpenGraphDataPage;
