const turf = require("turf");
let clientList = [];
let messageList = [];

const getSocketIDByUserID = (userID) => {
  const socketIndex = clientList.findIndex((user) => user.userID === userID);
  if (socketIndex === -1) {
    return socketIndex;
  }
  return clientList[socketIndex].socketID;
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
  if (index === -1) {
    return [];
  }
  return messageList[index].messages;
};

const getConversationByReceiver = (receiverName) => {
  const conversationList = [];
  messageList.forEach((conversation) => {
    if (
      conversation.participants.user2 === receiverName ||
      conversation.participants.user1 === receiverName
    ) {
      conversationList.push(conversation);
    }
  });
  return conversationList;
};

const addNewSocketID = (userID, socketID) => {
  clientList.push({ userID, socketID });
};

const removeSocketIDBySocketID = (socketID) => {
  let index = clientList.findIndex((user) => user.socketID === socketID);
  clientList = [
    ...clientList.slice(0, index),
    ...clientList.slice(index + 1, clientList.length),
  ];
};
const updateSocketID = (userID, socketID) => {
  let index = clientList.findIndex((user) => user.userID === userID);
  if (index !== -1) {
    let clientID = clientList[index].socketID;
    if (clientID !== socketID) {
      clientList[index].socketID = socketID;
    }
  } else {
    addNewSocketID(userID, socketID);
  }
};

const removeSocketIDByUserID = (userID) => {
  let index = clientList.findIndex((user) => user.userID === userID);
  clientList = [
    ...clientList.slice(0, index),
    ...clientList.slice(index + 1, clientList.length),
  ];
};

const calcMatchByRadius = (user1, user2) => {
  const user1Source = turf.point([user1.source.lat, user1.source.lng]);
  const user2Source = turf.point([user2.source.lat, user2.source.lng]);
  const user1Destination = turf.point([
    user1.destination.lat,
    user1.destination.lng,
  ]);
  const user2Destination = turf.point([
    user2.destination.lat,
    user2.destination.lng,
  ]);

  return (
    turf.distance(user1Source, user2Source) <= 0.5 && // default distance calclation is by kilometers
    turf.distance(user1Destination, user2Destination) <= 0.5
  );
};

module.exports = {
  getSocketIDByUserID,
  addMessageToConversation,
  getMessagesByParticipants,
  updateSocketID,
  removeSocketIDBySocketID,
  calcMatchByRadius,
  removeSocketIDByUserID,
  getConversationByReceiver,
};
