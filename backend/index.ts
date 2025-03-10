import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { appRouter } from "./routes/routers";
const app = express();
import * as dotenv from "dotenv";

dotenv.config();


app.use(cors({ origin: "*" }));
const createContext = async() => {
  return {};
};

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3080");
});

export type AppRouter = typeof appRouter;
