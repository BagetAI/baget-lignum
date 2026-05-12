import { NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe';

/**
 * Creates a Stripe Connect onboarding link for an artisan.
 * Artisans are retired tradespeople who need a connected account to receive funds.
 */
export async function POST(req: Request) {
  try {
    const { artisanId, email, name } = await req.json();

    // 1. Create a Connected Account for the artisan
    const account = await stripe.accounts.create({
      type: 'express',
      email: email,
      capabilities: {
        transfers: { requested: true },
      },
      business_type: 'individual',
      metadata: {
        artisanId: artisanId,
        role: 'Compagnon-Emeritus'
      }
    });

    // 2. Create an Account Link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin/matchmaking`,
      return_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin/matchmaking?status=onboarding_complete&account_id=${account.id}`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: accountLink.url, accountId: account.id });
  } catch (error: any) {
    console.error('Connect onboarding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
