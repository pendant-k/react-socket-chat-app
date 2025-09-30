import express, { Request, Response, Express } from "express";
import authRoutes from "./routes/auth.route.js";
import devRoutes from "./routes/dev.route.js";

const app: Express = express();

// json 활용을 위한 middleware
app.use(express.json());

app.use("/", devRoutes);
app.use("/api/auth", authRoutes);

export default app;
