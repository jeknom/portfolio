import { ChangeEvent, FC, useState } from "react";
import { useRequest } from "hooks/requests";
import Image from "next/image";
import Link from "next/link";
import { Images } from ".prisma/client";
import {
  List,
  LoadingContainer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Sidebar,
  TextField,
  ListItemActions,
  Button,
  Dialog,
  Alert,
  Protected,
  VerticalLayout,
} from "components/Core";
import {
  createDeleteImageRequest,
  createFetchImagesRequest,
} from "requests/images";
import dashboardRoutes from "@constants/dashboardRoutes";
import { DASHBOARD_IMAGES, DASHBOARD_IMAGES_CREATE } from "@constants/routes";
import DialogActions from "components/Core/Dialog/DialogActions";
import { permissions } from "@constants/index";

interface ImagesProps {}

interface ImageItemProps {
  image: Images;
  onDelete: (image: Images) => void;
}

const ImageItem: FC<ImageItemProps> = ({ image, onDelete }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <div className="image">
          <Image
            src={image.path}
            alt={image.description}
            layout="responsive"
            width={64}
            height={64}
            objectFit="cover"
          />
        </div>
        <style jsx>{`
          .image {
            width: 64px;
            height: 64px;
          }
        `}</style>
      </ListItemIcon>
      <ListItemText primary={image.description} secondary={image.path} />
      <ListItemActions>
        <Link href={`${DASHBOARD_IMAGES}/${image.id}`}>
          <span>
            <Button>Edit</Button>
          </span>
        </Link>
        <Button onClick={() => onDelete(image)}>Delete</Button>
      </ListItemActions>
    </ListItem>
  );
};

const Images: FC<ImagesProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [imageToDelete, setImageToDelete] = useState<Images>(null);
  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );
  const deleteImagesHandler = useRequest<PortfolioAPIResponse<Images>>(
    createDeleteImageRequest(imageToDelete?.id)
  );

  const imageElements = fetchImagesHandler.data
    .filter((image) =>
      image.description.toLocaleLowerCase().includes(searchText.toLowerCase())
    )
    .map((image) => (
      <ImageItem key={image.id} image={image} onDelete={setImageToDelete} />
    ));

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCloseDeleteConfirmation = () => {
    setImageToDelete(null);
  };

  const handleDeleteImage = async () => {
    await deleteImagesHandler.doRequest();
    fetchImagesHandler.doRequest();

    handleCloseDeleteConfirmation();
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchImagesHandler?.error) {
      errorMessage = fetchImagesHandler.error;
    } else if (deleteImagesHandler?.error) {
      errorMessage = deleteImagesHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_MEDIA]}>
      <Sidebar routes={dashboardRoutes} selectedRoute={DASHBOARD_IMAGES} />
      <LoadingContainer loading={fetchImagesHandler.isLoading}>
        <VerticalLayout className="fullWidth" alignItems="center" gap={12}>
          <TextField
            className="fullWidth"
            placeholder="Search for images"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          {getAlert()}
          {imageElements.length === 0 && (
            <p className="captionText">
              There seems to be no images here, create a new one!
            </p>
          )}
          <List>{imageElements}</List>
          <Link href={DASHBOARD_IMAGES_CREATE}>
            <span>
              <Button>Add new</Button>
            </span>
          </Link>
        </VerticalLayout>
      </LoadingContainer>
      <Dialog
        title="Delete image"
        open={imageToDelete !== null}
        onClose={handleCloseDeleteConfirmation}
      >
        <p className="secondaryText">
          Are you sure you would like to delete this image?
        </p>
        <DialogActions>
          <Button onClick={handleDeleteImage}>Delete</Button>
          <Button onClick={handleCloseDeleteConfirmation}>Close</Button>
        </DialogActions>
      </Dialog>
      <style jsx global>{`
        .__appRoot {
          margin-top: 1rem;
        }
      `}</style>
    </Protected>
  );
};

export default Images;
