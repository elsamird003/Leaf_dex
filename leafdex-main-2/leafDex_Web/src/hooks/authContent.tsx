// src/contexts/AuthContext.tsx (or similar path based on usePlants import)
import React, { createContext, useState, useEffect } from 'react';

// Define the shape of the user data we store
interface User {
  username: string;
}

// Define the shape of the context's public value (what components consume)
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from local storage on initial app load
  useEffect(() => {
    const storedUser = localStorage.getItem('leafdex_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('leafdex_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('leafdex_user');
    localStorage.removeItem('leafdex_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};