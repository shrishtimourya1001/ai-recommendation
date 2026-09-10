import React, { useState } from 'react';
import { TrendingUp, BarChart3, AlertTriangle, ArrowUpRight, CheckCircle2, Info } from 'lucide-react';
import { DemandIntelligenceData } from '../types';

interface DemandIntelligenceProps {
  data: DemandIntelligenceData;
}

export const DemandIntelligence: React.FC<DemandIntelligenceProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'crops'>('weekly');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const maxWeeklyValue = Math.max(...data.weeklyComparison.map(d => Math.max(d.demand, d.supply)));

  return (
    <div
      id="demand-intelligence-section"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E3D8] shadow-[0_4px_24px_rgba(18,63,39,0.05)]"
    >
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5EDE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#EAF5EE] px-2.5 py-1 rounded-md">
              Market Analytics
            </span>
            <span className="text-xs font-semibold text-[#52796F]">
              AI Predictive Intelligence
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D2619] tracking-tight mt-1">
            Demand Intelligence & Market Equilibrium
          </h3>
          <p className="text-xs sm:text-sm text-[#52796F]">
            Continuous real-time tracking of regional mandi arrivals, institutional demand, and supply gaps
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-[#F4F7F4] p-1 rounded-xl border border-[#DDE5DE] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'weekly'
                ? 'bg-white text-[#166534] shadow-xs'
                : 'text-[#52796F] hover:text-[#0D2619]'
            }`}
          >
            Weekly Trend (Tomato)
          </button>
          <button
            onClick={() => setActiveTab('crops')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'crops'
                ? 'bg-white text-[#166534] shadow-xs'
                : 'text-[#52796F] hover:text-[#0D2619]'
            }`}
          >
            Cross-Crop Overview
          </button>
        </div>
      </div>

      {/* Main Grid: Left = Analytics summary cards, Right = Clean interactive chart */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Primary Demand Analytics Card (as requested in prompt) */}
        <div className="lg:col-span-4 bg-[#F8FAF8] rounded-2xl p-5 border border-[#D9E6DC] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <h4 className="text-lg font-bold text-[#0D2619]">{data.product}</h4>
            </div>
            {/* Current Demand: HIGH */}
            <span className="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              Current Demand: {data.demandStatus}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {/* Demand */}
            <div className="bg-white p-3.5 rounded-xl border border-[#E0EBE2] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6B7280] font-medium block">Total Demand</span>
                <span className="text-xl font-extrabold text-[#0D2619] mt-0.5 block">
                  {data.demandKg.toLocaleString()} kg
                </span>
              </div>
              <span className="text-xs font-semibold text-[#1D4ED8] bg-[#EFF6FF] px-2 py-1 rounded-md">
                100% Target
              </span>
            </div>

            {/* Available Supply */}
            <div className="bg-white p-3.5 rounded-xl border border-[#E0EBE2] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6B7280] font-medium block">Available Supply</span>
                <span className="text-xl font-extrabold text-[#166534] mt-0.5 block">
                  {data.availableSupplyKg.toLocaleString()} kg
                </span>
              </div>
              <span className="text-xs font-semibold text-[#166534] bg-[#EAF5EE] px-2 py-1 rounded-md">
                91.7% Available
              </span>
            </div>

            {/* Demand Gap */}
            <div className="bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] p-3.5 rounded-xl border border-[#FDE68A] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#92400E] font-medium block">Demand Gap</span>
                <span className="text-xl font-extrabold text-[#B45309] mt-0.5 block">
                  {data.gapKg.toLocaleString()} kg
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#92400E] font-semibold block">
                  Deficit: 8.3%
                </span>
                <span className="text-[10px] text-[#B45309] font-medium">
                  High Aggregation Urgency
                </span>
              </div>
            </div>
          </div>

          {/* AI Note on Demand Gap */}
          <div className="text-[11px] text-[#4B5563] bg-white p-3 rounded-xl border border-[#E0EBE2] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
            <p>
              AI aggregation prioritizes multi-farmer clusters to capture all uncommitted yields before regional mandi price spikes.
            </p>
          </div>
        </div>

        {/* Right: Clean Demand vs Available Supply Chart */}
        <div className="lg:col-span-8 bg-[#FAFBF9] rounded-2xl p-5 sm:p-6 border border-[#D9E6DC]">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <div>
              <h4 className="text-sm font-bold text-[#0D2619] flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#15803D]" />
                Demand vs Available Supply Visualization
              </h4>
              <p className="text-xs text-[#6B7280]">
                {activeTab === 'weekly' ? 'Weekly procurement trajectory and projection' : 'Regional supply balance across key crops'}
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#1D4ED8]" />
                <span className="text-[#374151]">Demand</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#166534]" />
                <span className="text-[#374151]">Available Supply</span>
              </div>
              {activeTab === 'weekly' && (
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-[#F59E0B]" />
                  <span className="text-[#374151]">Gap</span>
                </div>
              )}
            </div>
          </div>

          {/* Chart Display Area */}
          {activeTab === 'weekly' ? (
            <div className="mt-4">
              <div className="h-60 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2">
                {data.weeklyComparison.map((point, index) => {
                  const demandHeight = (point.demand / maxWeeklyValue) * 100;
                  const supplyHeight = (point.supply / maxWeeklyValue) * 100;
                  const gap = point.demand - point.supply;
                  const isCurrent = point.period === 'Current';

                  return (
                    <div
                      key={point.period}
                      className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 bg-[#0D2619] text-white text-[10px] py-1 px-2 rounded-md shadow-lg pointer-events-none whitespace-nowrap">
                        <p className="font-bold">{point.period}</p>
                        <p>Demand: {point.demand.toLocaleString()} kg</p>
                        <p>Supply: {point.supply.toLocaleString()} kg</p>
                        <p className="text-[#FDE68A]">Gap: {gap.toLocaleString()} kg</p>
                      </div>

                      {/* Side-by-side comparative bars */}
                      <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-44">
                        {/* Demand Bar */}
                        <div
                          style={{ height: `${demandHeight}%` }}
                          className="w-4 sm:w-6 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-t-md transition-all duration-300 relative"
                        />
                        {/* Supply Bar */}
                        <div
                          style={{ height: `${supplyHeight}%` }}
                          className="w-4 sm:w-6 bg-[#16A34A] hover:bg-[#15803D] rounded-t-md transition-all duration-300 relative"
                        />
                      </div>

                      {/* Period Label */}
                      <span className={`text-[11px] mt-2 block font-medium truncate max-w-full ${isCurrent ? 'font-bold text-[#166534]' : 'text-[#6B7280]'}`}>
                        {point.period}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Axis Bottom Line */}
              <div className="w-full h-px bg-[#D5E3D8]" />

              {/* Chart Insight Footer */}
              <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[#52796F]">
                <span>Peak Gap: 1,530 kg (Current Week)</span>
                <span className="font-semibold text-[#166534]">
                  AI Model Projecting +7.3% Supply Inflow by W2 Sep
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {data.cropComparisons.map((crop) => {
                const maxVal = 50000;
                const dPercent = (crop.demandKg / maxVal) * 100;
                const sPercent = (crop.supplyKg / maxVal) * 100;

                return (
                  <div key={crop.crop} className="bg-white p-3 rounded-xl border border-[#E0EBE2]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0D2619]">{crop.crop}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[#2563EB] font-semibold">Demand: {crop.demandKg.toLocaleString()} kg</span>
                        <span className="text-[#16A34A] font-semibold">Supply: {crop.supplyKg.toLocaleString()} kg</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                          crop.status === 'DEFICIT' ? 'bg-[#FEE2E2] text-[#991B1B]' :
                          crop.status === 'SURPLUS' ? 'bg-[#E0E7FF] text-[#3730A3]' : 'bg-[#DCFCE7] text-[#166534]'
                        }`}>
                          {crop.status} ({crop.gapKg > 0 ? `+${crop.gapKg}` : crop.gapKg} kg)
                        </span>
                      </div>
                    </div>
                    {/* Double progress track */}
                    <div className="mt-2 space-y-1">
                      <div className="h-2 w-full bg-[#EFF6FF] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${dPercent}%` }} />
                      </div>
                      <div className="h-2 w-full bg-[#F0FDF4] rounded-full overflow-hidden">
                        <div className="h-full bg-[#16A34A] rounded-full" style={{ width: `${sPercent}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
