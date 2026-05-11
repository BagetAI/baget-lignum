'use client';

import { useState } from 'react';

export default function StatusChecker() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<null | 'protected' | 'standard'>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified logic for prototype: if address contains Paris, Lyon, or Bordeaux, it's protected
    const cityKeywords = ['paris', 'lyon', 'bordeaux', 'strasbourg', 'nantes'];
    const isProtected = cityKeywords.some(city => address.toLowerCase().includes(city));
    setResult(isProtected ? 'protected' : 'standard');
    setStep(2);
  };

  return (
    <div className="editorial-border p-8 bg-white max-w-xl mx-auto my-12">
      <h3 className="font-serif text-2xl mb-4 italic text-lignum-gold">Heritage Status Checker</h3>
      <p className="text-sm mb-6 uppercase tracking-widest border-b border-lignum-charcoal pb-2 inline-block">
        Determine your regulatory path
      </p>

      {step === 1 ? (
        <form onSubmit={handleCheck} className="space-y-4">
          <p className="text-sm font-sans italic">
            Enter your property address to check if you fall under SPR (Site Patrimonial Remarquable) regulations.
          </p>
          <input
            type="text"
            placeholder="Property Address (e.g., 12 Rue de Rivoli, Paris)"
            required
            className="w-full bg-lignum-white border-b border-lignum-charcoal py-3 px-4 font-sans focus:outline-none focus:border-lignum-gold transition-colors"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-lignum-charcoal text-lignum-white py-4 font-sans text-sm tracking-widest uppercase hover:bg-lignum-gold hover:text-lignum-charcoal transition-all duration-300"
          >
            Check Regulatory Status
          </button>
        </form>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="editorial-border p-4">
            <h4 className="font-serif text-xl mb-2">
              {result === 'protected' ? 'High Heritage Sensitivity' : 'Standard Building Zone'}
            </h4>
            <p className="text-sm">
              {result === 'protected' 
                ? 'Your property likely requires ABF approval. Replacement with modern materials is restricted. Restoration is your fastest regulatory path.' 
                : 'Your property may follow standard local urbanism rules (PLU). High-efficiency restoration still offers the best cost-to-performance ratio.'}
            </p>
          </div>
          <button
            onClick={() => {
              document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-lignum-gold text-lignum-charcoal py-4 font-sans text-sm tracking-widest uppercase hover:bg-lignum-charcoal hover:text-lignum-white transition-all duration-300"
          >
            Get Restoration Dossier
          </button>
          <button 
            onClick={() => setStep(1)}
            className="w-full text-xs underline opacity-50 hover:opacity-100 uppercase tracking-tighter"
          >
            Check another address
          </button>
        </div>
      )}
    </div>
  );
}