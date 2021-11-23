import { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  DatePicker,
  HorizontalLayout,
  Root,
  TextField,
  Title,
  VerticalLayout,
  Toggle,
  Protected,
} from "components/Core";
import { DASHBOARD_ACHIEVEMENTS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import { createAchievementRequest } from "requests/achievements";
import { Achievements, Images } from ".prisma/client";
import { createFetchImagesRequest } from "requests/images";
import ImagePreviewButton from "components/Dashboard/ImagePreviewButton";
import ImagePicker from "components/Dashboard/ImagePicker";
import { permissions } from "@constants/index";

interface CreateProps {}

const Create: FC<CreateProps> = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(true);
  const [image, setImage] = useState<Images>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );

  const createAchievementHandler = useRequest<
    PortfolioAPIResponse<Achievements>
  >(
    createAchievementRequest(
      title,
      subtitle,
      image?.id,
      startDate,
      isEndDateEnabled ? endDate : null
    )
  );
  const router = useRouter();

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

  const handleCreateAchievement = async () => {
    const response = await createAchievementHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_ACHIEVEMENTS);
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_ACHIEVEMENTS]}>
      <Root alignItems="center" gap={12}>
        <Title text="Create new achievement" />
        {createAchievementHandler.error && (
          <Alert type="error">
            {createAchievementHandler.error.toString()}
          </Alert>
        )}
        <HorizontalLayout className="fullWidth" alignItems="center" gap={32}>
          <ImagePreviewButton
            selectedImage={image}
            onClick={handleOpenImagePicker}
          />
          <VerticalLayout className="fullWidth">
            <TextField
              className="fullWidth"
              label="Title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Some cool title"
            />
            <TextField
              className="fullWidth"
              label="Subtitle"
              value={subtitle}
              onChange={handleSubtitleChange}
              placeholder="Name of an organization"
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
        <HorizontalLayout gap={8}>
          <Button
            onClick={handleCreateAchievement}
            disabled={title === "" || subtitle === "" || !image}
          >
            Create
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
