import React from 'react';
import { Cpu, ArrowRight, CheckCircle2, User, Building2, Sparkles, MapPin, Layers } from 'lucide-react';
import { BuyerDemand, Farmer } from '../types';

interface AggregationFlowVisualizationProps {
  demand: BuyerDemand;
  clusterFarmers: Farmer[];
}

export const AggregationFlowVisualization: React.FC<AggregationFlowVisualizationProps> = ({
  demand,
  clusterFarmers,
}) => {
  const activeFarmers = clusterFarmers.filter((f) => f.isInCluster);
  const totalAggregatedKg = activeFarmers.reduce((acc, f) => acc + f.allocatedQuantity, 0);

  return (
    <div
      id="aggregation-flow-visualization"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E3D8] shadow-[0_4px_24px_rgba(18,63,39,0.05)]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-6 border-b border-[#E5EDE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#EAF5EE] px-2.5 py-1 rounded-md">
              Visual Supply Convergence
            </span>
            <span className="text-xs text-[#52796F] font-semibold">
              Multi-Source Synthesis
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D2619] tracking-tight mt-1">
            Farmer Aggregation Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-[#52796F]">
            Transforming fragmented smallholder produce into a standardized bulk commercial batch
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold px-3 py-1.5 rounded-xl bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]">
          <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" />
          <span>Synchronized Lot Delivery</span>
        </div>
      </div>

      {/* Main Flow Stage */}
      <div className="mt-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* STEP 1: Fragmented Farmer Supply (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#15803D]" />
                Fragmented Smallholders
              </span>
              <span className="text-xs font-semibold text-[#166534] bg-[#EAF5EE] px-2 py-0.5 rounded-full">
                3 Supply Sources
              </span>
            </div>

            {activeFarmers.map((farmer, index) => {
              const letter = String.fromCharCode(65 + index);
              return (
                <div
                  key={farmer.id}
                  className="bg-[#F8FAF8] hover:bg-white rounded-2xl p-4 border border-[#D7E4DA] hover:border-[#15803D] shadow-xs hover:shadow-md transition-all group relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#EAF5EE] text-[#166534] flex items-center justify-center font-extrabold text-xs border border-[#C2E3CD]">
                        {letter}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0D2619] group-hover:text-[#15803D] transition-colors">
                          Farmer {letter} <span className="font-normal text-xs text-[#52796F]">({farmer.name})</span>
                        </h4>
                        <p className="text-[11px] text-[#6B7280] flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#15803D]" />
                          {farmer.village} • {farmer.distanceKm} km away
                        </p>
                      </div>
                    </div>

                    {/* Quantity Pill */}
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-[#0D2619] bg-[#EAF5EE] text-[#166534] border border-[#BBF7D0] px-2.5 py-1 rounded-lg">
                        {farmer.allocatedQuantity} kg
                      </div>
                      <span className="text-[10px] text-[#6B7280] block mt-0.5 font-medium">
                        ₹{farmer.pricePerKg}/kg • {farmer.qualityGrade}
                      </span>
                    </div>
                  </div>

                  {/* Flow connector dot */}
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-[#15803D] text-[#15803D] shadow-xs flex items-center justify-center z-10">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* STEP 2: Central AI Aggregation Node (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center my-2 lg:my-0">
            <div className="w-full bg-gradient-to-b from-[#0F3822] to-[#123F27] text-white rounded-3xl p-6 border-2 border-[#22C55E]/40 shadow-[0_12px_30px_rgba(18,63,39,0.2)] relative overflow-hidden text-center group">
              {/* Animated pulse rings */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0,transparent_70%)] pointer-events-none" />
              
              <div className="relative z-10">
                {/* AI Central Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#22C55E]/20 border-2 border-[#4ADE80] flex items-center justify-center text-[#86EFAC] shadow-lg shadow-[#22C55E]/20 mb-3 group-hover:scale-105 transition-transform">
                  <Cpu className="w-8 h-8 animate-pulse text-[#4ADE80]" />
                </div>

                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#86EFAC] bg-[#22C55E]/15 px-3 py-1 rounded-full border border-[#22C55E]/30 inline-block">
                  ⚡ DirectFarm Core
                </span>

                <h3 className="text-xl font-extrabold text-white mt-2">
                  AI Aggregation
                </h3>
                <p className="text-xs text-[#B8DEC4] mt-1 px-2">
                  Cluster Convergence Engine
                </p>

                {/* Synthesis Output Display */}
                <div className="mt-4 bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/15">
                  <span className="text-[11px] text-[#A7F3D0] block uppercase font-bold tracking-wider">
                    Aggregated Supply Output
                  </span>
                  <div className="text-2xl font-black text-white mt-0.5 tracking-tight flex items-center justify-center gap-2">
                    <span>{totalAggregatedKg} kg</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#22C55E] text-black">
                      100%
                    </span>
                  </div>
                  <span className="text-[11px] text-[#D1FAE5] block mt-1">
                    Blended Rate: ₹30.8/kg • Grade A
                  </span>
                </div>

                {/* Algorithmic Features Badge */}
                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#A7F3D0]">
                  <span>✓ Smart Weighting</span>
                  <span>•</span>
                  <span>✓ Unified Logistics</span>
                  <span>•</span>
                  <span>✓ 1 Single Invoice</span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: Institutional Buyer Fulfillment (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#15803D]" />
                Demand Fulfillment
              </span>
              <span className="text-xs font-semibold text-[#166534] bg-[#EAF5EE] px-2 py-0.5 rounded-full">
                Target Buyer
              </span>
            </div>

            <div className="bg-[#FAFBF9] rounded-2xl p-5 border-2 border-[#166534] shadow-sm relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded">
                    Institutional Destination
                  </span>
                  <h4 className="text-base font-extrabold text-[#0D2619] mt-2">
                    {demand.buyerName}
                  </h4>
                  <p className="text-xs text-[#52796F] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                    {demand.location} Central Receiving Bay
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#EAF5EE] flex items-center justify-center text-[#166534]">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              {/* Demand Fulfillment Status Box */}
              <div className="mt-4 bg-white p-3.5 rounded-xl border border-[#D5E3D8] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">Total Demand Target:</span>
                  <span className="font-bold text-[#0D2619]">{demand.requiredQuantity} kg {demand.product}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">Received Batch Size:</span>
                  <span className="font-extrabold text-[#15803D]">{totalAggregatedKg} kg (Fitted)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">Required Delivery:</span>
                  <span className="font-bold text-[#0D2619]">{demand.requiredBy}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280]">Procurement Status:</span>
                  <span className="font-extrabold text-[#166534] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ready for Contract Dispatch
                  </span>
                </div>
              </div>

              {/* Delivery Window & Hub Code */}
              <div className="mt-3 text-[11px] text-[#52796F] flex items-center justify-between">
                <span>Dispatch Hub: Panki Phase II</span>
                <span className="font-mono text-[#15803D] font-bold">GATE-04</span>
              </div>
            </div>
          </div>

        </div>

        {/* ASCII/Text flow representation reminder banner */}
        <div className="mt-6 p-3 bg-[#F4F7F4] rounded-xl border border-[#DDE6DF] text-xs text-[#2D6A4F] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="font-bold text-[#166534]">Aggregation Equation:</span>
            <span>200 kg (Farmer A) + 300 kg (Farmer B) + 100 kg (Farmer C) = 600 kg (Buyer Demand)</span>
          </div>
          <span className="text-[11px] font-semibold text-[#166534] bg-[#EAF5EE] px-2 py-0.5 rounded">
            Zero Remainder • 100% Quality Match
          </span>
        </div>
      </div>
    </div>
  );
};
