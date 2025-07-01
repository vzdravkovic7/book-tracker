export const isPhoneValid = (phone: string) => /^\+?[0-9\s\-]{7,15}$/.test(phone);

export const isPasswordConfirmed = (password: string, confirmPassword: string) => password === confirmPassword;
