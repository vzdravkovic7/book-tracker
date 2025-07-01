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
