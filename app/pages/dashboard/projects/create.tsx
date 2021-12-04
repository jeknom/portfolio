import { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  DatePicker,
  HorizontalLayout,
  TextField,
  TextArea,
  Title,
  VerticalLayout,
  Protected,
} from "components/Core";
import { DASHBOARD_PROJECTS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import { createProjectRequest } from "requests/projects";
import { Project as PrismaProject, Images, Video } from ".prisma/client";
import { createFetchImagesRequest } from "requests/images";
import { permissions } from "@constants/index";
import { createFetchVideosRequest } from "requests/videos";
import { ProjectDialog } from "components/Projects";
import { MediaItemList } from "components/Dashboard/Projects";
import { SelectedMedia } from "components/Dashboard/Projects/MediaItemList";

interface CreateProps {}

const Create: FC<CreateProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [previewProject, setPreviewProject] = useState<Project>(null);
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);

  const fetchImagesHandler = useRequest<PortfolioAPIResponse<Images[]>>(
    createFetchImagesRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );

  const fetchVideosHandler = useRequest<PortfolioAPIResponse<Video[]>>(
    createFetchVideosRequest(),
    {
      doRequestOnMount: true,
      defaultValue: [],
    }
  );

  const projectImages: { imageId: number; priority: number }[] = [];
  const projectVideos: { videoId: number; priority: number }[] = [];

  for (
    let mediaIndex = selectedMedia.length - 1;
    mediaIndex >= 0;
    mediaIndex--
  ) {
    const media = selectedMedia[mediaIndex];
    if (media.item.type === "image") {
      projectImages.push({ imageId: media.id, priority: mediaIndex });
    } else if (media.item.type === "youtubeVideo") {
      projectVideos.push({ videoId: media.id, priority: mediaIndex });
    }
  }

  const createProjectHandler = useRequest<PortfolioAPIResponse<PrismaProject>>(
    createProjectRequest(
      name,
      description,
      content,
      date,
      projectImages,
      projectVideos
    )
  );

  const router = useRouter();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const media: MediaItem[] = selectedMedia.map((m) => m.item);

  const handleOpenPreview = () => {
    setPreviewProject({
      name,
      description,
      content,
      date: date.toISOString(),
      media,
    });
  };

  const handleClosePreview = () => {
    setPreviewProject(null);
  };

  const handleCreateProject = async () => {
    const response = await createProjectHandler.doRequest();
    if (!response.error) {
      router.push(DASHBOARD_PROJECTS);
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_PROJECTS]}>
      <Title text="Create new project" />
      {createProjectHandler.error && (
        <Alert type="error">{createProjectHandler.error.toString()}</Alert>
      )}
      <HorizontalLayout className="fullWidth" alignItems="center" gap={32}>
        <VerticalLayout className="fullWidth">
          <TextField
            className="fullWidth"
            label="Name"
            value={name}
            onChange={handleNameChange}
            placeholder="The best project"
          />
          <TextField
            className="fullWidth"
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="This is a project where I did this and that. It was awesome!"
          />
          <DatePicker label="Date" value={date} onChange={setDate} />
          <MediaItemList
            images={fetchImagesHandler.data}
            videos={fetchVideosHandler.data}
            selectedMedia={selectedMedia}
            onSelectedMediaChange={setSelectedMedia}
          />
          <VerticalLayout>
            <p className="secondaryText">Content</p>
            <TextArea
              className="fullWidth"
              value={content}
              onChange={handleContentChange}
              rows={25}
            />
          </VerticalLayout>
        </VerticalLayout>
      </HorizontalLayout>
      <HorizontalLayout gap={8}>
        <Button onClick={handleOpenPreview}>Preview</Button>
        <Button
          onClick={handleCreateProject}
          disabled={name === "" || description === "" || content === ""}
        >
          Create
        </Button>
        <Link href={DASHBOARD_PROJECTS}>
          <span>
            <Button>Cancel</Button>
          </span>
        </Link>
      </HorizontalLayout>
      <ProjectDialog
        title={name}
        open={previewProject !== null}
        onClose={handleClosePreview}
        selectedProject={previewProject}
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

export default Create;
