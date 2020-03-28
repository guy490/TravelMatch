module.exports = io => {
  io.on("connection", client => {
    console.log("User Connected");
    client.on("newRequest", userDetails => {
      console.log(userDetails);
    });
    client.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};
