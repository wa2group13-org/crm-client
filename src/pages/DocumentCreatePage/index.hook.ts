import { useMutation } from "@tanstack/react-query";
import { documentDataKey } from "../../query/query-keys.ts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export type DocumentAddType = {
  file: FormData;
};

export default function useDocumentCreatePage() {
  // const documentApi = new DocumentControllerApi();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: documentDataKey({}),
    mutationFn: async (data: FormData) =>
      axios
        .post(`http://localhost:8080/document_store/API/documents`, data, {
          headers: {
            "Content-Type": undefined,
          },
        })
        .then((res) => res.data),
    // documentApi.addDocument({ file: data }),
  });

  async function onSubmit(data: DocumentAddType) {
    console.log(data.file.get("file"));

    await mutation.mutateAsync(data.file);

    navigate(-1);
  }

  function onCancel() {
    navigate(-1);
  }

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    onSubmit,
    onCancel,
  };
}
