import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import productRouter from "./routes/product.routes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",").map((origin) => origin.trim()) ||
      "*",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products", productRouter);

app.use(notFound);
app.use(errorHandler);

export default app;

