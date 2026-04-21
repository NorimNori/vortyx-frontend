import { createContext, useContext } from "react";

export const AuthContext = createContext({
  currentUser: null,
  isLoggedIn: false,
});

export function useAuth() {
  return useContext(AuthContext);
}
