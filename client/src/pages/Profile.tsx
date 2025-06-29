import React, { useEffect, useState } from "react";
import userService, { type User } from "../services/userService";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getMe()
      .then((data) => setUser(data))
      .catch(() => navigate("/login"));
  }, [navigate]);

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
            className="text-sm bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Edit Profile
          </button>
          <button
            onClick={async () => {
              const confirm = window.confirm(
                "Are you sure you want to deactivate your profile?"
              );
              if (confirm) {
                await userService.deactivateProfile();
                localStorage.removeItem("token");
                navigate("/login");
              }
            }}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
