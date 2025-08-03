export type ProfileUpdate = {
  firstName: string;
  lastName: string;
  email?: string; // Optional email field
}

export type ChangePasswordData = {
    newPassword: string;
    confirmPassword: string;
}