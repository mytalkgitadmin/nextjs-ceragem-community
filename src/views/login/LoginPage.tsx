import LoginForm from '@/features/auth/ui/LoginForm';
import useLoginForm from '@/features/auth/hooks/useLoginForm';

export default function LoginPage() {
  const {
    errorMsg,
    isLoading,
    isFormValid,
    onPhoneNumberInput,
    onPhoneNumberChange,
    onPasswordInput,
    onPasswordChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <main className="layout_center">
      <div>
        <h2 className="title">로그인</h2>
        <p className="title_sub">
          패타와 함께 <strong>소중한 사람들</strong>과의
          <br />
          <strong>연결</strong>을 더욱 <strong>특별</strong>하게
        </p>
        <LoginForm
          errorMsg={errorMsg}
          isLoading={isLoading}
          onPhoneNumberInput={onPhoneNumberInput}
          onPhoneNumberChange={onPhoneNumberChange}
          onPasswordInput={onPasswordInput}
          onPasswordChange={onPasswordChange}
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
        />
      </div>
    </main>
  );
}
