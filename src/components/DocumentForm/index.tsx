import useDocumentForm from "./index.hook.ts";
import { Box, Button, CircularProgress, Divider } from "@mui/material";
import ErrorText from "../ErrorText";
import { DocumentAddType } from "../../pages/DocumentCreatePage/index.hook.ts";
import { useUser } from "../../contexts/userContext.tsx";

export default function DocumentForm({
  onSubmit,
  onCancel,
  isPending,
  error,
}: {
  onSubmit: (doc: DocumentAddType) => void;
  isPending?: boolean;
  error?: Error | null;
  onCancel?: () => void;
}) {
  const user = useUser();
  const { onSubmit: newOnSubmit, setFile } = useDocumentForm(onSubmit);

  return (
    <form
      onSubmit={(e) => {
        e?.preventDefault();
        newOnSubmit();
      }}
      // action="/document_store/API/documents"
      // encType="multipart/form-data"
      // method="post"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files)}
        />

        {/*<input type="hidden" name="_csrf" value={user?.xsrfToken} />*/}

        <Divider />

        <ErrorText text={error?.message} />

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={isPending}>
            Submit {isPending && <CircularProgress />}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
