import { createContext, useContext, useState, useEffect } from "react";
import { getStoredUser, logoutUser } from "../utils/auth";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authData = getStoredUser();
    if (authData) {
      setUser(authData.user);
      setToken(authData.access);
    }
  }, []);

  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify({ user, access: token }));
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
  
  };

  const value = {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
