import { ChangeEvent, FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  HorizontalLayout,
  LoadingContainer,
  Protected,
  TextField,
  Title,
  VerticalLayout,
} from "components/Core";
import { DASHBOARD_SKILLS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import {
  createFetchSkillsRequest,
  createUpdateSkillRequest,
} from "requests/skills";
import { Skills, Images } from ".prisma/client";
import { createFetchImagesRequest } from "requests/images";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";
import ImagePicker from "components/Dashboard/ImagePicker";
import { permissions } from "@constants/index";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [image, setImage] = useState<Images>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  let currentId: number = -1;

  try {
    currentId = parseInt(id as string);
  } catch (error) {
    console.warn("Failed to parse image ID from query params");
  }

  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );

  const fetchSkillHandler = useRequest<
    PortfolioAPIResponse<Skills & { images: Images }>
  >(createFetchSkillsRequest(currentId));

  const updateSkillHandler = useRequest<PortfolioAPIResponse<Skills>>(
    createUpdateSkillRequest(currentId, name, score, image?.id)
  );

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const numberValue = parseInt(event.target.value);
      setScore(numberValue);
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

  const handleUpdateSkill = async () => {
    const response = await updateSkillHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_SKILLS);
    }
  };

  const handleInit = async () => {
    if (currentId) {
      const skill = await fetchSkillHandler.doRequest();
      if (!skill.error) {
        setName(skill.name);
        setScore(skill.score);
        setImage(skill.images);
      }
    }
  };

  useEffect(() => {
    handleInit();
  }, [currentId]);

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_SKILLS]}>
      <Title text="Update skill" />
      <LoadingContainer
        loading={
          fetchSkillHandler.isLoading ||
          fetchImagesHandler.isLoading ||
          updateSkillHandler.isLoading
        }
      >
        {updateSkillHandler.error && (
          <Alert type="error">{updateSkillHandler.error.toString()}</Alert>
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
      </LoadingContainer>
      <HorizontalLayout gap={8}>
        <Button
          onClick={handleUpdateSkill}
          disabled={name === "" || score <= 0 || !image?.id}
        >
          Update
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
    </Protected>
  );
};

export default Edit;
