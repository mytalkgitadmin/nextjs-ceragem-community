"use client";
/**
 * 인증 관련 비즈니스 로직 모듈화
 * @description 로그인, 로그아웃, 인증 상태 관리 및 토큰 갱신을 처리하는 훅
 */
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/features/auth/api";
import { ResponseGetProfile } from "@/features/auth/api";
import { useAuthStore } from "../authStore";

/**
 * 인증 관련 기능을 제공하는 커스텀 훅
 * @returns 인증 상태, 사용자 정보 및 인증 관련 함수들
 */
export function useAuth() {
  const router = useRouter();

  const {
    isAuthenticated,
    accessToken,
    userProfile,
    userId,
    sessionToken,
    logout,
    updateUserProfile,
  } = useAuthStore();

  /**
   * 사용자 프로필 데이터 가져오기
   * @description 인증된 사용자의 프로필 정보를 조회하고 전역 상태로 저장
   */
  const {
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: refetchProfile,
    data: profileData,
  } = useUserProfile({
    onSuccess: (data: ResponseGetProfile) => {
      if (data?.resultData?.accountProfile) {
        updateUserProfile(data.resultData.accountProfile);
      } else {
        console.warn("프로필 데이터가 없거나 형식이 올바르지 않습니다:", data);
      }
    },
    enabled: !!accessToken && isAuthenticated,
    retry: false,
  });

  /**
   * 로그아웃 처리 함수
   */
  const handleLogout = useCallback(() => {
    // 로그아웃 전 확인
    const confirmed = window.confirm("정말 로그아웃 하시겠습니까?");

    if (confirmed) {
      router.push("/");
      logout();
    }
  }, [logout, router]);

  /**
   * 토큰 유효성 검사 및 갱신
   * @description 앱 시작 시 토큰 상태를 확인하고 필요시 갱신
   */
  const refreshUserProfile = useCallback(() => {
    if (isAuthenticated && accessToken) {
      refetchProfile();
    }
  }, [isAuthenticated, accessToken, refetchProfile]);

  /**
   * 페이지 포커스 시 토큰 유효성 재검사
   */
  useEffect(() => {
    if (isAuthenticated && accessToken && !userProfile) {
      // userProfile이 없을 때만 로드
      refetchProfile();
    }
  }, [isAuthenticated, accessToken, userProfile, refetchProfile]);

  /**
   * 프로필 데이터 변경 감지 시 store 업데이트
   * @description API에서 받은 프로필 데이터와 store의 데이터가 다를 때 업데이트
   */
  useEffect(() => {
    // ResponseGetProfile 타입으로 타입 단언
    const typedProfileData = profileData as ResponseGetProfile | undefined;

    // result가 true이고 resultData가 존재할 때만 처리
    if (
      typedProfileData?.result === true &&
      typedProfileData.resultData?.accountProfile
    ) {
      const newAccountProfile = typedProfileData.resultData.accountProfile;

      // 현재 userProfile과 비교하여 변경된 경우에만 업데이트
      if (JSON.stringify(newAccountProfile) !== JSON.stringify(userProfile)) {
        console.log(
          "프로필 데이터 변경 감지, store 업데이트:",
          newAccountProfile
        );
        updateUserProfile(newAccountProfile);
      }
    }
  }, [profileData, userProfile, updateUserProfile]);

  return {
    isAuthenticated,
    accessToken,
    userProfile,
    userId,
    sessionToken,
    isProfileLoading,
    isProfileError,
    handleLogout,
    refreshUserProfile,
    refetchProfile,
    updateUserProfile,
  };
}
