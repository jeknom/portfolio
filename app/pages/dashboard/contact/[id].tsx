import { ChangeEvent, FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  HorizontalLayout,
  LoadingContainer,
  Protected,
  Root,
  TextField,
  Title,
} from "components/Core";
import { DASHBOARD_CONTACT_INFORMATION } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import {
  createFetchContactInformationRequest,
  createUpdateContactInformationRequest,
} from "requests/contactInformation";
import { ContactInformation } from ".prisma/client";
import { permissions } from "@constants/index";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const router = useRouter();
  const { id } = router.query;
  let currentId: number = -1;

  try {
    currentId = parseInt(id as string);
  } catch (error) {
    console.warn("Failed to parse image ID from query params");
  }

  const fetchContactInformationHandler = useRequest<
    PortfolioAPIResponse<ContactInformation>
  >(createFetchContactInformationRequest(currentId));

  const updateContactInformationHandler = useRequest<
    PortfolioAPIResponse<ContactInformation>
  >(createUpdateContactInformationRequest(currentId, name, link));

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
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
      }
    }
  };

  useEffect(() => {
    handleInit();
  }, [currentId]);

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_CONTACT_INFORMATION]}>
      <Root alignItems="center" gap={12}>
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
        </LoadingContainer>
        <HorizontalLayout gap={8}>
          <Button
            onClick={handleUpdateContactInformation}
            disabled={name === "" || link === ""}
          >
            Update
          </Button>
          <Link href={DASHBOARD_CONTACT_INFORMATION}>
            <span>
              <Button>Cancel</Button>
            </span>
          </Link>
        </HorizontalLayout>
        <style jsx>{`
          .image {
            border: 1px solid black;
            border-radius: 8px;
          }
        `}</style>
      </Root>
    </Protected>
  );
};

export default Edit;
