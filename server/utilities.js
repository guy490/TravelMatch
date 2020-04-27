let clientList = [];
let messageList = [];

const getSocketIDByUserID = (userID) => {
  const socketIndex = clientList.findIndex((user) => user.userID === userID);
  return clientList[socketIndex].clientID;
};

const addNewConversation = (conversation) => {
  messageList.push(conversation);
  return messageList.length - 1;
};

const findConversationIndex = (senderName, receiverName) => {
  return messageList.findIndex(
    (conversation) =>
      (conversation.participants.user1 === senderName &&
        conversation.participants.user2 === receiverName) ||
      (conversation.participants.user1 === receiverName &&
        conversation.participants.user2 === senderName)
  );
};

const addMessageToConversation = (senderName, receiverName, messageDetails) => {
  let index = findConversationIndex(senderName, receiverName);
  if (index !== -1) {
    messageList[index].messages.push(messageDetails);
  } else {
    index = addNewConversation({
      participants: { user1: senderName, user2: receiverName },
      messages: [messageDetails],
    });
  }
};

const getMessagesByParticipants = (senderName, receiverName) => {
  let index = findConversationIndex(senderName, receiverName);
  return messageList[index].messages;
};

const addNewSocketID = (userID, socketID) => {
  clientList.push({ userID, socketID });
};

const updateSocketID = (userID, socketID) => {
  let index = clientList.findIndex((user) => user.userID === userID);
  if (index !== -1) {
    let clientID = clientList[index].clientID;
    if (clientID !== socketID) {
      clientList[index].clientID = socketID;
    }
  } else {
    addNewSocketID(userID, socketID);
  }
};

const removeSocketID = (userID) => {
  let index = clientList.findIndex((user) => user.userID === userID);
  clientList = [
    ...clientList.slice(0, index),
    ...clientList.slice(index + 1, clientList.length),
  ];
};

const calcMatchByRadius = (user1, user2) => {
  const subSourceLat = user1.source.lat - user2.source.lat;
  const subSourceLng = user1.source.lng - user2.source.lng;
  const subDestinationLat = user1.destination.lat - user2.destination.lat;
  const subDestinationLng = user1.destination.lng - user2.destination.lng;
  return (
    subSourceLat ** 2 + subSourceLng ** 2 <= 500 ** 2 &&
    subDestinationLat ** 2 + subDestinationLng ** 2 <= 500 ** 2
  );
};

module.exports = {
  getSocketIDByUserID,
  addMessageToConversation,
  getMessagesByParticipants,
  addNewSocketID,
  updateSocketID,
  removeSocketID,
  calcMatchByRadius,
};
