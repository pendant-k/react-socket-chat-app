import express, { Express } from "express";

// routes
import authRoutes from "./routes/auth.route.js";
import devRoutes from "./routes/dev.route.js";
import messageRoutes from "./routes/message.route.js";

import cookieParser from "cookie-parser";

const app: Express = express();

// json 활용을 위한 middleware
app.use(express.json());
// cookie 활용을 위한 middleware
app.use(cookieParser());

app.use("/", devRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

export default app;
