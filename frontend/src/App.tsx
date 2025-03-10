import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../backend/index';
import superjson from 'superjson';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState<number>(0);
  const [phone, setPhone] = useState<string>('');

  // Create tRPC client
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'https://mpesa-daraja-with-trpc.onrender.com/trpc',
      }),
    ],
    transformer: superjson,
  });

  async function initiatePayment(event: React.FormEvent) {
    event.preventDefault();
    try {
      const result = await trpc.mpesa.stkPush.mutate({
        amount,
        phone,
      });
      console.log('Payment initiated:', result);
      // Clear the form
      setAmount(0);
      setPhone('');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  }

  return (
    <div>
      <h1>M-Pesa Payment</h1>
      <form onSubmit={initiatePayment}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />
        <button type="submit">Pay with M-Pesa</button>
      </form>
    </div>
  );
}

export default App;
