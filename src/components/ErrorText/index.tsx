import { Typography } from "@mui/material";
import { CSSProperties } from "react";

export default function ErrorText({
  text,
  style,
}: {
  text?: string | null;
  style?: CSSProperties;
}) {
  return (
    text && (
      <Typography style={style} color="error">
        {text}
      </Typography>
    )
  );
}
