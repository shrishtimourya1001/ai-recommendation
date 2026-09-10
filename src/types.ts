export type QualityGrade = 'Grade A' | 'Grade B' | 'Grade C';

export interface BuyerDemand {
  id: string;
  product: string;
  category: string;
  requiredQuantity: number; // in kg
  location: string;
  deliveryAddress: string;
  requiredBy: string; // e.g. "12 September"
  quality: QualityGrade;
  budget: number; // in ₹/kg
  buyerName: string;
  buyerType: string;
}

export interface Farmer {
  id: string;
  name: string;
  village: string;
  location: string;
  product: string;
  availableQuantity: number; // in kg
  allocatedQuantity: number; // in kg for the cluster
  distanceKm: number;
  pricePerKg: number; // in ₹
  qualityGrade: QualityGrade;
  matchScore: number; // percentage e.g. 94
  isRecommended: boolean;
  isInCluster: boolean;
  harvestDate: string;
  certifiedOrganic: boolean;
  phone: string;
  coordinates: {
    x: number; // 0 - 100 percentage for custom map
    y: number;
    lat: number;
    lng: number;
  };
  specialty: string;
  reliabilityRating: number; // 1 - 5
}

export interface DemandIntelligenceData {
  product: string;
  demandStatus: 'HIGH' | 'MODERATE' | 'BALANCED';
  demandKg: number;
  availableSupplyKg: number;
  gapKg: number;
  historicalAccuracy: number;
  weeklyComparison: {
    period: string;
    demand: number;
    supply: number;
  }[];
  cropComparisons: {
    crop: string;
    demandKg: number;
    supplyKg: number;
    gapKg: number;
    status: 'SURPLUS' | 'DEFICIT' | 'BALANCED';
  }[];
}

export interface AiLogicFactor {
  id: number;
  title: string;
  category: string;
  weight: number; // e.g. 20%
  description: string;
  currentFactorValue: string;
  status: 'Optimized' | 'Satisfied' | 'Monitored';
  icon: string;
}
