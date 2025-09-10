/**
 * Sendbird 메시지 암호화/복호화 유틸리티
 *
 * 주요 제약 사항
 * - 메시지 길이: 5,200자 제한(Sendbird 20,000자 한계 대비 암호화로 인한 용량 증가 고려)
 * - URL 처리: 암호화 후 원본 URL을 suffix로 추가하여 Sendbird OG 태그 프리뷰 기능 유지
 * - 암호화 형식: (IV Base64):(암호화된 텍스트)(SUFFIX)(URL)
 *   - IV(Initialization Vector):암호화에서 사용되는 초기화 벡터(랜덤한 숫자 조합)
 */
import CryptoJS from 'crypto-js';
import { MESSAGE_LIMITS } from '@/features/chat/constants';

import { ENCRYPTION_CONFIG } from './constants';
import { getUrlLink } from '../utils';

const {
  USE_MESSAGE_ENCRYPTION,
  SUFFIX_TEXT,
  ALTERNATIVE_TEXT,
  IV_LENGTH,
  ENCRYPTION_KEY,
} = ENCRYPTION_CONFIG;

// UTF-8 문자열을 WordArray 객체로 변환 (CryptoJS에서 키로 사용하기 위함)
const KEY = CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY);

/**
 * 텍스트를 AES-256-CBC로 암호화하는 함수
 * @param text - 암호화할 텍스트
 * @returns 암호화된 텍스트 형식: (IV Base64):(암호화 데이터)[SUFFIX][URL]
 * @description 암호화 실패 시 원본 텍스트 반환하여 메시지 전송 중단 방지
 */
export const encryptData = (text: string): string => {
  try {
    // 암호화 비활성화 시 원본 반환
    if (!USE_MESSAGE_ENCRYPTION) {
      return text;
    }

    // url 추출 및 길이 계산
    const urlLink = getUrlLink(text);
    const urlLength = SUFFIX_TEXT.length + urlLink.length;

    // SUFFIX_TEXT가 원본 메시지에 포함된 경우 암호화 결과와 충돌 방지
    const convertingText = text.replaceAll(SUFFIX_TEXT, ALTERNATIVE_TEXT);

    // 메시지 길이 제한 - Sendbird 메시지 한계(20,000자) 대비 암호화 팽창률 고려한 안전 길이
    const maxLength = MESSAGE_LIMITS.MAX_LENGTH - urlLength;
    const availableText =
      convertingText.length > maxLength
        ? convertingText.substring(0, maxLength)
        : convertingText;

    // 랜덤 IV 생성 (매번 다른 IV로 동일 메시지도 다른 암호문 생성)
    const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);

    // AES-256-CBC 암호화 (PKCS7 패딩 자동 적용)
    const encrypted = CryptoJS.AES.encrypt(availableText, KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Base64 인코딩
    const encryptedText = encrypted.toString();
    const ivBase64 = CryptoJS.enc.Base64.stringify(iv);

    // URL이 있는 경우 Sendbird OG 태그 프리뷰를 위해 암호화 결과 뒤에 원본 URL 추가
    if (urlLink && urlLink.length > 0) {
      return `${ivBase64}:${encryptedText}${SUFFIX_TEXT}${urlLink}`;
    } else {
      return `${ivBase64}:${encryptedText}`;
    }
  } catch (error) {
    console.log('메시지 암호화 실패', error);
    return text;
  }
};

/**
 * 암호화된 텍스트를 복호화하는 함수
 * @param text - 복호화할 암호화된 텍스트
 * @returns 복호화된 원본 텍스트 (암호화되지 않은 텍스트는 그대로 반환)
 * @description 암호화 실패 시 원본 텍스트 반환하여 메시지 전송 중단 방지
 */
export const decryptData = (text: string): string => {
  try {
    // 암호화 비활성화 시 원본 반환
    if (!USE_MESSAGE_ENCRYPTION) {
      return text;
    }

    // suffix 존재 하면 제거
    // (IV Base64):(암호화된 텍스트)(SUFFIX)(URL) -> (IV Base64):(암호화된 텍스트)(URL)
    const index = text.indexOf(SUFFIX_TEXT);
    const convertingText = index !== -1 ? text.substring(0, index) : text;

    // IV와 암호화된 데이터 분리
    // (IV Base64):(암호화된 텍스트)(URL) -> (IV Base64) | (암호화된 텍스트)(URL) -> length: 2
    const parts = convertingText.split(':');

    // parts[0]에 'http'가 포함된 경우 암호화되지 않은 일반 URL로 판단
    if (parts.length !== 2 || parts[0].toLowerCase().includes('http')) {
      return text;
    }

    // Base64에서 IV와 암호화된 데이터 파싱
    const iv = CryptoJS.enc.Base64.parse(parts[0]);
    const encrypted = parts[1];

    // AES-256-CBC 복호화 (PKCS7 패딩 자동 처리)
    const decrypted = CryptoJS.AES.decrypt(encrypted, KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // UTF-8 문자열로 변환하여 반환
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.log('메시지 복호화 실패', error);
    return text;
  }
};
