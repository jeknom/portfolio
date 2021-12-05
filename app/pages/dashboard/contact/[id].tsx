import { ChangeEvent, FC, useEffect, useState } from "react";
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
import ImagePicker from "components/Dashboard/ImagePicker";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";
import { DASHBOARD_CONTACT_INFORMATION } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import {
  createFetchContactInformationRequest,
  createUpdateContactInformationRequest,
} from "requests/contactInformation";
import { ContactInformation, Images } from ".prisma/client";
import { permissions } from "@constants/index";
import { createFetchImagesRequest } from "requests/images";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<Images>();
  const router = useRouter();
  const { id } = router.query;
  let currentId: number = -1;

  try {
    currentId = parseInt(id as string);
  } catch (error) {
    console.warn("Failed to parse image ID from query params");
  }

  const fetchContactInformationHandler = useRequest<
    PortfolioAPIResponse<
      ContactInformation & {
        image: Images;
      }
    >
  >(createFetchContactInformationRequest(currentId));

  const updateContactInformationHandler = useRequest<
    PortfolioAPIResponse<ContactInformation>
  >(createUpdateContactInformationRequest(currentId, name, link, image?.id));

  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    { doRequestOnMount: true, defaultValue: [] }
  );

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

  const handleUpdateContactInformation = async () => {
    const response = await updateContactInformationHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_CONTACT_INFORMATION);
    }
  };

  const handleInit = async () => {
    if (currentId) {
      const contactInformation =
        await fetchContactInformationHandler.doRequest();
      if (!contactInformation.error) {
        setName(contactInformation.name);
        setLink(contactInformation.link);
        setImage(contactInformation.image);
      }
    }
  };

  useEffect(() => {
    handleInit();
  }, [currentId]);

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_CONTACT_INFORMATION]}>
      <Title text="Update contact information" />
      <LoadingContainer
        loading={
          fetchContactInformationHandler.isLoading ||
          updateContactInformationHandler.isLoading
        }
      >
        {updateContactInformationHandler.error && (
          <Alert type="error">
            {updateContactInformationHandler.error.toString()}
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
              placeholder="Cool website"
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
      </LoadingContainer>
      <HorizontalLayout gap={8}>
        <Button
          onClick={handleUpdateContactInformation}
          disabled={name === "" || link === "" || !image}
        >
          Update
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
      <style jsx global>{`
        .__appRoot {
          min-height: 50vh;
        }
      `}</style>
      <style jsx>{`
        .image {
          border: 1px solid black;
          border-radius: 8px;
        }
      `}</style>
    </Protected>
  );
};

export default Edit;
