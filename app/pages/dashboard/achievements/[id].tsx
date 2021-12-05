import { ChangeEvent, FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  DatePicker,
  HorizontalLayout,
  LoadingContainer,
  Protected,
  TextField,
  Title,
  Toggle,
  VerticalLayout,
} from "components/Core";
import { DASHBOARD_ACHIEVEMENTS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import {
  createFetchAchievementsRequest,
  createUpdateAchievementRequest,
} from "requests/achievements";
import { Achievements, Images } from ".prisma/client";
import { createFetchImagesRequest } from "requests/images";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";
import ImagePicker from "components/Dashboard/ImagePicker";
import { ALLOWED_TO_EDIT_ACHIEVEMENTS } from "@constants/permissions";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<Images>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(true);
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

  const fetchAchievementHandler = useRequest<
    PortfolioAPIResponse<Achievements & { images: Images }>
  >(createFetchAchievementsRequest(currentId));

  const updateAchievementHandler = useRequest<
    PortfolioAPIResponse<Achievements>
  >(
    createUpdateAchievementRequest(
      currentId,
      title,
      subtitle,
      image?.id,
      startDate,
      isEndDateEnabled ? endDate : null
    )
  );

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubtitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value);
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

  const handleUpdateAchievement = async () => {
    const response = await updateAchievementHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_ACHIEVEMENTS);
    }
  };

  const handleInit = async () => {
    if (currentId) {
      const achievement = await fetchAchievementHandler.doRequest();
      if (!achievement.error) {
        setTitle(achievement.title);
        setSubtitle(achievement.subtitle);
        setImage(achievement.images);
        setStartDate(achievement.startDate);
        setIsEndDateEnabled(
          achievement?.endDate && achievement?.endDate !== null
        );
        setEndDate(achievement?.endDate || new Date());
      }
    }
  };

  useEffect(() => {
    handleInit();
  }, [currentId]);

  return (
    <Protected permissions={[ALLOWED_TO_EDIT_ACHIEVEMENTS]}>
      <Title text="Update achievement" />
      <LoadingContainer
        loading={
          fetchAchievementHandler.isLoading ||
          fetchImagesHandler.isLoading ||
          updateAchievementHandler.isLoading
        }
      >
        {updateAchievementHandler.error && (
          <Alert type="error">
            {updateAchievementHandler.error.toString()}
          </Alert>
        )}
        <HorizontalLayout className="fullWidth" gap={12} alignItems="center">
          <ImagePreviewButton
            selectedImage={image}
            onClick={handleOpenImagePicker}
          />
          <VerticalLayout className="fullWidth">
            <TextField
              label="Title"
              className="fullWidth"
              value={title}
              onChange={handleTitleChange}
              placeholder="Some cool title"
            />
            <TextField
              label="Subtitle"
              className="fullWidth"
              value={subtitle}
              onChange={handleSubtitleChange}
              placeholder="Name of some company"
            />
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={setStartDate}
            />
            <HorizontalLayout>
              <DatePicker
                label="End date"
                value={endDate}
                onChange={setEndDate}
                disabled={!isEndDateEnabled}
              />
              <Toggle
                enabled={isEndDateEnabled}
                onToggle={() => setIsEndDateEnabled(!isEndDateEnabled)}
              />
            </HorizontalLayout>
          </VerticalLayout>
        </HorizontalLayout>
      </LoadingContainer>
      <HorizontalLayout gap={8}>
        <Button
          onClick={handleUpdateAchievement}
          disabled={title === "" || subtitle === ""}
        >
          Update
        </Button>
        <Link href={DASHBOARD_ACHIEVEMENTS}>
          <span>
            <Button>Cancel</Button>
          </span>
        </Link>
      </HorizontalLayout>
      <ImagePicker
        title="Achievement image"
        open={isImagePickerOpen}
        onClose={handleCloseImagePicker}
        images={fetchImagesHandler.data}
        onImageSelected={handleImageChange}
      />
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
