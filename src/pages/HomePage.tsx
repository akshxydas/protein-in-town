import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { BestsellersSection } from '../components/home/BestsellersSection';
import { GoalSection } from '../components/home/GoalSection';
import { PromoBanner } from '../components/home/PromoBanner';
import { TrustFeatures } from '../components/home/TrustFeatures';
import { BrandScroll } from '../components/home/BrandScroll';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { StoreLocationSection } from '../components/home/StoreLocationSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoryGrid />
      <BestsellersSection />
      <GoalSection />
      <PromoBanner />
      <TrustFeatures />
      <BrandScroll />
      <ReviewsSection />
      <StoreLocationSection />
      <NewsletterSection />
    </div>
  );
};
