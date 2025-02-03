import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(""); // Token retrieved from localStorage
  const [user, setUser] = useState(null); // User data, initially null
  const [loading, setLoading] = useState(true); // Loading state to handle data fetching

  // Retrieve token from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Set token if exists
    } else {
      setLoading(false); // No token, no need to fetch user data
    }
  }, []); // Only runs on mount

  // Function to fetch user data based on the token
  const userAuthentication = async () => {
    if (!token) {
      setLoading(false); // If no token, stop loading
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData); // Set user data from API
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching or error
    }
  };

  // Run userAuthentication if the token changes
  useEffect(() => {
    if (token) {
      userAuthentication(); // Fetch user data when token is set
    } else {
      setLoading(false); // If no token, stop loading
    }
  }, [token]); // Dependency on token change

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken); // Store token in localStorage
  };

  const LogoutUser = () => {
    setToken("");
    setUser(null); // Clear user data on logout
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
