import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import eventRoutes from "./routes/events";
import uploadRoutes from "./routes/upload";
import paymentRoutes from "./routes/payment";
import { errorHandler } from "./middlewares/error";
import connectDB from "./config/db";
import http from "http";
import config from "./config/config";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);

app.use(errorHandler);

connectDB();

// Start the server
server.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port} in ${config.environment} mode`
  );
});
