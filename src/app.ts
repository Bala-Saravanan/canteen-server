import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { errorHandler, notFound } from "./middlewares/error.middleware";

const app = express();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//   }),
// );

const allowedOrigins = process.env.CLIENT_URL?.split(",") || [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Canteen API is running 🍽️" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
