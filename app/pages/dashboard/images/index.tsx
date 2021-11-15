import { ChangeEvent, FC, useState } from "react";
import { useRequest } from "hooks/requests";
import Image from "next/image";
import { Images } from ".prisma/client";
import {
  Root,
  List,
  LoadingContainer,
  ListItem,
  ListItemIcon,
  ListItemText,
  NavBar,
  TextField,
  ListItemActions,
  Button,
} from "components/Core";
import { createFetchImagesRequest } from "requests/images";
import dashboardRoutes from "@constants/dashboardRoutes";
import { DASHBOARD_IMAGES } from "@constants/routes";

interface ImagesProps {}

interface ImageItemProps {
  image: Images;
}

const ImageItem: FC<ImageItemProps> = ({ image }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Image
          src={image.path}
          alt={image.description}
          width={64}
          height={64}
          objectFit="contain"
        />
      </ListItemIcon>
      <ListItemText primary={image.description} />
      <ListItemActions>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </ListItemActions>
    </ListItem>
  );
};

const Images: FC<ImagesProps> = () => {
  const [searchText, setSearchText] = useState("");
  const fetchImagesHandler = useRequest<Images[]>(createFetchImagesRequest(), {
    doRequestOnMount: true,
    defaultValue: [],
  });

  const imageElements = fetchImagesHandler.data
    .filter((image) =>
      image.description.toLocaleLowerCase().includes(searchText.toLowerCase())
    )
    .map((image) => <ImageItem image={image} />);

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Root alignItems="center" justifyContent="center" gap={12}>
      <NavBar routes={dashboardRoutes} selectedRoute={DASHBOARD_IMAGES} />
      <TextField
        className="fullWidth"
        placeholder="Search for images"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <LoadingContainer loading={fetchImagesHandler.isLoading}>
        {imageElements.length === 0 && (
          <p className="captionText">
            There seems to be no images here, create a new one!
          </p>
        )}
        <List>{imageElements}</List>
      </LoadingContainer>
      <Button>Create new</Button>
    </Root>
  );
};

export default Images;
