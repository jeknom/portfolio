import { ChangeEvent, FC, useState } from "react";
import { useRequest } from "hooks/requests";
import Link from "next/link";
import Image from "next/image";
import { ContactInformation, Images } from ".prisma/client";
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
  createDeleteContactInformationRequest,
  createFetchContactInformationRequest,
} from "requests/contactInformation";
import dashboardRoutes from "@constants/dashboardRoutes";
import {
  DASHBOARD_CONTACT_INFORMATION,
  DASHBOARD_CONTACT_INFORMATION_CREATE,
} from "@constants/routes";
import DialogActions from "components/Core/Dialog/DialogActions";
import { permissions } from "@constants/index";

interface ContactInformationPageProps {}

interface ContactInformationItemProps {
  contactInformation: ContactInformation & {
    image: Images;
  };
  onDelete: (contactInformation: ContactInformation) => void;
}

const ContactInformationItem: FC<ContactInformationItemProps> = ({
  contactInformation,
  onDelete,
}) => {
  return (
    <ListItem>
      {contactInformation.image && (
        <ListItemIcon>
          <Image
            src={contactInformation.image.path}
            alt={`${contactInformation.image.description}`}
            width={36}
            height={36}
          />
        </ListItemIcon>
      )}
      <ListItemText
        primary={contactInformation.name}
        secondary={contactInformation.link}
      />
      <ListItemActions>
        <Link
          href={`${DASHBOARD_CONTACT_INFORMATION}/${contactInformation.id}`}
        >
          <span>
            <Button>Edit</Button>
          </span>
        </Link>
        <Button onClick={() => onDelete(contactInformation)}>Delete</Button>
      </ListItemActions>
    </ListItem>
  );
};

const ContactInformationPage: FC<ContactInformationPageProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [contactInformationToDelete, setContactInformationToDelete] =
    useState<ContactInformation>(null);
  const fetchContactInformationHandler = useRequest<
    PortfolioAPIResponse<
      (ContactInformation & {
        image: Images;
      })[]
    >
  >(createFetchContactInformationRequest(), {
    doRequestOnMount: true,
    defaultValue: [],
  });
  const deleteContactInformationHandler = useRequest<
    PortfolioAPIResponse<ContactInformation>
  >(createDeleteContactInformationRequest(contactInformationToDelete?.id));

  const contactInformationElements = fetchContactInformationHandler.data
    .filter((contactInformation) =>
      contactInformation.name
        .toLocaleLowerCase()
        .includes(searchText.toLowerCase())
    )
    .map((contactInformation) => (
      <ContactInformationItem
        key={contactInformation.id}
        contactInformation={contactInformation}
        onDelete={setContactInformationToDelete}
      />
    ));

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCloseDeleteConfirmation = () => {
    setContactInformationToDelete(null);
  };

  const handleDeleteContactInformation = async () => {
    await deleteContactInformationHandler.doRequest();
    fetchContactInformationHandler.doRequest();

    handleCloseDeleteConfirmation();
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchContactInformationHandler?.error) {
      errorMessage = fetchContactInformationHandler.error;
    } else if (deleteContactInformationHandler?.error) {
      errorMessage = deleteContactInformationHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_CONTACT_INFORMATION]}>
      <Sidebar
        routes={dashboardRoutes}
        selectedRoute={DASHBOARD_CONTACT_INFORMATION}
      />
      <LoadingContainer loading={fetchContactInformationHandler.isLoading}>
        <VerticalLayout className="fullWidth" alignItems="center" gap={12}>
          <TextField
            className="fullWidth"
            placeholder="Search for contact information"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          {getAlert()}
          {contactInformationElements.length === 0 && (
            <p className="captionText">
              There seems to be no contact information here, create a new one!
            </p>
          )}
          <List>{contactInformationElements}</List>
          <Link href={DASHBOARD_CONTACT_INFORMATION_CREATE}>
            <span>
              <Button>Add new</Button>
            </span>
          </Link>
        </VerticalLayout>
      </LoadingContainer>
      <Dialog
        title="Delete contact information"
        open={contactInformationToDelete !== null}
        onClose={handleCloseDeleteConfirmation}
      >
        <p className="secondaryText">
          Are you sure you would like to delete this contact information?
        </p>
        <DialogActions>
          <Button onClick={handleDeleteContactInformation}>Delete</Button>
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

export default ContactInformationPage;
