import { axiosApi } from "@/shared/api/client";

export const login = async () => {
  const response = await axiosApi.post("../auth/login");
  return response.data;
};
