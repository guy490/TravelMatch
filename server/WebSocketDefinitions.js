module.exports = (io) => {
  let clientList = [];
  let messageList = [];

  io.on("connection", (client) => {
    console.log("User Connected");
    client.on("sendMessage", (stringyMessageDetails) => {
      // let messageDetails = JSON.parse(stringyMessageDetails);
      // const sender = messageDetails.senderName;
      // const receiver = messageDetails.receiverName;
      // delete messageDetails["senderName"];
      // delete messageDetails["receiverName"];
      // if (messageList.length === 0) {
      //   messageList.push({
      //     paricipants: { user1: sender, user2: receiver },
      //     messages: [messageDetails],
      //   });
      // } else {
      //   let index = messageList.findIndex(
      //     (conversation) =>
      //       (conversation.participants.user1 === sender &&
      //         conversation.participants.user2 === receiver) ||
      //       (conversation.participants.user1 === receiver &&
      //         conversation.participants.user2 === sender)
      //   );
      //   if (index !== -1) {
      //     messageList[index].messages.push(messageDetails);
      //   } else {
      //     messageList.push({
      //       paricipants: { user1: sender, user2: receiver },
      //       messages: [messageDetails],
      //     });
      //   }
      // }
      io.to(client.id).emit("receiveMessage", "HEY");
    });

    client.on("addToClientList", (userID) => {
      clientList.push({ userID, clientID: client.id });
    });

    client.on("updateClientList", (userID) => {
      let index = clientList.findIndex((user) => user.userID === userID);
      let clientID = clientList[index].clientID;
      if (clientID !== client.id) {
        clientList[index].clientID = client.id;
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
