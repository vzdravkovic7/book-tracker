export const getFileFromInputEvent = (e: React.ChangeEvent<HTMLInputElement>): File | null => {
  if (!e.target.files || e.target.files.length === 0) {
    return null;
  }
  return e.target.files[0];
};