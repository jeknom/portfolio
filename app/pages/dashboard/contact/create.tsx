import { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  HorizontalLayout,
  Protected,
  Root,
  TextField,
  Title,
} from "components/Core";
import { DASHBOARD_CONTACT_INFORMATION } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import { createContactInformationRequest } from "requests/contactInformation";
import { ContactInformation } from ".prisma/client";
import { permissions } from "@constants/index";

interface CreateProps {}

const Create: FC<CreateProps> = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const createContactInformationHandler = useRequest<
    PortfolioAPIResponse<ContactInformation>
  >(createContactInformationRequest(name, link));
  const router = useRouter();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleCreateContactInformation = async () => {
    const response = await createContactInformationHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_CONTACT_INFORMATION);
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_CONTACT_INFORMATION]}>
      <Root alignItems="center" gap={12}>
        <Title text="Create new contact information" />
        {createContactInformationHandler.error && (
          <Alert type="error">
            {createContactInformationHandler.error.toString()}
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
        <HorizontalLayout gap={8}>
          <Button
            onClick={handleCreateContactInformation}
            disabled={name === "" || link === ""}
          >
            Create
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

export default Create;
