import React from 'react';
import { CheckCircle2, FileText, Truck, X, Sparkles, Download, Calendar, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BuyerDemand, Farmer } from '../types';

interface ClusterConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  demand: BuyerDemand;
  clusterFarmers: Farmer[];
}

export const ClusterConfirmationModal: React.FC<ClusterConfirmationModalProps> = ({
  isOpen,
  onClose,
  demand,
  clusterFarmers,
}) => {
  if (!isOpen) return null;

  const activeFarmers = clusterFarmers.filter((f) => f.isInCluster);
  const totalQuantity = activeFarmers.reduce((sum, f) => sum + f.allocatedQuantity, 0);
  const totalAmount = activeFarmers.reduce((sum, f) => sum + f.pricePerKg * f.allocatedQuantity, 0);
  const avgPrice = totalQuantity > 0 ? (totalAmount / totalQuantity).toFixed(2) : '0';

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#15803D', '#22C55E', '#FACC15', '#0D2619'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#D5E3D8] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#166534]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full">
                Contract Confirmed
              </span>
              <span className="text-xs font-mono text-[#52796F]">
                #DIR-CLUSTER-902
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#0D2619] tracking-tight mt-0.5">
              AI Recommended Cluster Locked
            </h3>
          </div>
        </div>

        {/* Overview Box */}
        <div className="mt-6 bg-[#FAFBF9] rounded-2xl p-5 border border-[#D9E6DC] space-y-4">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E3EBE4] gap-2">
            <div>
              <span className="text-xs text-[#6B7280]">Buyer Enterprise</span>
              <p className="text-sm font-bold text-[#0D2619]">{demand.buyerName}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#6B7280]">Delivery Hub</span>
              <p className="text-sm font-bold text-[#0D2619]">{demand.location} (Phase II Panki)</p>
            </div>
          </div>

          {/* Aggregated farmers list */}
          <div>
            <span className="text-xs font-bold text-[#52796F] uppercase tracking-wider block mb-2">
              Aggregated Smallholders ({activeFarmers.length} Farms)
            </span>
            <div className="space-y-2">
              {activeFarmers.map((f, i) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#E0EBE2] text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#EAF5EE] text-[#166534] font-bold flex items-center justify-center">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <div>
                      <span className="font-bold text-[#0D2619]">{f.name}</span>
                      <span className="text-[#6B7280] ml-1.5 font-normal">
                        ({f.village}, {f.distanceKm} km away)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-[#0D2619]">{f.allocatedQuantity} kg</span>
                    <span className="text-[#52796F] ml-2 font-medium">@ ₹{f.pricePerKg}/kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial summary */}
          <div className="pt-3 border-t border-[#E3EBE4] grid grid-cols-3 gap-3 text-center">
            <div>
              <span className="text-[11px] text-[#6B7280] block">Aggregated Total</span>
              <span className="text-lg font-black text-[#15803D]">{totalQuantity} kg</span>
            </div>
            <div>
              <span className="text-[11px] text-[#6B7280] block">Blended Rate</span>
              <span className="text-lg font-extrabold text-[#0D2619]">₹{avgPrice}/kg</span>
            </div>
            <div>
              <span className="text-[11px] text-[#6B7280] block">Total Procurement</span>
              <span className="text-lg font-black text-[#166534]">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Logistics schedule */}
        <div className="mt-4 p-3 bg-[#F4F8F5] rounded-xl border border-[#DFEBE1] flex items-center justify-between text-xs text-[#2D6A4F]">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#15803D]" />
            <span>Combined Multi-Stop Pickup Scheduled for: <strong>{demand.requiredBy}, 06:30 AM</strong></span>
          </div>
          <span className="font-semibold text-[#166534]">1 Consolidated Waybill</span>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#D5E3D8] text-xs font-bold text-[#4B5563] hover:bg-[#F3F4F6] transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              triggerConfetti();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FACC15]" />
            <span>Celebrate & Dispatch Orders</span>
          </button>
        </div>
      </div>
    </div>
  );
};
