import { ProfessionalDTO } from "../../apis/crm/api.ts";

export default function useProfessionalItem(professional: ProfessionalDTO) {
  function avatarString(name: string) {
    return `${name
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase())
      .slice(0, 3)
      .join("")}`;
  }

  return {
    avatarString: avatarString(
      `${professional.contact.name} ${professional.contact.surname}`,
    ),
  };
}
