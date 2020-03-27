module.exports = io => {
  io.on("connection", client => {
    console.log("user connected");
    client.on("disconnect", () => {});
  });
};
