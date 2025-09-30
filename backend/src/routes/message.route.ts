import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { sendMessage } from "../controllers/message.controller.js";

const router: Router = express.Router();

router.post("/", protectRoute, sendMessage);

export default router;
