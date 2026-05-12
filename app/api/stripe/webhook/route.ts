import { NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe';
import { headers } from 'next/headers';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as any;
      console.log(`Payment confirmed for Project: ${session.metadata.projectId}`);
      
      // Update DB to status 'PAID'
      await fetch('https://app.baget.ai/api/public/databases/66a82993-aed4-4766-b04b-98a4cfae9a6b/rows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            project_id: session.metadata.projectId,
            homeowner_email: session.customer_details.email,
            amount_cents: session.amount_total,
            status: 'PAID'
          }
        })
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
