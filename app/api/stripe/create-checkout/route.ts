import { NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe';

/**
 * Creates a Checkout Session for a homeowner to pay for a restoration project.
 * Funds are "captured" and held by the platform until completion.
 */
export async function POST(req: Request) {
  try {
    const { 
      projectId, 
      homeownerEmail, 
      artisanName, 
      amountCents, 
      projectName 
    } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Restoration Project: ${projectName}`,
              description: `Artisan: ${artisanName} | Project ID: ${projectId}`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: homeownerEmail,
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/projects/${projectId}?status=paid`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/projects/${projectId}?status=cancelled`,
      metadata: {
        projectId,
        type: 'escrow_deposit'
      },
      // In a real Connect flow with separate charges and transfers:
      // We take the payment to our platform account first, then transfer later.
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
