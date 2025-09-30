import mongoose from "mongoose";
import { Types } from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        // ref -> 참조하는 모델의 이름
        senderId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
