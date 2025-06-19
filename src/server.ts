import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 5000;

const bootstrap = async () => {
  try {
    app.listen(port, () => {
      console.log(`LibHero Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

bootstrap();
