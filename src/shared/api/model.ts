type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface Endpoint {
  url: string;
  method: HttpMethod;
  queryConfig?: {
    staleTime?: number;
    gcTime?: number;
    refetchInterval?: number | false;
    refetchOnWindowFocus?: boolean;
    enabled?: boolean;
  };
}

export interface ApiResponse<T> {
  result: boolean;
  resultData: T;
}

// API 응답 타입 정의
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

// API 요청 파라미터 타입 정의
export interface RequestParams {
  [key: string]:
    | string
    | number
    | boolean
    | Array<string | number | boolean>
    | null
    | undefined;
}

// API 요청 옵션 타입 정의
export interface ApiRequestOptions {
  url: string;
  data?: unknown;
  params?: RequestParams;
  pathParams?: Record<string, string | number>;
}

// 에러 관련
export interface ErrorDetails {
  failCount: number;
}

export interface ErrorData {
  timestamp: string;
  status: 400 | 500 | number;
  error: 'Bad Request' | string;
  path: string;
  localeMessage: string; // 'ex. 휴대폰 번호 또는 비밀번호를 잘못 입력하였습니다.(1/10)'
  requestId: string;
  errorCode: LoginErrorCode;
  errorDetails: ErrorDetails;
}

export interface ResponseErrorData {
  status: 400 | 500 | number;
  message: string;
  data: ErrorData;
}

export type LoginErrorCode =
  | '102105' // 가입된 계정이 없음
  | '102002' // 비밀번호 오류
  | '102107' // 계정 정지
  | '102108' // 세션 토큰 없음
  | string; // 기타 에러
