import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Button, HorizontalLayout, TextField } from "components/Core";
import Protected from "components/Core/Protected";
import { permissions } from "@constants/index";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  const [id, setId] = useState("");
  const router = useRouter();

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (id !== "") {
      router.push(`/dashboard/posts/edit/${id}`);
    }
  };

  return (
    <Protected permissions={[permissions.ALLOWED_TO_EDIT_POSTS]}>
      <p className="primaryText">
        Please, type in the ID of the post you are looking for
      </p>
      <form onSubmit={handleSubmit}>
        <HorizontalLayout gap={8}>
          <TextField
            className="fullWidth"
            value={id}
            onChange={handleIdChange}
            placeholder="Post ID"
          />
          <Button disabled={id === ""} onClick={() => handleSubmit()}>
            GO
          </Button>
        </HorizontalLayout>
      </form>
      <style jsx global>{`
        .__appRoot {
          min-height: 50vh;
        }
      `}</style>
    </Protected>
  );
};

export default Edit;
