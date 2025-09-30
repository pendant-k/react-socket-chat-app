import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

// JWT 토큰의 payload 타입
export interface JwtPayload extends BaseJwtPayload {
    userId: string;
}
