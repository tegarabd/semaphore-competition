import { Component, createContext, useContext, JSX } from "solid-js";
import { LoginData, RegisterData } from "../schema/user";
import usePocket, { POCKET_URL } from "../lib/pocketbase";

const useValue = () => {
  const pb = usePocket();

  const getCurrentUser = () => {
    return pb.authStore.model;
  };

  const getUserAvatarUrl = () => {
    const user = getCurrentUser();

    if (user == null) {
      return "/src/assets/semaphore.png";
    }

    return `${POCKET_URL}/api/files/_pb_users_auth_/${user.id}/${user.avatar}`;
  };

  const login = async (loginData: LoginData) => {
    return await pb
      .collection("users")
      .authWithPassword(loginData.usernameOrEmail, loginData.password);
  };

  const register = async (registerData: RegisterData) => {
    return await pb.collection("users").create({
      username: registerData.step2.username,
      email: registerData.step1.email,
      password: registerData.step1.password,
      passwordConfirm: registerData.step1.confirmPassword,
      name: registerData.step2.name,
      avatar: registerData.step3.avatarFile,
      role: "user",
    });
  };

  const logout = () => {
    pb.authStore.clear();
  };

  return {
    getCurrentUser,
    getUserAvatarUrl,
    login,
    logout,
    register,
  };
};

const UserContext = createContext({} as ReturnType<typeof useValue>);

export const UserProvider: Component<{ children: JSX.Element }> = (props) => {
  return (
    <UserContext.Provider value={useValue()}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
