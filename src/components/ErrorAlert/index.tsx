import { Alert } from "@mui/material";
import { CSSProperties } from "react";

export default function ErrorAlert({
  text,
  style,
}: {
  text?: string;
  style?: CSSProperties;
}) {
  if (!text) return null;
  return (
    <Alert severity="error" style={style}>
      {text}
    </Alert>
  );
}
