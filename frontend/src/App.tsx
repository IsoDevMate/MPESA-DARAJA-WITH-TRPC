
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../backend/index';
import superjson from 'superjson';




function App() {
  // Create tRPC client
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
  transformer: superjson,
});


async function initiatePayment() {
  try {
    const result = await trpc.mpesa.stkPush.mutate({
      amount: 100,
      phone: '0769784198'
    });
    console.log('Payment initiated:', result);
  } catch (error) {
    console.error('Payment failed:', error);
  }
}

  return (
    <div>
      <h1>M-Pesa Payment</h1>
      <button onClick={initiatePayment}>Pay with M-Pesa</button>
    </div>
  )
}

export default App
