import { ChangeEvent, FC, useState } from "react";
import { useRequest } from "hooks/requests";
import Link from "next/link";
import { Achievements, Images } from ".prisma/client";
import {
  List,
  LoadingContainer,
  ListItem,
  ListItemIcon,
  ListItemText,
  NavBar,
  TextField,
  ListItemActions,
  Button,
  Dialog,
  Alert,
  Sidebar,
  Protected,
  VerticalLayout,
} from "components/Core";
import {
  createDeleteAchievementRequest,
  createFetchAchievementsRequest,
} from "requests/achievements";
import dashboardRoutes from "@constants/dashboardRoutes";
import {
  DASHBOARD_ACHIEVEMENTS,
  DASHBOARD_ACHIEVEMENTS_CREATE,
} from "@constants/routes";
import DialogActions from "components/Core/Dialog/DialogActions";
import { permissions } from "@constants/index";

interface AchievementPageProps {}

interface AchievementItemProps {
  achievement: Achievements & { images: Images };
  onDelete: (achievement: Achievements & { images: Images }) => void;
}

const AchievementItem: FC<AchievementItemProps> = ({
  achievement,
  onDelete,
}) => {
  return (
    <ListItem>
      <ListItemIcon>
        <img
          src={achievement.images?.path || ""}
          alt={achievement.subtitle}
          width={64}
          height={64}
        />
      </ListItemIcon>
      <ListItemText
        primary={achievement.title}
        secondary={`${achievement.subtitle} (${new Date(
          achievement.startDate
        ).toLocaleDateString()})`}
      />
      <ListItemActions>
        <Link href={`${DASHBOARD_ACHIEVEMENTS}/${achievement.id}`}>
          <span>
            <Button>Edit</Button>
          </span>
        </Link>
        <Button onClick={() => onDelete(achievement)}>Delete</Button>
      </ListItemActions>
    </ListItem>
  );
};

const AchievementPage: FC<AchievementPageProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [achievementToDelete, setAchievementToDelete] = useState<
    Achievements & { images: Images }
  >(null);
  const fetchAchievementsHandler = useRequest<
    PortfolioAPIResponse<(Achievements & { images: Images })[]>
  >(createFetchAchievementsRequest(), {
    doRequestOnMount: true,
    defaultValue: [],
  });
  const deleteAchievementsHandler = useRequest<
    PortfolioAPIResponse<Achievements>
  >(createDeleteAchievementRequest(achievementToDelete?.id));

  const achievementElements = fetchAchievementsHandler.data
    .filter((achievement) =>
      achievement.title.toLocaleLowerCase().includes(searchText.toLowerCase())
    )
    .map((achievement) => (
      <AchievementItem
        key={achievement.id}
        achievement={achievement}
        onDelete={setAchievementToDelete}
      />
    ));

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCloseDeleteConfirmation = () => {
    setAchievementToDelete(null);
  };

  const handleDeleteAchievement = async () => {
    await deleteAchievementsHandler.doRequest();
    fetchAchievementsHandler.doRequest();

    handleCloseDeleteConfirmation();
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchAchievementsHandler?.error) {
      errorMessage = fetchAchievementsHandler.error;
    } else if (deleteAchievementsHandler?.error) {
      errorMessage = deleteAchievementsHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_ACHIEVEMENTS]}>
      <Sidebar
        routes={dashboardRoutes}
        selectedRoute={DASHBOARD_ACHIEVEMENTS}
      />
      <LoadingContainer loading={fetchAchievementsHandler.isLoading}>
        <VerticalLayout className="fullWidth" alignItems="center" gap={12}>
          <TextField
            className="fullWidth"
            placeholder="Search for achievements"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          {getAlert()}
          {achievementElements.length === 0 && (
            <p className="captionText">
              There seems to be no achievements here, create a new one!
            </p>
          )}
          <List>{achievementElements}</List>
          <Link href={DASHBOARD_ACHIEVEMENTS_CREATE}>
            <span>
              <Button>Add new</Button>
            </span>
          </Link>
        </VerticalLayout>
      </LoadingContainer>
      <Dialog
        title="Delete achievement"
        open={achievementToDelete !== null}
        onClose={handleCloseDeleteConfirmation}
      >
        <p className="secondaryText">
          Are you sure you would like to delete this achievement?
        </p>
        <DialogActions>
          <Button onClick={handleDeleteAchievement}>Delete</Button>
          <Button onClick={handleCloseDeleteConfirmation}>Close</Button>
        </DialogActions>
      </Dialog>
      <style jsx global>{`
        .__appRoot {
          margin-top: 1rem;
        }
      `}</style>
    </Protected>
  );
};

export default AchievementPage;
