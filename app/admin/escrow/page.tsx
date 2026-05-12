'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  UserCheck, 
  CreditCard, 
  ArrowRight,
  Clock,
  CheckCircle2,
  FileSignature
} from 'lucide-react';

export default function EscrowDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('https://app.baget.ai/api/public/databases/66a82993-aed4-4766-b04b-98a4cfae9a6b/rows');
        const data = await res.json();
        setProjects(data.rows || []);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const releaseFunds = async (project: any) => {
    if (!confirm(`Release €${project.amount_cents / 100} to the artisan?`)) return;

    try {
      const res = await fetch('/api/stripe/release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.project_id,
          connectedAccountId: 'acct_123...', // This would come from the artisan profile
          amountCents: project.amount_cents
        })
      });
      
      const result = await res.json();
      if (result.success) {
        alert(`Funds released! Transfer ID: ${result.transferId}`);
        // Refresh project status
        window.location.reload();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      alert("Transfer failed.");
    }
  };

  if (loading) {
    return <div className="p-12 text-center font-serif italic">Loading Escrow Vault...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1A1A] font-sans p-8">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end border-b border-black/10 pb-8">
        <div>
          <h1 className="font-serif text-4xl mb-2 italic">Escrow & Payouts</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">PSD2 Compliant Heritage Fund Management</p>
        </div>
        <ShieldCheck className="w-12 h-12 text-[#C9A96E]" />
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="editorial-border p-6 bg-white space-y-4">
            <Lock className="w-6 h-6 text-[#C9A96E]" />
            <p className="text-3xl font-serif italic">€{projects.filter(p => p.status === 'PAID').reduce((acc, p) => acc + (p.amount_cents || 0), 0) / 100}</p>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Currently Held in Escrow</p>
          </div>
          <div className="editorial-border p-6 bg-white space-y-4">
            <Clock className="w-6 h-6 text-[#C9A96E]" />
            <p className="text-3xl font-serif italic">{projects.filter(p => p.status === 'PAID').length}</p>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Projects Awaiting Completion</p>
          </div>
          <div className="editorial-border p-6 bg-white space-y-4">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <p className="text-3xl font-serif italic">€{projects.filter(p => p.status === 'RELEASED').reduce((acc, p) => acc + (p.amount_cents || 0), 0) / 100}</p>
            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Total Released to Artisans</p>
          </div>
        </div>

        <div className="editorial-border bg-white overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] font-bold">
              <tr>
                <th className="p-4">Project ID</th>
                <th className="p-4">Homeowner</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center italic opacity-50">No active escrow sessions</td>
                </tr>
              ) : (
                projects.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#C9A96E]/5 transition-colors">
                    <td className="p-4 font-mono text-xs">{p.project_id}</td>
                    <td className="p-4 text-xs">{p.homeowner_email}</td>
                    <td className="p-4 font-serif italic">€{p.amount_cents / 100}</td>
                    <td className="p-4">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${
                        p.status === 'PAID' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {p.status === 'PAID' ? (
                        <button 
                          onClick={() => releaseFunds(p)}
                          className="flex items-center text-[10px] font-bold uppercase tracking-widest text-[#C9A96E] hover:underline"
                        >
                          <FileSignature className="w-3 h-3 mr-1" /> Release Funds
                        </button>
                      ) : (
                        <span className="text-[10px] opacity-30 italic">Transferred</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
