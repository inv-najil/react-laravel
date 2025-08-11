import { createContext, useContext, useState, useEffect } from "react";
import { getStoredUser, logoutUser } from "../utils/auth";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = getStoredUser();
    if (authData) {
      setUser(authData.user);
      setToken(authData.access);
    }
    setLoading(false);
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
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
