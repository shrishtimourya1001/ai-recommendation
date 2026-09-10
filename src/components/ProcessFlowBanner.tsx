import React from 'react';
import { ShoppingCart, Cpu, Users, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export const ProcessFlowBanner: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Buyer Demand',
      subtitle: '600 kg Tomato • Kanpur Hub',
      icon: ShoppingCart,
      color: 'text-[#1D4ED8]',
      bg: 'bg-[#EFF6FF]',
      border: 'border-[#BFDBFE]',
    },
    {
      step: '02',
      title: 'AI Analysis',
      subtitle: '9 Multi-Constraint Vectors',
      icon: Cpu,
      color: 'text-[#15803D]',
      bg: 'bg-[#EAF5EE]',
      border: 'border-[#BBF7D0]',
    },
    {
      step: '03',
      title: 'Farmer Aggregation',
      subtitle: 'Clusters Fragmented Yields',
      icon: Users,
      color: 'text-[#B45309]',
      bg: 'bg-[#FEF3C7]',
      border: 'border-[#FDE68A]',
    },
    {
      step: '04',
      title: 'Best Match',
      subtitle: '94% Pareto-Optimal Fit',
      icon: Sparkles,
      color: 'text-[#8B5CF6]',
      bg: 'bg-[#F5F3FF]',
      border: 'border-[#DDD6FE]',
    },
    {
      step: '05',
      title: 'Demand Fulfilled',
      subtitle: '1 Consolidated Dispatch',
      icon: CheckCircle,
      color: 'text-[#166534]',
      bg: 'bg-[#DCFCE7]',
      border: 'border-[#86EFAC]',
    },
  ];

  return (
    <div
      id="process-flow-banner"
      className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D5E3D8] shadow-[0_2px_12px_rgba(18,63,39,0.04)]"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="shrink-0 text-center lg:text-left">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#166534] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full">
            Autonomous Pipeline
          </span>
          <h4 className="text-sm font-extrabold text-[#0D2619] mt-0.5">
            System Workflow Engine
          </h4>
        </div>

        {/* Steps sequence */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative bg-[#FAFBF9] p-2.5 rounded-xl border border-[#E0EBE2] flex items-center gap-2.5 group hover:border-[#15803D] transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center shrink-0 border ${item.border}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold text-[#6B7280]">STEP {item.step}</span>
                  </div>
                  <p className="text-xs font-bold text-[#0D2619] truncate leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-[#52796F] truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
