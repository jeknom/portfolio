import { ChangeEvent, FC, useState } from "react";
import { useRequest } from "hooks/requests";
import Link from "next/link";
import Image from "next/image";
import {
  Project,
  Images,
  Video,
  ProjectImage,
  ProjectVideo,
} from ".prisma/client";
import {
  List,
  LoadingContainer,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  ListItemActions,
  Button,
  Dialog,
  Alert,
  Sidebar,
  Protected,
} from "components/Core";
import {
  createDeleteProjectRequest,
  createFetchProjectsRequest,
} from "requests/projects";
import dashboardRoutes from "@constants/dashboardRoutes";
import {
  DASHBOARD_PROJECTS,
  DASHBOARD_PROJECTS_CREATE,
} from "@constants/routes";
import DialogActions from "components/Core/Dialog/DialogActions";
import { permissions } from "@constants/index";

interface ProjectsProps {}

interface ProjectItemProps {
  project: Project & {
    projectImages: (ProjectImage & {
      image: Images;
    })[];
    projectVideos: (ProjectVideo & {
      video: Video;
    })[];
  };
  onDelete: (
    project: Project & {
      projectImages: (ProjectImage & {
        image: Images;
      })[];
      projectVideos: (ProjectVideo & {
        video: Video;
      })[];
    }
  ) => void;
}

const ProjectItem: FC<ProjectItemProps> = ({ project, onDelete }) => {
  const coverImage =
    project.projectImages.length > 0 ? project.projectImages[0] : null;
  const imageElement = coverImage ? (
    <ListItemIcon>
      <div className="image">
        <Image
          src={coverImage.image.path}
          alt={coverImage.image?.description}
          layout="responsive"
          width={64}
          height={64}
          objectFit="cover"
        />
      </div>
      <style jsx>{`
        .image {
          width: 64px;
          height: 64px;
        }
      `}</style>
    </ListItemIcon>
  ) : null;

  return (
    <ListItem>
      {imageElement}
      <ListItemText
        primary={project.name}
        secondary={`${project.description} (${new Date(
          project.date
        ).toLocaleDateString()})`}
      />
      <ListItemActions>
        <Link href={`${DASHBOARD_PROJECTS}/${project.id}`}>
          <span>
            <Button>Edit</Button>
          </span>
        </Link>
        <Button onClick={() => onDelete(project)}>Delete</Button>
      </ListItemActions>
    </ListItem>
  );
};

const Project: FC<ProjectsProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [projectToDelete, setProjectToDelete] = useState<
    Project & {
      projectImages: (ProjectImage & {
        image: Images;
      })[];
      projectVideos: (ProjectVideo & {
        video: Video;
      })[];
    }
  >(null);
  const fetchProjectsHandler = useRequest<
    PortfolioAPIResponse<
      (Project & {
        projectImages: (ProjectImage & {
          image: Images;
        })[];
        projectVideos: (ProjectVideo & {
          video: Video;
        })[];
      })[]
    >
  >(createFetchProjectsRequest(), {
    doRequestOnMount: true,
    defaultValue: [],
  });
  const deleteProjectsHandler = useRequest<PortfolioAPIResponse<Project>>(
    createDeleteProjectRequest(projectToDelete?.id)
  );

  const projectElements = fetchProjectsHandler.data
    .filter((project) =>
      project.name.toLocaleLowerCase().includes(searchText.toLowerCase())
    )
    .map((project) => (
      <ProjectItem
        key={project.id}
        project={project}
        onDelete={setProjectToDelete}
      />
    ));

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCloseDeleteConfirmation = () => {
    setProjectToDelete(null);
  };

  const handleDeleteProject = async () => {
    await deleteProjectsHandler.doRequest();
    fetchProjectsHandler.doRequest();

    handleCloseDeleteConfirmation();
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchProjectsHandler?.error) {
      errorMessage = fetchProjectsHandler.error;
    } else if (deleteProjectsHandler?.error) {
      errorMessage = deleteProjectsHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_PROJECTS]}>
      <Sidebar routes={dashboardRoutes} selectedRoute={DASHBOARD_PROJECTS} />
      <TextField
        className="fullWidth"
        placeholder="Search for projects"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      {getAlert()}
      <LoadingContainer loading={fetchProjectsHandler.isLoading}>
        {projectElements.length === 0 && (
          <p className="captionText">
            There seems to be no projects here, create a new one!
          </p>
        )}
        <List>{projectElements}</List>
      </LoadingContainer>
      <Link href={DASHBOARD_PROJECTS_CREATE}>
        <span>
          <Button>Add new</Button>
        </span>
      </Link>
      <Dialog
        title="Delete project"
        open={projectToDelete !== null}
        onClose={handleCloseDeleteConfirmation}
      >
        <p className="secondaryText">
          Are you sure you would like to delete this project?
        </p>
        <DialogActions>
          <Button onClick={handleDeleteProject}>Delete</Button>
          <Button onClick={handleCloseDeleteConfirmation}>Close</Button>
        </DialogActions>
      </Dialog>
    </Protected>
  );
};

export default Project;
