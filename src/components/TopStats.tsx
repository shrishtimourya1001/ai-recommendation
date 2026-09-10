import React from 'react';
import { Users, PackageCheck, TrendingUp, Sparkles, CheckCircle, ArrowUpRight } from 'lucide-react';

interface TopStatsProps {
  totalFarmers?: number;
  activeProducts?: number;
  currentDemandKg?: number;
  matchedSupplyKg?: number;
}

export const TopStats: React.FC<TopStatsProps> = ({
  totalFarmers = 1248,
  activeProducts = 326,
  currentDemandKg = 18450,
  matchedSupplyKg = 16920,
}) => {
  const fulfillmentRate = ((matchedSupplyKg / currentDemandKg) * 100).toFixed(1);

  const stats = [
    {
      id: 'stat-total-farmers',
      title: 'Total Farmers',
      value: totalFarmers.toLocaleString(),
      subtext: 'Aggregated across 42 cluster zones',
      trend: '+14% this month',
      trendPositive: true,
      icon: Users,
      iconBg: 'bg-[#EBF6EE]',
      iconColor: 'text-[#166534]',
      borderColor: 'border-[#E2EBE4]',
      accentColor: '#166534',
    },
    {
      id: 'stat-active-products',
      title: 'Active Products',
      value: activeProducts.toLocaleString(),
      subtext: 'Horticulture, tubers & cash crops',
      trend: '38 categories',
      trendPositive: true,
      icon: PackageCheck,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-[#B45309]',
      borderColor: 'border-[#FDE68A]/60',
      accentColor: '#B45309',
    },
    {
      id: 'stat-current-demand',
      title: 'Current Demand',
      value: `${currentDemandKg.toLocaleString()} kg`,
      subtext: 'Institutional & processing contracts',
      trend: 'High market demand',
      trendPositive: true,
      icon: TrendingUp,
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#1D4ED8]',
      borderColor: 'border-[#BFDBFE]/60',
      accentColor: '#1D4ED8',
    },
    {
      id: 'stat-matched-supply',
      title: 'Matched Supply',
      value: `${matchedSupplyKg.toLocaleString()} kg`,
      subtext: `${fulfillmentRate}% platform fulfillment rate`,
      trend: '94% optimal cluster',
      trendPositive: true,
      icon: Sparkles,
      iconBg: 'bg-[#DCFCE7]',
      iconColor: 'text-[#15803D]',
      borderColor: 'border-[#86EFAC]/80',
      accentColor: '#15803D',
    },
  ];

  return (
    <section aria-label="Key Platform Statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            id={item.id}
            className={`relative overflow-hidden bg-white rounded-2xl p-5 border ${item.borderColor} shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(22,101,52,0.06)] transition-all duration-200 group`}
          >
            {/* Top Row: Icon + Trend Badge */}
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} transition-transform group-hover:scale-105 duration-200`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F4F7F4] text-[#2D6A4F] border border-[#E0E8E1]">
                <ArrowUpRight className="w-3 h-3 text-[#166534]" />
                {item.trend}
              </span>
            </div>

            {/* Metric Value & Label */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#52796F]">
                {item.title}
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D2619] tracking-tight mt-1">
                {item.value}
              </h3>
              <p className="text-xs text-[#6B7280] mt-1 flex items-center gap-1 font-medium">
                {item.subtext}
              </p>
            </div>

            {/* Subtle bottom indicator line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity"
              style={{ color: item.accentColor }}
            />
          </div>
        );
      })}
    </section>
  );
};
