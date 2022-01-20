import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Alert,
  Button,
  HorizontalLayout,
  List,
  LoadingContainer,
  Protected,
  ListItem,
  ListItemText,
  ListItemActions,
  Title,
} from "components/Core";
import { DASHBOARD_USERS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import {
  createFetchUsersRequest,
  createUpdateUserPermissionsRequest,
} from "requests/users";
import { User, UserPermission } from ".prisma/client";
import {
  permissions as constPermissions,
  mapPermissionToPrettyName,
} from "@constants/index";

interface EditProps {}

interface PermissionListItemProps {
  buttonText: string;
  permission: string;
  onSelect: (permission: string) => void;
}

const PermissionListItem: FC<PermissionListItemProps> = ({
  buttonText,
  permission,
  onSelect,
}) => {
  return (
    <ListItem>
      <ListItemActions>
        <Button onClick={() => onSelect(permission)}>{buttonText}</Button>
      </ListItemActions>
      <ListItemText primary={mapPermissionToPrettyName(permission)} />
    </ListItem>
  );
};

const Edit: FC<EditProps> = () => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const router = useRouter();
  const { id } = router.query as { id: string };

  const fetchUserHandler = useRequest<
    PortfolioAPIResponse<User & { UserPermission: UserPermission[] }>
  >(createFetchUsersRequest(id));

  const updateUserPermissionsHandler = useRequest<PortfolioAPIResponse<User>>(
    createUpdateUserPermissionsRequest(id, permissions)
  );

  const handleUpdatePermissions = async () => {
    const response = await updateUserPermissionsHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_USERS);
    } else {
      handleInit();
    }
  };

  const handleAddPermission = (permission: string) => {
    const permissionsCopy = permissions.concat(permission);
    setPermissions(permissionsCopy);
  };

  const handleRemovePermission = (permission: string) => {
    const permissionsCopy = permissions.filter((p) => p !== permission);
    setPermissions(permissionsCopy);
  };

  const handleInit = async () => {
    if (id) {
      const user = await fetchUserHandler.doRequest();
      if (!user.error) {
        setPermissions(user.UserPermission.map((p) => p.permission) || []);
      }
    }
  };

  const userImageElement = fetchUserHandler.data?.image && (
    <Image
      src={fetchUserHandler.data.image}
      alt="User profile picture"
      width={128}
      height={128}
    />
  );

  const existingPermissions = Object.values(permissions).map((p) => (
    <PermissionListItem
      key={p}
      permission={p}
      onSelect={handleRemovePermission}
      buttonText="Remove"
    />
  ));

  const missingPermissions = Object.values(constPermissions)
    .filter((p) => !permissions.includes(p))
    .map((p) => (
      <PermissionListItem
        key={p}
        permission={p}
        onSelect={handleAddPermission}
        buttonText="Add"
      />
    ));

  useEffect(() => {
    handleInit();
  }, [id]);

  const isAnyRequestPending =
    fetchUserHandler.isLoading || updateUserPermissionsHandler.isLoading;

  return (
    <Protected permissions={[constPermissions.ALLOWED_TO_EDIT_USERS]}>
      <LoadingContainer loading={isAnyRequestPending}>
        {updateUserPermissionsHandler.error && (
          <Alert type="error">
            {updateUserPermissionsHandler.error.toString()}
          </Alert>
        )}
        <Title text={fetchUserHandler.data?.name || ""} />
        {userImageElement}
        <p className="secondaryText">{fetchUserHandler.data?.email || ""}</p>
        <Title text="User permissions" />
        {existingPermissions.length === 0 && (
          <p className="secondaryText">User has no permissions</p>
        )}
        <List>{existingPermissions}</List>
        <Title text="Missing permissions" />
        {missingPermissions.length === 0 && (
          <p className="secondaryText">User has all permissions</p>
        )}
        <List>{missingPermissions}</List>
      </LoadingContainer>
      <HorizontalLayout gap={8}>
        <Button
          onClick={handleUpdatePermissions}
          disabled={isAnyRequestPending}
        >
          Update
        </Button>
        <Link href={DASHBOARD_USERS}>
          <span>
            <Button>Back</Button>
          </span>
        </Link>
      </HorizontalLayout>
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
