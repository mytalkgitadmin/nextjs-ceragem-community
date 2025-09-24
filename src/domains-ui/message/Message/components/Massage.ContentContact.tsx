import { BaseMessage } from "@sendbird/chat/message";
import { parseJson } from "@/shared/utils";
import styles from "./Message.ContentContact.module.css";
import { Button } from "@/shared-ui/display";

export interface MessageContentContactProps {
  message: BaseMessage;
}

export const MessageContentContact = ({
  message,
}: MessageContentContactProps) => {
  const messageData = parseJson(message.data || "");
  const contact: any[] = message?.contact || [];
  const name = contact?.map((d: any) => d.name).join(",");

  const handleOpenDetail = () => {
    console.log("handleOpenDetail");
    //TODO: 모달 추후 구현
  };

  return (
    <>
      <div className={styles.chat_message_title} title={name}>
        {name}
      </div>
      <div className={styles.chat_message_desc}>연락처</div>
      <Button
        className={styles.chat_message_btn}
        onClick={handleOpenDetail}
        variant="secondary"
        size="sm"
      >
        상세보기
      </Button>

      {/* <CommonModal   //TODO: 모달 추후 구현 
        open={openModalContact}
        setOpen={setOpenModalContact}
        title={"연락처"}
        isTitle={true}
        body={
          <div className={styles.chat_modal_wrap}>
            {contact?.map((obj: any, index: number) => {
              return (
                <div
                  key={`CONTACT_${index}`}
                  className={styles.chat_modal_item}
                >
                  <div className={styles.chat_modal_label}>이름</div>
                  <div className={styles.chat_modal_desc}>{obj?.name}</div>
                  <div className={styles.chat_modal_label}>연락처</div>
                  <div className={styles.chat_modal_desc}>{obj?.phone}</div>
                  {contact?.length - 1 !== index && <Divider />}
                </div>
              );
            })}
          </div>
        }
        width={200}
        isFooter={false}
        draggle={false}
      /> */}
    </>
  );
};
