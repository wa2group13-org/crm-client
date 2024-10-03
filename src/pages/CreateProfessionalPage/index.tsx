import ContactForm from "../../components/ContactForm";
import useCreateProfessionalPage from "./index.hook.ts";

export default function CreateProfessionalPage() {
  const { mutation } = useCreateProfessionalPage();

  console.log(mutation.error);

  return (
    <>
      <ContactForm
        isPending={mutation.isPending}
        error={mutation.error}
        onSubmit={async (data, event) => {
          event?.preventDefault();
          console.log(data);
          mutation.mutate(data);
        }}
      />
    </>
  );
}
