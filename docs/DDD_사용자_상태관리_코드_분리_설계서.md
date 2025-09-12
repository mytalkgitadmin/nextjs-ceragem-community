# DDD 구조 기반 사용자 상태관리 코드 분리 설계서

## 개요

기존 Recoil + React Query + localStorage 패턴을 Next.js DDD 구조에 맞춰 분리하는 설계서입니다.

---

## 1. Auth 도메인 (`src/domains/auth/`)

### 1.1 `types/auth.ts`

```typescript
// 기본 인증 상태 타입
export interface AuthState {
  accessToken: string;
  refreshToken: string;
  sessionToken: string; // SendBird용
  userId: string; // SendBird ID
  isAuthenticated: boolean;
}

// JWT 토큰 구조
export interface TokenSet {
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}

// 토큰 갱신 요청 파라미터
export interface TokenRefreshParams {
  expiredAccessToken: string;
  refreshToken: string;
}

// 로그인 응답 데이터
export interface LoginResponse {
  resultData: {
    accessToken: string;
    refreshToken: string;
    sessionToken: string;
    sendBirdId: string;
    accountProfile: AccountProfile;
  };
}
```

### 1.2 `types/login.ts`

```typescript
// 로그인 파라미터
export interface LoginParams {
  nationalNumber: string;
  phoneNumber: string;
  password: string;
}

// 로그인 폼 상태
export interface LoginFormState {
  nationalNumber: string;
  phoneNumber: string;
  password: string;
  isLoading: boolean;
  errorMessage: string;
}
```

### 1.3 `types/join.ts`

```typescript
// 회원가입 파라미터
export interface JoinParams {
  accountType: string;
  agreeMarketing: number;
  emoticonId: number;
  friendRelationMode: string;
  nationalNumber: string;
  password: string;
  phoneNumber: string;
  profileKind: string;
  profileName: string;
  profileOriginal: string;
  profileSmallThumbnail: string;
  profileThumbnail: string;
}

// 회원가입 단계 상태
export interface JoinStep {
  step: number;
  isComplete: boolean;
  data: Partial<JoinParams>;
}
```

### 1.4 `services/authService.ts`

```typescript
import { LoginParams, JoinParams, TokenRefreshParams } from "../types";

// 로그인 API
export const login = async (params: LoginParams) => {
  return await post({
    url: "/account/web/login/phone-number",
    data: params,
  });
};

// 회원가입 API
export const join = async (params: JoinParams) => {
  return await post({
    url: "/account/web/join/phone-number",
    data: params,
  });
};

// 토큰 갱신 API
export const refreshToken = async (params: TokenRefreshParams) => {
  return await post({
    url: "/auth/token/regenerate",
    data: params,
  });
};

// 로그아웃 API
export const logout = async () => {
  return await post({
    url: "/auth/logout",
  });
};
```

### 1.5 `services/tokenService.ts`

```typescript
import { TokenSet } from "../types";

// 토큰 저장
export const saveTokens = (tokens: TokenSet & { userId: string }) => {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
  localStorage.setItem("sessionToken", tokens.sessionToken);
  localStorage.setItem("userId", tokens.userId);
};

// 토큰 조회
export const getTokens = (): (TokenSet & { userId: string }) | null => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const sessionToken = localStorage.getItem("sessionToken");
  const userId = localStorage.getItem("userId");

  if (!accessToken || !refreshToken) return null;

  return {
    accessToken,
    refreshToken,
    sessionToken: sessionToken || "",
    userId: userId || "",
  };
};

// 토큰 제거
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("accountProfile");
};

// 토큰 유효성 검사
export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};
```

### 1.6 `hooks/useAuth.ts`

```typescript
"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTokens, clearTokens } from "../services/tokenService";

interface AuthStore {
  isAuthenticated: boolean;
  userId: string;
  sessionToken: string;
  login: (tokens: TokenSet & { userId: string }) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userId: "",
      sessionToken: "",

      login: (tokens) => {
        set({
          isAuthenticated: true,
          userId: tokens.userId,
          sessionToken: tokens.sessionToken,
        });
      },

      logout: () => {
        clearTokens();
        set({
          isAuthenticated: false,
          userId: "",
          sessionToken: "",
        });
      },

      checkAuth: () => {
        const tokens = getTokens();
        if (tokens?.accessToken) {
          set({
            isAuthenticated: true,
            userId: tokens.userId,
            sessionToken: tokens.sessionToken,
          });
          return true;
        }
        return false;
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        sessionToken: state.sessionToken,
      }),
    }
  )
);
```

### 1.7 `hooks/useLogin.ts`

