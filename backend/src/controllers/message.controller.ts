import { Request, Response } from "express";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.user?._id;
        // 반드시 필요한 부분인가? protectRoute에서 이미 처리하고 있음
        if (!loggedInUserId) {
            return res
                .status(401)
                .json({ message: "Unauthorized - No user id" });
        }

        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId },
        }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (err) {
        console.log("Error in getUsersForSidebar", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user!._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });
        res.status(200).json(messages);
    } catch (err) {
        console.log("Error in getMessages", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 이미지 또는 메시지 전송
export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user!._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // create new message with given data
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            imageUrl,
        });

        // save to database
        await newMessage.save();

        //TODO: socket here
        res.status(201).json(newMessage);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
