import express from "express";
import {
  getAllContacts,
  getChatsParners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message-controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// Apply both arcjetProtection and protectRoute middleware to all routes in this router
// This ensures that all requests are first checked by Arcjet for security threats
// and then authenticated to ensure the user is logged in.

router.use(arcjetProtection,protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatsParners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
