import cloudinary from "../lib/cloudinarry.js";
import Message from "../models/message.js";
import User from "../models/user.model.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    // get me and user chats
    // i send the message
    // user send the message

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessagesByUserId", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // send real-time update to receiver using socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getChatsParners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // get all users who have chatted with me and involved me in any way
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnersIds =[...new Set( messages.map((msg) =>
      msg.senderId.toString() === loggedInUserId.toString()
        ? msg.receiverId.toString()
        : msg.senderId.toString()
    ))];

    const chatPartners = await User.find({_id:{$in:chatPartnersIds}}).select("-password")
    return res.status(200).json(chatPartners)
  } catch (error) {
    console.log("error in getChatsParners", error);
    res.status(500).json({ message: "Server Error" });
    
  }
};
