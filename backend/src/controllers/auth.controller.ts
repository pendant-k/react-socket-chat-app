import { Request, Response } from "express";
import {
    SignupDto,
    LoginRequestDto,
    AuthResponseDto,
    ErrorResponseDto,
} from "../dto/index.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

// Request 제네릭 첫번째는 Params
// 회원가입
export const signup = async (
    req: Request<{}, AuthResponseDto | ErrorResponseDto, SignupDto>,
    res: Response<AuthResponseDto | ErrorResponseDto>
) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "모든 필드를 입력해주세요.",
            });
        }

        // Validation : 비밀번호 최소 길이 확인
        if (password.length < 6) {
            return res.status(400).json({
                message: "비밀번호는 6자 이상이어야 합니다.",
            });
        }

        const user = await User.findOne({ email });
        // Validation : 이미 존재하는 이메일 확인
        if (user) {
            return res
                .status(400)
                .json({ message: "이미 존재하는 이메일입니다." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // JWT 토큰 생성 및 쿠키 설정
        generateToken(newUser._id.toString(), res);

        res.status(201).json({
            message: "회원가입 성공",
            data: {
                id: newUser._id.toString(),
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 로그인
export const login = async (
    req: Request<{}, AuthResponseDto | ErrorResponseDto, LoginRequestDto>,
    res: Response<AuthResponseDto | ErrorResponseDto>
) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json({ message: "이메일 또는 비밀번호가 일치하지 않습니다." });
        }

        generateToken(user._id.toString(), res);

        res.status(200).json({
            message: "로그인 성공",
            data: {
                id: user._id.toString(),
                email: user.email,
                fullName: user.fullName,
                profilePic: user.profilePic,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 로그아웃
export const logout = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
        });
        res.status(200).json({ message: "로그아웃 성공" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (
    req: Request,
    res: Response<AuthResponseDto | ErrorResponseDto>
) => {
    const { profilePic } = req.body;
};
