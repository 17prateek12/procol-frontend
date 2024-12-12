import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie\


const API_URL = import.meta.env.VITE_BACKEND_URL;// Update with your backend API base URL


// Register User
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/register`, userData);
  
      console.log("Response from registration:", response);
  
      const { accessToken, user } = response.data;
  
      // Save the token in cookies
      Cookies.set("authToken", accessToken, { expires: 1 });
      Cookies.set("userId", user._id, { expires: 1 });
      Cookies.set("userName", user.username, { expires: 1 });
      Cookies.set("userEmail", user.email, { expires: 1 });
  
      return { user, accessToken };
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, userData);
    const { accessToken, user } = response.data; // Assuming response contains a token and user info

    // Save the token in cookies
    Cookies.set("authToken", accessToken, { expires: 1 });
    Cookies.set("userId", user._id, { expires: 1 });
    Cookies.set("userName", user.username, { expires: 1 });
    Cookies.set("userEmail", user.email, { expires: 1 });
  
    return { user, accessToken };
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Logout User
export const logoutUser = () => {
    Cookies.remove('authToken'); // Remove the token from cookies
    return { message: 'Logged out successfully' };
  };