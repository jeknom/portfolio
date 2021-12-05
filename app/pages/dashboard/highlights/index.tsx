import { ChangeEvent, FC, useState } from "react";
import { useRequest } from "hooks/requests";
import Link from "next/link";
import Image from "next/image";
import { Highlights, Images } from ".prisma/client";
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
  createDeleteHighlightRequest,
  createFetchHighlightsRequest,
} from "requests/highlights";
import dashboardRoutes from "@constants/dashboardRoutes";
import {
  DASHBOARD_HIGHLIGHTS,
  DASHBOARD_HIGHLIGHTS_CREATE,
} from "@constants/routes";
import DialogActions from "components/Core/Dialog/DialogActions";
import { permissions } from "@constants/index";

interface HighlightsProps {}

interface HighlightItemProps {
  highlight: Highlights & { images: Images };
  onDelete: (highlight: Highlights & { images: Images }) => void;
}

const HighlightItem: FC<HighlightItemProps> = ({ highlight, onDelete }) => {
  const imageElement = highlight.images ? (
    <ListItemIcon>
      <div className="image">
        <Image
          src={highlight.images.path}
          alt={highlight.images.description}
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
  ) : null;

  return (
    <ListItem>
      {imageElement}
      <ListItemText
        primary={highlight.name}
        secondary={`${highlight.description} (${new Date(
          highlight.date
        ).toLocaleDateString()})`}
      />
      <ListItemActions>
        <Link href={`${DASHBOARD_HIGHLIGHTS}/${highlight.id}`}>
          <span>
            <Button>Edit</Button>
          </span>
        </Link>
        <Button onClick={() => onDelete(highlight)}>Delete</Button>
      </ListItemActions>
    </ListItem>
  );
};

const Highlights: FC<HighlightsProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [highlightToDelete, setHighlightToDelete] = useState<
    Highlights & { images: Images }
  >(null);
  const fetchHighlightsHandler = useRequest<
    PortfolioAPIResponse<(Highlights & { images: Images })[]>
  >(createFetchHighlightsRequest(), {
    doRequestOnMount: true,
    defaultValue: [],
  });
  const deleteHighlightHandler = useRequest<PortfolioAPIResponse<Highlights>>(
    createDeleteHighlightRequest(highlightToDelete?.id)
  );

  const highlightElements = fetchHighlightsHandler.data
    .filter((highlight) =>
      highlight.name.toLocaleLowerCase().includes(searchText.toLowerCase())
    )
    .map((highlight) => (
      <HighlightItem
        key={highlight.id}
        highlight={highlight}
        onDelete={setHighlightToDelete}
      />
    ));

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCloseDeleteConfirmation = () => {
    setHighlightToDelete(null);
  };

  const handleDeleteHighlight = async () => {
    await deleteHighlightHandler.doRequest();
    fetchHighlightsHandler.doRequest();

    handleCloseDeleteConfirmation();
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchHighlightsHandler?.error) {
      errorMessage = fetchHighlightsHandler.error;
    } else if (deleteHighlightHandler?.error) {
      errorMessage = deleteHighlightHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_HIGHLIGHTS]}>
      <Sidebar routes={dashboardRoutes} selectedRoute={DASHBOARD_HIGHLIGHTS} />
      <LoadingContainer loading={fetchHighlightsHandler.isLoading}>
        <VerticalLayout gap={12} alignItems="center">
          <TextField
            className="fullWidth"
            placeholder="Search for highlights"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          {getAlert()}
          {highlightElements.length === 0 && (
            <p className="captionText">
              There seems to be no highlights here, create a new one!
            </p>
          )}
          <List>{highlightElements}</List>
          <Link href={DASHBOARD_HIGHLIGHTS_CREATE}>
            <span>
              <Button>Add new</Button>
            </span>
          </Link>
        </VerticalLayout>
      </LoadingContainer>
      <Dialog
        title="Delete highlight"
        open={highlightToDelete !== null}
        onClose={handleCloseDeleteConfirmation}
      >
        <p className="secondaryText">
          Are you sure you would like to delete this highlight?
        </p>
        <DialogActions>
          <Button onClick={handleDeleteHighlight}>Delete</Button>
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

export default Highlights;
