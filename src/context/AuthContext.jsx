import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function hydrateUser() {
      try {
        const res = await fetch("http://127.0.0.1:5000/auth/current_user", {
          credentials: "include",
        });
        if (!res.ok) {
          if (isMounted) setUser(null);
          return;
        }
        const data = await res.json();
        if (isMounted) setUser(data.user);
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    hydrateUser();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
