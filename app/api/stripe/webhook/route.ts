import { NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe';
import { headers } from 'next/headers';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('stripe-signature') as string;

  if (!sig || !endpointSecret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as any;
      const projectId = session.metadata.projectId;
      
      console.log(`Payment confirmed for Project: ${projectId}`);
      
      // 1. Log to the Escrow Database
      try {
        await fetch('https://app.baget.ai/api/public/databases/66a82993-aed4-4766-b04b-98a4cfae9a6b/rows', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              project_id: projectId,
              homeowner_email: session.customer_details?.email || 'unknown',
              stripe_checkout_id: session.id,
              amount_cents: session.amount_total,
              status: 'PAID'
            }
          })
        });

        // 2. Update the Project Status in the Pilot Projects DB
        // Note: Since we don't have a direct 'update' endpoint for public publicWrites, 
        // we'd usually need a private key or use the rows API with externalKey.
        // For the pilot, adding a row to Escrow is the primary source of truth for funds.
      } catch (dbErr) {
        console.error('Database update failed:', dbErr);
      }
      break;
      
    case 'transfer.created':
      // This would happen when funds are released from platform to artisan
      const transfer = event.data.object as any;
      console.log(`Transfer created: ${transfer.id}`);
      // Log to Escrow DB with RELEASED status
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
