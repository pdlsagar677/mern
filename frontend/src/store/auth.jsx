import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(""); // Store the token state
  const [user, setUser] = useState(""); // Store the user data
  const [services, setServices] = useState([]); // Store services data
  const [isLoading, setIsLoading] = useState(true);

  const authAuthorizationToken = `Bearer ${token}`;

  // Store token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Check if user is logged in
  const isLoggedIn = !!token;

  // Logout function: Reset token, remove from localStorage, refresh page
  const LogoutUser = () => {
    setToken(""); // Reset token state
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.reload(); // Refresh the page
  };

  // Fetch user data from the server using the token
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/auth/user", {
        headers: {
          Authorization: authAuthorizationToken,
        },
      });

      if (response.status === 200) {
        setUser(response.data.userData);
        setIsLoading(false);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
    }
  };

  // Fetch services data
  const getServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data/service");
      if (response.status === 200) {
        setServices(response.data.data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Service frontend error:", error);
    }
  };

  // Use effect hooks to load user and services data when token changes
  useEffect(() => {
    if (token) {
      userAuthentication();
      getServices();
    }
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser, // Pass the LogoutUser function to the context
        setToken, // Ensure setToken is available in the context
        user,
        services,
        authAuthorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
