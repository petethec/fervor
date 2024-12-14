import { useState, useCallback } from 'react';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Mock authentication
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        avatar: 'https://source.unsplash.com/100x100/?portrait',
        fervorBucks: 1000,
        badges: []
      };
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return { user, loading, error, login, logout };
}