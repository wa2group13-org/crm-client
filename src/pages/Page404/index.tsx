import { Container, Typography } from "@mui/material";

export default function Page404() {
  return (
    <Container>
      <Typography variant="h2">Error 404 page not found.</Typography>
      <br />
      <Typography>This page does not exits...</Typography>
      <Typography>
        Somehow you lost yourself by clicking some link a sketchy website...
      </Typography>
      <Typography>Be careful when surfing the web...</Typography>
    </Container>
  );
}
