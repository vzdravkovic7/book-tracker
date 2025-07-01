import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/common/ConfirmDialog";
import userService from "../services/userService";
import type { User } from "../types";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getMe()
      .then((data) => setUser(data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleDeactivate = async () => {
    try {
      await userService.deactivateProfile();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Failed to deactivate profile:", err);
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-textDark dark:text-textLight">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-backgroundLight to-background dark:from-background dark:to-backgroundLight flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-backgroundLight dark:bg-background text-textDark dark:text-textLight p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 space-y-6 transition-colors duration-300">
        <h2 className="text-3xl sm:text-4xl font-bold text-center font-heading">
          Profile Information
        </h2>

        <div className="flex flex-col items-center gap-4">
          <img
            src={`http://localhost:5209${
              user.profileImageUrl ?? "/Images/profile/default.jpg"
            }`}
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border border-gray-400 shadow-md"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 text-sm sm:text-base">
          <div>
            <strong>Full Name:</strong> {user.firstName} {user.lastName}
          </div>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Phone:</strong> {user.phoneNumber}
          </div>
          <div>
            <strong>Address:</strong> {user.address}
          </div>
          <div>
            <strong>Joined:</strong>{" "}
            {new Date(user.registrationDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={() => navigate("/edit-profile")}
            className="text-sm px-4 py-2 rounded-lg transition-colors duration-300 
              bg-primary text-white hover:bg-secondary 
              dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
          >
            Edit Profile
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm px-4 py-2 rounded-lg transition-colors duration-300 
              bg-red-500 hover:bg-red-600 text-white 
              dark:bg-red-400 dark:hover:bg-red-600 dark:text-gray-900"
          >
            Deactivate
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeactivate}
        message="Are you sure you want to deactivate your profile?"
      />
    </div>
  );
};

export default Profile;
