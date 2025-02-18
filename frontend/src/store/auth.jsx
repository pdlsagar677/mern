import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(""); // Store the token state
  const [user, setUser] = useState(null);   // Initialize user as null
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
    setToken("");
    localStorage.removeItem("token");
    window.location.reload();
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
        setUser(response.data.userData); // Expecting userData to include role info
        setIsLoading(false);
      } else {
        console.error("Error fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
      setIsLoading(false);
    }
  };

  // Fetch services data (including the token in the header)
  const getServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/services", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": authAuthorizationToken,
        },
      });
      if (response.status === 200) {
        setServices(response.data.data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Service frontend error:", error);
    }
  };

  // Use effect hook to load user and services data when token changes
  useEffect(() => {
    if (token) {
      userAuthentication();
      getServices();
    }
  }, [token]);

  // On mount, load token from localStorage if available
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        setToken,
        user,
        services,
        setServices,
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
