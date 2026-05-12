'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Clock, Euro, TrendingUp, Hammer, MapPin, Mail, User, Database, Library, Scale } from 'lucide-react';
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
          <a href="/loophole" className="text-[#C9A96E] hover:text-black transition-colors">The Loophole</a>
          <a href="#philosophy" className="hover:text-[#C9A96E] transition-colors">Philosophy</a>
          <a href="#performance" className="hover:text-[#C9A96E] transition-colors">Performance</a>
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
              <a href="/loophole" className="bg-[#C9A96E] text-[#1A1A1A] px-12 py-6 text-sm tracking-widest uppercase font-bold hover:bg-black hover:text-white transition-all flex items-center justify-center">
                Bypass the Permit <Scale className="ml-2 w-4 h-4" />
              </a>
              <a href="#contact" className="bg-[#1A1A1A] text-white px-12 py-6 text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:border-black border border-transparent transition-all flex items-center justify-center">
                Initiate Matchmaking <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="md:col-span-4 hidden md:block">
            <div className="aspect-[3/4] bg-[#C9A96E]/10 editorial-border flex items-center justify-center rotate-3 group hover:rotate-0 transition-transform duration-700 overflow-hidden">
               <Hammer className="w-24 h-24 text-[#C9A96E] opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Loophole Feature Section */}
      <section className="py-32 bg-[#1A1A1A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.5em] font-bold block">Art. 1792-3 Civil Code</span>
            <h2 className="font-serif text-5xl md:text-7xl italic tracking-tighter leading-none">The 30-Day <br/>Fast-Track.</h2>
            <p className="text-xl opacity-60 font-serif italic leading-relaxed">
              Avoid the 6-month ABF permit cycle by classifying your thermal upgrade as &quot;Maintenance & Repair.&quot; 
            </p>
            <a href="/loophole" className="inline-flex items-center text-[#C9A96E] uppercase tracking-[0.3em] text-xs font-bold hover:underline">
              Read the Regulatory Briefing <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
          <div className="relative">
             <div className="editorial-border p-12 bg-[#FAFAF7] text-[#1A1A1A] -rotate-2 relative z-10">
                <Scale className="w-12 h-12 text-[#C9A96E] mb-8" />
                <h3 className="font-serif text-3xl italic mb-4">The Loophole</h3>
                <p className="text-sm opacity-70 leading-relaxed mb-8">
                   We restore the existing sash and install 6mm vacuum glass without altering the structural frame. This legal distinction bypasses the mandatory Déclaration Préalable.
                </p>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold border-t border-black/10 pt-8">
                   <span>Wait Time: 30 Days</span>
                   <span className="text-green-600">ABF Pre-Approved</span>
                </div>
             </div>
             <div className="absolute inset-0 bg-[#C9A96E] translate-x-4 translate-y-4"></div>
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
