import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";

const UpdateUserProfile = () => {
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/get-user-profile`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        const user = res.data.data;

        setFormData(user);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataFile = new FormData();
    formDataFile.append("image", file);

    try {
      dispatch(showLoading());

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/upload-profile-pic`,
        formDataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        toast.success("Image uploaded");
        setFormData((prev) => ({
          ...prev,
          profilePicture: res.data.imageUrl,
        }));
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Upload error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, ...rest } = formData;
    try {
      dispatch(showLoading());
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update-user-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <Layout>
      <div>
        <h1 className="page-title text-center">Update Your Profile</h1>
        <br />
        <hr className="text-green-300" /> <br />
        <div className="">
          <form action="" className="doc-form " onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="profilePicture"
                className="cursor-pointer bg-green-300 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Upload Image
              </label>

              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                name="profilePicture"
                onChange={handleImageUpload}
                className="hidden"
              /> <br /> <br />
              {formData?.profilePicture && (
                <img
                  src={`${import.meta.env.VITE_API_URL}${
                    formData.profilePicture
                  }`}
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginTop: "10px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-5">
                <label htmlFor="" className="text-blue-800">
                  First Name:{" "}
                </label>
                <input
                  type="text"
                  className=" p-2 rounded border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                  name="fname"
                  value={formData?.fname || ""}
                  onChange={handleChange}
                  placeholder="Dayun"
                  required
                  style={{ width: "100%", border: "1px solid green" }}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="" className="text-blue-800">
                  Last Name:{" "}
                </label>
                <input
                  type="text"
                  className=" p-2 rounded border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                  name="lname"
                  value={formData?.lname || ""}
                  onChange={handleChange}
                  placeholder="Beetrat"
                  required
                  style={{ width: "100%", border: "1px solid green" }}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="" className="text-blue-800">
                  Email:{" "}
                </label>
                <input
                  type="text"
                  className=" p-2 rounded border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                  name="email"
                  value={formData?.email || ""}
                  onChange={handleChange}
                  placeholder="email"
                  required
                  style={{ width: "100%", border: "1px solid green" }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-900 hover:bg-green-600 text-white w-full text-2xl font-semibold py-2 px-6 rounded transition duration-200 cursor-pointer"
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUserProfile;
