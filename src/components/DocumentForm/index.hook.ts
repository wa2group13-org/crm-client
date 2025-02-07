import { SubmitHandler } from "react-hook-form";
import { DocumentAddType } from "../../pages/DocumentCreatePage/index.hook.ts";
import { useState } from "react";

export default function useDocumentForm(
  onSubmit: SubmitHandler<DocumentAddType>,
) {
  const [file, setFile] = useState<FileList | null>(null);

  const mapOnSubmit = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();

    formData.append("file", file[0]);
    console.log(formData);
    console.log(file[0]);

    onSubmit({
      file: formData,
    });
  };

  return {
    setFile,
    onSubmit: mapOnSubmit,
  };
}
