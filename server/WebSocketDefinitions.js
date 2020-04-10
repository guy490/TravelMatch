module.exports = (io) => {
  let {
    getSocketIDByUserID,
    addMessageToConversation,
    getMessagesByParticipants,
    addNewSocketID,
    updateSocketID,
    removeSocketID,
  } = require("./utilities");

  io.on("connection", (client) => {
    console.log("User Connected");
    client.on("sendMessage", (stringyMessageDetails) => {
      let messageDetails = JSON.parse(stringyMessageDetails);
      const senderName = messageDetails.senderName;
      const receiverName = messageDetails.receiverName;
      const receiverSocketID = getSocketIDByUserID(messageDetails.receiverID);
      addMessageToConversation(senderName, receiverName, messageDetails);

      io.to(client.id).emit(
        "receiveMessage",
        JSON.stringify(getMessagesByParticipants(senderName, receiverName))
      );
      io.to(receiverSocketID).emit(
        "receiveMessage",
        JSON.stringify(getMessagesByParticipants(senderName, receiverName))
      );
    });

    client.on("addToClientList", (userID) => {
      addNewSocketID(userID, client.id);
    });

    client.on("updateClientList", (userID) => {
      updateSocketID(userID, client.id);
    });

    client.on("removeFromClientList", (userID) => {
      removeSocketID(userID);
    });

    client.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};
