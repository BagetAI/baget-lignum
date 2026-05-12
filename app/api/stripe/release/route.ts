import { NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe';

/**
 * Releases funds from escrow to the artisan's connected account.
 * This is triggered after the 'Certificate of Completion' is signed.
 */
export async function POST(req: Request) {
  try {
    const { 
      projectId, 
      connectedAccountId, 
      amountCents 
    } = await req.json();

    // 15% Marketplace Commission
    const commission = Math.round(amountCents * 0.15);
    const artisanAmount = amountCents - commission;

    // Create a transfer to the connected artisan account
    const transfer = await stripe.transfers.create({
      amount: artisanAmount,
      currency: 'eur',
      destination: connectedAccountId,
      metadata: {
        projectId,
        commission: commission / 100,
        type: 'escrow_release'
      },
    });

    // Update the project database (this would happen in a real DB helper)
    // We'll simulate a success response here.
    
    return NextResponse.json({ 
      success: true, 
      transferId: transfer.id,
      payoutAmount: artisanAmount / 100,
      commission: commission / 100
    });
  } catch (error: any) {
    console.error('Transfer error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
