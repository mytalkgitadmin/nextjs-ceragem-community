export const ENCRYPTION_CONFIG = {
  /** 암호화 사용 여부 */
  USE_MESSAGE_ENCRYPTION: true,
  /** 메시지 최대 길이 */
  MAX_MESSAGE_LENGTH: 5200,
  /** IV 길이 (바이트) */
  IV_LENGTH: 16,
  /** AES 암호화 키 (32바이트) */
  ENCRYPTION_KEY: '4f1aaae66406e3584f1aaae66406e358',

  /** 충돌 방지용 텍스트 */
  SUFFIX_TEXT: ':5UFF1X:',
  ALTERNATIVE_TEXT: ':SUFFIX:',
} as const;
