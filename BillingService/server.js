const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const API_PORT = 4001;

const port = process.env.PORT || API_PORT;

// handles promise rejections
process.on("uncaughtException", (error) => {
  console.log(`uncaught exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log(`unhandled rejection at ${promise} reason: ${reason}`);
  process.exit(1);
});

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
