import app from "./server.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
