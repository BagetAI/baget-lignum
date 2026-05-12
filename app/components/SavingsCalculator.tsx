'use client';

import { useState } from 'react';
import { 
  ArrowRight, 
  Euro, 
  TrendingUp, 
  ShieldCheck, 
  Mail, 
  User, 
  Download,
  Calculator,
  Info
} from 'lucide-react';

export default function SavingsCalculator() {
  const [step, setStep] = useState(1);
  const [windowCount, setWindowCount] = useState(5);
  const [currentDpe, setCurrentDpe] = useState('G');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Constants for 2026 Context
  const RESTORATION_COST_PER_WINDOW = 2100;
  const REPLACEMENT_COST_PER_WINDOW = 5800;
  const AVG_ANNUAL_RENT_PER_M2 = 420; // Paris Heritage Benchmark
  const AVG_APT_SIZE = 85; // m2

  // Calculation Logic
  const restorationTotal = windowCount * RESTORATION_COST_PER_WINDOW;
  const replacementTotal = windowCount * REPLACEMENT_COST_PER_WINDOW;
  const totalCapitalSaved = replacementTotal - restorationTotal;
  
  // DPE Shift Estimation
  const getTargetDpe = (current: string) => {
    if (current === 'G') return 'E';
    if (current === 'F') return 'D';
    return 'D';
  };

  // Rental Protection Value
  const annualRentalValue = AVG_ANNUAL_RENT_PER_M2 * AVG_APT_SIZE;
  const rentalValueProtected = (currentDpe === 'G' || currentDpe === 'F') ? annualRentalValue : annualRentalValue * 0.5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      email,
      full_name: name,
      location: 'Calculator Lead',
      needs: `Calculator results: ${windowCount} windows, DPE ${currentDpe} -> ${getTargetDpe(currentDpe)}. Estimated savings: €${totalCapitalSaved}.`,
      property_type: 'haussmannian'
    };

    try {
      await fetch('https://app.baget.ai/api/public/databases/9e7f377e-4694-4f23-a830-dbab8609c3f9/rows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit lead', err);
    }
  };

  return (
    <div className="editorial-border bg-white overflow-hidden shadow-2xl max-w-4xl mx-auto my-24">
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Input Panel */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/10 bg-[#FAFAF7]/50">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] font-bold text-[#C9A96E] mb-8">
            <Calculator className="w-4 h-4" />
            <span>Investment Efficiency Auditor</span>
          </div>
          
          <h2 className="font-serif text-3xl italic mb-12">Calculate Your <br/>Restoration Arbitrage.</h2>

          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-left-4">
              <div className="space-y-6">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 flex justify-between">
                  Window Count
                  <span className="text-[#C9A96E]">{windowCount} Units</span>
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={windowCount}
                  onChange={(e) => setWindowCount(parseInt(e.target.value))}
                  className="w-full accent-[#C9A96E] h-1 bg-black/10 appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-6">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Current DPE Rating</label>
                <div className="flex justify-between gap-2">
                  {['G', 'F', 'E'].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setCurrentDpe(rating)}
                      className={`flex-1 py-4 font-serif text-2xl transition-all border ${
                        currentDpe === rating 
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                          : 'bg-white text-black/30 border-black/10 hover:border-[#C9A96E]'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-[#1A1A1A] text-white py-6 uppercase tracking-[0.3em] text-sm hover:bg-[#C9A96E] hover:text-black transition-all flex items-center justify-center"
              >
                Compute Savings <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && !submitted && (
            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-left-4">
              <p className="text-sm italic opacity-70">
                To download your full technical summary and ABF compliance roadmap, please provide your contact details.
              </p>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold flex items-center opacity-40"><User className="w-3 h-3 mr-2" /> Name</label>
                  <input 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E] bg-transparent" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold flex items-center opacity-40"><Mail className="w-3 h-3 mr-2" /> Email</label>
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E] bg-transparent" 
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#C9A96E] text-black py-6 uppercase tracking-[0.3em] text-sm hover:bg-black hover:text-white transition-all flex items-center justify-center"
              >
                Download Technical Summary <Download className="ml-2 w-4 h-4" />
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full text-[10px] uppercase underline opacity-30 hover:opacity-100 transition-opacity"
              >
                Adjust Parameters
              </button>
            </form>
          )}

          {submitted && (
            <div className="text-center py-20 animate-in zoom-in-95 duration-500">
              <ShieldCheck className="w-16 h-16 text-[#C9A96E] mx-auto mb-6" />
              <h3 className="font-serif text-3xl italic mb-4">Dossier Dispatched.</h3>
              <p className="text-sm opacity-60 max-w-[240px] mx-auto uppercase tracking-widest">
                Check your inbox for the 2026 Heritage Compliance Guide.
              </p>
            </div>
          )}
        </div>

        {/* Right: Results Panel */}
        <div className="p-8 md:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-12">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">Estimated DPE Shift</p>
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-serif italic text-red-500 line-through opacity-30">{currentDpe}</span>
                <ArrowRight className="w-6 h-6 opacity-20" />
                <span className="text-6xl font-serif italic text-green-600 underline decoration-2 underline-offset-8 decoration-[#C9A96E]">
                  {getTargetDpe(currentDpe)}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-green-700 mt-4 flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> ABF Maintenance Pre-Approved
              </p>
            </div>

            <div className="space-y-6 pt-12 border-t border-black/5">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Capital Saved</p>
                  <p className="font-serif text-3xl italic">€{totalCapitalSaved.toLocaleString()}</p>
                </div>
                <Euro className="w-8 h-8 text-[#C9A96E] opacity-20 mb-1" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Rental Income Protected</p>
                  <p className="font-serif text-3xl italic">€{rentalValueProtected.toLocaleString()}/yr</p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#C9A96E] opacity-20 mb-1" />
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 editorial-border bg-[#FAFAF7] space-y-4">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold">
              <Info className="w-3 h-3 text-[#C9A96E]" />
              <span>Investment Rationale</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-70 italic">
              By using Fineo vacuum glass (6mm), we achieve triple-glazing performance while retaining your original oak frames. This bypasses the 6-month ABF permit wait and the 10-year Spinetta insurance requirement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
