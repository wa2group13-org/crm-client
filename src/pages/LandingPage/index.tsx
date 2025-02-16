import { Box, Container, Divider, Typography } from "@mui/material";

export default function LandingPage() {
  return (
    <Container>
      <Box></Box>
      <Typography align="center" variant="h2">
        Welcome to the generic Content Relationship Management!
      </Typography>
      <Divider />

      <Typography sx={{ mt: 10 }} variant="h4">
        Manage your job applications and your job offers!
      </Typography>
      <Divider />

      <Typography sx={{ mt: 15 }}>
        The best among the worst CRM available!
      </Typography>
      <Divider />
    </Container>
  );
}
