import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { loginUser } from '../../Api/auth/auth'; // Adjust path based on your project structure


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const navigate = useNavigate(); // Initialize navigate
  
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  // Basic validation
  if (!formData.email || !formData.password) {
    setError('Both fields are required');
    setIsSubmitting(false);
    return;
  }

  try {
    // Call the login API
    const { token, user } = await loginUser(formData); // Assuming loginUser returns token and user info
    
    // Save user info or token if needed (already handled in loginUser via cookies)
    console.log('User logged in successfully:', user);

    setIsSubmitting(false);

    // Redirect to the home page
    navigate('/home');
  } catch (err) {
    setError(err.message || 'An error occurred. Please try again.');
    setIsSubmitting(false);
  }
};


  return (
    <div className = "w-[100%] p-2">

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login to Your Account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:text-blue-700">
            Register here
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;