import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import useMessagePage from "./index.hook.ts";
import Loading from "../../components/Loading";
import { DocumentMetadataDTO } from "../../apis/document_store/api.ts";
import { UseQueryResult } from "@tanstack/react-query";
import { bytesToBytes } from "../../utils/bytesFormat.ts";
import { CSSProperties } from "react";
import { AttachFile, FileDownload } from "@mui/icons-material";

export default function MessagePage() {
  const { messageQuery, documentsQuery, download } = useMessagePage();

  if (messageQuery.isPending) return <Loading />;

  if (messageQuery.isError)
    return <Alert severity="error">{messageQuery.error.message}</Alert>;

  return (
    <Container>
      <Typography>Subject: {messageQuery.data.subject}</Typography>
      <Typography>Sender: {messageQuery.data.sender}</Typography>
      <Typography>Channel: {messageQuery.data.channel}</Typography>
      <Typography>Priority: {messageQuery.data.priority}</Typography>
      <Typography>Status: {messageQuery.data.status}</Typography>
      <Typography>Date: {messageQuery.data.date}</Typography>
      <Typography>Body: {messageQuery.data.body}</Typography>

      {!(documentsQuery.isPending || documentsQuery.isError) &&
        documentsQuery.data.length !== 0 && (
          <Typography>Attachments: </Typography>
        )}

      <EmailDocuments documents={documentsQuery} download={download} />
    </Container>
  );
}

function EmailDocuments({
  style,
  documents,
  download,
}: {
  style?: CSSProperties;
  documents: UseQueryResult<DocumentMetadataDTO[], Error>;
  download: (document: DocumentMetadataDTO) => Promise<void>;
}) {
  if (documents.isPending) {
    return (
      <Typography>
        <CircularProgress /> Loading documents...
      </Typography>
    );
  }

  if (documents.isError)
    return <Alert severity="error">{documents.error.message}</Alert>;

  return (
    <Stack
      style={style}
      direction="row"
      justifyContent="flex-start"
      flexWrap="wrap"
      gap={2}
    >
      {documents.data.map((document) => (
        <Card key={document.id} variant="elevation">
          <CardContent>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar variant="rounded">
                <AttachFile />
              </Avatar>

              <Box>
                <Typography noWrap>{document.name}</Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Typography sx={{ flexGrow: 1 }}>
                    {document.contentType}
                  </Typography>
                  <Typography sx={{ flexGrow: 0 }}>
                    {bytesToBytes(document.size)}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <IconButton onClick={() => download(document)}>
                  <FileDownload />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
