'use client';

import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  Hammer
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccess({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A] font-sans flex items-center justify-center p-6">
      <div className="max-w-xl w-full editorial-border bg-white p-12 text-center space-y-8 shadow-xl">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border border-green-100 animate-in zoom-in-50 duration-500">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="font-serif text-4xl italic">Funds Secured.</h1>
          <p className="text-sm opacity-60 uppercase tracking-widest leading-relaxed">
            Your restoration deposit for project <span className="text-black font-bold">{params.id}</span> is now held in escrow.
          </p>
        </div>

        <div className="editorial-border p-6 bg-[#FAFAF7] space-y-4 text-left">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-[#C9A96E] shrink-0" />
            <p className="text-xs italic leading-relaxed">
               Funds will remain in our secure vault until your master joiner completes the restoration and you verify the craftsmanship.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <Hammer className="w-5 h-5 text-[#C9A96E] shrink-0" />
            <p className="text-xs italic leading-relaxed">
              Your assigned artisan has been notified to begin material procurement and molding replication.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-8">
          <Link href="/" className="w-full bg-[#1A1A1A] text-white py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-[#C9A96E] hover:text-black transition-all flex items-center justify-center">
            Return to Dashboard <ArrowRight className="ml-2 w-3 h-3" />
          </Link>
          <button className="text-[10px] uppercase underline opacity-30 hover:opacity-100 transition-opacity font-bold tracking-widest flex items-center justify-center w-full">
            <FileText className="w-3 h-3 mr-2" /> Download Escrow Receipt
          </button>
        </div>

        <div className="pt-8 border-t border-black/5 flex justify-between items-center text-[8px] uppercase tracking-widest font-bold opacity-30">
          <span>Project ID: {params.id}</span>
          <span>Status: ESCROW_PAID</span>
        </div>
      </div>
    </div>
  );
}
