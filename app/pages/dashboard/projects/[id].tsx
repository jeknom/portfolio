import { ChangeEvent, FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  DatePicker,
  HorizontalLayout,
  Root,
  TextField,
  TextArea,
  Title,
  VerticalLayout,
  Protected,
  LoadingContainer,
} from "components/Core";
import { DASHBOARD_PROJECTS } from "@constants/routes";
import { useRouter } from "next/router";
import { useRequest } from "hooks/requests";
import {
  createFetchProjectsRequest,
  createUpdateProjectRequest,
} from "requests/projects";
import {
  Project as PrismaProject,
  Images,
  Video,
  ProjectImage,
  ProjectVideo,
} from ".prisma/client";
import { createFetchImagesRequest } from "requests/images";
import { permissions } from "@constants/index";
import { createFetchVideosRequest } from "requests/videos";
import { ProjectDialog } from "components/Projects";
import { MediaItemList } from "components/Dashboard/Projects";
import { SelectedMedia } from "components/Dashboard/Projects/MediaItemList";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [previewProject, setPreviewProject] = useState<Project>(null);
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);
  const router = useRouter();
  const { id } = router.query;
  let currentId: number = -1;

  try {
    currentId = parseInt(id as string);
  } catch (error) {
    console.warn("Failed to parse image ID from query params");
  }

  console.log("Current id", currentId);

  const fetchProjectHandler = useRequest<
    PortfolioAPIResponse<
      Project & {
        projectImages: (ProjectImage & {
          image: Images;
        })[];
        projectVideos: (ProjectVideo & {
          video: Video;
        })[];
      }
    >
  >(createFetchProjectsRequest(currentId));

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

  const projectImages: { id?: number; imageId?: number; priority: number }[] =
    [];
  const projectVideos: { id?: number; videoId?: number; priority: number }[] =
    [];

  for (
    let mediaIndex = selectedMedia.length - 1;
    mediaIndex >= 0;
    mediaIndex--
  ) {
    const media = selectedMedia[mediaIndex];

    if (media.item.type === "image") {
      const projectImageId = fetchProjectHandler.data?.projectImages?.find(
        (img) => img.image.path === media.item.url
      )?.id;
      projectImages.push({
        id: projectImageId,
        imageId: media.id,
        priority: mediaIndex,
      });
    } else if (media.item.type === "youtubeVideo") {
      const projectVideoId = fetchProjectHandler.data?.projectVideos?.find(
        (vid) => vid.video.url === media.item.url
      )?.id;
      projectVideos.push({
        id: projectVideoId,
        videoId: media.id,
        priority: mediaIndex,
      });
    }
  }

  console.log({ projectImages, projectVideos });

  const updateProjectHandler = useRequest<PortfolioAPIResponse<PrismaProject>>(
    createUpdateProjectRequest(
      currentId,
      name,
      description,
      content,
      date,
      projectImages,
      projectVideos
    )
  );

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

  const handleLoadProject = async () => {
    const project = await fetchProjectHandler.doRequest();
    if (!project.error) {
      const { projectImages, projectVideos, name, description, date } = project;
      const selectedImages = projectImages.map(
        (i) =>
          ({
            id: i.imageId,
            description: i.image.description,
            item: { type: "image", url: i.image.path },
          } as SelectedMedia)
      );

      const selectedVideos = projectVideos.map(
        (v) =>
          ({
            id: v.videoId,
            description: v.video.description,
            item: { type: "youtubeVideo", url: v.video.url },
          } as SelectedMedia)
      );

      setName(name);
      setDescription(description);
      setDate(new Date(date));
      setSelectedMedia(selectedImages.concat(selectedVideos));
    }
  };

  const handleUpdateProject = async () => {
    const response = await updateProjectHandler.doRequest();
    if (!response.error) {
      handleLoadProject();
    }
  };

  useEffect(() => {
    if (currentId) {
      handleLoadProject();
    }
  }, [currentId]);

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_PROJECTS]}>
      <Root alignItems="center" gap={12}>
        <LoadingContainer
          loading={
            fetchImagesHandler.isLoading ||
            fetchVideosHandler.isLoading ||
            fetchProjectHandler.isLoading ||
            updateProjectHandler.isLoading
          }
        >
          <Title text="Update project" />
          {updateProjectHandler.error && (
            <Alert type="error">{updateProjectHandler.error.toString()}</Alert>
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
              onClick={handleUpdateProject}
              disabled={name === "" || description === "" || content === ""}
            >
              Update
            </Button>
            <Link href={DASHBOARD_PROJECTS}>
              <span>
                <Button>Back</Button>
              </span>
            </Link>
          </HorizontalLayout>
          <ProjectDialog
            title={name}
            open={previewProject !== null}
            onClose={handleClosePreview}
            selectedProject={previewProject}
          />
        </LoadingContainer>
      </Root>
    </Protected>
  );
};

export default Edit;
