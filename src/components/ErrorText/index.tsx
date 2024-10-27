import { Typography } from "@mui/material";
import { CSSProperties } from "react";

export default function ErrorText({
  text,
  style,
}: {
  text?: string | null;
  style?: CSSProperties;
}) {
  if (!text) return null;
  return (
    <Typography style={style} color="error">
      {text}
    </Typography>
  );
}
