import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  contactKey,
  documentBlobKey,
  documentsKey,
  messageKey,
} from "../../query/query-keys.ts";
import {
  ContactControllerApi,
  MessageControllerApi,
  MessageDTO,
} from "../../apis/crm/api.ts";
import {
  DocumentControllerApi,
  DocumentMetadataDTO,
} from "../../apis/document_store/api.ts";
import { downloadFile } from "../../utils/downloadFile.ts";
import { b64ToBlob } from "../../utils/b64toBlob.ts";
import { CreateEmailDTO } from "../../apis/communication_manager/api.ts";

export default function useMessagePage() {
  const { messageId: messageIdParam } = useParams();
  if (!messageIdParam) throw new Error("No messageId provided!");
  const messageId = Number.parseInt(messageIdParam);

  const messageApi = new MessageControllerApi();
  const documentApi = new DocumentControllerApi();
  const contactApi = new ContactControllerApi();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const messageQuery = useQuery({
    queryKey: messageKey(messageId),
    queryFn: () => messageApi.getMessageById(messageId).then((res) => res.data),
  });

  const documentsQuery = useQuery({
    queryKey: documentsKey({ mailId: messageQuery.data?.mailId }),
    queryFn: async () =>
      !messageQuery.data?.mailId
        ? []
        : await documentApi
            .getDocumentByMailId(messageQuery.data?.mailId)
            .then((res) => res.data),
    enabled: !(messageQuery.isPending || messageQuery.isError),
  });

  const contactQuery = useQuery({
    queryKey: contactKey({ contactId: messageQuery.data?.contactId }),
    queryFn: async () =>
      contactApi
        .getContactById(messageQuery.data?.contactId ?? 0)
        .then((res) => res.data),
    enabled: messageQuery.data?.contactId != null,
  });

  async function download(document: DocumentMetadataDTO) {
    const doc = await queryClient
      .fetchQuery({
        queryKey: documentBlobKey({ documentId: document.id }),
        queryFn: () =>
          documentApi.getDocumentBytes(document.id).then((res) => res.data),
      })
      .catch((err) => alert(err.message));

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

  return { messageQuery, contactQuery, documentsQuery, download, onReplyClick };
}
