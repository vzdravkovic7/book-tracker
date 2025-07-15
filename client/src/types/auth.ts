export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  username: string;
  email: string;
  password: string;
  profileImageUrl?: string;
}
