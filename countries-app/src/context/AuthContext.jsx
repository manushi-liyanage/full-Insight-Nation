import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/check-auth", {
        withCredentials: true,
      });
      setUser({ email: res.data.user.email });
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (formData) => {
    const res = await axios.post("http://localhost:5000/api/login", formData, {
      withCredentials: true,
    });
    setUser({ email: res.data.email });
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/api/logout", {}, {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

