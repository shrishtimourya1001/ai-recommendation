import React from 'react';
import { Sprout, Sparkles, RefreshCw, Cpu, Layers } from 'lucide-react';
import { BuyerDemand } from '../types';
import { demandPresets } from '../data/mockData';

interface HeaderProps {
  currentDemand: BuyerDemand;
  onSelectPreset: (demand: BuyerDemand) => void;
  onReset: () => void;
  isMatchingRunning: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentDemand,
  onSelectPreset,
  onReset,
  isMatchingRunning,
}) => {
  return (
    <header className="border-b border-[#E3EBE4] bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#123F27] to-[#0A2617] flex items-center justify-center shadow-md shadow-[#123F27]/15 text-[#E6F4EA] border border-[#215E3C]">
            <Sprout className="w-5 h-5 text-[#86EFAC]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#0D2619]">
                Direct<span className="text-[#15803D]">Farm</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#EBF6EE] text-[#166534] border border-[#BBF7D0]">
                AI Aggregator
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                Smart India Hackathon 2026
              </span>
            </div>
            <p className="text-xs text-[#52796F] font-medium mt-0.5">
              Agricultural Supply Aggregation & Decision-Support System
            </p>
          </div>
        </div>

        {/* Demand Scenario Presets & Engine Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#4A5568] bg-[#F4F7F4] py-1 px-2.5 rounded-lg border border-[#E2E8E2]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="font-semibold text-[#1B4332]">Algorithm:</span>
            <span className="text-[#2D6A4F]">K-Means Clustering + Hungarian Logistics</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#F8FAF8] p-1 rounded-xl border border-[#E2E8E2]">
            <span className="text-[11px] font-medium text-[#6B7280] px-2">Preset:</span>
            {demandPresets.map((preset) => {
              const isSelected = preset.demand.product === currentDemand.product && preset.demand.location === currentDemand.location;
              return (
                <button
                  key={preset.name}
                  id={`preset-btn-${preset.demand.product.toLowerCase()}`}
                  onClick={() => onSelectPreset(preset.demand)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-[#15803D] text-white shadow-xs'
                      : 'text-[#374151] hover:bg-[#EAEFEA] hover:text-[#111827]'
                  }`}
                >
                  {preset.demand.product} ({preset.demand.location})
                </button>
              );
            })}
          </div>

          <button
            id="reset-cluster-btn"
            onClick={onReset}
            disabled={isMatchingRunning}
            title="Reset to default canonical state"
            className="p-2 rounded-lg border border-[#E2E8E2] text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isMatchingRunning ? 'animate-spin text-[#15803D]' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
