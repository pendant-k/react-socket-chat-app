import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userId: string, res: Response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7일을 ms 단위로 기입
        httpOnly: true, // XSS 공격 방지
        sameSite: "strict", // CSRF 공격 방지
        secure: process.env.NODE_ENV !== "development", // 개발 환경에서는 쿠키 전송 방지
    });
    return token;
};
