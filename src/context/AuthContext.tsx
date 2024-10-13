// context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import IUser from "../models/User";
import { getUserById } from "../services/api/user.api";

interface AuthContextType {
  token: string | null;
  user: IUser | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        const decoded: IUser= jwtDecode(token);
        const userInfo = await getUserById(decoded._id);
        setUser(userInfo);
      } else {
        setUser(null);
      }
    };
    fetchUserInfo();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
