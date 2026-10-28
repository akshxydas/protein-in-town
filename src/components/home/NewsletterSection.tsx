import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim() || !emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-16 sm:py-20 bg-charcoal-950 border-b border-graphite-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="w-12 h-12 rounded-2xl bg-lime/10 text-lime flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
          STAY IN THE LOOP
        </h2>

        <p className="text-xs sm:text-sm text-coolgray-400 mt-2 max-w-md mx-auto">
          Get updates on new arrivals, product launches, and store offers delivered directly to your inbox.
        </p>

        {status === 'success' ? (
          <div className="mt-8 p-4 rounded-2xl bg-lime/10 border border-lime/30 text-lime text-xs font-bold flex items-center justify-center gap-2 max-w-md mx-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>Thank you for subscribing to PROTEIN IN TOWN updates!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address..."
                className="flex-1 bg-graphite border border-graphite-border rounded-xl px-4 py-3 text-xs text-white placeholder-coolgray-500 focus:outline-none focus:border-lime"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lime-glow-sm transition-all disabled:opacity-50"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-rose-400 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMessage}</span>
              </p>
            )}

            <p className="text-[11px] text-coolgray-500 text-center">
              We respect your privacy. No spam, ever. Unsubscribe at any time.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
