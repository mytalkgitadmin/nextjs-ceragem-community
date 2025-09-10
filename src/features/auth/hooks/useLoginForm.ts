import { useState } from 'react';
import axios from 'axios';
import { ResponseErrorData } from '@/shared/api/model';
import { useLogin } from '../api';
import { RequestLogin } from '../model';

export default function useLoginForm() {
  const [loginInput, setLoginInput] = useState<RequestLogin>({
    nationalNumber: '82',
    phoneNumber: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = useLogin();

  // 폰 번호 입력 시 (-) 하이픈 포맷팅
  const onPhoneNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  };

  // 폰 번호 저장 - 하이픈 제거
  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const phoneNumber = value.replace(/[^0-9]/g, '');
    setLoginInput((prev) => ({ ...prev, phoneNumber }));
  };

  // 비밀번호 입력 시 공백 제거
  const onPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\s/g, '');
  };

  // 비밀번호 저장
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLoginInput((prev) => ({ ...prev, password: value }));
  };

  /**
   * 에러 메시지 처리 함수
   * @param error 발생한 에러
   * @returns 사용자에게 표시할 에러 메시지
   */

  const handleErrorMessage = (error: unknown): string => {
    if (!error) return '';

    // axiosError인 경우
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
      }
      // axios 응답 에러 (4xx, 5xx 상태 코드)
      return `서버 오류: ${error.response.status}`;
    }

    // ResponseErrorData 타입인지 확인
    const customError = error as ResponseErrorData;

    if (customError.status && customError.data) {
      if (customError.data.errorCode === '102105') {
        return '휴대폰 번호 또는 비밀번호를 다시 확인해주세요!';
      }
      return customError.data.localeMessage;
    }

    // 그 외 일반 에러
    return '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  };

  /**
   * 로그인 폼 제출 처리
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    login.mutate(loginInput, {
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error: unknown) => {
        setErrorMsg(handleErrorMessage(error));
      },
    });
  };

  const isFormValid =
    loginInput.phoneNumber !== '' && loginInput.password !== '' && !isLoading;

  return {
    loginInput,
    errorMsg,
    isLoading,
    isFormValid,
    onPhoneNumberInput,
    onPhoneNumberChange,
    onPasswordInput,
    onPasswordChange,
    handleSubmit,
  };
}
