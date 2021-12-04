import { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  HorizontalLayout,
  LoadingContainer,
  Protected,
  TextField,
  Title,
  VerticalLayout,
} from "components/Core";
import { DASHBOARD_CONTACT_INFORMATION } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import { createContactInformationRequest } from "requests/contactInformation";
import { ContactInformation, Images } from ".prisma/client";
import { permissions } from "@constants/index";
import ImagePicker from "components/Dashboard/ImagePicker";
import { createFetchImagesRequest } from "requests/images";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";

interface CreateProps {}

const Create: FC<CreateProps> = () => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<Images>();

  const createContactInformationHandler = useRequest<
    PortfolioAPIResponse<ContactInformation>
  >(createContactInformationRequest(name, link, image?.id));

  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    { doRequestOnMount: true, defaultValue: [] }
  );

  const router = useRouter();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleOpenImagePicker = () => {
    setIsImagePickerOpen(true);
  };

  const handleCloseImagePicker = () => {
    setIsImagePickerOpen(false);
  };

  const handleImageSelected = (img: Images) => {
    setImage(img);
    handleCloseImagePicker();
  };

  const handleCreateContactInformation = async () => {
    const response = await createContactInformationHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_CONTACT_INFORMATION);
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_CONTACT_INFORMATION]}>
      <LoadingContainer loading={fetchImagesHandler.isLoading}>
        <Title text="Create new contact information" />
        {createContactInformationHandler.error && (
          <Alert type="error">
            {createContactInformationHandler.error.toString()}
          </Alert>
        )}
        <HorizontalLayout
          className="fullWidth"
          alignItems="center"
          justifyContent="center"
          gap={16}
        >
          <ImagePreviewButton
            selectedImage={image}
            onClick={handleOpenImagePicker}
          />
          <VerticalLayout
            className="fullWidth"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              className="fullWidth"
              label="Name"
              value={name}
              onChange={handleNameChange}
              placeholder="Cool website name"
            />
            <TextField
              className="fullWidth"
              label="Link"
              value={link}
              onChange={handleLinkChange}
              placeholder="https://www.myprofileatsomeothersite.com"
            />
          </VerticalLayout>
        </HorizontalLayout>
        <HorizontalLayout gap={8}>
          <Button
            onClick={handleCreateContactInformation}
            disabled={name === "" || link === "" || !image}
          >
            Create
          </Button>
          <Link href={DASHBOARD_CONTACT_INFORMATION}>
            <span>
              <Button>Cancel</Button>
            </span>
          </Link>
        </HorizontalLayout>
        <ImagePicker
          title="Pick image"
          open={isImagePickerOpen}
          images={fetchImagesHandler.data}
          onImageSelected={handleImageSelected}
          onClose={handleCloseImagePicker}
        />
        <style jsx>{`
          .image {
            border: 1px solid black;
            border-radius: 8px;
          }
        `}</style>
      </LoadingContainer>
    </Protected>
  );
};

export default Create;
