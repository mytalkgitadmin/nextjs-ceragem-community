declare module "@sendbird/uikit-react" {
  export const useSendbird: any;
}

declare module "@sendbird/uikit-react/handlers/UserEventHandler" {
  const UserEventHandler: any;
  export default UserEventHandler;
}

declare module "@sendbird/uikit-react/handlers/GroupChannelHandler" {
  const GroupChannelHandler: any;
  export default GroupChannelHandler;
}

// Minimal ambient declaration for Sendbird message types
declare module "@sendbird/chat/message" {
  export interface BaseMessage {
    messageId: number;
    createdAt: number;
    updatedAt?: number;
    message?: string;
    data?: string;
    customType?: string;
    [key: string]: any;
  }

  // Provide ReplyType as value and type for editor/type-checking compatibility
  export const ReplyType: {
    readonly ALL: "all";
    readonly NONE: "none";
    readonly ONLY_REPLY_TO_CHANNEL: "only_reply_to_channel";
  };
  export type ReplyType = (typeof ReplyType)[keyof typeof ReplyType];
}
