import React, { useState } from 'react';
import {
  User,
  MapPin,
  Award,
  DollarSign,
  Plus,
  Check,
  Sparkles,
  Phone,
  ShieldCheck,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { Farmer } from '../types';

interface RecommendedFarmersListProps {
  farmers: Farmer[];
  onToggleFarmerCluster: (farmerId: string) => void;
  onOpenAllFarmers: () => void;
}

export const RecommendedFarmersList: React.FC<RecommendedFarmersListProps> = ({
  farmers,
  onToggleFarmerCluster,
  onOpenAllFarmers,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'recommended' | 'inCluster'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.product.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterMode === 'recommended') return farmer.isRecommended;
    if (filterMode === 'inCluster') return farmer.isInCluster;
    return true;
  });

  return (
    <div
      id="recommended-farmers-section"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E3D8] shadow-[0_4px_24px_rgba(18,63,39,0.05)]"
    >
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#E5EDE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#EAF5EE] px-2.5 py-1 rounded-md">
              Candidate Pool
            </span>
            <span className="text-xs font-semibold text-[#52796F]">
              AI Ranked & Geocoded
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D2619] tracking-tight mt-1">
            Farmer Recommendation Cards
          </h3>
          <p className="text-xs sm:text-sm text-[#52796F]">
            Transparent profile breakdown with match scores, farm-gate pricing, and direct cluster toggling
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search farmer or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-[#DDE5DE] bg-[#F8FAF8] text-[#0D2619] placeholder-[#9CA3AF] focus:outline-none focus:border-[#15803D] w-44 sm:w-52"
            />
          </div>

          <div className="flex items-center bg-[#F4F7F4] p-1 rounded-xl border border-[#DDE5DE]">
            <button
              onClick={() => setFilterMode('all')}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-[#166534] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              All Local ({farmers.length})
            </button>
            <button
              onClick={() => setFilterMode('recommended')}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
                filterMode === 'recommended'
                  ? 'bg-white text-[#166534] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              AI Recommended (3)
            </button>
          </div>

          <button
            onClick={onOpenAllFarmers}
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#EAF5EE] hover:bg-[#D5EADB] text-[#166534] border border-[#BBF7D0] transition-colors"
          >
            View All Farmers (1,248)
          </button>
        </div>
      </div>

      {/* Farmer Cards Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFarmers.map((farmer) => {
          const inCluster = farmer.isInCluster;
          const isRec = farmer.isRecommended;

          return (
            <div
              key={farmer.id}
              id={`farmer-card-${farmer.id.toLowerCase()}`}
              className={`relative rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                inCluster
                  ? 'bg-[#F9FCFA] border-[#15803D] shadow-[0_4px_16px_rgba(21,128,61,0.1)] ring-1 ring-[#15803D]'
                  : 'bg-white border-[#D8E4DA] hover:border-[#166534]/50 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Top Banner: Match Score + Recommendation Tag */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-[#EAF5EE] text-[#166534] border border-[#BBF7D0] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#15803D]" />
                      {farmer.matchScore}% Match
                    </span>
                    {isRec && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                        Top Cluster
                      </span>
                    )}
                  </div>

                  {farmer.certifiedOrganic && (
                    <span className="text-[10px] font-semibold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                      Bio-Certified
                    </span>
                  )}
                </div>

                {/* Farmer Details */}
                <div className="mt-3.5">
                  <h4 className="text-base font-extrabold text-[#0D2619] tracking-tight flex items-center justify-between">
                    <span>{farmer.name}</span>
                    <span className="text-xs font-semibold text-[#52796F]">
                      ★ {farmer.reliabilityRating}
                    </span>
                  </h4>

                  <div className="flex items-center gap-2 mt-1 text-xs text-[#52796F]">
                    <span className="font-semibold text-[#0D2619]">{farmer.product}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#15803D]" />
                      {farmer.village} ({farmer.location})
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6B7280] mt-1 italic">
                    {farmer.specialty}
                  </p>
                </div>

                {/* Quantitative Metrics Grid (Product, Available Quantity, Distance, Price, Quality) */}
                <div className="mt-4 grid grid-cols-2 gap-2 bg-[#F4F8F5] p-3 rounded-xl border border-[#DFEBE1] text-xs">
                  <div>
                    <span className="text-[10px] text-[#6B7280] block font-medium">Available Quantity</span>
                    <span className="font-extrabold text-[#0D2619] text-sm">
                      {farmer.availableQuantity} kg available
                    </span>
                    {inCluster && (
                      <span className="text-[10px] font-semibold text-[#15803D] block">
                        ({farmer.allocatedQuantity} kg in cluster)
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-[#6B7280] block font-medium">Distance</span>
                    <span className="font-bold text-[#0D2619] text-sm flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-[#15803D]" />
                      {farmer.distanceKm} km
                    </span>
                    <span className="text-[10px] text-[#52796F] block">
                      Transit: ~{Math.round(farmer.distanceKm * 3.5)} mins
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#D9E6DC]">
                    <span className="text-[10px] text-[#6B7280] block font-medium">Farm-Gate Price</span>
                    <span className="font-extrabold text-[#0D2619] text-sm">
                      ₹{farmer.pricePerKg}/kg
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#D9E6DC]">
                    <span className="text-[10px] text-[#6B7280] block font-medium">Quality Grade</span>
                    <span className="font-extrabold text-[#166534] text-sm flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {farmer.qualityGrade}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: "Add to Cluster" / "In Cluster" */}
              <div className="mt-4 pt-3 border-t border-[#E5EDE6]">
                <button
                  id={`cluster-toggle-btn-${farmer.id.toLowerCase()}`}
                  onClick={() => onToggleFarmerCluster(farmer.id)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    inCluster
                      ? 'bg-[#15803D] text-white hover:bg-[#166534] shadow-xs'
                      : 'bg-white hover:bg-[#F3F6F4] text-[#166534] border border-[#166534]'
                  }`}
                >
                  {inCluster ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>In Active Cluster ({farmer.allocatedQuantity} kg)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Cluster</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
