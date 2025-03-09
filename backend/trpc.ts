import { TRPCError, initTRPC } from '@trpc/server'
// import { type Context } from "./middleware/context"
import superjson from 'superjson'
import axios from "axios"

type MpesaResponse = {
    data:{
    access_token: string;
    expires_in: number;
} }

type Context = {};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const middleware = t.middleware
export const router = t.router;
export const publicProcedure = t.procedure;


export const mpesaAuth = middleware(async ({ ctx, next }) => {
  try {
    const key = process.env.MPESA_CONSUMER_KEY || "DV.....X5"
    const secret = process.env.MPESA_CONSUMER_SECRET || "54.....aS"
    const auth = Buffer.from(`${key}:${secret}`).toString("base64");

    const response:MpesaResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const mpesaToken = response.data.access_token;

  // add the token to the context
    return next({
      ctx: {
        ...ctx,
        mpesaToken,
      },
    });
  } catch (err) {
    console.error(err);
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Failed to get access token' });
  }
});

export const mpesaProcedure = publicProcedure.use(mpesaAuth);
