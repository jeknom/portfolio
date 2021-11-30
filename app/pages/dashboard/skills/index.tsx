import { ChangeEvent, FC, useState } from "react";
import { useRequest } from "hooks/requests";
import Link from "next/link";
import { Skills, Images } from ".prisma/client";
import {
  Root,
  List,
  LoadingContainer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Sidebar,
  TextField,
  ListItemActions,
  Button,
  Dialog,
  Alert,
  Protected,
} from "components/Core";
import {
  createDeleteSkillRequest,
  createFetchSkillsRequest,
} from "requests/skills";
import dashboardRoutes from "@constants/dashboardRoutes";
import { DASHBOARD_SKILLS, DASHBOARD_SKILLS_CREATE } from "@constants/routes";
import DialogActions from "components/Core/Dialog/DialogActions";
import { permissions } from "@constants/index";

interface SkillsProps {}

interface SkillItemProps {
  skill: Skills & { images: Images };
  onDelete: (skill: Skills & { images: Images }) => void;
}

const SkillItem: FC<SkillItemProps> = ({ skill, onDelete }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <img
          src={skill.images?.path || ""}
          alt={`${skill.name} icon`}
          width={64}
          height={64}
        />
      </ListItemIcon>
      <ListItemText primary={skill.name} secondary={`Score ${skill.score}`} />
      <ListItemActions>
        <Link href={`${DASHBOARD_SKILLS}/${skill.id}`}>
          <span>
            <Button>Edit</Button>
          </span>
        </Link>
        <Button onClick={() => onDelete(skill)}>Delete</Button>
      </ListItemActions>
    </ListItem>
  );
};

const Skills: FC<SkillsProps> = () => {
  const [searchText, setSearchText] = useState("");
  const [skillToDelete, setSkillToDelete] = useState<
    Skills & { images: Images }
  >(null);
  const fetchSkillsHandler = useRequest<
    PortfolioAPIResponse<(Skills & { images: Images })[]>
  >(createFetchSkillsRequest(), {
    doRequestOnMount: true,
    defaultValue: [],
  });
  const deleteSkillHandler = useRequest<PortfolioAPIResponse<Skills>>(
    createDeleteSkillRequest(skillToDelete?.id)
  );

  const skillElements = fetchSkillsHandler.data
    .filter((skill) =>
      skill.name.toLocaleLowerCase().includes(searchText.toLowerCase())
    )
    .map((skill) => (
      <SkillItem key={skill.id} skill={skill} onDelete={setSkillToDelete} />
    ));

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleCloseDeleteConfirmation = () => {
    setSkillToDelete(null);
  };

  const handleDeleteSkill = async () => {
    await deleteSkillHandler.doRequest();
    fetchSkillsHandler.doRequest();

    handleCloseDeleteConfirmation();
  };

  const getAlert = () => {
    let errorMessage = "";

    if (fetchSkillsHandler?.error) {
      errorMessage = fetchSkillsHandler.error;
    } else if (deleteSkillHandler?.error) {
      errorMessage = deleteSkillHandler.error;
    }

    return errorMessage !== "" ? (
      <Alert type="error">{errorMessage}</Alert>
    ) : null;
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_SKILLS]}>
      <Root alignItems="center" justifyContent="center" gap={12}>
        <Sidebar routes={dashboardRoutes} selectedRoute={DASHBOARD_SKILLS} />
        <TextField
          className="fullWidth"
          placeholder="Search for skills"
          value={searchText}
          onChange={handleSearchTextChange}
        />
        {getAlert()}
        <LoadingContainer loading={fetchSkillsHandler.isLoading}>
          {skillElements.length === 0 && (
            <p className="captionText">
              There seems to be no skills here, create a new one!
            </p>
          )}
          <List>{skillElements}</List>
        </LoadingContainer>
        <Link href={DASHBOARD_SKILLS_CREATE}>
          <span>
            <Button>Add new</Button>
          </span>
        </Link>
        <Dialog
          title="Delete skill"
          open={skillToDelete !== null}
          onClose={handleCloseDeleteConfirmation}
        >
          <p className="secondaryText">
            Are you sure you would like to delete this skill?
          </p>
          <DialogActions>
            <Button onClick={handleDeleteSkill}>Delete</Button>
            <Button onClick={handleCloseDeleteConfirmation}>Close</Button>
          </DialogActions>
        </Dialog>
      </Root>
    </Protected>
  );
};

export default Skills;