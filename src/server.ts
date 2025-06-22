import dotenv from "dotenv";
import { Server } from "http";
import app from "./app";
import connectDB from "./app/config/database";

dotenv.config();

let server: Server;
const port = process.env.PORT || 5000;

const bootstrap = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB Using Mongoose!!");
    server = app.listen(port, () => {
      console.log(`LibHero Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

bootstrap();
