import { ChangeEvent, FC, useState } from "react";
import { useRequest } from "hooks/requests";
import Link from "next/link";
import { ContactInformation } from ".prisma/client";
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

interface ContactInformationProps {}

interface ContactInformationItemProps {
  contactInformation: ContactInformation;
  onDelete: (contactInformation: ContactInformation) => void;
}

const ContactInformationItem: FC<ContactInformationItemProps> = ({
  contactInformation,
  onDelete,
}) => {
  return (
    <ListItem>
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

const ContactInformation: FC<ContactInformationProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [contactInformationToDelete, setContactInformationToDelete] =
    useState<ContactInformation>(null);
  const fetchContactInformationHandler = useRequest<
    PortfolioAPIResponse<ContactInformation[]>
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
      <TextField
        className="fullWidth"
        placeholder="Search for contact information"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      {getAlert()}
      <LoadingContainer loading={fetchContactInformationHandler.isLoading}>
        {contactInformationElements.length === 0 && (
          <p className="captionText">
            There seems to be no contact information here, create a new one!
          </p>
        )}
        <List>{contactInformationElements}</List>
      </LoadingContainer>
      <Link href={DASHBOARD_CONTACT_INFORMATION_CREATE}>
        <span>
          <Button>Add new</Button>
        </span>
      </Link>
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
    </Protected>
  );
};

export default ContactInformation;
