import dotenv from "dotenv";
import app from "./app";
import connectDB from "./app/config/database";

dotenv.config();

const port = process.env.PORT || 5000;

const bootstrap = async () => {
  try {
    app.listen(port, async () => {
      await connectDB();
      console.log(`LibHero Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

bootstrap();
