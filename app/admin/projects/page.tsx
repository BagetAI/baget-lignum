'use client';

import { useState, useEffect } from 'react';
import { 
  Hammer, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Clock,
  LayoutGrid,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  ExternalLink
} from 'lucide-react';
import { getProjects } from '@/app/lib/db';

export default function PilotProjectsDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const p = await getProjects();
        setProjects(p || []);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-[#C9A96E] rounded-full mb-4"></div>
          <p className="font-serif italic text-xl">Loading Pilot Tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A] font-sans">
      <header className="border-b border-black/10 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="font-serif text-2xl font-bold tracking-tight">LIGNUM <span className="italic text-[#C9A96E]">Pilot Projects</span></h1>
            <span className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest px-2 py-1">Summer 2026 Batch</span>
          </div>
          <div className="flex items-center space-x-8 text-[10px] uppercase tracking-widest font-bold">
            <div className="flex items-center text-[#C9A96E]">
              <span className="w-2 h-2 bg-[#C9A96E] rounded-full mr-2"></span>
              Tracking {projects.length} Active Units
            </div>
            <a href="/admin/matchmaking" className="opacity-50 hover:opacity-100 transition-opacity">Matchmaking</a>
            <a href="/admin/escrow" className="opacity-50 hover:opacity-100 transition-opacity">Escrow</a>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-8 space-y-12">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="editorial-border p-6 bg-white flex flex-col justify-between">
            <LayoutGrid className="w-6 h-6 text-[#C9A96E] mb-4" />
            <div>
              <p className="text-3xl font-serif italic">{projects.length}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">Active Pilots</p>
            </div>
          </div>
          <div className="editorial-border p-6 bg-white flex flex-col justify-between">
            <ShieldCheck className="w-6 h-6 text-green-600 mb-4" />
            <div>
              <p className="text-3xl font-serif italic">100%</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">ABF Maintenance Class.</p>
            </div>
          </div>
          <div className="editorial-border p-6 bg-white flex flex-col justify-between">
            <TrendingUp className="w-6 h-6 text-[#C9A96E] mb-4" />
            <div>
              <p className="text-3xl font-serif italic">€{projects.reduce((acc, p) => acc + (p.escrow_amount_cents || 0), 0) / 100}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">Total Pipeline Value</p>
            </div>
          </div>
          <div className="editorial-border p-6 bg-[#1A1A1A] text-white flex flex-col justify-between">
            <Clock className="w-6 h-6 text-[#C9A96E] mb-4" />
            <div>
              <p className="text-3xl font-serif italic underline decoration-[#C9A96E]">June 2026</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 text-white/50">Kickoff window</p>
            </div>
          </div>
        </div>

        {/* Project List */}
        <div className="grid grid-cols-1 gap-8">
          <h2 className="font-serif text-3xl italic">Project Lifecycle Tracking</h2>
          <div className="space-y-4">
            {projects.map((p, idx) => (
              <div key={idx} className="bg-white editorial-border hover:border-[#C9A96E] transition-all group overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Project Info */}
                  <div className="p-8 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-black/10">
                    <div className="flex items-center space-x-2 mb-2">
                       <span className="text-[10px] bg-[#C9A96E]/10 text-[#C9A96E] px-2 py-0.5 font-bold uppercase tracking-tighter rounded">
                         {p.project_id}
                       </span>
                       <span className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-tighter rounded ${
                         p.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                       }`}>
                         {p.status}
                       </span>
                    </div>
                    <h3 className="font-serif text-2xl mb-4 group-hover:text-[#C9A96E] transition-colors leading-tight">
                      {p.project_name}
                    </h3>
                    <div className="space-y-2 text-[11px] opacity-70">
                       <div className="flex items-center">
                         <MapPin className="w-3 h-3 mr-2" />
                         {p.location}
                       </div>
                       <div className="flex items-center">
                         <Hammer className="w-3 h-3 mr-2" />
                         {p.building_style}
                       </div>
                       <div className="flex items-center">
                         <Calendar className="w-3 h-3 mr-2" />
                         Kickoff: {new Date(p.start_date).toLocaleDateString()}
                       </div>
                    </div>
                  </div>

                  {/* Middle: Match & Thermal */}
                  <div className="p-8 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-black/10 bg-[#FAFAF7]/50">
                    <div className="mb-6">
                       <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Matched Artisan</p>
                       <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                            <Hammer className="w-4 h-4 text-[#C9A96E]" />
                          </div>
                          <p className="font-serif text-lg italic">{p.artisan_name}</p>
                       </div>
                    </div>
                    <div>
                       <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">DPE Performance Goal</p>
                       <div className="flex items-center space-x-2">
                          <span className="text-xl font-serif italic text-red-500 line-through">G</span>
                          <ChevronRight className="w-4 h-4 opacity-30" />
                          <span className="text-2xl font-serif italic text-green-600 underline underline-offset-4 decoration-2">
                            {p.target_dpe_rating}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest font-bold bg-green-50 text-green-700 px-2 ml-4">ABF Pre-Approved</span>
                       </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="p-8 lg:w-1/3 flex flex-col justify-between items-end">
                     <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Escrow Value</p>
                        <p className="text-3xl font-serif italic">€{p.escrow_amount_cents / 100}</p>
                     </div>
                     <div className="flex flex-col items-end space-y-4">
                        <a 
                          href={`/pilot/checkout/${p.project_id}`}
                          className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#C9A96E] hover:text-black transition-colors bg-[#C9A96E]/10 px-4 py-2 rounded"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          <span>Portal Pilot Link</span>
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                        <button className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 hover:opacity-100 transition-opacity">
                            <span>View Technical Dossier</span>
                            <ClipboardCheck className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="p-8 bg-[#1A1A1A] text-white/50 text-[10px] uppercase tracking-[0.2em] leading-relaxed editorial-border">
          <p>LIGNUM PILOT RESTORATION PROGRAM (SUMMER 2026). ALL PROJECTS CLASSIFIED UNDER ARTICLE 1792-3 OF THE FRENCH CIVIL CODE (ENTRETIEN ET RÉPARATION). NON-STRUCTURAL INTERVENTION ENSURES DECENNALE INSURANCE EXCLUSION. ALL ESCROW FUNDS HELD SECURELY VIA STRIPE CONNECT PLATFORM.</p>
        </div>
      </main>
    </div>
  );
}
