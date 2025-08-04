import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        formData,
        { withCredentials: true }
      );
      dispatch(hideLoading());

      if (res.data.success) {
        toast.success(res.data.message || "Login successful");
        localStorage.setItem("token", res.data.data);
        navigate("/");
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex bg-gray-700 items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between items-center text-sm mt-[-13px]">
          <Link to="/forgot-password">
            <span className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </span>
          </Link>
          <span>
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-blue-600 text-sm hover:underline">
                Register
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
