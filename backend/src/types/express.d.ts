import { IUser } from "./user.types";

// Express Request 타입 확장
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
