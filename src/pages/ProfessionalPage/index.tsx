import useProfessionalPage from "../../components/PersonalInformation/index.hooks.ts";
import PersonalInformation from "../../components/PersonalInformation";
import ProfessionalInformation from "../../components/ProfessionalInformation";
import { useParams } from "react-router-dom";

export default function ProfessionalPage() {
  const { professionalId } = useParams();
  if (!professionalId) throw new Error("No professionalId provided");

  const { professional } = useProfessionalPage(Number.parseInt(professionalId));

  if (professional.isPending) return <span>Loading...</span>;

  if (professional.isError)
    return <span>Error: {professional.error.message}</span>;

  return (
    <>
      <ProfessionalInformation professional={professional.data} />
      <PersonalInformation contact={professional.data.contact} />
    </>
  );
}
