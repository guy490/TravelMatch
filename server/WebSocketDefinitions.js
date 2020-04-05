module.exports = (io) => {
  let clientList = [];
  let messageList = [];

  io.on("connection", (client) => {
    console.log("User Connected");

    client.on("sendMessage", (messageDetails) => {
      messageList.push(messageDetails);
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
