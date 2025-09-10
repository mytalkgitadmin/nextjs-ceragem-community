import { MESSAGE_LIMITS } from '@/features/chat/constants';
import LongMessage from '../LongMessage/LongMessage';
import { checkEditMessage, decryptData } from '@/features/chat/lib';

export default function TextInner({ message }: { message: string }) {
  const { convertMessage } = checkEditMessage(decryptData(message));
  return (
    <>
      {convertMessage.length > MESSAGE_LIMITS.LONG_MESSAGE ? (
        <LongMessage message={convertMessage} />
      ) : (
        <>
          <p>{convertMessage}</p>
        </>
      )}
    </>
  );
}
