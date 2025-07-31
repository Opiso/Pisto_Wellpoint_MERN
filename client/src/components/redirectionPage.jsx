import React from "react";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";

const RedirectionPage = () => {
  const navigate = useNavigate();
  const appName = "Pisto WellPoint";

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-gradient-to-br from-blue-50 to-white">
        <h1 className="text-4xl md:text-5xl font text-blue-700 mb-6">
          Welcome to {appName}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-4">
          <span className="font-semibold text-blue-600">{appName}</span> is your trusted space
          for connecting with highly experienced doctors. We make healthcare access
          <span className="font-semibold"> simple</span>,{" "}
          <span className="font-semibold">smart</span>, and{" "}
          <span className="font-semibold">secure</span>.
        </p>
        <p className="text-base text-gray-500 mb-6">
          Already have an account? Log in below to access your dashboard.
        </p>
        <button
          onClick={handleLoginClick}
          className="button-expand"
        >
          Go to Login
        </button>
      </div>
    </Layout>
  );
};

export default RedirectionPage;
