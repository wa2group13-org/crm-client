import { MessageActionsHistoryDTOStatusEnum } from "../apis/crm/api.ts";

export function nextMessageStatus(
  status: MessageActionsHistoryDTOStatusEnum,
): MessageActionsHistoryDTOStatusEnum[] {
  switch (status) {
    case "Read":
      return ["Discarded", "Processing", "Done"];
    case "Done":
      return [];
    case "Failed":
      return [];
    case "Received":
      return ["Read"];
    case "Discarded":
      return [];
    case "Processing":
      return ["Done", "Failed"];
  }
}
