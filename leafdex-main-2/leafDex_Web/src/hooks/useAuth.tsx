// src/hooks/useAuth.tsx (New File)
import { useContext } from 'react';
// Import the context from your new contexts folder
import { AuthContext } from '../hooks/authContent';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Enforce that the hook is used inside a Provider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};