```typescript
"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import { saveTokens } from "../services/tokenService";
import { useAuthStore } from "./useAuth";
import { LoginParams } from "../types";

export const useLogin = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginParams) => login(data),
    onSuccess: async (response) => {
      const resultData = response.data.resultData;

      // 토큰 저장
      saveTokens({
        accessToken: resultData.accessToken,
        refreshToken: resultData.refreshToken,
        sessionToken: resultData.sessionToken,
        userId: resultData.sendBirdId,
      });

      // 프로필 정보 저장
      localStorage.setItem(
        "accountProfile",
        JSON.stringify(resultData.accountProfile)
      );

      // Auth 상태 업데이트
      authStore.login({
        accessToken: resultData.accessToken,
        refreshToken: resultData.refreshToken,
        sessionToken: resultData.sessionToken,
        userId: resultData.sendBirdId,
      });

      // FCM 토큰 등록 (선택사항)
      // await registerFCMToken()

      router.push("/");
    },
  });
};
```

---

## 2. User/Profile 도메인 (`src/domains/user/`)

### 2.1 `types/profile.ts`

```typescript
// 사용자 프로필
export interface UserProfile {
  profileId: number;
  profileName: string;
  profileKind: string;
  profileOriginal: string;
  profileThumbnail: string;
  profileSmallThumbnail: string;
  emoticonId: number;
}

// 계정 프로필 (localStorage 저장용)
export interface AccountProfile {
  profile: UserProfile;
  accountType: string;
  friendRelationMode: string;
  // 기타 계정 정보
}

// 그룹 프로필 파라미터
export interface GroupProfileParams {
  emoticonId: number;
  profileId: number;
  profileKind: string;
  profileOriginal: string;
  profileSmallThumbnail: string;
  profileThumbnail: string;
}
```

### 2.2 `types/friends.ts`

```typescript
// 친구 정보
export interface Friend {
  friendId: number;
  profileName: string;
  profileThumbnail: string;
  isOnline: boolean;
  lastSeen?: Date;
}

// 친구 요청 파라미터
export interface FriendRequestParams {
  friends: { friendId: number }[];
  groupId: number;
  isSync: boolean;
}

// 친구 목록 타입
export type FriendListType = "friends" | "hideFriends" | "blockFriends";
```

### 2.3 `services/profileService.ts`

```typescript
import { GroupProfileParams } from "../types";

// 내 프로필 조회
export const getMyProfile = async () => {
  return await get({
    url: "/account/profile",
  });
};

// 프로필 수정
export const updateProfile = async (params: GroupProfileParams) => {
  return await put({
    url: "/account/profile",
    data: params,
  });
};

// 프로필 히스토리 조회
export const getProfileHistory = async () => {
  return await get({
    url: "/account/profile/history",
  });
};
```

### 2.4 `services/friendsService.ts`

```typescript
import { FriendRequestParams } from "../types";

// 친구 목록 조회
export const getFriends = async () => {
  return await get({
    url: "/friends",
  });
};

// 숨김 친구 목록 조회
export const getHiddenFriends = async () => {
  return await get({
    url: "/friends/hidden",
  });
};

// 차단 친구 목록 조회
export const getBlockedFriends = async () => {
  return await get({
    url: "/friends/blocked",
  });
};

// 친구 요청
export const requestFriend = async (params: FriendRequestParams) => {
  return await post({
    url: "/friends/request",
    data: params,
  });
};
```

### 2.5 `hooks/useProfile.ts`

```typescript
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateProfile } from "../services/profileService";
import { QUERY_KEYS } from "@/shared/api/queryKeys";

export const useProfile = () => {
  const queryClient = useQueryClient();

  // 프로필 조회
  const profileQuery = useQuery({
    queryKey: [QUERY_KEYS.me],
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000, // 5분
  });

  // 프로필 수정
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.me] });
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
};
```

### 2.6 `hooks/useFriends.ts`

```typescript
"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getFriends,
  getHiddenFriends,
  getBlockedFriends,
} from "../services/friendsService";
import { QUERY_KEYS } from "@/shared/api/queryKeys";
import { FriendListType } from "../types";

export const useFriends = (type: FriendListType = "friends") => {
  const serviceMap = {
    friends: getFriends,
    hideFriends: getHiddenFriends,
    blockFriends: getBlockedFriends,
  };

  const queryKeyMap = {
    friends: QUERY_KEYS.friends,
    hideFriends: QUERY_KEYS.hideFriends,
    blockFriends: QUERY_KEYS.blockFriends,
  };

  return useQuery({
    queryKey: [queryKeyMap[type]],
    queryFn: serviceMap[type],
    staleTime: 2 * 60 * 1000, // 2분
  });
};
```

---

## 3. Settings 도메인 (`src/domains/settings/`)

