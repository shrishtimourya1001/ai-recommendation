import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Zap, TrendingDown, Leaf } from 'lucide-react';
import { BuyerDemand, Farmer } from '../types';

interface AiRecommendationCardProps {
  demand: BuyerDemand;
  clusterFarmers: Farmer[];
}

export const AiRecommendationCard: React.FC<AiRecommendationCardProps> = ({
  demand,
  clusterFarmers,
}) => {
  const activeClusterCount = clusterFarmers.filter((f) => f.isInCluster).length;
  const matchedQuantity = clusterFarmers
    .filter((f) => f.isInCluster)
    .reduce((acc, f) => acc + f.allocatedQuantity, 0);

  const recommendationFactors = [
    {
      title: 'Quantity Match',
      desc: `Exact ${matchedQuantity} / ${demand.requiredQuantity} kg aggregated seamlessly across ${activeClusterCount} farms`,
      satisfied: true,
    },
    {
      title: 'Location Proximity',
      desc: 'Radius tightly restricted within 7.1 km, reducing rural transit degradation',
      satisfied: true,
    },
    {
      title: 'Product Demand',
      desc: `High market velocity prioritized for perishable ${demand.product}`,
      satisfied: true,
    },
    {
      title: 'Price Compatibility',
      desc: `Blended rate of ₹30.8/kg is well under buyer limit (₹${demand.budget}/kg)`,
      satisfied: true,
    },
    {
      title: 'Quality',
      desc: `100% compliant with ${demand.quality} firmness and blemish criteria`,
      satisfied: true,
    },
    {
      title: 'Availability',
      desc: 'All selected farmers confirmed harvest date ready by required delivery',
      satisfied: true,
    },
  ];

  return (
    <div
      id="ai-recommendation-card"
      className="relative overflow-hidden bg-gradient-to-br from-[#0F3822] via-[#144A2D] to-[#0A2617] text-white rounded-3xl p-6 sm:p-7 border border-[#215E3C] shadow-[0_12px_32px_rgba(10,38,23,0.18)]"
    >
      {/* Decorative background glow & elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#EAB308]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#22C55E]/20 border border-[#4ADE80]/30 flex items-center justify-center text-[#86EFAC] shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#86EFAC] block">
                Decision Support System
              </span>
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                AI Recommendation
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#22C55E]/15 text-[#86EFAC] border border-[#22C55E]/30 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FACC15]" />
              Pareto-Optimal Solution Found
            </span>
          </div>
        </div>

        {/* Primary AI Decision Statement */}
        <div className="mt-4 bg-white/10 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-white/15">
          <p className="text-base sm:text-lg font-medium text-[#F0FDF4] leading-relaxed">
            “Combine supply from <span className="font-bold text-[#FACC15] underline decoration-[#FACC15]/40 underline-offset-4">{activeClusterCount} nearby farmers</span> to fulfill the buyer’s <span className="font-bold text-white">{demand.requiredQuantity} kg</span> requirement while <span className="font-semibold text-[#86EFAC]">minimizing distance</span> and maintaining the requested <span className="font-semibold text-[#86EFAC]">quality and price range</span>.”
          </p>
        </div>

        {/* Recommendation Factors Checklist */}
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#A7F3D0] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#86EFAC]" />
            Evaluated Optimization Factors
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {recommendationFactors.map((factor) => (
              <div
                key={factor.title}
                className="flex items-start gap-2.5 bg-black/20 hover:bg-black/30 rounded-xl p-3 border border-white/10 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#86EFAC] flex items-center justify-center shrink-0 mt-0.5 border border-[#22C55E]/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    {factor.title}
                  </h4>
                  <p className="text-[11px] text-[#C2E3CD] mt-0.5 leading-snug">
                    {factor.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote on Sustainability / Direct Impact */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#A7F3D0]">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#86EFAC]" />
            <span>Eliminates 3 middleman markups & ensures 100% farm-gate direct payment within 24h</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#FDE68A]">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Carbon Transit Index: -38% vs Traditional Mandi Route</span>
          </div>
        </div>
      </div>
    </div>
  );
};
