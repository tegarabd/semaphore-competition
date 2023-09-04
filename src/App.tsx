import type { Component } from "solid-js";
import { Outlet, Route, Routes, useNavigate } from "@solidjs/router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Competition from "./pages/Competition";
import Register from "./pages/Register";
import Wrapper from "./components/Wrapper";
import { Toaster } from "solid-toast";
import Learn from "./pages/Learn";
import { useUser } from "./context/UserContext";
import Practice from "./pages/Practice";

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
      <Wrapper />
      <div class="p-4 sm:ml-64">
        <div class="p-4 mt-14">
          <Outlet />
        </div>
      </div>
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