### 3.1 `types/personalSettings.ts`

```typescript
// 개인화 설정 타입
export interface PersonalSettings {
  fontSize: string;
  backgroundColor: string;
  theme: "light" | "dark";
  notifications: NotificationSettings;
}

// 알림 설정
export interface NotificationSettings {
  push: boolean;
  email: boolean;
  sms: boolean;
}

// 사용자별 설정 (localStorage 저장 구조)
export interface UserPersonalSettings {
  [userId: string]: PersonalSettings;
}
```

### 3.2 `services/settingsService.ts`

```typescript
import { PersonalSettings, UserPersonalSettings } from "../types";

// 개인 설정 저장
export const savePersonalSettings = (
  userId: string,
  settings: PersonalSettings
) => {
  const currentSettings = getPersonalSettings();
  const updatedSettings = {
    ...currentSettings,
    [userId]: settings,
  };
  localStorage.setItem("personalSettings", JSON.stringify(updatedSettings));
};

// 개인 설정 조회
export const getPersonalSettings = (): UserPersonalSettings => {
  const settings = localStorage.getItem("personalSettings");
  return settings ? JSON.parse(settings) : {};
};

// 특정 사용자 설정 조회
export const getUserSettings = (userId: string): PersonalSettings | null => {
  const allSettings = getPersonalSettings();
  return allSettings[userId] || null;
};

// 설정 초기화
export const resetSettings = (userId: string) => {
  const currentSettings = getPersonalSettings();
  delete currentSettings[userId];
  localStorage.setItem("personalSettings", JSON.stringify(currentSettings));
};
```

### 3.3 `hooks/usePersonalSettings.ts`

```typescript
"use client";
import { useState, useEffect } from "react";
import { PersonalSettings } from "../types";
import {
  savePersonalSettings,
  getUserSettings,
} from "../services/settingsService";
import { useAuthStore } from "@/domains/auth/hooks/useAuth";

const defaultSettings: PersonalSettings = {
  fontSize: "14px",
  backgroundColor: "#ebebf1",
  theme: "light",
  notifications: {
    push: true,
    email: true,
    sms: false,
  },
};

export const usePersonalSettings = () => {
  const { userId } = useAuthStore();
  const [settings, setSettings] = useState<PersonalSettings>(defaultSettings);

  // 설정 로드
  useEffect(() => {
    if (userId) {
      const userSettings = getUserSettings(userId);
      if (userSettings) {
        setSettings(userSettings);
      }
    }
  }, [userId]);

  // 설정 업데이트
  const updateSettings = (newSettings: Partial<PersonalSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    if (userId) {
      savePersonalSettings(userId, updatedSettings);
    }
  };

  // 폰트 크기 변경
  const setFontSize = (fontSize: string) => {
    updateSettings({ fontSize });
    document.documentElement.style.setProperty("--font-size", fontSize);
  };

  // 배경색 변경
  const setBackgroundColor = (backgroundColor: string) => {
    updateSettings({ backgroundColor });
    document.documentElement.style.setProperty("--bg-color", backgroundColor);
  };

  return {
    settings,
    updateSettings,
    setFontSize,
    setBackgroundColor,
  };
};
```

---

## 4. 공통 API 레이어 (`src/shared/api/`)

### 4.1 `interceptors.ts`

```typescript
import axios from "axios";
import {
  getTokens,
  saveTokens,
  clearTokens,
} from "@/domains/auth/services/tokenService";
import { refreshToken } from "@/domains/auth/services/authService";

// Request 인터셉터: 토큰 자동 주입
export const setupRequestInterceptor = (axiosInstance: any) => {
  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const tokens = getTokens();
      if (tokens?.accessToken) {
        config.headers["Authorization"] = `Bearer ${tokens.accessToken
          .replace("Bearer", "")
          .trim()}`;
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );
};

// Response 인터셉터: 토큰 자동 갱신
export const setupResponseInterceptor = (axiosInstance: any) => {
  axiosInstance.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const tokens = getTokens();
        if (tokens?.refreshToken) {
          try {
            const response = await refreshToken({
              expiredAccessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            });

            const newTokens = {
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
              sessionToken: response.data.sessionToken,
              userId: tokens.userId,
            };

            saveTokens(newTokens);

            originalRequest.headers["Authorization"] =
              `Bearer ${newTokens.accessToken.replace("Bearer", "").trim()}`;

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            clearTokens();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        } else {
          clearTokens();
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );
};
```

### 4.2 `queryKeys.ts`

```typescript
export const QUERY_KEYS = {
  // Auth
  me: "me",

  // Friends
  friends: "friends",
  hideFriends: "hideFriends",
  blockFriends: "blockFriends",

  // Profile
  profileHistory: "profileHistory",

  // Chat (SendBird)
  channels: "channels",
  messages: "messages",

  // Organization
  organization: "organization",
  members: "members",
} as const;

export type QueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
```

