import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login updates the user state and stores the token
  const login = ({ token, userType, id }) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authType", userType);
    localStorage.setItem("authId", id);
    setUser({ type: userType, id });
  };

  // Logout clears the user state and removes the token
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  // Check localStorage for an authToken on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const type = localStorage.getItem("authType");
    const id = localStorage.getItem("authId");
    if (token) {
      // Optional: Verify token validity with the server or decode it if it's a JWT
      setUser({ type, id }); // Simplify, adjust based on your logic or token decoding
    }
  }, []);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
