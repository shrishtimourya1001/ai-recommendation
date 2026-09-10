import React from 'react';
import {
  Sparkles,
  Apple,
  Layers,
  CheckCircle2,
  Clock,
  MapPin,
  BadgePercent,
  Award,
  Calendar,
  TrendingUp,
  Cpu,
  Info
} from 'lucide-react';
import { aiLogicFactors } from '../data/mockData';

export const AiLogicExplained: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple':
        return <Apple className="w-4 h-4 text-[#EF4444]" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-[#15803D]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-4 h-4 text-[#10B981]" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-[#F59E0B]" />;
      case 'MapPin':
        return <MapPin className="w-4 h-4 text-[#3B82F6]" />;
      case 'BadgePercent':
        return <BadgePercent className="w-4 h-4 text-[#8B5CF6]" />;
      case 'Award':
        return <Award className="w-4 h-4 text-[#D97706]" />;
      case 'Calendar':
        return <Calendar className="w-4 h-4 text-[#06B6D4]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-[#EC4899]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#15803D]" />;
    }
  };

  return (
    <div
      id="ai-logic-section"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E3D8] shadow-[0_4px_24px_rgba(18,63,39,0.05)]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-[#E5EDE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#EAF5EE] px-2.5 py-1 rounded-md">
              Algorithmic Transparency
            </span>
            <span className="text-xs font-semibold text-[#52796F]">
              Explainable AI (XAI)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D2619] tracking-tight mt-1">
            How the AI Recommendation Logic Works
          </h3>
          <p className="text-xs sm:text-sm text-[#52796F]">
            DirectFarm weighs 9 real-world agricultural constraints to engineer the most reliable, cost-effective farmer cluster
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#166534] bg-[#F0FDF4] px-3 py-1.5 rounded-xl border border-[#BBF7D0] self-start sm:self-auto">
          <Cpu className="w-3.5 h-3.5" />
          <span>Zero Black-Box Scoring</span>
        </div>
      </div>

      {/* 9 Factor Cards Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiLogicFactors.map((factor) => (
          <div
            key={factor.id}
            id={`ai-factor-card-${factor.id}`}
            className="bg-[#FAFBF9] hover:bg-white rounded-2xl p-4.5 border border-[#D8E4DA] hover:border-[#15803D] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Header: Icon + Step # + Weight */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#D5E3D8] shadow-2xs flex items-center justify-center">
                    {getIcon(factor.icon)}
                  </div>
                  <span className="text-[11px] font-bold text-[#52796F] font-mono">
                    Factor #{factor.id}
                  </span>
                </div>

                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#166534] border border-[#BBF7D0]">
                  {factor.weight}% Weight
                </span>
              </div>

              {/* Title & Category */}
              <div className="mt-3">
                <h4 className="text-sm font-extrabold text-[#0D2619] group-hover:text-[#15803D] transition-colors">
                  {factor.title}
                </h4>
                <span className="text-[10px] font-semibold text-[#52796F] block mt-0.5">
                  {factor.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                {factor.description}
              </p>
            </div>

            {/* Current Active Value in this Cluster */}
            <div className="mt-4 pt-3 border-t border-[#E7EFE9] flex items-center justify-between text-[11px]">
              <span className="text-[#6B7280] font-medium">Applied Solution:</span>
              <span className="font-bold text-[#166534] bg-white px-2 py-0.5 rounded-md border border-[#DCE8DF] truncate max-w-[160px]">
                {factor.currentFactorValue}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Simple explainer footer */}
      <div className="mt-6 p-4 rounded-2xl bg-[#F4F8F5] border border-[#D5E3D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#2D6A4F]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#15803D] shrink-0" />
          <span>
            The algorithm minimizes total transit cost using distance weighting while ensuring zero remainder against buyer demand volume.
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#166534] whitespace-nowrap bg-white px-2.5 py-1 rounded-lg border border-[#C2E3CD]">
          Accuracy: 98.4% On-Time Fulfillment
        </span>
      </div>
    </div>
  );
};
