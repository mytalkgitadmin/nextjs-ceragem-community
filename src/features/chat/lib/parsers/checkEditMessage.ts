export const checkEditMessage = (message: string) => {
  const isEdit = message.startsWith('✍🏻 ');
  const convertMessage = isEdit ? message.slice(4) : message;

  return { convertMessage, isEdit };
};

export const convertEditMessage = (message: string) => {
  const isEdit = message.startsWith('✍🏻 ');
  const convertMessage = isEdit ? message.slice(4) : message;

  return convertMessage;
};
