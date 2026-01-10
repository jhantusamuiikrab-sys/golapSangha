import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: "https://golapsangha-frontend.onrender.com",
    credentials: true,
  })
);

// app.use(cors({ origin: "http://localhost:5173" , credentials:true}));

app.use(cookieParser());

app.use("/api/v1", router);

connectDB();
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
