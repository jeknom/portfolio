import { ChangeEvent, FC, useState } from "react";
import { useRequest } from "hooks/requests";
import Link from "next/link";
import Image from "next/image";
import { User, PermittedUserEmail } from ".prisma/client";
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
  HorizontalLayout,
  Title,
  VerticalLayout,
} from "components/Core";
import {
  createPermittedUserEmailRequest,
  createDeletePermittedUserEmailRequest,
  createFetchUsersRequest,
  createFetchPermittedUserEmailsRequest,
} from "requests/users";
import dashboardRoutes from "@constants/dashboardRoutes";
import { DASHBOARD_USERS } from "@constants/routes";
import DialogActions from "components/Core/Dialog/DialogActions";
import { permissions } from "@constants/index";
import { isValidEmail } from "utils/stringUtils";

interface UsersProps {}

interface UsersItemProps {
  user: User;
}

interface PermittedUserEmailItemProps {
  permitted: PermittedUserEmail;
  onDelete: (email: string) => void;
}

const UsersItem: FC<UsersItemProps> = ({ user }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Image
          src={user.image}
          alt={`${user.name}'s profile image`}
          width={32}
          height={32}
        />
      </ListItemIcon>
      <ListItemText primary={user.name} secondary={user.email} />
      <ListItemActions>
        <Link href={`${DASHBOARD_USERS}/${user.id}`}>
          <span>
            <Button>Edit</Button>
          </span>
        </Link>
      </ListItemActions>
    </ListItem>
  );
};

const PermittedUserEmailItem: FC<PermittedUserEmailItemProps> = ({
  permitted,
  onDelete,
}) => {
  return (
    <ListItem>
      <ListItemText primary={permitted.email} />
      <ListItemActions>
        <Button onClick={() => onDelete(permitted.email)}>Delete</Button>
      </ListItemActions>
    </ListItem>
  );
};

const User: FC<UsersProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [permittedUserEmail, setPermittedUserEmail] = useState("");
  const [permittedUserEmailToDelete, setPermittedUserEmailToDelete] =
    useState<string>(null);
  const fetchUsersHandler = useRequest<PortfolioAPIResponse<User[]>>(
    createFetchUsersRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );
  const fetchPermittedUserEmailsHandler = useRequest<
    PortfolioAPIResponse<PermittedUserEmail[]>
  >(createFetchPermittedUserEmailsRequest(), {
    doRequestOnMount: true,
    defaultValue: [],
  });
  const createPermittedUserEmailHandler = useRequest<
    PortfolioAPIResponse<PermittedUserEmail>
  >(createPermittedUserEmailRequest(permittedUserEmail));

  const deletePermittedUserEmailHandler = useRequest<
    PortfolioAPIResponse<User>
  >(createDeletePermittedUserEmailRequest(permittedUserEmailToDelete));

  const isPermittedUserEmailValid = isValidEmail(permittedUserEmail);

  const userElements = fetchUsersHandler.data
    .filter((user) =>
      user.name.toLocaleLowerCase().includes(searchText.toLowerCase())
    )
    .map((user) => <UsersItem key={user.id} user={user} />);

  const permittedUserEmailElements = fetchPermittedUserEmailsHandler.data.map(
    (permitted) => (
      <PermittedUserEmailItem
        key={permitted.id}
        permitted={permitted}
        onDelete={setPermittedUserEmailToDelete}
      />
    )
  );

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCloseDeleteConfirmation = () => {
    setPermittedUserEmailToDelete(null);
  };

  const handleDeletePermittedUserEmail = async () => {
    await deletePermittedUserEmailHandler.doRequest();
    fetchPermittedUserEmailsHandler.doRequest();

    handleCloseDeleteConfirmation();
  };

  const handlePermittedUserEmailChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPermittedUserEmail(event.target.value);
  };

  const handleCreatePermittedUserEmail = async () => {
    const result = await createPermittedUserEmailHandler.doRequest();
    if (!result.error) {
      fetchPermittedUserEmailsHandler.doRequest();
      setPermittedUserEmail("");
    }
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchUsersHandler?.error) {
      errorMessage = fetchUsersHandler.error;
    } else if (fetchPermittedUserEmailsHandler.error) {
      errorMessage = fetchPermittedUserEmailsHandler.error;
    } else if (createPermittedUserEmailHandler.errorCode) {
      errorMessage = createPermittedUserEmailHandler.error;
    } else if (deletePermittedUserEmailHandler?.error) {
      errorMessage = deletePermittedUserEmailHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_USERS]}>
      <Sidebar routes={dashboardRoutes} selectedRoute={DASHBOARD_USERS} />
      <LoadingContainer
        loading={
          fetchUsersHandler.isLoading ||
          fetchPermittedUserEmailsHandler.isLoading
        }
      >
        <VerticalLayout className="fullWidth" gap={12} alignItems="center">
          <Title text="Users" />
          <TextField
            className="fullWidth"
            placeholder="Search for users information"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          {getAlert()}
          {userElements.length === 0 && (
            <p className="captionText">
              There seems to be no user information here, create a new one!
            </p>
          )}
          <List>{userElements}</List>
          <Title text="Permitted emails" />
          {permittedUserEmailElements.length === 0 && (
            <p className="captionText">
              There seems to be no permitted user information here, create a new
              one!
            </p>
          )}
          <List>{permittedUserEmailElements}</List>
          <HorizontalLayout className="fullWidth" gap={4}>
            <TextField
              label="Add new permitted user"
              placeholder="jane.doe@gmail.com"
              className="fullWidth"
              value={permittedUserEmail}
              onChange={handlePermittedUserEmailChange}
            />
            <Button
              onClick={handleCreatePermittedUserEmail}
              disabled={!isPermittedUserEmailValid}
            >
              Create
            </Button>
          </HorizontalLayout>
        </VerticalLayout>
      </LoadingContainer>
      <Dialog
        title="Delete permitted user"
        open={permittedUserEmailToDelete !== null}
        onClose={handleCloseDeleteConfirmation}
      >
        <p className="secondaryText">
          Are you sure you would like to revoke this user's access to the
          dashboard?
        </p>
        <DialogActions>
          <Button onClick={handleDeletePermittedUserEmail}>Delete</Button>
          <Button onClick={handleCloseDeleteConfirmation}>Close</Button>
        </DialogActions>
      </Dialog>
    </Protected>
  );
};

export default User;
