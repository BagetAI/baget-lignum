'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Euro, 
  ArrowRight, 
  Hammer, 
  MapPin, 
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';

export default function PilotCheckout({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`https://app.baget.ai/api/public/databases/c9c42141-cbe9-4f23-9ab9-8ed5880b4a56/rows`);
        const data = await res.json();
        const found = data.rows.find((r: any) => r.project_id === params.id);
        setProject(found);
      } catch (err) {
        console.error("Failed to load project", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [params.id]);

  const handleDeposit = async () => {
    setProcessing(true);
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.project_id,
          homeownerEmail: 'homeowner@example.com', // In a real flow, this is the current user's email
          artisanName: project.artisan_name,
          amountCents: project.escrow_amount_cents,
          projectName: project.project_name
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif italic">Loading Project Securely...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center font-serif italic text-red-600">Project Not Found.</div>;

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A] font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left: Summary */}
        <div className="md:col-span-7 space-y-12">
          <header className="space-y-4">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A96E]">
              <Lock className="w-4 h-4" />
              <span>Secure Escrow Portal</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl italic leading-none">Restoration <br/>Deposit.</h1>
          </header>

          <div className="editorial-border p-8 bg-white space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Project Reference</p>
                <h2 className="font-serif text-2xl">{project.project_name}</h2>
              </div>
              <span className="bg-[#1A1A1A] text-white text-[9px] px-2 py-1 uppercase tracking-widest">{project.project_id}</span>
            </div>

            <div className="grid grid-cols-2 gap-8 text-[11px] uppercase tracking-widest font-bold border-y border-black/5 py-8">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 opacity-30" />
                {project.location}
              </div>
              <div className="flex items-center">
                <Hammer className="w-4 h-4 mr-3 opacity-30" />
                {project.artisan_name}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm italic opacity-60">Escrow Total</span>
                <span className="font-serif text-3xl">€{(project.escrow_amount_cents / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-green-600">
                <span className="flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> Held in Platform Escrow</span>
                <span>PSD2 Compliant</span>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4 opacity-50 italic text-xs leading-relaxed">
            <Clock className="w-5 h-5 shrink-0" />
            <p>Funds are held securely by LIGNUM and only released to the artisan upon your digital sign-off and verification of ABF maintenance standards.</p>
          </div>
        </div>

        {/* Right: Payment Block */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <div className="editorial-border p-10 bg-[#1A1A1A] text-white space-y-8 shadow-2xl">
            <h3 className="font-serif text-3xl italic">Payment Authorization</h3>
            <p className="text-xs opacity-60 leading-relaxed uppercase tracking-widest">
              Authorize the transfer of €{(project.escrow_amount_cents / 100).toLocaleString()} to the secure escrow vault.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={handleDeposit}
                disabled={processing}
                className="w-full bg-[#C9A96E] text-[#1A1A1A] py-6 uppercase tracking-[0.3em] text-sm font-bold hover:bg-white transition-all flex items-center justify-center disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Proceed to Checkout'} 
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              
              <div className="flex justify-center space-x-4 opacity-30">
                <Euro className="w-6 h-6" />
                <CheckCircle2 className="w-6 h-6" />
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-[9px] uppercase tracking-widest font-bold">
                <span className="opacity-40">Transaction Security</span>
                <span className="text-[#C9A96E]">Verified</span>
              </div>
              <p className="text-[8px] opacity-30 uppercase leading-normal tracking-tight">
                All transactions are processed via Stripe Connect. Lignum does not store your credit card information.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Branding */}
      <footer className="max-w-4xl mx-auto mt-24 border-t border-black/10 pt-8 flex justify-between items-center opacity-40">
        <div className="font-serif text-xl font-bold tracking-tight">LIGNUM</div>
        <p className="text-[9px] uppercase tracking-[0.2em]">Pilot Program Batch 2026</p>
      </footer>
    </div>
  );
}
