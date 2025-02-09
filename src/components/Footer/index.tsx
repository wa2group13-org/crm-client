import { Box, Link, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper elevation={1} sx={{ width: "100%", position: "sticky" }}>
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography>CRM13</Typography>
            <br />
            <Typography>
              <Link href="mailto:it.polito.wa2.g13@gmail.com">Contact us</Link>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography>LINKS</Typography>
            <br />
            <Typography>
              <Link href="https://github.com/wa2group13-org">Repository</Link>
            </Typography>
            <Typography>
              <Link href="https://hub.docker.com/u/wa2group13">
                Docker images
              </Link>
            </Typography>
          </Box>
        </Box>

        <br />
        <Typography variant="body2">
          Website: CRM13&trade;; Authors:{" "}
          <Link href="https://github.com/Brendon-Mendicino">
            Brendon Mendicino
          </Link>
          ,{" "}
          <Link href="https://github.com/salvogiarracca">
            Salvatore Giarracca
          </Link>
          , <Link href="https://github.com/ciullante">Alessandro Ciullo</Link>,{" "}
          <Link href="https://github.com/mecios01">Andrea Bonvissuto</Link>.
        </Typography>
      </Box>
    </Paper>
  );
}
