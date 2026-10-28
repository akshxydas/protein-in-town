import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatDate } from '../../utils/formatters';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState('Kochi, Kerala');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    addReview({
      author: author.trim(),
      rating,
      comment: comment.trim(),
      location: location.trim(),
      verifiedPurchase: true,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setAuthor('');
      setComment('');
    }, 1500);
  };

  return (
    <section className="py-16 sm:py-24 bg-graphite/40 border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-lime font-black uppercase tracking-widest text-xs mb-2">
              <Star className="w-4 h-4 fill-lime" />
              <span>COMMUNITY FEEDBACK</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              CUSTOMER REVIEWS
            </h2>
            <p className="text-xs sm:text-sm text-coolgray-400 mt-1 max-w-lg">
              Verified experiences from gym enthusiasts and athletes visiting our Kakkanad store.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-3 bg-charcoal border border-graphite-border rounded-2xl">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-black text-white">5.0 / 5.0</span>
              <span className="text-xs text-coolgray-400">(20 Google Reviews)</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-lime hover:bg-lime-hover text-charcoal font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lime-glow-sm transition-all"
            >
              <MessageSquarePlus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Write Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-graphite border border-graphite-border flex flex-col justify-between hover:border-graphite-light transition-colors"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-coolgray-200 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-graphite-border/70 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {rev.author}
                  </h4>
                  <span className="text-[10px] text-coolgray-400 block">
                    {rev.location || 'Kochi'} • {formatDate(rev.date)}
                  </span>
                </div>

                {rev.verifiedPurchase && (
                  <span className="text-[10px] text-lime font-semibold flex items-center gap-1 bg-lime/10 px-2 py-0.5 rounded-md border border-lime/20">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-graphite border border-graphite-border p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-coolgray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-display font-extrabold text-white uppercase tracking-tight mb-1">
                Share Your Store Experience
              </h3>
              <p className="text-xs text-coolgray-400 mb-6">
                Your feedback helps fellow athletes and supports our local Kakkanad store.
              </p>

              {submitted ? (
                <div className="py-8 text-center text-lime font-bold text-sm">
                  Thank you! Your review has been added.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      placeholder="e.g. Rahul Menon"
                      className="w-full bg-charcoal border border-graphite-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-2 rounded-xl border transition-all ${
                            star <= rating
                              ? 'bg-amber-400/20 text-amber-400 border-amber-400/30'
                              : 'bg-charcoal text-coolgray-500 border-graphite-border'
                          }`}
                        >
                          <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                      Location in Kochi
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Kakkanad, Infopark, Edappally"
                      className="w-full bg-charcoal border border-graphite-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-coolgray-300 uppercase tracking-wider mb-1">
                      Review Comments *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Tell us about the product authenticity, guidance, or in-store pickup experience..."
                      className="w-full bg-charcoal border border-graphite-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-lime"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-lime hover:bg-lime-hover text-charcoal font-black text-xs uppercase tracking-wider shadow-lime-glow-sm transition-all"
                  >
                    Submit Review
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
