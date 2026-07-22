//client/src/hooks/useAuth.js
import { useMemo } from "react";
import { getToken, logout } from "../utils/auth";

export default function useAuth() {
  const token = getToken();

  const user = useMemo(() => {
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }, [token]);

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  return {
    user,
    token,
    isLoggedIn,
    isAdmin,
    logout,
  };
}
