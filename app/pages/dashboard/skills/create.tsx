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
  VerticalLayout,
} from "components/Core";
import { DASHBOARD_SKILLS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import { createSkillRequest } from "requests/skills";
import { Skills, Images } from ".prisma/client";
import { createFetchImagesRequest } from "requests/images";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";
import ImagePicker from "components/Dashboard/ImagePicker";
import { permissions } from "@constants/index";

interface CreateProps {}

const Create: FC<CreateProps> = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [image, setImage] = useState<Images>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );

  const createSkillHandler = useRequest<PortfolioAPIResponse<Skills>>(
    createSkillRequest(name, score, image?.id)
  );
  const router = useRouter();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const scoreNumber = parseInt(event.target.value);
      return setScore(scoreNumber);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleOpenImagePicker = () => {
    setIsImagePickerOpen(true);
  };

  const handleCloseImagePicker = () => {
    setIsImagePickerOpen(false);
  };

  const handleImageChange = (image: Images) => {
    setImage(image);
    handleCloseImagePicker();
  };

  const handleCreateSkill = async () => {
    const response = await createSkillHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_SKILLS);
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_SKILLS]}>
      <Root alignItems="center" gap={12}>
        <Title text="Create new skill" />
        {createSkillHandler.error && (
          <Alert type="error">{createSkillHandler.error.toString()}</Alert>
        )}
        <HorizontalLayout
          className="fullWidth"
          alignItems="center"
          gap={12}
          justifyContent="flex-start"
        >
          <ImagePreviewButton
            selectedImage={image}
            onClick={handleOpenImagePicker}
          />
          <VerticalLayout className="fullWidth">
            <TextField
              className="fullWidth"
              label="Name"
              value={name}
              onChange={handleNameChange}
              placeholder="Microsoft Powerpoint 1999"
            />
            <TextField
              className="fullWidth"
              label="Score"
              type="number"
              value={score}
              onChange={handleScoreChange}
              placeholder="1-5, or more, that's up to you."
            />
          </VerticalLayout>
        </HorizontalLayout>
        <HorizontalLayout gap={8}>
          <Button
            onClick={handleCreateSkill}
            disabled={name === "" || score <= 0 || !image}
          >
            Create
          </Button>
          <Link href={DASHBOARD_SKILLS}>
            <span>
              <Button>Cancel</Button>
            </span>
          </Link>
        </HorizontalLayout>
        <ImagePicker
          title="Skill image"
          open={isImagePickerOpen}
          onClose={handleCloseImagePicker}
          images={fetchImagesHandler.data}
          onImageSelected={handleImageChange}
        />
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
