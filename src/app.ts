import cors from "cors";
import express, { Application, Request, Response } from "express";
import errorMiddleware from "./app/middlewares/error.middleware";
import router from "./app/routes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route entry point
app.use("/api", router);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("LibHero API is running!");
});

app.use(errorMiddleware);

export default app;
