module.exports = (io) => {
  let clientList = [];
  let messageList = [];

  io.on("connection", (client) => {
    console.log("User Connected");
    client.on("sendMessage", (stringyMessageDetails) => {
      let messageDetails = JSON.parse(stringyMessageDetails);
      const senderName = messageDetails.senderName;
      const receiverName = messageDetails.receiverName;
      const socketIndex = clientList.findIndex(
        (user) => user.userID === messageDetails.receiverID
      );
      const receiverSocketID = clientList[socketIndex].clientID;
      let index;

      if (messageList.length === 0) {
        messageList.push({
          participants: { user1: senderName, user2: receiverName },
          messages: [messageDetails],
        });

        index = messageList.length - 1;
      } else {
        index = messageList.findIndex(
          (conversation) =>
            (conversation.participants.user1 === senderName &&
              conversation.participants.user2 === receiverName) ||
            (conversation.participants.user1 === receiverName &&
              conversation.participants.user2 === senderName)
        );

        if (index !== -1) {
          messageList[index].messages.push(messageDetails);
        } else {
          messageList.push({
            paricipants: { user1: senderName, user2: receiverName },
            messages: [messageDetails],
          });
          index = messageList.length - 1;
        }
      }
      io.to(client.id).emit(
        "receiveMessage",
        JSON.stringify(messageList[index].messages)
      );
      io.to(receiverSocketID).emit(
        "receiveMessage",
        JSON.stringify(messageList[index].messages)
      );
    });

    client.on("addToClientList", (userID) => {
      clientList.push({ userID, clientID: client.id });
    });

    client.on("updateClientList", (userID) => {
      let index = clientList.findIndex((user) => user.userID === userID);
      if (clientList !== -1) {
        let clientID = clientList[index].clientID;
        if (clientID !== client.id) {
          clientList[index].clientID = client.id;
        }
      } else {
        clientList.push({ userID, clientID: client.id });
      }
    });

    client.on("removeFromClientList", (userID) => {
      let index = clientList.findIndex((user) => user.userID === userID);
      clientList = [
        ...clientList.slice(0, index),
        ...clientList.slice(index + 1, clientList.length),
      ];
    });

    client.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};
