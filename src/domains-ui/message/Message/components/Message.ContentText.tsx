import { useState } from "react";
import { BaseMessage } from "@sendbird/chat/message";
import styles from "./Message.ContentText.module.css";
import { useAuth } from "@/domains/auth";
import { ChevronRight } from "lucide-react";
import {
  isEditedMessage,
  removeEditPrefix,
  isLongTextMessage,
} from "@/domains/message";

interface MessageContentTextProps {
  message: BaseMessage;
  showScheduleRegisterButton?: boolean;
}

export const MessageContentText = ({
  message,
  showScheduleRegisterButton = false, // CHECK: 패밀리타운에서는 구현되어있음
}: MessageContentTextProps) => {
  const { sendBirdId: mySendBirdId } = useAuth();
  const isSender = mySendBirdId === message.sender?.userId;
  const messageText = message.message || "";
  const text = removeEditPrefix(messageText);
  const isLongText = isLongTextMessage(message);

  //   const [isViewMessageModal, setIsViewMessageModal] = useState(false); //TODO: 추후 구현
  //   const [viewMessage, setViewMessage] = useState("");

  // URL을 <a> 태그로 변환
  const convertUrlsToLinks = (text: string): string => {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    return text.replace(urlRegex, "<a>$1</a>");
  };

  // <a> 태그를 JSX 링크 요소로 변환
  const parseLinkTags = (text: string): (string | JSX.Element)[] => {
    const linkParts = text.split(/(<a[^>]*>.*?<\/a>)/);
    const elements: (string | JSX.Element)[] = [];

    linkParts.forEach((part, index) => {
      if (part.startsWith("<a")) {
        const linkText = part.replace("<a>", "").replace("</a>", "");
        elements.push(
          <a
            key={`link_${index}`}
            href={
              linkText.startsWith("www.") ? `https://${linkText}` : linkText
            }
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            {linkText}
          </a>
        );
      } else {
        elements.push(part);
      }
    });

    return elements;
  };

  // 문자열에서 날짜를 ScheduleRegisterButton으로 변환
  const parseDatesInText = (
    text: string,
    elementIndex: number
  ): JSX.Element[] => {
    const datePattern = /(\d+월\s\d+일|\d+월\d+일|\d+일)/g;
    const elements: JSX.Element[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null = null;

    while ((match = datePattern.exec(text)) !== null) {
      const currentIndex = match.index;

      // 날짜 앞의 텍스트 추가
      if (currentIndex > lastIndex) {
        elements.push(
          <span key={`text_${elementIndex}_${lastIndex}`}>
            {text.substring(lastIndex, currentIndex)}
          </span>
        );
      }

      // CHECK: 패밀리타운에서는 구현된 버튼임
      elements.push(
        <button
          className={styles.register_date_btn}
          key={`date_${elementIndex}_${currentIndex}`}
          //   message={match[0]}
          //   isSender={isSender}
          //   channelInfo={channelInfo}
        >
          {match[0]}
        </button>
      );

      lastIndex = datePattern.lastIndex;
    }

    // 마지막 날짜 이후의 텍스트 추가
    if (lastIndex < text.length) {
      elements.push(
        <span key={`text_${elementIndex}_${lastIndex}`}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  // 메인 파싱 함수
  const parseMessage = (text: string): JSX.Element[] => {
    // 1. 긴 메시지면 URL을 링크로 변환, 아니면 이미 변환된 상태
    const textWithLinks = convertUrlsToLinks(text);

    // 2. 링크 태그를 JSX로 변환
    const elementsWithLinks = parseLinkTags(textWithLinks);

    // 3. 스케줄 버튼이 필요 없으면 그대로 반환
    if (!showScheduleRegisterButton) {
      return elementsWithLinks.map((element, index) =>
        typeof element === "string" ? (
          <span key={`text_${index}`}>{element}</span>
        ) : (
          element
        )
      );
    }

    // 4. 날짜 파싱
    const finalElements: JSX.Element[] = [];

    elementsWithLinks.forEach((element, elementIndex) => {
      if (typeof element === "string") {
        // 문자열인 경우 날짜 파싱
        const dateElements = parseDatesInText(element, elementIndex);
        finalElements.push(...dateElements);
      } else {
        // JSX 요소(링크)는 그대로 추가
        finalElements.push(element);
      }
    });

    return finalElements;
  };

  // 메시지 처리
  const processedText = isLongText ? `${text.substring(0, 2000)}...` : text;

  const parsedElements = parseMessage(processedText);

  return (
    <div>
      <div>{parsedElements}</div>

      {/* 긴 메시지인 경우 전체보기 버튼 표시 */}
      {isLongText && (
        <div
          style={{
            borderTop: isSender
              ? "1px solid rgba(255, 255, 255, 0.6)"
              : "1px solid rgba(0, 0, 0, 0.2)",
          }}
          className={styles.total_view_wrap}
          onClick={() => {
            // setViewMessage(message); //TODO: 추후 구현
            // setIsViewMessageModal(true);
          }}
        >
          <div>전체보기</div>
          <ChevronRight
            size={18}
            className={`
        ${isSender ? "rotate-0 text-blue-500" : "rotate-180 text-gray-400"}
        transition-transform
      `}
          />
        </div>
      )}
    </div>
  );
};
