import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  documentBlobKey,
  documentsKey,
  messageKey,
} from "../../query/query-keys.ts";
import { MessageControllerApi, MessageDTO } from "../../apis/crm/api.ts";
import {
  DocumentControllerApi,
  DocumentMetadataDTO,
} from "../../apis/document_store/api.ts";
import dayjs from "dayjs";
import { downloadFile } from "../../utils/downloadFile.ts";
import { b64ToBlob } from "../../utils/b64toBlob.ts";
import { CreateEmailDTO } from "../../apis/communication_manager/api.ts";

export default function useMessagePage() {
  const { messageId: messageIdParam } = useParams();
  if (!messageIdParam) throw new Error("No messageId provided!");
  const messageId = Number.parseInt(messageIdParam);
  const messageApi = new MessageControllerApi();
  const documentApi = new DocumentControllerApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const messageQuery = useQuery({
    queryKey: messageKey(messageId),
    queryFn: () => messageApi.getMessageById(messageId).then((res) => res.data),
  });

  const documentsQuery = useQuery({
    queryKey: documentsKey({ mailId: messageQuery.data?.mailId }),
    queryFn: async () =>
      messageQuery.data?.mailId == null
        ? [
            {
              name: "sium.png",
              size: 1000,
              id: 1,
              creationTimestamp: dayjs().toISOString(),
              contentType: "image/png",
            },
            {
              name: "sium.png",
              size: 1000,
              id: 2,
              creationTimestamp: dayjs().toISOString(),
              contentType: "image/png",
            },
          ]
        : // TODO: change this when updating the controller
          await documentApi
            .getDocumentByMailId(messageQuery.data?.mailId)
            .then((res) => [res.data]),
    enabled: !(messageQuery.isPending || messageQuery.isError),
  });

  async function download(document: DocumentMetadataDTO) {
    let doc = await queryClient
      .fetchQuery({
        queryKey: documentBlobKey({ documentId: document.id }),
        queryFn: () =>
          documentApi.getDocumentBytes(document.id).then((res) => res.data),
      })
      .catch((err) => alert(err.message));

    // TODO: remove this as well...
    doc = {
      bytes:
        "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
      metadata: document,
    };

    if (!doc) return;

    const blob = await b64ToBlob(doc.bytes, doc.metadata.contentType);

    downloadFile(blob, doc.metadata.name);
  }

  function onReplyClick(message: MessageDTO) {
    const groups =
      message.sender.match(/(<(?<inner>[^>]+)>$)|(^(?<plain>[^ ]+)$)/)
        ?.groups ?? {};

    const reply: CreateEmailDTO = {
      recipient: groups.inner ?? groups.plain ?? "",
      subject: "",
      body: "",
    };

    navigate("/ui/messages/create", { state: reply });
  }

  return { messageQuery, documentsQuery, download, onReplyClick };
}
