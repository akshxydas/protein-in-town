import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Zap, Apple, ShieldCheck, ArrowRight } from 'lucide-react';

const GOALS = [
  {
    id: 'muscle-building',
    title: 'Muscle Building',
    subtitle: 'Whey Protein Isolates & Mass Gainers',
    description: 'Protein powders and high-calorie blends to support post-exercise protein synthesis and dietary intake.',
    icon: Dumbbell,
    link: '/shop?category=whey-protein',
    accent: 'from-lime/20 to-transparent',
  },
  {
    id: 'strength',
    title: 'Strength & Performance',
    subtitle: 'Creatine Monohydrate & Pre-Workouts',
    description: 'Micronized creatine formulas and energy-supporting training igniters for high-intensity lifting sessions.',
    icon: Zap,
    link: '/shop?category=creatine',
    accent: 'from-amber-400/20 to-transparent',
  },
  {
    id: 'everyday-nutrition',
    title: 'Everyday Nutrition',
    subtitle: 'Vitamins, Minerals & Clean Protein Bars',
    description: 'Daily micronutrient complexes and portable protein snacks to help hit your nutritional targets on busy days.',
    icon: Apple,
    link: '/shop?category=vitamins',
    accent: 'from-rose-400/20 to-transparent',
  },
  {
    id: 'recovery',
    title: 'Recovery & Wellness',
    subtitle: 'Omega-3 Fish Oil, Joints & Mobility',
    description: 'Concentrated essential fatty acids and joint health nutrients for overall active lifestyle longevity.',
    icon: ShieldCheck,
    link: '/shop?category=gym-accessories',
    accent: 'from-sky-400/20 to-transparent',
  },
];

export const GoalSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-charcoal border-b border-graphite-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-lime font-black uppercase tracking-widest text-xs block mb-2">
            CURATED FITNESS STACKS
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            WHAT ARE YOU TRAINING FOR?
          </h2>
          <p className="text-xs sm:text-sm text-coolgray-400 mt-2">
            Browse targeted supplement categories aligned with your training focus and fitness milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GOALS.map(goal => {
            const Icon = goal.icon;
            return (
              <Link
                key={goal.id}
                to={goal.link}
                className="group relative rounded-3xl p-6 bg-graphite border border-graphite-border hover:border-lime/40 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle top gradient accent */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${goal.accent} opacity-40 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-charcoal border border-graphite-border flex items-center justify-center text-lime group-hover:scale-110 transition-transform mb-5 shadow-sm">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <h3 className="font-display font-black text-lg text-white group-hover:text-lime transition-colors leading-tight mb-1">
                    {goal.title}
                  </h3>

                  <span className="text-[11px] font-bold text-coolgray-400 uppercase tracking-wider block mb-3">
                    {goal.subtitle}
                  </span>

                  <p className="text-xs text-coolgray-400 leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6 mt-4 border-t border-graphite-border/70 flex items-center justify-between text-xs font-bold text-coolgray-300 group-hover:text-lime transition-colors">
                  <span>Explore Stack</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center text-[11px] text-coolgray-500">
          *Note: Categorized for shopping convenience based on fitness preferences. Dietary supplements do not replace balanced nutrition.
        </div>

      </div>
    </section>
  );
};
