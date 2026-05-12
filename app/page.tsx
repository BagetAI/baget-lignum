'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Clock, Euro, TrendingUp, Hammer, MapPin, Mail, User, Database, Library } from 'lucide-react';
import SavingsCalculator from '@/app/components/SavingsCalculator';

export default function Home() {
  const [checkerResult, setCheckerResult] = useState<{title: string, desc: string} | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({ artisans: 0, templates: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [artRes, moldRes] = await Promise.all([
          fetch('https://app.baget.ai/api/public/databases/cb7a664f-0cbf-424c-8c9d-34ca7e4cf0c8/count'),
          fetch('https://app.baget.ai/api/public/databases/233c2879-62e5-4d8a-9af7-1d944592b840/count')
        ]);
        const artData = await artRes.json();
        const moldData = await moldRes.json();
        setStats({ artisans: artData.count, templates: moldData.count });
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    }
    fetchStats();
  }, []);

  const checkStatus = (e: any) => {
    e.preventDefault();
    const addr = e.target.address.value.toLowerCase();
    if (['paris', 'lyon', 'bordeaux', 'strasbourg', 'nantes'].some(c => addr.includes(c))) {
      setCheckerResult({
        title: 'High Heritage Sensitivity',
        desc: 'Property is within a Site Patrimonial Remarquable. Restoration is the only viable path to compliance.'
      });
    } else {
      setCheckerResult({
        title: 'Standard Building Zone',
        desc: 'PLU guidelines apply. Lignum restoration still provides a 60% cost advantage over replacement.'
      });
    }
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        email: formData.get('email'),
        full_name: formData.get('full_name'),
        location: formData.get('location'),
        needs: formData.get('needs')
    };
    try {
      await fetch('https://app.baget.ai/api/public/databases/9e7f377e-4694-4f23-a830-dbab8609c3f9/rows', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data })
      });
      setSubmitted(true);
    } catch (err) {
      alert('Error submitting request.');
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A] font-sans selection:bg-[#C9A96E] selection:text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-8 border-b border-black/10 sticky top-0 bg-[#FAFAF7]/90 backdrop-blur-md z-50">
        <div className="font-serif text-3xl tracking-tighter font-bold">LIGNUM</div>
        <div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.3em] font-bold">
          <a href="#philosophy" className="hover:text-[#C9A96E] transition-colors">Philosophy</a>
          <a href="#performance" className="hover:text-[#C9A96E] transition-colors">Performance</a>
          <a href="#compliance" className="hover:text-[#C9A96E] transition-colors">Compliance</a>
          <a href="#contact" className="bg-[#1A1A1A] text-white px-6 py-2 -my-2 hover:bg-[#C9A96E] hover:text-black transition-all">Start Project</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-24 md:py-48 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-8">
            <h1 className="font-serif text-6xl md:text-9xl tracking-tight leading-[0.85] mb-12">
              Preserve <span className="italic text-[#C9A96E]">the</span> Past,<br />
              Perfect <span className="italic text-[#C9A96E]">the</span> Performance.
            </h1>
            <p className="text-xl md:text-2xl max-w-xl mb-12 opacity-80 italic font-serif leading-relaxed">
              Matchmaking for the &apos;Silver Economy&apos;. We pair retired master joiners with homeowners to solve the DPE energy crisis in historic French properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <a href="#contact" className="bg-[#1A1A1A] text-white px-12 py-6 text-sm tracking-widest uppercase hover:bg-[#C9A96E] hover:text-black transition-all flex items-center justify-center">
                Initiate Matchmaking <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a href="#calculator" className="border border-black px-12 py-6 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all text-center">
                Calculate Savings
              </a>
            </div>
          </div>
          <div className="md:col-span-4 hidden md:block">
            <div className="aspect-[3/4] bg-neutral-200 editorial-border flex items-center justify-center rotate-3 group hover:rotate-0 transition-transform duration-700">
               <Hammer className="w-24 h-24 text-black/10 group-hover:text-[#C9A96E]/40 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* Database Highlights */}
      <section className="py-20 bg-white border-y border-black/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-center space-x-8 p-12 editorial-border bg-[#FAFAF7]">
              <Database className="w-12 h-12 text-[#C9A96E]" />
              <div>
                <p className="text-5xl font-serif italic mb-2">{stats.artisans || '5'}+</p>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Verified Master Artisans</p>
              </div>
            </div>
            <div className="flex items-center space-x-8 p-12 editorial-border bg-[#FAFAF7]">
              <Library className="w-12 h-12 text-[#C9A96E]" />
              <div>
                <p className="text-5xl font-serif italic mb-2">{stats.templates || '4'}+</p>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Heritage Molding Profiles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section id="philosophy" className="bg-[#1A1A1A] text-white py-40 px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.5em] mb-12 block font-bold">The Heritage Loophole</span>
          <blockquote className="font-serif text-4xl md:text-6xl italic leading-tight mb-16">
            &quot;Classifying restoration as maintenance reduces insurance costs by 80% and accelerates ABF approval from months to weeks.&quot;
          </blockquote>
          <div className="h-px bg-[#C9A96E]/30 w-32 mx-auto"></div>
        </div>
      </section>

      {/* Stats */}
      <section id="performance" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="space-y-6 pt-16 md:pt-0">
                <Clock className="w-8 h-8 text-[#C9A96E]" />
                <h3 className="font-serif text-2xl uppercase tracking-tighter italic">4-Week Delivery</h3>
                <p className="text-sm opacity-70 leading-relaxed">Bypass the 14-month industrial backlog. Our network of retired artisans starts within weeks.</p>
            </div>
            <div className="space-y-6 pt-16 md:pt-0 md:pl-16">
                <Euro className="w-8 h-8 text-[#C9A96E]" />
                <h3 className="font-serif text-2xl uppercase tracking-tighter italic">60% Cost Saving</h3>
                <p className="text-sm opacity-70 leading-relaxed">Restoration costs €1,600–€2,400 per window vs. €5,000+ for bespoke industrial replacement.</p>
            </div>
            <div className="space-y-6 pt-16 md:pt-0 md:pl-16">
                <ShieldCheck className="w-8 h-8 text-[#C9A96E]" />
                <h3 className="font-serif text-2xl uppercase tracking-tighter italic">ABF Compliant</h3>
                <p className="text-sm opacity-70 leading-relaxed">Classified as &apos;Maintenance&apos; by the Architectes des Bâtiments de France. No structural permits required.</p>
            </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-32 px-8 bg-neutral-100/50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Audit your Investment</span>
          <h2 className="font-serif text-5xl italic tracking-tight">The DPE Restoration <br className="hidden md:block"/>Savings Calculator</h2>
        </div>
        <SavingsCalculator />
      </section>

      {/* Checker */}
      <section id="compliance" className="py-32 px-8 bg-white border-y border-black/10">
        <div className="max-w-3xl mx-auto text-center editorial-border p-12 bg-[#FAFAF7]">
          <h3 className="font-serif text-3xl mb-4 italic text-[#C9A96E]">Heritage Status Checker</h3>
          <p className="text-[10px] uppercase tracking-widest mb-12 border-b border-black pb-2 inline-block font-bold">Regulatory Intelligence</p>
          {!checkerResult ? (
            <form onSubmit={checkStatus} className="space-y-8">
              <p className="text-sm italic opacity-70">Enter your address to determine if your property falls within a Site Patrimonial Remarquable (SPR).</p>
              <input name="address" type="text" placeholder="e.g. Rue de Rivoli, Paris" className="w-full border-b border-black py-4 text-center font-serif text-2xl bg-transparent outline-none focus:border-[#C9A96E] transition-colors" />
              <button className="bg-black text-white px-12 py-4 uppercase tracking-[0.3em] text-sm w-full hover:bg-[#C9A96E] hover:text-black transition-all">Validate Address</button>
            </form>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="border border-black p-8 text-left bg-white">
                <h4 className="font-serif text-2xl mb-2 italic underline decoration-[#C9A96E]">{checkerResult.title}</h4>
                <p className="text-sm opacity-70 leading-relaxed">{checkerResult.desc}</p>
              </div>
              <button onClick={() => setCheckerResult(null)} className="text-xs uppercase underline tracking-widest opacity-50 hover:opacity-100">Check another address</button>
              <a href="#contact" className="block bg-[#C9A96E] text-black px-12 py-4 uppercase tracking-[0.3em] text-sm w-full hover:bg-black hover:text-white transition-all">Download Dossier</a>
            </div>
          )}
        </div>
      </section>

      {/* Form */}
      <section id="contact" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="font-serif text-6xl md:text-8xl tracking-tighter leading-none">Initiate <br/><span className="italic text-[#C9A96E]">the</span> Matchmaking</h2>
            <p className="font-serif text-xl italic opacity-70 leading-relaxed max-w-md">
                Connecting you with the &apos;Compagnon-Emeritus&apos; network. Heritage joinery restored with modern vacuum glazing.
            </p>
            <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-white">
                    <MapPin className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Active Zones</p>
                    <p className="font-serif text-lg italic">Paris, Lyon, Bordeaux, Strasbourg</p>
                </div>
            </div>
          </div>
          
          <div className="bg-white border border-black p-12 shadow-2xl relative overflow-hidden">
            {submitted ? (
              <div className="text-center py-24 space-y-6">
                 <h3 className="font-serif text-4xl italic text-[#C9A96E]">Merci.</h3>
                 <p className="text-sm tracking-widest uppercase">Your dossier is being prepared.</p>
              </div>
            ) : (
              <form onSubmit={handleForm} className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold flex items-center"><User className="w-3 h-3 mr-2" /> Full Name</label>
                    <input name="full_name" required className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E]" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold flex items-center"><Mail className="w-3 h-3 mr-2" /> Email Address</label>
                    <input name="email" type="email" required className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E]" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold flex items-center"><MapPin className="w-3 h-3 mr-2" /> Location</label>
                    <input name="location" required className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E]" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold flex items-center">Restoration Scope</label>
                    <textarea name="needs" rows={3} className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E] resize-none" placeholder="e.g. 5 oak windows, thermal retrofit."></textarea>
                </div>
                <button className="bg-black text-white w-full py-6 uppercase tracking-[0.3em] text-sm hover:bg-[#C9A96E] hover:text-black transition-all">Apply for Matchmaking</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/10 pt-16">
          <div className="font-serif text-4xl">LIGNUM</div>
          <div className="flex space-x-12 text-[10px] uppercase tracking-widest opacity-40">
            <p>© 2026 LIGNUM MATCHMAKING</p>
            <p>ART. 1792-3 CODE CIVIL</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
