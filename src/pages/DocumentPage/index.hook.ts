import {
  DocumentControllerApi,
  DocumentMetadataDTO,
} from "../../apis/document_store/api.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  documentBlobKey,
  documentKey,
  documentVersionKey,
  messageKey,
} from "../../query/query-keys.ts";
import { MessageControllerApi } from "../../apis/crm/api.ts";
import { b64ToBlob } from "../../utils/b64toBlob.ts";
import { downloadFile } from "../../utils/downloadFile.ts";

export default function useDocumentPage() {
  const documentApi = new DocumentControllerApi();
  const messageApi = new MessageControllerApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const documentId = Number.parseInt(params.documentId ?? "nan");

  const documentQuery = useQuery({
    queryKey: documentKey({ documentId }),
    queryFn: async () =>
      documentApi.getDocument(documentId).then((res) => res.data),
  });

  const lastVersion = useQuery({
    queryKey: documentVersionKey({ documentId }),
    queryFn: async () =>
      documentApi.getDocumentLastVersion(documentId).then((res) => res.data),
  });

  async function onFromMailClick(mailId: string) {
    const res = await queryClient
      .fetchQuery({
        queryKey: messageKey({ mailId }),
        queryFn: async () =>
          messageApi.getMessageByMailId(mailId).then((res) => res.data),
      })
      .catch((err) => err.message as string | undefined);

    console.log(res);
    if (!res || typeof res === "string") return;

    navigate(`/ui/messages/${res.id}`);
  }

  async function onDownload(document: DocumentMetadataDTO, version: number) {
    const doc = await queryClient
      .fetchQuery({
        queryKey: documentBlobKey({ documentId: document.id, version }),
        queryFn: () =>
          documentApi
            .getDocumentByIdAndVersion(document.id, version)
            .then((res) => res.data),
      })
      .catch((err) => {
        alert(err.message);
        return null;
      });

    if (!doc) return;

    const blob = await b64ToBlob(doc.bytes, doc.metadata.contentType);

    downloadFile(blob, doc.metadata.name);
  }

  return { documentQuery, lastVersion, onFromMailClick, onDownload };
}
