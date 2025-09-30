import app from "./server.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// 기본적으로는 node.http server 사용함
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
