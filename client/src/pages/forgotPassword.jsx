import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/forgot-password`, { email }, {withCredentials: true},);

      if (res.data.success) {
        toast.success("Password reset link sent to your email");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
