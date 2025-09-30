import { Request, Response } from "express";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { text, image } = req.body;
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
