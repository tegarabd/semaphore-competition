import { Outlet, Route, Routes, useNavigate } from "@solidjs/router";
import type { Component } from "solid-js";
import { Toaster } from "solid-toast";
import NavBar from "./components/NavBar";
import { useUser } from "./context/UserContext";
import Competition from "./pages/Competition";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Practice from "./pages/Practice";
import Register from "./pages/Register";

const App: Component = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/auth" component={RequireNoAuth}>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Route>
        <Route path="/" component={NavigationWrapper}>
          <Route path="/" component={Home} />
          <Route path="/competition" component={Competition} />
          <Route path="/learn" component={Learn} />
          <Route path="/practice" component={Practice} />
        </Route>
      </Routes>
    </>
  );
};

const NavigationWrapper: Component = () => {
  return (
    <>
      <NavBar>
        <Outlet />
      </NavBar>
    </>
  );
};

const RequireNoAuth: Component = () => {
  const { getCurrentUser } = useUser();
  const navigate = useNavigate();

  if (getCurrentUser()) {
    navigate("/");
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
