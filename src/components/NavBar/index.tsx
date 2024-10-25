import useNavBar from "./index.hooks.ts";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { UserDTO } from "../../apis/api-gateway/api.ts";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  const { user, onLogin, pages, menuSettings } = useNavBar();

  return (
    <AppBar>
      <Toolbar>
        <NavBarMd pages={pages} />

        <NavBarXs pages={pages} />

        {user?.principal && (
          <ProfileAvatar settings={menuSettings} user={user} />
        )}

        {user?.principal === null && (
          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={onLogin}>Login</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

function NavBarMd({
  pages,
}: {
  pages: { name: string; navigate: () => void }[];
}) {
  const navigate = useNavigate();

  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#"
        onClick={() => navigate("/ui")}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        CRM13
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.name}
            onClick={page.navigate}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
}

function NavBarXs({
  pages,
}: {
  pages: { name: string; navigate: () => void }[];
}) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.name}
              onClick={() => {
                handleCloseNavMenu();
                page.navigate();
              }}
            >
              <Typography sx={{ textAlign: "center" }}>{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Typography
        variant="h5"
        noWrap
        component="a"
        href="#"
        onClick={() => navigate("/ui")}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        CRM13
      </Typography>
    </>
  );
}

function ProfileAvatar({
  settings,
  user,
}: {
  settings: { label: string; onClick: () => void }[];
  user: UserDTO;
}) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.name} src={user.principal?.picture} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.label}
            onClick={() => {
              setting.onClick();
              handleCloseUserMenu();
            }}
          >
            <Typography sx={{ textAlign: "center" }}>
              {setting.label}
            </Typography>
          </MenuItem>
        ))}

        <Divider />

        <form method={"post"} action={user.logoutUrl}>
          <input type={"hidden"} name={"_csrf"} value={user.xsrfToken} />
          <MenuItem component="button" type="submit">
            Logout
          </MenuItem>
        </form>
      </Menu>
    </Box>
  );
}
