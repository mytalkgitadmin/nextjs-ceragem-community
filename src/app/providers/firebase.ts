import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getMessaging, Messaging } from "firebase/messaging";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp;
let firebaseAnalytics: Analytics | undefined;
let firebaseMessaging: Messaging | undefined;
let firebaseStore: Firestore;

try {
  firebaseApp = initializeApp(firebaseConfig);
  firebaseAnalytics = getAnalytics(firebaseApp);

  // 브라우저 환경에서만 messaging 초기화
  if (typeof window !== "undefined") {
    firebaseMessaging = getMessaging(firebaseApp);
    firebaseStore = getFirestore(firebaseApp);

    // 서비스 워커 등록 코드 추가
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          // classic 타입으로 명시적 지정
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js",
            {
              type: "classic", // module이 아닌 classic 타입 사용
              scope: "/",
            }
          );
          console.log("FCM 서비스 워커 등록 성공:", registration.scope);
        } catch (error) {
          console.error("FCM 서비스 워커 등록 실패:", error);
        }
      });
    }
  }

  console.log("Firebase가 성공적으로 초기화되었습니다.");
} catch (error) {
  console.error("Firebase 초기화 오류:", error);
}

export { firebaseApp, firebaseAnalytics, firebaseMessaging, firebaseStore };
