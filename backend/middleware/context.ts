// import * as trpc from '@trpc/server';
// import { inferAsyncReturnType } from '@trpc/server';
// import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
// import axios from "axios"
// export const createContext = async (opts: CreateExpressContextOptions) => {
//     const { req, res } = opts

//     let token: string | null
//     try{
//     const key = process.env.MPESA_CONSUMER_KEY;
//     const secret = process.env.MPESA_CONSUMER_SECRET;
//     const auth = Buffer.from(`${key}:${secret}`).toString("base64");
//     console.log("here are the auths", auth);

//   return next()
// }

// export type Context = inferAsyncReturnType<typeof createContext>


// type MpesaResponseTOken={
//     access_token: string
//     expires_in:number
// }

// const generatedAccessToken = middleware(async ({ ctx, next }) => {

//   if (!token) {
//     throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Missing request token' })
//   }

//   // accesstoken granted
//     return next()
// })
