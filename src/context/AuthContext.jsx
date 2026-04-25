import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../utils/mainApi";

export const AuthContext = createContext({
  currentUser: null,
  isLoggedIn: false,
  token: null,
  setCurrentUser: () => {},
  setIsLoggedIn: () => {},
  setToken: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("vortyx_token");

    if (!savedToken) {
      setIsAuthChecked(true);
      return;
    }

    getCurrentUser(savedToken)
      .then((user) => {
        setToken(savedToken);
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("vortyx_token");
      })
      .finally(() => {
        setIsAuthChecked(true);
      });
  }, []);

  function logout() {
    localStorage.removeItem("vortyx_token");
    setToken(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  if (!isAuthChecked) return null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
