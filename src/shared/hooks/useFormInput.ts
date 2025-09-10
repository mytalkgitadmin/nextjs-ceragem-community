// 공통 Form Input 관리 Hook

import { useState, useCallback, ChangeEvent } from "react";

export interface InputValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

export interface InputFormatter {
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => string;
}

export interface UseFormInputOptions {
  initialValue?: string;
  validation?: InputValidationRule;
  formatter?: InputFormatter;
}

/**
 * Form Input 상태와 검증을 관리하는 공통 Hook
 * @param options 초기값, 검증 규칙, 포맷터 설정
 * @returns input 상태와 핸들러 함수들
 */
export function useFormInput(options: UseFormInputOptions = {}) {
  const { initialValue = "", validation = {}, formatter = {} } = options;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState(false);

  // 검증 함수
  const validateValue = useCallback(
    (inputValue: string): string => {
      const { required, minLength, maxLength, pattern, custom } = validation;

      if (required && !inputValue.trim()) {
        return "필수 입력 항목입니다.";
      }

      if (minLength && inputValue.length < minLength) {
        return `최소 ${minLength}글자 이상 입력해주세요.`;
      }

      if (maxLength && inputValue.length > maxLength) {
        return `최대 ${maxLength}글자까지 입력 가능합니다.`;
      }

      if (pattern && !pattern.test(inputValue)) {
        return "올바른 형식으로 입력해주세요.";
      }

      if (custom && !custom(inputValue)) {
        return "입력 조건을 만족하지 않습니다.";
      }

      return "";
    },
    [validation]
  );

  // Input 이벤트 핸들러 (포맷팅)
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (formatter.onInput) {
        formatter.onInput(event);
      }
    },
    [formatter]
  );

  // Change 이벤트 핸들러 (값 저장 + 검증)
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;

      // 포맷터 적용
      if (formatter.onChange) {
        newValue = formatter.onChange(newValue);
      }

      setValue(newValue);

      // 터치된 상태에서만 실시간 검증
      if (touched) {
        setError(validateValue(newValue));
      }
    },
    [formatter, touched, validateValue]
  );

  // Blur 이벤트 핸들러 (터치 상태 설정 + 검증)
  const handleBlur = useCallback(() => {
    setTouched(true);
    setError(validateValue(value));
  }, [value, validateValue]);

  // 폼 제출 검증
  const validate = useCallback((): boolean => {
    setTouched(true);
    const errorMessage = validateValue(value);
    setError(errorMessage);
    return !errorMessage;
  }, [value, validateValue]);

  // 리셋
  const reset = useCallback(() => {
    setValue(initialValue);
    setError("");
    setTouched(false);
  }, [initialValue]);

  return {
    value,
    error,
    touched,
    isValid: !error && touched,
    handleInput,
    handleChange,
    handleBlur,
    validate,
    reset,
  };
}
