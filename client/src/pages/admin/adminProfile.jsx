import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";

const AdminProfile = () => {
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

  if (!user) return <p className="text-center">Loading the Admin profile...</p>;

  return (
    <Layout>
      <div>
        <h1 className="page-title">Admin Profile</h1>
        <p className="text-center text-3xl">Admin!</p> <br />
        <div className="flex justify-center me-[10%]">
          {user?.profilePicture && (
            <img
              src={`${import.meta.env.VITE_API_URL}${user.profilePicture}`}
              alt="Profile"
              style={{
                width: "40%",
                aspectRatio: "1",
                objectFit: "cover",
                margin: "20px 0",
                borderRadius: "50%",
              }}
            />
          )}
        </div>{" "}
      </div>
    </Layout>
  );
};

export default AdminProfile;
