import axios from "./api";

import type { User } from "../types";

const getMe = async () => {
  const res = await axios.get<User>("/User/me");
  return res.data;
};

const updateProfileFormData = async (data: FormData) => {
  const res = await axios.put("/User/edit", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

const deactivateProfile = async () => {
  const res = await axios.put("/User/deactivate");
  return res.data;
};

export default {
  getMe,
  updateProfileFormData,
  deactivateProfile,
};
