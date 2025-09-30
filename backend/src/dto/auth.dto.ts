// 회원가입 요청 DTO
export interface SignupDto {
    email: string;
    fullName: string;
    password: string;
}

export interface SignupResponseDto {
    message: string;
    data: {
        id: string;
        email: string;
        fullName: string;
        profilePic: string;
    };
}

// 로그인 요청 DTO
export interface LoginDto {
    email: string;
    password: string;
}

// 로그인 응답 DTO
export interface AuthResponseDto {
    data: {
        id: string;
        email: string;
        fullName: string;
        profilePic: string;
    };
    token?: string;
}

// 에러 응답 DTO
export interface ErrorResponseDto {
    message: string;
    errors?: string[];
}
