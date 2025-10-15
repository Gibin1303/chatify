import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

  

    if (!token) {
      console.log("NO socket token");
      return next(new Error("unautorised-no token provided"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("socket connection rejected");
      return next(new Error("unautorised-no token provided"));
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("socket connection failed:No user founded");
      return next(new Error("No user found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();
    console.log(
      `socket authenticated for user: ${user.fullName} (${user._id})`
    );
    next();
  } catch (error) {
    console.log("error in soket authentication", error.message);
    next(new Error("Unothorized - authentication failed"));
  }
};
