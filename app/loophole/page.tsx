'use client';

import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  ArrowRight, 
  Scale, 
  CheckCircle2, 
  Hammer, 
  MapPin,
  TrendingUp,
  Mail,
  User,
  Info
} from 'lucide-react';
import { useState } from 'react';

export default function LoopholePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleForm = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        email: formData.get('email'),
        full_name: formData.get('full_name'),
        location: formData.get('location'),
        needs: 'Loophole Inquiry: ' + formData.get('needs'),
        property_type: 'heritage_fast_track'
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
    <main className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A] font-sans">
      {/* Editorial Header */}
      <nav className="p-8 border-b border-black/10 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <a href="/" className="font-serif text-3xl font-bold tracking-tighter">LIGNUM</a>
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 hidden md:block">
          Regulatory Briefing: Article 1792-3
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-24 md:py-32 max-w-6xl mx-auto border-b border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div>
            <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block">The Maintenance Loophole</span>
            <h1 className="font-serif text-6xl md:text-8xl italic leading-[0.9] tracking-tighter mb-12">
              Bypass <br/>the 6-Month <br/>ABF Permit.
            </h1>
            <p className="text-xl md:text-2xl opacity-80 font-serif italic leading-relaxed max-w-md">
              A regulatory fast-track for homeowners in historical centers to secure 2026 DPE compliance in under 30 days.
            </p>
          </div>
          <div className="editorial-border p-10 bg-white space-y-8 rotate-1">
            <Scale className="w-12 h-12 text-[#C9A96E]" />
            <div className="space-y-4">
              <h3 className="font-serif text-2xl italic">Article 1792-3</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Under the French Civil Code, window restoration classified as &quot;Maintenance and Repair&quot; bypasses the mandatory Déclaration Préalable (DP) cycle, allowing for immediate thermal upgrades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Strategy */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center font-serif text-lg italic">01</div>
            <h3 className="font-serif text-2xl italic">Preserve the Dormant</h3>
            <p className="text-sm opacity-60 leading-relaxed">
              We retain your original 19th-century oak frames. By avoiding masonry contact, the project remains &quot;secondary work,&quot; eliminating the 10-year Spinetta insurance requirement.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center font-serif text-lg italic">02</div>
            <h3 className="font-serif text-2xl italic">6mm Vacuum Glass</h3>
            <p className="text-sm opacity-60 leading-relaxed">
              We route thin 10mm rebates for Fineo vacuum-insulated glass. This delivers triple-glazing performance (Ug 0.7) while maintaining the original profile the ABF demands.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center font-serif text-lg italic">03</div>
            <h3 className="font-serif text-2xl italic">30-Day Notification</h3>
            <p className="text-sm opacity-60 leading-relaxed">
              Lignum prepares the Technical Maintenance Dossier. In SPR zones, maintenance on existing joinery follows a 30-day silent approval path rather than a 6-month permit.
            </p>
          </div>
        </div>
      </section>

      {/* Conversion Section */}
      <section className="bg-[#1A1A1A] text-white py-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-7 space-y-12">
            <h2 className="font-serif text-5xl md:text-7xl italic leading-none">Secure Your <br/><span className="text-[#C9A96E]">Rental Status.</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border border-white/10 space-y-4">
                 <Clock className="w-6 h-6 text-[#C9A96E]" />
                 <p className="text-2xl font-serif italic">30 Days</p>
                 <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Regulatory Lead Time</p>
              </div>
              <div className="p-8 border border-white/10 space-y-4">
                 <TrendingUp className="w-6 h-6 text-[#C9A96E]" />
                 <p className="text-2xl font-serif italic">G to E / D</p>
                 <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Guaranteed DPE Shift</p>
              </div>
            </div>

            <div className="space-y-6 opacity-60 italic text-sm border-l border-[#C9A96E] pl-8">
              <p>&quot;Owners of G-rated units in Le Marais or Bordeaux UNESCO zones are facing a total rental ban by June 2026. The Lignum Maintenance path is the only regulatory arbitrage that protects your yield before the deadline.&quot;</p>
              <p className="text-[10px] uppercase tracking-widest font-bold not-italic">— Raphael, Project Shepherd</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#FAFAF7] text-[#1A1A1A] p-10 editorial-border shadow-2xl relative">
              <div className="absolute top-0 right-0 bg-[#C9A96E] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                Fast-Track Audit
              </div>
              
              {submitted ? (
                <div className="text-center py-20 animate-in zoom-in-95 duration-500">
                  <CheckCircle2 className="w-16 h-16 text-[#C9A96E] mx-auto mb-6" />
                  <h3 className="font-serif text-3xl italic mb-4">Dossier Dispatched.</h3>
                  <p className="text-sm opacity-60 max-w-[240px] mx-auto uppercase tracking-widest">
                    We are reviewing your property location for SPR compliance.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForm} className="space-y-8">
                  <h3 className="font-serif text-3xl italic">Request Loophole Audit.</h3>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold flex items-center opacity-40"><User className="w-3 h-3 mr-2" /> Full Name</label>
                      <input name="full_name" required className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E] bg-transparent" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold flex items-center opacity-40"><Mail className="w-3 h-3 mr-2" /> Email Address</label>
                      <input name="email" type="email" required className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E] bg-transparent" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold flex items-center opacity-40"><MapPin className="w-3 h-3 mr-2" /> Property Location</label>
                      <input name="location" required className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E] bg-transparent" placeholder="e.g. Paris 4e / Bordeaux Chartrons" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold flex items-center opacity-40">Project Context</label>
                      <textarea name="needs" rows={3} className="w-full border-b border-black py-2 outline-none focus:border-[#C9A96E] bg-transparent resize-none" placeholder="e.g. Facing 2026 rental ban. Need DPE G rescue."></textarea>
                    </div>
                  </div>
                  <button className="w-full bg-[#1A1A1A] text-white py-6 uppercase tracking-[0.3em] text-sm hover:bg-[#C9A96E] hover:text-[#1A1A1A] transition-all flex items-center justify-center">
                    Audit My Eligibility <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                  <div className="flex items-center justify-center space-x-4 opacity-30">
                    <ShieldCheck className="w-5 h-5" />
                    <CheckCircle2 className="w-5 h-5" />
                    <Info className="w-5 h-5" />
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-8 py-32 max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl italic text-center mb-16 underline decoration-[#C9A96E] underline-offset-8 decoration-2">The Arbitrage Table</h2>
        <div className="editorial-border overflow-hidden bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] font-bold">
              <tr>
                <th className="p-6">Feature</th>
                <th className="p-6">Industrial Replacement</th>
                <th className="p-6 text-[#C9A96E]">Lignum Loophole Path</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 text-sm">
              <tr>
                <td className="p-6 font-bold uppercase tracking-widest text-[10px]">Permit Cycle</td>
                <td className="p-6 opacity-60">6-12 Months (DP Required)</td>
                <td className="p-6 font-serif italic text-lg">30-Day Notification</td>
              </tr>
              <tr>
                <td className="p-6 font-bold uppercase tracking-widest text-[10px]">ABF Refusal Risk</td>
                <td className="p-6 opacity-60">High (Profile Mismatch)</td>
                <td className="p-6 font-serif italic text-lg text-green-600">Near-Zero (Conservation)</td>
              </tr>
              <tr>
                <td className="p-6 font-bold uppercase tracking-widest text-[10px]">Cost / Window</td>
                <td className="p-6 opacity-60">€4,500 – €6,500</td>
                <td className="p-6 font-serif italic text-lg">€1,800 – €2,400</td>
              </tr>
              <tr>
                <td className="p-6 font-bold uppercase tracking-widest text-[10px]">Insurance</td>
                <td className="p-6 opacity-60">Decennial (Structural)</td>
                <td className="p-6 font-serif italic text-lg">RC Pro (Maintenance)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black/10 py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-40 text-[9px] uppercase tracking-[0.2em] font-bold">
          <p>© 2026 LIGNUM MATCHMAKING</p>
          <div className="flex space-x-8">
            <a href="/" className="hover:text-black">Home</a>
            <a href="/admin/projects" className="hover:text-black">Pilot Tracker</a>
          </div>
          <p>Art. 1792-3 Code Civil</p>
        </div>
      </footer>
    </main>
  );
}
