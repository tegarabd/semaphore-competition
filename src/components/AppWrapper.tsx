import { A, useNavigate } from "@solidjs/router";
import { type Component, JSX, Show, createSignal, For } from "solid-js";
import { useUser } from "../context/UserContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@suid/material";
import MenuIcon from "@suid/icons-material/Menu";
import HomeIcon from "@suid/icons-material/Home";
import EmojiEventsIcon from "@suid/icons-material/EmojiEvents";
import FlagIcon from "@suid/icons-material/Flag";
import ImportContactsIcon from "@suid/icons-material/ImportContacts";

const drawerWidth = 240;

const menus = () => [
  { text: "Home", link: "/", icon: <HomeIcon /> },
  { text: "Competition", link: "/competition", icon: <EmojiEventsIcon /> },
  { text: "Practice", link: "/practice", icon: <FlagIcon /> },
  { text: "Learn", link: "/learn", icon: <ImportContactsIcon /> },
];

const AppWrapper: Component<{ children: JSX.Element }> = (props) => {
  const [anchorElUser, setAnchorElUser] = createSignal();
  const [mobileOpen, setMobileOpen] = createSignal(false);
  const { getCurrentUser, getUserAvatarUrl, logout } = useUser();
  const navigate = useNavigate();

  const signout = () => {
    logout();
    navigate("/auth/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleOpenUserMenu = (event: Event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = () => (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <For each={menus()}>
          {(menu) => (
            <>
              <ListItem sx={{ py: 0 }}>
                <ListItemButton
                  component={A}
                  href={menu.link}
                  sx={{ cursor: "pointer" }}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.text} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </For>
      </List>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              textDecoration: "inherit",
              color: "inherit",
            }}
            component={A}
            href="/"
          >
            <img
              src="/src/assets/semaphore.png"
              style={{
                width: "2.5rem",
                height: "2.5rem",
              }}
            />
            <Typography variant="h6" component="div">
              Semaphore
            </Typography>
          </Box>
          <Show when={!Boolean(getCurrentUser())}>
            <Button component={A} href="/auth/login" color="inherit">
              Login
            </Button>
          </Show>
          <Show when={Boolean(getCurrentUser())}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={getCurrentUser()?.name} src={getUserAvatarUrl()} />
            </IconButton>
          </Show>
          <Menu
            sx={{
              mt: "3rem",
            }}
            anchorEl={anchorElUser() as Element}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser())}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={signout}>
              <Typography textAlign="center">Sign out</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={document.getElementById("root") as Element}
            variant="temporary"
            open={mobileOpen()}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer()}
          </Drawer>
          <Drawer
            container={document.getElementById("root") as Element}
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer()}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {props.children}
        </Box>
      </Box>
    </>
  );
};

export default AppWrapper;
