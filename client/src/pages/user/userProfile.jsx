import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const fetchUserProfile = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/get-user-profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        setUser(response.data.data);
      } else {
        toast.error("Failed to load user profile");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!user) return <p className="text-center">Loading user profile...</p>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          User Profile
        </h1>
        <div className="flex justify-center me-[30%]">
          {user?.profilePicture && (
            <img
              src={`${import.meta.env.VITE_API_URL}${user.profilePicture}`}
              alt="Profile"
              style={{
                // width:"clamp(60px, 20vw, 150px)",
                width: "30%",
                aspectRatio: "1",
                objectFit: "cover",
                margin: "20px 0",
                borderRadius: "50%",
              }}
            />
          )}
        </div>{" "}
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong>Full Name:</strong> {user.fname} {user.lname}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
