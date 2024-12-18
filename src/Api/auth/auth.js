import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const API_URL = 'http://localhost:3000'; // Update with your backend API base URL

// Register User
export const registerUser = async (userData) => {
  try {
    
    const response = await axios.post(`http://localhost:3000/api/auth/register`, userData);

    console.log("RESPOMSE YE AYAY",response);

    const { token, user } = response.data; // Assuming response contains a token and user info



    // Save the token in cookies
    Cookies.set('authToken', token, { expires: 1 }); // Cookie expires in 1 day
    Cookies.set("userId", user._id, { expires: 1 });
    Cookies.set("userName", user.username, { expires: 1 });
    Cookies.set("userEmail", user.email, { expires: 1 });


    return { user, token };
  } catch (error) {
    console.log("ERROR AAGYA", error);
    console.error("Error during signup:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/auth/login`, userData);
    const { token, user } = response.data; // Assuming response contains a token and user info

    // Save the token in cookies
    Cookies.set('authToken', token, { expires: 1 }); // Cookie expires in 1 day
    Cookies.set("userId", user._id, { expires: 1 });
    Cookies.set("userName", user.username, { expires: 1 });
    Cookies.set("userEmail", user.email, { expires: 1 });


    return { user, token };
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