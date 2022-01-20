import { ChangeEvent, FC, useState, useEffect } from "react";
import { useRequest } from "hooks/requests";
import { Maintainers, Images } from ".prisma/client";
import {
  LoadingContainer,
  Sidebar,
  TextField,
  Button,
  Alert,
  Protected,
  VerticalLayout,
  TextArea,
} from "components/Core";
import {
  createFetchMaintainerRequest,
  createUpdateMaintainerRequest,
} from "requests/maintainer";
import dashboardRoutes from "@constants/dashboardRoutes";
import { permissions } from "@constants/index";
import { DASHBOARD_MAINTAINER } from "@constants/routes";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";
import ImagePicker from "components/Dashboard/ImagePicker";
import { createFetchImagesRequest } from "requests/images";

interface MaintainerPageProps {}

const MaintainerPage: FC<MaintainerPageProps> = () => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<Images>(null);

  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );

  const fetchMaintainerHandler = useRequest<
    PortfolioAPIResponse<Maintainers & { images: Images }>
  >(createFetchMaintainerRequest(), {
    defaultValue: null,
  });

  const updateMaintainerHandler = useRequest(
    createUpdateMaintainerRequest(name, headline, bio, image?.id)
  );

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleHeadlineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeadline(event.target.value);
  };

  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
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

  const handleInitWithMaintainerData = async () => {
    const updated = await fetchMaintainerHandler.doRequest();
    if (updated && !updated.error) {
      setName(updated.name);
      setHeadline(updated.headline);
      setBio(updated.bio);
      setImage(updated.images);
    }
  };

  const handleUpdateMaintainer = async () => {
    await updateMaintainerHandler.doRequest();
    await handleInitWithMaintainerData();
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchMaintainerHandler?.error) {
      errorMessage = fetchMaintainerHandler.error;
    } else if (updateMaintainerHandler?.error) {
      errorMessage = updateMaintainerHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  const maintainer = fetchMaintainerHandler.data;
  const isUpdateDisabled =
    name === maintainer?.name &&
    headline === maintainer?.headline &&
    bio === maintainer?.bio &&
    image?.id === maintainer?.image_id;

  useEffect(() => {
    handleInitWithMaintainerData();
  }, []);

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_MAINTAINER]}>
      <Sidebar routes={dashboardRoutes} selectedRoute={DASHBOARD_MAINTAINER} />
      {getAlert()}
      <LoadingContainer loading={fetchMaintainerHandler.isLoading}>
        <VerticalLayout className="fullWidth" gap={8} alignItems="center">
          <ImagePreviewButton
            onClick={handleOpenImagePicker}
            selectedImage={image}
            width={256}
            height={256}
          />
          <ImagePicker
            title="Pick maintainer image"
            open={isImagePickerOpen}
            onClose={handleCloseImagePicker}
            images={fetchImagesHandler.data}
            onImageSelected={handleImageChange}
          />
          <TextField
            className="fullWidth"
            value={name}
            label="Name"
            placeholder="Jane Doe"
            onChange={handleNameChange}
          />
          <TextField
            className="fullWidth"
            value={headline}
            label="Headline"
            placeholder="Monopoly enthusiast"
            onChange={handleHeadlineChange}
          />
          <VerticalLayout className="fullWidth">
            <p className="secondaryText">Bio</p>
            <TextArea
              className="fullWidth"
              value={bio}
              onChange={handleBioChange}
              rows={10}
            />
          </VerticalLayout>
          <Button onClick={handleUpdateMaintainer} disabled={isUpdateDisabled}>
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

export default MaintainerPage;
