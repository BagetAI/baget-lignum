'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Compass, 
  MapPin, 
  Filter, 
  Search, 
  Hammer, 
  ClipboardList, 
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { getLeads, getArtisans, getMoldingCatalog } from '@/app/lib/db';

export default function MatchmakingDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [artisans, setArtisans] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  
  // Filters
  const [regionFilter, setRegionFilter] = useState('');
  const [styleFilter, setStyleFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [l, a, t] = await Promise.all([
          getLeads(),
          getArtisans(),
          getMoldingCatalog()
        ]);
        setLeads(l || []);
        setArtisans(a || []);
        setTemplates(t || []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredArtisans = artisans.filter(a => {
    const matchesRegion = !regionFilter || a.region?.toLowerCase().includes(regionFilter.toLowerCase());
    const matchesSearch = !searchQuery || a.name?.toLowerCase().includes(searchQuery.toLowerCase()) || a.specialty_century?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const filteredTemplates = templates.filter(t => {
    const matchesStyle = !styleFilter || t.style_period?.toLowerCase().includes(styleFilter.toLowerCase());
    return matchesStyle;
  });

  const getMatchedArtisans = (lead: any) => {
    if (!lead) return [];
    // Basic matching: Check if artisan region matches lead location
    return artisans.filter(a => 
      lead.location?.toLowerCase().includes(a.region?.toLowerCase().split(' ')[0] || '___')
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lignum-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-lignum-gold rounded-full mb-4"></div>
          <p className="font-serif italic text-xl">Loading Registry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lignum-white text-lignum-charcoal font-sans">
      {/* Header */}
      <header className="border-b border-lignum-charcoal/10 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="font-serif text-2xl font-bold tracking-tight">LIGNUM <span className="italic text-lignum-gold">Matchmaker</span></h1>
            <span className="bg-lignum-charcoal text-white text-[10px] uppercase tracking-widest px-2 py-1">Internal Admin</span>
          </div>
          <div className="flex items-center space-x-8 text-[10px] uppercase tracking-widest font-bold">
            <div className="flex items-center text-lignum-gold">
              <span className="w-2 h-2 bg-lignum-gold rounded-full mr-2 animate-ping"></span>
              Live Registry Access
            </div>
            <button className="opacity-50 hover:opacity-100 transition-opacity">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Leads */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl flex items-center">
              <ClipboardList className="w-5 h-5 mr-2 text-lignum-gold" />
              Incoming Requests
            </h2>
            <span className="text-[10px] bg-lignum-charcoal/5 px-2 py-1 rounded">{leads.length} Leads</span>
          </div>
          
          <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
            {leads.length === 0 ? (
              <div className="editorial-border p-8 text-center opacity-50 italic">No pending requests</div>
            ) : (
              leads.map((lead, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedLead(lead)}
                  className={`cursor-pointer transition-all duration-300 editorial-border p-6 bg-white hover:shadow-lg ${selectedLead === lead ? 'border-lignum-gold ring-1 ring-lignum-gold' : 'border-lignum-charcoal/20'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif text-lg leading-tight">{lead.full_name}</h3>
                      <p className="text-[10px] uppercase tracking-widest opacity-50">{lead.email}</p>
                    </div>
                    <div className="flex items-center text-[10px] bg-lignum-gold/10 text-lignum-gold px-2 py-1 rounded font-bold">
                      <MapPin className="w-3 h-3 mr-1" />
                      {lead.location}
                    </div>
                  </div>
                  <p className="text-xs line-clamp-2 italic opacity-70 mb-4">&quot;{lead.needs}&quot;</p>
                  <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold">
                    <span className="opacity-40">{lead.property_type || 'Heritage Asset'}</span>
                    <span className="text-lignum-gold flex items-center">Review Match <ChevronRight className="w-3 h-3 ml-1" /></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Middle Column: Artisan Matching */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h2 className="font-serif text-xl flex items-center">
              <Hammer className="w-5 h-5 mr-2 text-lignum-gold" />
              Artisan Registry
            </h2>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 opacity-30" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-white border border-lignum-charcoal/10 pl-7 pr-3 py-1.5 text-xs focus:outline-none focus:border-lignum-gold w-32"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className="bg-white border border-lignum-charcoal/10 px-3 py-1.5 text-xs focus:outline-none focus:border-lignum-gold appearance-none"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="">All Regions</option>
                <option value="Paris">Paris</option>
                <option value="Bordeaux">Bordeaux</option>
                <option value="Lyon">Lyon</option>
                <option value="Strasbourg">Strasbourg</option>
                <option value="Nantes">Nantes</option>
              </select>
            </div>
          </div>

          {selectedLead && (
            <div className="bg-lignum-gold/5 border border-lignum-gold/20 p-4 mb-6 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-lignum-gold mb-2">
                <UserCheck className="w-3 h-3 mr-2" />
                Suggested Matches for {selectedLead.full_name}
              </div>
              <div className="flex flex-wrap gap-2">
                {getMatchedArtisans(selectedLead).length > 0 ? (
                  getMatchedArtisans(selectedLead).map((a, i) => (
                    <span key={i} className="bg-lignum-gold text-white text-[9px] px-2 py-1 rounded-full uppercase tracking-tighter">
                      {a.name} ({a.region})
                    </span>
                  ))
                ) : (
                  <span className="text-xs italic opacity-50">No immediate regional matches found.</span>
                )}
              </div>
            </div>
          )}

          <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
            {filteredArtisans.map((artisan, idx) => (
              <div key={idx} className="bg-white editorial-border p-6 flex items-start space-x-4 hover:border-lignum-gold transition-colors">
                <div className="w-12 h-12 bg-lignum-charcoal/5 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-lignum-gold/50" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-lg">{artisan.name}</h3>
                    <span className="text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 border border-green-200 uppercase font-bold tracking-widest">
                      {artisan.active ? 'Available' : 'Assigned'}
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest opacity-60 mb-3">{artisan.certification} | {artisan.specialty_century}</p>
                  <p className="text-xs opacity-80 leading-relaxed mb-4">{artisan.bio}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4 text-[10px] font-bold">
                      <span className="flex items-center opacity-40"><MapPin className="w-3 h-3 mr-1" /> {artisan.region}</span>
                    </div>
                    <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-lignum-gold hover:underline">Draft Match Dossier</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Molding Matcher */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl flex items-center">
              <Compass className="w-5 h-5 mr-2 text-lignum-gold" />
              Molding Profiles
            </h2>
            <select 
              className="bg-white border border-lignum-charcoal/10 px-3 py-1.5 text-xs focus:outline-none focus:border-lignum-gold appearance-none"
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
            >
              <option value="">Styles</option>
              <option value="Haussmannian">Haussmann</option>
              <option value="18th Century">18th C.</option>
              <option value="Renaissance">Renaissance</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredTemplates.map((template, idx) => (
              <div key={idx} className="bg-white border border-lignum-charcoal/10 p-4 group hover:bg-lignum-charcoal hover:text-white transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-serif italic text-sm">{template.template_name}</h4>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[8px] uppercase tracking-widest opacity-50 group-hover:opacity-100">{template.style_period}</p>
                    <p className="text-[10px] font-bold uppercase tracking-tighter">{template.molding_type}</p>
                  </div>
                  <span className="text-[8px] border border-current px-1.5 py-0.5 opacity-30 group-hover:opacity-100 uppercase">{template.material_suitability}</span>
                </div>
              </div>
            ))}
            
            {/* Action Card */}
            <div className="editorial-border p-6 bg-lignum-charcoal text-white text-center space-y-4">
               <AlertCircle className="w-8 h-8 text-lignum-gold mx-auto" />
               <p className="font-serif italic text-sm">Need a custom profile replication?</p>
               <button className="bg-lignum-gold text-lignum-charcoal w-full py-3 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-white transition-colors">
                  Contact Archive
               </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(201, 169, 110, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 169, 110, 0.6);
        }
      `}</style>
    </div>
  );
}
