const http = require("http");
const socketIo = require("socket.io");

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.io server is running");
});

// Initialize Socket.io with CORS options
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Listen for client connections
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("app_registration", (data) => {
    console.log("Received app registration data:", data); // Logs data from the client
    // Emit a response with ⁠ sae_id ⁠ in the correct structure
    socket.emit("get_app_registration", {
      code: 200,
      body: { sae_id: "12345" },
    });
  });

  socket.on("open_key_session", (data) => {
    console.log("Received key session request:", data); // Log received data
    socket.emit("get_open_key_session", {
      code: 200,
      app_id: "12345",
      other_app_sae_id: "67890",
    });
  });

  socket.on("get_key", (data) => {
    console.log("Received key request:", data); // Log received data
    socket.emit("response_get_key", {
      code: 200,
      keys: [{ key_ID: "001", key: "sampleKey" }],
    });
  });
});

// Start the server on port 7001
server.listen(7001, () => {
  console.log("Server is running on http://localhost:7001");
});