### 4.3 `hooks/useApiRequest.ts`

```typescript
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../client";

interface UseApiGetOptions {
  url: string;
  params?: Record<string, any>;
  queryKey: string[];
  options?: any;
}

export const useApiGet = ({
  url,
  params,
  queryKey,
  options,
}: UseApiGetOptions) => {
  return useQuery({
    queryKey: [...queryKey, params],
    queryFn: () => client.get(url, { params }),
    ...options,
  });
};

interface UseApiPostOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  invalidateQueries?: string[][];
}

export const useApiPost = (options?: UseApiPostOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ url, data }: { url: string; data: any }) =>
      client.post(url, data),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      options?.invalidateQueries?.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
    onError: options?.onError,
  });
};

// PUT, PATCH, DELETE 훅들도 동일한 패턴으로 구현
```

---

## 5. Provider 구성 (`app/providers.tsx` 확장)

### 5.1 확장된 `providers.tsx`

```typescript
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { AuthProvider } from './AuthProvider'
import { SendBirdProvider } from './SendBirdProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1분
          retry: 1,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SendBirdProvider>
          {children}
        </SendBirdProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### 5.2 `AuthProvider.tsx`

```typescript
'use client'
import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useAuthStore } from '@/domains/auth/hooks/useAuth'
import { usePersonalSettings } from '@/domains/settings/hooks/usePersonalSettings'

interface AuthContextType {
  isAuthenticated: boolean
  userId: string
  checkAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authStore = useAuthStore()
  const { settings } = usePersonalSettings()

  useEffect(() => {
    // 앱 시작 시 인증 상태 확인
    authStore.checkAuth()
  }, [])

  useEffect(() => {
    // 설정 적용
    if (settings.fontSize) {
      document.documentElement.style.setProperty('--font-size', settings.fontSize)
    }
    if (settings.backgroundColor) {
      document.documentElement.style.setProperty('--bg-color', settings.backgroundColor)
    }
  }, [settings])

  return (
    <AuthContext.Provider value={{
      isAuthenticated: authStore.isAuthenticated,
      userId: authStore.userId,
      checkAuth: authStore.checkAuth,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

---

## 6. 미들웨어 확장 (`middleware.ts`)

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호된 경로들
const protectedPaths = ["/chat", "/chat-list", "/organization"];

// 인증 관련 경로들
const authPaths = ["/login", "/signing-in"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // 보호된 경로에 비인증 사용자가 접근하는 경우
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login-required", request.url));
    }
  }

  // 인증 경로에 인증된 사용자가 접근하는 경우
  if (authPaths.some((path) => pathname.startsWith(path))) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
```

---

## 7. 페이지 컴포넌트 예시

### 7.1 `src/pages-ui/auth/LoginPage.tsx`

```typescript
'use client'
import { useState } from 'react'
import { useLogin } from '@/domains/auth/hooks/useLogin'
import { LoginParams } from '@/domains/auth/types'

export const LoginPage = () => {
  const [formData, setFormData] = useState<LoginParams>({
    nationalNumber: '82',
    phoneNumber: '',
    password: '',
  })

  const loginMutation = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="tel"
          placeholder="전화번호"
          value={formData.phoneNumber}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            phoneNumber: e.target.value
          }))}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            password: e.target.value
          }))}
        />
      </div>
      <button
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </button>
      {loginMutation.error && (
        <p className="error">
          {loginMutation.error.message}
        </p>
      )}
    </form>
  )
}
```

---

## 8. 마이그레이션 가이드

### 8.1 기존 코드에서 변경사항

1. **Recoil → Zustand**: 더 간단한 상태 관리
2. **localStorage 직접 접근 → 서비스 레이어**: 추상화를 통한 관리
3. **중복된 커스텀 훅 → 표준화된 API 훅**: 일관성 있는 패턴
4. **도메인 분리**: 각 기능별로 명확한 책임 분리

### 8.2 점진적 마이그레이션 전략

1. **1단계**: Auth 도메인 구현 및 기존 로그인 로직 교체
2. **2단계**: User/Profile 도메인 구현 및 기존 프로필 관리 교체
3. **3단계**: Settings 도메인 구현 및 개인화 설정 관리 교체
4. **4단계**: 공통 API 레이어 정리 및 중복 제거
5. **5단계**: 미들웨어 및 라우팅 보안 강화

이러한 구조로 분리하면 기존의 localStorage 중심 패턴을 유지하면서도 DDD 구조에 맞는 깔끔한 코드 분리가 가능할 것입니다.
