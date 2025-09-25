// 비즈니스 로직 조합

"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/authStore";
import { login as loginApi } from "../api/login";
import { useProfileStore } from "@/domains/profile/stores";

export const useAuth = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const profileStore = useProfileStore();

  const login = async (to: string) => {
    try {
      const response = await loginApi();
      if (!response || !response.ok || !response.data)
        throw new Error("로그인 실패");

      console.log("로그인 성공:", response);

      authStore.login({
        sessionToken: response.data.sessionToken,
        sendBirdId: response.data.sendBirdId,
      });

      const { accountProfile } = response.data;
      const agreement = accountProfile.agreement || false; //TODO: API 파라미터 확인 필요

      profileStore.setProfile({
        email: accountProfile.email,
        editedName: accountProfile.editedName,
        nationalNumber: accountProfile.nationalNumber,
        phoneNumber: accountProfile.phoneNumber,
        agreement,
      });

      if (!agreement) {
        router.replace("/consent");
      } else {
        router.replace(to || "/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      router.replace("/invalid-state");
    }
  };

  return {
    // 상태
    sessionToken: authStore.sessionToken,
    sendBirdId: authStore.sendBirdId,

    // 액션
    login,
  };
};
