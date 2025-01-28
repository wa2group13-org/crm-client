import useDocumentPage from "./index.hook.ts";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Loading from "../../components/Loading";
import { bytesToBytes } from "../../utils/bytesFormat.ts";
import { FileDownload, OpenInNew } from "@mui/icons-material";
import { ComponentProps, ReactNode, useState } from "react";
import { DocumentMetadataDTO } from "../../apis/document_store/api.ts";
import { naturalSequence } from "../../utils/generator.ts";

export default function DocumentPage() {
  const { documentQuery, lastVersion, onFromMailClick, onDownload } =
    useDocumentPage();

  if (documentQuery.isPending || lastVersion.isPending) return <Loading />;

  if (documentQuery.isError)
    return (
      <Container>
        <Alert severity="error">{documentQuery.error.message}</Alert>
      </Container>
    );

  if (lastVersion.isError)
    return (
      <Container>
        <Alert severity="error">{lastVersion.error.message}</Alert>
      </Container>
    );

  const document = documentQuery.data;
  const mailId = document.mailId;

  return (
    <Container sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Typography>Name: {document.name}</Typography>
      <Typography>Content type: {document.contentType}</Typography>
      <Typography>Size: {bytesToBytes(document.size)}</Typography>
      <Typography>Creation timestamp: {document.creationTimestamp}</Typography>
      {mailId && (
        <LoadingButton
          buttonProps={{
            variant: "outlined",
            endIcon: <OpenInNew />,
          }}
          onClick={() => onFromMailClick(mailId)}
        >
          From email
        </LoadingButton>
      )}

      <DownloadVersions
        document={document}
        lastVersion={lastVersion.data}
        onDownload={onDownload}
      />
    </Container>
  );
}

function DownloadVersions({
  document,
  lastVersion,
  onDownload,
}: {
  document: DocumentMetadataDTO;
  lastVersion: number;
  onDownload: (document: DocumentMetadataDTO, version: number) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState(lastVersion);

  return (
    <>
      <Typography variant="h3">Download different versions</Typography>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
            <Typography>Download: </Typography>
            <Box>
              <IconButton
                onClick={() => {
                  setLoading(true);
                  onDownload(document, version).then(() => setLoading(false));
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : <FileDownload />}
              </IconButton>
            </Box>

            <FormControl fullWidth>
              <InputLabel id="document-page-selct-version">Version</InputLabel>
              <Select
                value={version}
                onChange={(event) => setVersion(event.target.value as number)}
                variant="outlined"
                label="Version"
                labelId="document-page-selct-version"
              >
                {naturalSequence(lastVersion).map((version) => (
                  <MenuItem key={version} value={version}>
                    {version}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

function LoadingButton({
  onClick,
  buttonProps,
  children,
}: {
  onClick: () => Promise<void>;
  buttonProps?: ComponentProps<typeof Button>;
  children?: ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      {...buttonProps}
      onClick={() => {
        setLoading(true);
        onClick().then(() => setLoading(false));
      }}
    >
      {loading && <CircularProgress size={"sm"} />}
      {children}
    </Button>
  );
}
