import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Award,
  DollarSign,
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  RefreshCw,
  SlidersHorizontal,
  ShieldCheck,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { BuyerDemand, Farmer } from '../types';

interface MainMatchingPanelProps {
  demand: BuyerDemand;
  onDemandChange: (newDemand: BuyerDemand) => void;
  clusterFarmers: Farmer[];
  onRunAiMatching: () => void;
  isMatchingRunning: boolean;
  onSelectFarmer: (farmerId: string) => void;
}

export const MainMatchingPanel: React.FC<MainMatchingPanelProps> = ({
  demand,
  onDemandChange,
  clusterFarmers,
  onRunAiMatching,
  isMatchingRunning,
  onSelectFarmer,
}) => {
  const [isEditingDemand, setIsEditingDemand] = useState(false);

  // Compute matched totals dynamically from clusterFarmers
  const matchedSupplyKg = clusterFarmers.reduce((acc, f) => acc + (f.isInCluster ? f.allocatedQuantity : 0), 0);
  const remainingDemandKg = Math.max(0, demand.requiredQuantity - matchedSupplyKg);
  const matchPercentage = Math.min(100, Math.round((matchedSupplyKg / demand.requiredQuantity) * 100));

  const averageDistance = clusterFarmers.filter(f => f.isInCluster).length > 0
    ? (
        clusterFarmers.filter(f => f.isInCluster).reduce((acc, f) => acc + f.distanceKm, 0) /
        clusterFarmers.filter(f => f.isInCluster).length
      ).toFixed(1)
    : '0';

  const averagePrice = clusterFarmers.filter(f => f.isInCluster).length > 0
    ? (
        clusterFarmers.filter(f => f.isInCluster).reduce((acc, f) => acc + f.pricePerKg * f.allocatedQuantity, 0) /
        matchedSupplyKg
      ).toFixed(1)
    : '0';

  // Overall match score (weighted average of cluster farmers, or default 94%)
  const overallMatchScore = clusterFarmers.filter(f => f.isInCluster).length > 0
    ? Math.round(
        clusterFarmers.filter(f => f.isInCluster).reduce((acc, f) => acc + f.matchScore, 0) /
        clusterFarmers.filter(f => f.isInCluster).length
      )
    : 0;

  const isFullyMatched = matchedSupplyKg >= demand.requiredQuantity;

  return (
    <div
      id="smart-matching-panel"
      className="bg-white rounded-3xl border border-[#D5E3D8] shadow-[0_4px_24px_rgba(18,63,39,0.06)] overflow-hidden"
    >
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#123F27] via-[#1A5336] to-[#123F27] px-6 sm:px-8 py-5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#276F47] flex items-center justify-center text-[#86EFAC] border border-[#3E8E62]">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Smart Supply-Demand Matching
            </h2>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold bg-[#215E3C] text-[#86EFAC] px-2.5 py-0.5 rounded-full border border-[#2E7E52]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86EFAC] animate-ping" />
              Real-Time Clustering
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#B8DEC4] mt-1">
            Automated micro-farmer aggregation engine resolving supply fragmentation for institutional buyers
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            id="toggle-edit-demand-btn"
            onClick={() => setIsEditingDemand(!isEditingDemand)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#215E3C]/80 hover:bg-[#215E3C] text-[#E6F4EA] border border-[#3E8E62]/60 flex items-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {isEditingDemand ? 'Done Editing' : 'Adjust Demand'}
          </button>
        </div>
      </div>

      {/* Main Grid: Left = Buyer Demand Request, Right = AI Match Results */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column: Buyer Demand Request (4 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-[#F8FAF8] rounded-2xl p-5 border border-[#DFEAE1] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3EBE4]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#EAF5EE] px-2.5 py-1 rounded-md">
                  Active Procurement Request
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#52796F] font-semibold">
                {demand.id}
              </span>
            </div>

            {/* Buyer Info */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#6B7280]">Buyer</p>
                <p className="text-sm font-bold text-[#0D2619]">{demand.buyerName}</p>
                <p className="text-[11px] text-[#52796F]">{demand.buyerType}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6B7280]">Target Hub</p>
                <p className="text-sm font-bold text-[#0D2619] flex items-center justify-end gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                  {demand.location}
                </p>
              </div>
            </div>

            {/* Specification Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Product */}
              <div className="bg-white p-3 rounded-xl border border-[#E2EBE4]">
                <span className="text-[11px] font-medium text-[#6B7280] block">Product</span>
                <span className="text-base font-bold text-[#0D2619] mt-0.5 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] inline-block" />
                  {demand.product}
                </span>
                <span className="text-[10px] text-[#52796F] font-medium block mt-0.5 truncate">
                  {demand.category}
                </span>
              </div>

              {/* Required Quantity */}
              <div className="bg-white p-3 rounded-xl border border-[#E2EBE4]">
                <span className="text-[11px] font-medium text-[#6B7280] block">Required Quantity</span>
                {isEditingDemand ? (
                  <div className="flex items-center gap-1 mt-0.5">
                    <input
                      type="number"
                      value={demand.requiredQuantity}
                      onChange={(e) =>
                        onDemandChange({
                          ...demand,
                          requiredQuantity: Math.max(100, Number(e.target.value) || 0),
                        })
                      }
                      className="w-20 text-sm font-bold px-1.5 py-0.5 border border-[#15803D] rounded text-[#0D2619] bg-white focus:outline-none"
                    />
                    <span className="text-xs font-semibold text-[#6B7280]">kg</span>
                  </div>
                ) : (
                  <span className="text-base font-extrabold text-[#0D2619] mt-0.5 block">
                    {demand.requiredQuantity} kg
                  </span>
                )}
                <span className="text-[10px] text-[#15803D] font-semibold block mt-0.5">
                  Single Delivery Lot
                </span>
              </div>

              {/* Location */}
              <div className="bg-white p-3 rounded-xl border border-[#E2EBE4]">
                <span className="text-[11px] font-medium text-[#6B7280] block">Location</span>
                <span className="text-sm font-bold text-[#0D2619] mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                  {demand.location}
                </span>
                <span className="text-[10px] text-[#52796F] block mt-0.5 truncate">
                  Uttar Pradesh
                </span>
              </div>

              {/* Required By */}
              <div className="bg-white p-3 rounded-xl border border-[#E2EBE4]">
                <span className="text-[11px] font-medium text-[#6B7280] block">Required By</span>
                <span className="text-sm font-bold text-[#0D2619] mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
                  {demand.requiredBy}
                </span>
                <span className="text-[10px] text-[#52796F] block mt-0.5">
                  Pre-noon Delivery
                </span>
              </div>

              {/* Quality */}
              <div className="bg-white p-3 rounded-xl border border-[#E2EBE4]">
                <span className="text-[11px] font-medium text-[#6B7280] block">Quality Grade</span>
                <span className="text-sm font-bold text-[#166534] mt-0.5 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#166534]" />
                  {demand.quality}
                </span>
                <span className="text-[10px] text-[#52796F] block mt-0.5">
                  Firmness &gt; 88%
                </span>
              </div>

              {/* Budget */}
              <div className="bg-white p-3 rounded-xl border border-[#E2EBE4]">
                <span className="text-[11px] font-medium text-[#6B7280] block">Procurement Budget</span>
                {isEditingDemand ? (
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs font-semibold text-[#6B7280]">₹</span>
                    <input
                      type="number"
                      value={demand.budget}
                      onChange={(e) =>
                        onDemandChange({
                          ...demand,
                          budget: Math.max(10, Number(e.target.value) || 0),
                        })
                      }
                      className="w-16 text-sm font-bold px-1.5 py-0.5 border border-[#15803D] rounded text-[#0D2619] bg-white focus:outline-none"
                    />
                    <span className="text-xs font-semibold text-[#6B7280]">/kg</span>
                  </div>
                ) : (
                  <span className="text-sm font-extrabold text-[#0D2619] mt-0.5 block">
                    ₹{demand.budget}/kg max
                  </span>
                )}
                <span className="text-[10px] text-[#52796F] block mt-0.5">
                  Direct Mandi Parity
                </span>
              </div>
            </div>

            {/* Micro delivery address */}
            <div className="pt-2 text-[11px] text-[#6B7280] bg-white/60 p-2.5 rounded-lg border border-[#E6EDE7]">
              <span className="font-semibold text-[#2D6A4F]">Destination Hub: </span>
              {demand.deliveryAddress}
            </div>
          </div>

          {/* Prominent Run AI Matching Button */}
          <div>
            <button
              id="run-ai-matching-btn"
              onClick={onRunAiMatching}
              disabled={isMatchingRunning}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-[#15803D] via-[#166534] to-[#0F4E27] hover:from-[#166534] hover:to-[#0B3A1C] text-white py-4 px-6 rounded-2xl font-bold text-base shadow-[0_8px_20px_rgba(21,128,61,0.25)] hover:shadow-[0_12px_28px_rgba(21,128,61,0.35)] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
            >
              {isMatchingRunning ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-[#86EFAC]" />
                  <span>Computing Optimal Cluster...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#86EFAC] group-hover:rotate-12 transition-transform duration-200" />
                  <span className="tracking-tight">Run AI Matching</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-[#52796F] mt-2 font-medium">
              Evaluates 42 nearby farmers across 9 multi-variable constraints
            </p>
          </div>
        </div>

        {/* Right Column: AI MATCH RESULTS (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="bg-[#FAFBF9] rounded-2xl p-5 sm:p-6 border border-[#D8E6DC] shadow-xs">
            {/* Header of results */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E1ECE3]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#166534] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
                  AI Match Results
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0D2619] tracking-tight mt-0.5">
                  Recommended Farmer Cluster
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Match Score Badge */}
                <div className="flex items-center gap-1.5 bg-[#EAF5EE] border border-[#A7F3D0] px-3 py-1.5 rounded-xl">
                  <span className="text-xs font-semibold text-[#166534]">Match Score:</span>
                  <span className="text-sm font-extrabold text-[#15803D]">{overallMatchScore}%</span>
                </div>

                {/* Status Badge */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                  isFullyMatched
                    ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                    : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">
                    {isFullyMatched ? 'Demand Fully Matched' : `Partial (${matchPercentage}%)`}
                  </span>
                </div>
              </div>
            </div>

            {/* Farmer Cluster Cards (Farmer A, Farmer B, Farmer C) */}
            <div className="mt-4 space-y-2.5">
              <p className="text-[11px] font-semibold text-[#52796F] uppercase tracking-wider">
                Synthesized Micro-Holdings ({clusterFarmers.filter(f => f.isInCluster).length} Farmers Selected)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {clusterFarmers
                  .filter((f) => f.isInCluster)
                  .map((farmer, idx) => {
                    const letter = String.fromCharCode(65 + idx); // A, B, C...
                    return (
                      <div
                        key={farmer.id}
                        id={`cluster-farmer-${farmer.id.toLowerCase()}`}
                        onClick={() => onSelectFarmer(farmer.id)}
                        className="bg-white p-3.5 rounded-xl border border-[#D1E3D5] hover:border-[#15803D] shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-[#166534] text-white">
                            Farmer {letter}
                          </span>
                          <span className="text-[11px] font-semibold text-[#15803D] bg-[#EAF5EE] px-1.5 py-0.5 rounded">
                            {farmer.matchScore}%
                          </span>
                        </div>

                        <div className="mt-2.5">
                          <p className="text-sm font-bold text-[#0D2619] group-hover:text-[#15803D] transition-colors truncate">
                            {farmer.name}
                          </p>
                          <p className="text-[11px] text-[#6B7280] truncate">
                            {farmer.village}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#EEF2EF] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#6B7280] block">Allocated</span>
                            <span className="text-base font-extrabold text-[#0D2619]">
                              {farmer.allocatedQuantity} kg
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-[#6B7280] block">Proximity</span>
                            <span className="text-xs font-bold text-[#2D6A4F] flex items-center justify-end gap-0.5">
                              <MapPin className="w-3 h-3 text-[#15803D]" />
                              {farmer.distanceKm} km away
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[11px] text-[#52796F] bg-[#F7F9F7] px-2 py-1 rounded">
                          <span>₹{farmer.pricePerKg}/kg</span>
                          <span className="font-semibold text-[#166534]">{farmer.qualityGrade}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Total Matched Quantity & Visual Progress Indicator */}
            <div className="mt-5 pt-4 border-t border-[#E1ECE3] bg-white p-4 rounded-xl border border-[#E0EBE2]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-[#52796F] font-medium">Total Matched Quantity</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-[#0D2619] tracking-tight">
                      {matchedSupplyKg} kg
                    </span>
                    <span className="text-xs font-semibold text-[#6B7280]">
                      of {demand.requiredQuantity} kg requested
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                    <span className="text-[#374151]">Supply: <strong className="text-[#0D2619]">{matchedSupplyKg} kg</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${remainingDemandKg === 0 ? 'bg-[#9CA3AF]' : 'bg-[#DC2626]'}`} />
                    <span className="text-[#374151]">Remaining: <strong className="text-[#0D2619]">{remainingDemandKg} kg</strong></span>
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar Indicator */}
              <div className="mt-3">
                <div className="h-3 w-full bg-[#E5EBE6] rounded-full overflow-hidden p-0.5 relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#15803D] via-[#22C55E] to-[#16A34A] rounded-full transition-all duration-500 shadow-xs"
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#6B7280] mt-1.5 font-medium">
                  <span>Demand: {demand.requiredQuantity} kg</span>
                  <span className="text-[#15803D] font-bold">
                    Matched Supply: {matchedSupplyKg} kg ({matchPercentage}%)
                  </span>
                  <span className={remainingDemandKg === 0 ? 'text-[#166534] font-bold' : 'text-[#DC2626] font-bold'}>
                    Remaining Demand: {remainingDemandKg} kg
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Summary Metrics Strip */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs bg-[#F4F8F5] p-2.5 rounded-xl border border-[#DFEBE1]">
              <div>
                <span className="text-[10px] text-[#52796F] block">Avg Procurement Distance</span>
                <span className="font-bold text-[#0D2619]">{averageDistance} km</span>
              </div>
              <div className="border-x border-[#D5E3D8]">
                <span className="text-[10px] text-[#52796F] block">Weighted Avg Price</span>
                <span className="font-bold text-[#0D2619]">₹{averagePrice}/kg</span>
              </div>
              <div>
                <span className="text-[10px] text-[#52796F] block">Est. Cost vs Budget</span>
                <span className="font-bold text-[#166534]">
                  ₹{(Number(averagePrice) * matchedSupplyKg).toLocaleString()} (Save ₹{((demand.budget - Number(averagePrice)) * matchedSupplyKg).toFixed(0)})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
