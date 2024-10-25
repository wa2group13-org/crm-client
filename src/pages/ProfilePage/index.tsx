import { Box, Button, Container, Paper, Typography } from "@mui/material";
import useProfilePage from "./index.hook.ts";
import { useNavigate } from "react-router-dom";
import {
  ErrorOutlined,
  OpenInNew,
  VerifiedOutlined,
} from "@mui/icons-material";
import { ReactNode } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useProfilePage();

  if (!user?.principal) {
    navigate("/ui");
    return <></>;
  }

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", m: 5, mt: 15 }}>
        <Typography variant="h3">Welcome {user.name}</Typography>
      </Box>
      <Paper elevation={8} sx={{ borderRadius: 5, p: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <UserItem label={"Given name"} value={user.principal.givenName} />

          <UserItem label={"Family name"} value={user.principal.familyName} />

          <UserItem
            label={"Email"}
            value={
              <>
                {user.principal.email}{" "}
                {user.principal.emailVerified ? (
                  <Typography color="success" sx={{ display: "inline" }}>
                    <VerifiedOutlined />
                    Verified
                  </Typography>
                ) : (
                  <Typography color="error" sx={{ display: "inline" }}>
                    <ErrorOutlined />
                    Not verified
                  </Typography>
                )}
              </>
            }
          />

          <UserItem
            label={"Username"}
            value={user.principal.preferredUsername}
          />

          <UserItem label={"Gender"} value={user.principal.gender} />

          <UserItem label={"Birthday"} value={user.principal.birthdate} />

          <UserItem
            label={"Phone number"}
            value={
              <>
                {user.principal.phoneNumber ?? "-"}{" "}
                {user.principal.phoneNumberVerified ? (
                  <Typography color="success" sx={{ display: "inline" }}>
                    <VerifiedOutlined />
                    Verified
                  </Typography>
                ) : (
                  <Typography color="error" sx={{ display: "inline" }}>
                    <ErrorOutlined />
                    Not verified
                  </Typography>
                )}
              </>
            }
          />

          <UserItem
            label={"Roles"}
            value={(
              user.principal.claims as { realm_access: { roles: string[] } }
            ).realm_access.roles.join(", ")}
          />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <UserItem label={"Identity issuer"} value={user.principal.issuer} />
            <Button
              href={`${user.principal.issuer}/account`}
              variant="outlined"
            >
              Edit profile <OpenInNew />
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

function UserItem({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <Box>
      <Typography color="secondary">{label}</Typography>
      <Typography variant="h6">{value ?? "-"}</Typography>
    </Box>
  );
}
