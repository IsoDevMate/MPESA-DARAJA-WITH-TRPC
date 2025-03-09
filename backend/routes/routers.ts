import { router } from "../trpc"
import { mpesaRouter } from "./mpesarouter"

export const appRouter = router({
  mpesa :mpesaRouter
})

export type AppRouter = typeof appRouter
