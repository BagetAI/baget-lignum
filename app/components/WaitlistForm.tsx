'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      full_name: formData.get('full_name'),
      location: formData.get('location'),
      property_type: formData.get('property_type'),
      needs: formData.get('needs'),
    };

    try {
      const response = await fetch('https://app.baget.ai/api/public/databases/9e7f377e-4694-4f23-a830-dbab8609c3f9/rows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="editorial-border p-12 text-center bg-white my-12">
        <h3 className="font-serif text-3xl mb-4 italic text-lignum-gold">Merci.</h3>
        <p className="font-sans text-sm uppercase tracking-widest">
          Your restoration dossier is being prepared. We will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <section id="waitlist-form" className="my-24 max-w-2xl mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="font-serif text-4xl mb-4 tracking-tight">Initiate Your Restoration</h2>
        <div className="h-px bg-lignum-charcoal w-24 mx-auto mb-4"></div>
        <p className="font-sans text-sm italic opacity-75">Connect with a Master Joiner for a heritage-grade energy upgrade.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Full Name</label>
            <input
              name="full_name"
              type="text"
              required
              className="w-full bg-transparent border-b border-lignum-charcoal/30 py-2 focus:outline-none focus:border-lignum-gold transition-colors font-sans"
              placeholder="Jean Dupont"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-transparent border-b border-lignum-charcoal/30 py-2 focus:outline-none focus:border-lignum-gold transition-colors font-sans"
              placeholder="jean@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Property Location</label>
            <input
              name="location"
              type="text"
              required
              className="w-full bg-transparent border-b border-lignum-charcoal/30 py-2 focus:outline-none focus:border-lignum-gold transition-colors font-sans"
              placeholder="e.g. Paris 6e"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Property Type</label>
            <select
              name="property_type"
              className="w-full bg-transparent border-b border-lignum-charcoal/30 py-2 focus:outline-none focus:border-lignum-gold transition-colors font-sans appearance-none"
            >
              <option value="haussmannian">Haussmannian Apartment</option>
              <option value="village-house">Historic Village House</option>
              <option value="chateau">Château / Manoir</option>
              <option value="other">Other Heritage Asset</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold">Restoration Needs</label>
          <textarea
            name="needs"
            rows={3}
            className="w-full bg-transparent border-b border-lignum-charcoal/30 py-2 focus:outline-none focus:border-lignum-gold transition-colors font-sans resize-none"
            placeholder="e.g. Thermal upgrade for 5 oak windows, preserving original moldings."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-lignum-charcoal text-lignum-white py-5 font-sans text-sm tracking-[0.3em] uppercase hover:bg-lignum-gold hover:text-lignum-charcoal transition-all duration-500 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Processing...' : 'Request Consultation'}
        </button>
        
        {status === 'error' && (
          <p className="text-red-600 text-xs text-center mt-4">An error occurred. Please try again or contact raphael@baget.ai</p>
        )}
      </form>
    </section>
  );
}