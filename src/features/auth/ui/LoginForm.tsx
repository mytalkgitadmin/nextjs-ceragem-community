import Button from '@/shared/ui/Button/Button';
import styles from './LoginForm.module.scss';
import { IconButton } from '@/shared/ui/IconButton';
import { useState } from 'react';

interface LoginFormProps {
  errorMsg: string;
  isLoading: boolean;

  onPhoneNumberInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isFormValid: boolean;
}

export default function LoginForm({
  errorMsg,
  isLoading,
  onPhoneNumberInput,
  onPhoneNumberChange,
  onPasswordInput,
  onPasswordChange,
  onSubmit,
  isFormValid,
}: LoginFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <form onSubmit={onSubmit} className={styles.loginForm}>
      <div className={styles.formItem}>
        <label htmlFor="user-number">휴대폰 번호</label>
        <input
          name="username"
          id="user-number"
          type="tel"
          placeholder="휴대폰 번호 입력"
          onInput={onPhoneNumberInput}
          onChange={onPhoneNumberChange}
          autoComplete="tel-national"
        />
      </div>

      <div className={styles.formItem}>
        <label htmlFor="user-pw">비밀번호</label>
        <input
          id="user-pw"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="비밀번호 입력"
          onInput={onPasswordInput}
          onChange={onPasswordChange}
          autoComplete="current-password"
        />

        <IconButton
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          text={`비밀번호 ${isPasswordVisible ? '감추기' : '보기'}`}
          className={styles.eyeIcon}
          onClick={togglePasswordVisibility}
          type="button"
          aria-label={`비밀번호 ${isPasswordVisible ? '감추기' : '보기'}`}
        />
      </div>
      {/* 에러 메시지 */}
      {errorMsg && (
        <p className={styles.errorMsg} role="alert">
          {errorMsg}
        </p>
      )}

      <Button type="submit" disabled={!isFormValid} isLoading={isLoading}>
        로그인
      </Button>
    </form>
  );
}
