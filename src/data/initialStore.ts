import { StoreSettings, Review } from '../types';

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'PROTEIN IN TOWN',
  tagline: 'The Complete Supplement Store',
  address: 'Ground Floor, 9/169, P O, Kuzhikkattumoola, Kusumagiri, Jn, Kakkanad, Kochi',
  city: 'Kochi',
  state: 'Kerala',
  pinCode: '682030',
  phone: '+91 98470 12345',
  whatsapp: '+91 98470 12345',
  email: 'contact@proteinintown.com',
  openingHours: 'Mon - Sat: 10:30 AM - 9:30 PM | Sun: 11:00 AM - 8:00 PM',
  googleMapsUrl: 'https://maps.google.com/?q=Ground+Floor+9/169+Kuzhikkattumoola+Kusumagiri+Jn+Kakkanad+Kochi+Kerala+682030',
  announcementText: '⚡ THE COMPLETE SUPPLEMENT STORE | 100% GENUINE SUPPLEMENTS IN KAKKANAD, KOCHI',
  announcementEnabled: true,
  freeShippingThreshold: 1999,
  defaultShippingFee: 99,
  upiId: 'proteinintown@oksbi',
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Rahul Menon',
    rating: 5,
    comment: 'Great store in Kakkanad! The owner is very knowledgeable and helped me pick the right whey isolate without pushing unnecessary products. 100% genuine seal verified on the spot.',
    date: '2026-09-15',
    verifiedPurchase: true,
    location: 'Kakkanad, Kochi',
  },
  {
    id: 'rev-2',
    author: 'Arun George',
    rating: 5,
    comment: 'Best supplement shop near Infopark. Quick pickup, authentic brands like Dymatize and MuscleBlaze with direct importer scratch codes. Highly recommended for gym-goers!',
    date: '2026-09-28',
    verifiedPurchase: true,
    location: 'Infopark Phase 1, Kochi',
  },
  {
    id: 'rev-3',
    author: 'Vishnu Prasad',
    rating: 5,
    comment: 'Got my Creapure creatine and shaker bottle here. Very clean store, friendly staff, and competitive pricing matching online stores with instant handover.',
    date: '2026-10-02',
    verifiedPurchase: true,
    location: 'Edappally, Kochi',
  },
  {
    id: 'rev-4',
    author: 'Nikhil Nair',
    rating: 5,
    comment: 'Super convenient location at Kusumagiri Jn. You can WhatsApp them to check stock before going. The pre-workout recommendations are spot on.',
    date: '2026-10-08',
    verifiedPurchase: true,
    location: 'Kusumagiri, Kakkanad',
  },
];
