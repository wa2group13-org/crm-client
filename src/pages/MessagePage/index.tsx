import {
  Alert,
  Avatar,
  Box,
  Button,
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
import { CSSProperties, useState } from "react";
import { AttachFile, FileDownload, Reply } from "@mui/icons-material";
import MessageHistory from "../../components/MessageHistory";
import MessageStatusDialog from "../../components/MessageStatusDialog";
import MessagePriorityDialog from "../../components/MessagePriorityDialog";
import { nextMessageStatus } from "../../machine/messageStatusStateMachine.ts";
import Decode from "../../components/Decode";
import { ContactDTO } from "../../apis/crm/api.ts";
import { useNavigate } from "react-router-dom";
import { CustomerLocationType } from "../CreateCustomerPage/index.hook.ts";
import { CreateProfessionalLocationType } from "../CreateProfessionalPage/index.hook.ts";

export default function MessagePage() {
  const { messageQuery, contactQuery, documentsQuery, download, onReplyClick } =
    useMessagePage();
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);

  if (messageQuery.isPending) return <Loading />;

  if (messageQuery.isError)
    return <Alert severity="error">{messageQuery.error.message}</Alert>;

  return (
    <Container>
      {statusOpen && (
        <MessageStatusDialog
          defaultMessage={messageQuery.data}
          open={statusOpen}
          onSubmit={() => setStatusOpen(false)}
          onCancel={() => setStatusOpen(false)}
        />
      )}
      {priorityOpen && (
        <MessagePriorityDialog
          defaultMessage={messageQuery.data}
          open={priorityOpen}
          onSubmit={() => setPriorityOpen(false)}
          onCancel={() => setPriorityOpen(false)}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            endIcon={<Reply />}
            onClick={() => onReplyClick(messageQuery.data)}
          >
            Reply
          </Button>

          <DisplayMessageContact contact={contactQuery} />
        </Box>

        <Typography>Subject: {messageQuery.data.subject}</Typography>
        <Typography>Sender: {messageQuery.data.sender}</Typography>
        <Typography>Channel: {messageQuery.data.channel} </Typography>
        <Typography>
          Priority: {messageQuery.data.priority}{" "}
          <Button onClick={() => setPriorityOpen(true)}>Change</Button>
        </Typography>
        <Typography>
          Status: {messageQuery.data.status}{" "}
          <Button
            onClick={() => setStatusOpen(true)}
            disabled={nextMessageStatus(messageQuery.data.status).length === 0}
          >
            Change
          </Button>
        </Typography>
        <Typography>Date: {messageQuery.data.date}</Typography>
        <Typography>
          Body: <Decode text={messageQuery.data.body} />
        </Typography>

        {!(documentsQuery.isPending || documentsQuery.isError) &&
          documentsQuery.data.length !== 0 && (
            <Typography>Attachments: </Typography>
          )}
        <EmailDocuments documents={documentsQuery} download={download} />

        <Typography>Message history:</Typography>
        <MessageHistory message={messageQuery.data} />
      </Box>
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

function DisplayMessageContact({
  contact,
}: {
  contact: UseQueryResult<ContactDTO, Error>;
}) {
  if (contact.isPending) return <CircularProgress />;

  if (contact.isError)
    return (
      <Alert severity="error">
        Cannot fetch the contact of the message: {contact.error.message}
      </Alert>
    );

  return (
    <>
      {contact.data.category === "Unknown" ? (
        <ConvertMessage contact={contact.data} />
      ) : (
        <MessageContactLink contact={contact.data} />
      )}
    </>
  );
}

function MessageContactLink({ contact }: { contact: ContactDTO }) {
  // TODO: get the professional/customer
  return <></>;
}

function ConvertMessage({ contact }: { contact: ContactDTO }) {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="outlined"
        onClick={() =>
          navigate("/ui/professionals/create", {
            state: { contact, fromMessage: true },
          } satisfies { state: CreateProfessionalLocationType })
        }
      >
        Convert to a Professional
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          navigate("/ui/customers/create", {
            state: { contact, fromMessage: true },
          } satisfies { state: CustomerLocationType })
        }
      >
        Convert to a Customer
      </Button>
    </>
  );
}
