import { useProfileStore } from "../stores";

export const useMyProfile = () => {
  const { email, editedName, nationalNumber, phoneNumber } = useProfileStore();
  return {};
};
