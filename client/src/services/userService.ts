import axios from "./api";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  username: string;
  email: string;
  profileImageUrl: string;
  registrationDate: string;
}

export interface EditUserDTO {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  username: string;
  profileImageUrl?: string;
  newPassword?: string;
  email: string;
}

const getMe = async () => {
  const res = await axios.get<User>("/user/me");
  return res.data;
};

const updateProfile = async (data: EditUserDTO) => {
  const res = await axios.put("/user/edit", data);
  return res.data;
};

const uploadProfileImage = async (file: File, isTemporary = false): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const endpoint = isTemporary
    ? "/user/upload-temp-profile-image"
    : "/user/upload-profile-image";

  const res = await axios.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.imageUrl;
};

const deactivateProfile = async () => {
  const res = await axios.put("/user/deactivate");
  return res.data;
};

export default {
  getMe,
  updateProfile,
  uploadProfileImage,
  deactivateProfile,
};
