import { DocumentMetadataDTO } from "../../apis/document_store/api.ts";
import { Box, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { bytesToBytes } from "../../utils/bytesFormat.ts";
import dayjs from "dayjs";

export default function DocumentListItem({
  document,
  style,
}: {
  document: DocumentMetadataDTO;
  style?: CSSProperties;
}) {
  return (
    <Box style={style} sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{ display: "flex", gap: 2, flexDirection: "row", flexWrap: "wrap" }}
      >
        <Typography sx={{ flexGrow: 1 }}>{document.name}</Typography>
        <Typography sx={{ flexGrow: 0 }}>
          {dayjs(document.creationTimestamp).format("LLL")}
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", gap: 2, flexDirection: "row", flexWrap: "wrap" }}
      >
        <Typography sx={{ flexGrow: 1 }}>{document.contentType}</Typography>
        <Typography sx={{ flexGrow: 0 }}>
          {bytesToBytes(document.size)}
        </Typography>
      </Box>
    </Box>
  );
}
