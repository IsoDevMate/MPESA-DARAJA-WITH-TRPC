// mpesa.router.ts
import { z } from 'zod';
import { router, mpesaProcedure } from '../trpc';
import axios from 'axios';
import { TRPCError } from '@trpc/server';

type MpesaREquestBody = {
  BusinessShortCode: string;
  Password: string;
  Timestamp: string;
  TransactionType: "CustomerBuyGoodsOnline" | "CustomerPayBillOnline";
  Amount: number;
  PartyA: unknown;
  PartyB: unknown;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
}

type MpesaResponse = {
    data: {
        ResponseCode: string;
        ResponseDescription: string;
        MerchantRequestID: string;
        CheckoutRequestID: string;
        CustomerMessage: string;
    }
}

export const mpesaRouter = router({
  stkPush: mpesaProcedure
    .input(z.object({
      phone: z.string(),
      amount: z.number()
    }))
    .mutation(async ({ input, ctx }) => {
      const phone = input.phone.substring(1);
      const amount = input.amount;

      const date = new Date();
      const timestamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

      const shortCode = process.env.MPESA_PAYBILL || "174379";
      const passkey = process.env.MPESA_PASSKEY || "bf.......19";

      if (!shortCode || !passkey) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'M-Pesa short code or passkey is not defined'
        });
      }

      const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");
      const payload: MpesaREquestBody = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: `254${phone}`,
            PartyB: shortCode,
            PhoneNumber: `254${phone}`,
            CallBackURL: process.env.CALLBACKURL || "https://.....com/callback",
            AccountReference: `${phone}`,
            TransactionDesc: "TEST",
          }
      try {
        const response:MpesaResponse = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            payload,
          {
            headers: {
              Authorization: `Bearer ${ctx.mpesaToken}`
            },
          }
        );

        if (response.data && response.data.ResponseCode === "0") {
          return response.data;
        } else {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to make payment'
          });
        }
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to make payment'
        });
      }
    }),
});
