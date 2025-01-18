import { UpdateJobOfferStatusDTOStatusEnum } from "../apis/crm/api.ts";

export function nextPossibleStatus(
  current: UpdateJobOfferStatusDTOStatusEnum,
): UpdateJobOfferStatusDTOStatusEnum[] {
  switch (current) {
    case "Created":
      return ["SelectionPhase", "Aborted"];
    case "SelectionPhase":
      return ["CandidateProposal", "Aborted"];
    case "CandidateProposal":
      return ["SelectionPhase", "Consolidated", "Aborted"];
    case "Consolidated":
      return ["SelectionPhase", "Done", "Aborted"];
    case "Done":
      return ["SelectionPhase"];
    case "Aborted":
      return [];
  }
}
