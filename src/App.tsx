import React, { useState } from 'react';
import {
  Header,
} from './components/Header';
import { TopStats } from './components/TopStats';
import { MainMatchingPanel } from './components/MainMatchingPanel';
import { AiRecommendationCard } from './components/AiRecommendationCard';
import { AggregationFlowVisualization } from './components/AggregationFlowVisualization';
import { DemandIntelligence } from './components/DemandIntelligence';
import { RecommendedFarmersList } from './components/RecommendedFarmersList';
import { AiLogicExplained } from './components/AiLogicExplained';
import { InteractiveMap } from './components/InteractiveMap';
import { ProcessFlowBanner } from './components/ProcessFlowBanner';
import { ClusterConfirmationModal } from './components/ClusterConfirmationModal';
import { AllFarmersModal } from './components/AllFarmersModal';
import {
  initialBuyerDemand,
  initialFarmers,
  demandIntelligenceData,
} from './data/mockData';
import { BuyerDemand, Farmer } from './types';
import { Sparkles, CheckCircle2, Users, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [demand, setDemand] = useState<BuyerDemand>(initialBuyerDemand);
  const [farmers, setFarmers] = useState<Farmer[]>(initialFarmers);
  const [isMatchingRunning, setIsMatchingRunning] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAllFarmersModalOpen, setIsAllFarmersModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Handle Preset Selection
  const handleSelectPreset = (selectedPresetDemand: BuyerDemand) => {
    setDemand(selectedPresetDemand);
    // Adjust mock farmer products to match preset
    setFarmers((prev) =>
      prev.map((f) => ({
        ...f,
        product: selectedPresetDemand.product,
      }))
    );
    showNotification(`Switched preset to ${selectedPresetDemand.product} (${selectedPresetDemand.location})`);
  };

  // Reset to initial canonical state
  const handleReset = () => {
    setDemand(initialBuyerDemand);
    setFarmers(initialFarmers);
    showNotification('Reset to canonical Kanpur Tomato (600 kg) scenario');
  };

  // Notification helper
  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
    }, 4000);
  };

  // Simulate Run AI Matching with dynamic animation and optimal cluster calculation
  const handleRunAiMatching = () => {
    setIsMatchingRunning(true);
    showNotification('AI Engine: Analyzing 42 regional farmers against 9 multi-variable constraints...');

    setTimeout(() => {
      // Re-optimize cluster based on current demand
      setFarmers((prev) => {
        const sorted = [...prev].sort((a, b) => b.matchScore - a.matchScore);
        let accumulatedKg = 0;
        const targetKg = demand.requiredQuantity;

        return sorted.map((farmer) => {
          if (accumulatedKg < targetKg && farmer.qualityGrade === demand.quality && farmer.pricePerKg <= demand.budget + 2) {
            const needed = targetKg - accumulatedKg;
            const allocation = Math.min(farmer.availableQuantity, needed);
            accumulatedKg += allocation;
            return {
              ...farmer,
              isInCluster: allocation > 0,
              isRecommended: allocation > 0,
              allocatedQuantity: allocation,
            };
          } else {
            return {
              ...farmer,
              isInCluster: false,
              allocatedQuantity: 0,
            };
          }
        });
      });

      setIsMatchingRunning(false);
      showNotification('✓ Optimal cluster synthesized: 100% Demand Matched with 94% confidence score');
    }, 900);
  };

  // Toggle farmer in/out of cluster
  const handleToggleFarmerCluster = (farmerId: string) => {
    setFarmers((prev) => {
      return prev.map((f) => {
        if (f.id === farmerId) {
          const newInCluster = !f.isInCluster;
          return {
            ...f,
            isInCluster: newInCluster,
            allocatedQuantity: newInCluster ? f.availableQuantity : 0,
          };
        }
        return f;
      });
    });
  };

  const handleSelectFarmer = (farmerId: string) => {
    // Scroll smoothly to farmer card or highlight
    const el = document.getElementById(`farmer-card-${farmerId.toLowerCase()}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeClusterFarmers = farmers.filter((f) => f.isInCluster);
  const totalMatchedKg = activeClusterFarmers.reduce((acc, f) => acc + f.allocatedQuantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#132A1C] flex flex-col selection:bg-[#86EFAC] selection:text-[#0D2619]">
      {/* Top sticky brand navigation */}
      <Header
        currentDemand={demand}
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        isMatchingRunning={isMatchingRunning}
      />

      {/* Floating toast notification */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D2619] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#22C55E]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md">
          <div className="w-6 h-6 rounded-full bg-[#15803D] flex items-center justify-center shrink-0 text-[#86EFAC]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-semibold text-[#E6F4EA]">{notificationMsg}</p>
        </div>
      )}

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* PAGE TITLE & SUBTITLE */}
        <section id="page-title-section" className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#166534] bg-[#EAF5EE] px-3 py-1 rounded-full border border-[#BBF7D0] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#15803D]" />
                  DirectFarm Intelligence Engine
                </span>
                <span className="text-xs text-[#52796F] font-semibold">
                  Kanpur Agro Hub v2.4
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D2619] tracking-tight">
                AI Demand Matching
              </h1>
              <p className="text-base sm:text-lg text-[#4A6B56] font-medium mt-1.5 max-w-3xl leading-relaxed">
                AI-powered aggregation of farmer supply with intelligent demand-based recommendations.
              </p>
            </div>

            {/* Quick action header badges */}
            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2.5 rounded-2xl border border-[#D5E3D8] shadow-xs text-right">
                <span className="text-[10px] text-[#6B7280] uppercase font-bold tracking-wider block">
                  Current Target
                </span>
                <span className="text-sm font-extrabold text-[#166534]">
                  {demand.requiredQuantity} kg {demand.product} ({demand.location})
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 1. TOP SUMMARY CARDS (Total Farmers, Active Products, Current Demand, Matched Supply) */}
        <TopStats
          totalFarmers={1248}
          activeProducts={326}
          currentDemandKg={18450}
          matchedSupplyKg={16920}
        />

        {/* System Workflow Pipeline Banner */}
        <ProcessFlowBanner />

        {/* 2. MAIN AI MATCHING PANEL (Smart Supply-Demand Matching) */}
        <MainMatchingPanel
          demand={demand}
          onDemandChange={setDemand}
          clusterFarmers={farmers}
          onRunAiMatching={handleRunAiMatching}
          isMatchingRunning={isMatchingRunning}
          onSelectFarmer={handleSelectFarmer}
        />

        {/* 3. AI RECOMMENDATION HIGHLIGHT CARD */}
        <AiRecommendationCard
          demand={demand}
          clusterFarmers={farmers}
        />

        {/* 4. FARMER AGGREGATION VISUALIZATION (Flow diagram) */}
        <AggregationFlowVisualization
          demand={demand}
          clusterFarmers={farmers}
        />

        {/* 5. DEMAND INTELLIGENCE SECTION (Analytics + Demand vs Supply Chart) */}
        <DemandIntelligence data={demandIntelligenceData} />

        {/* 6. RECOMMENDED FARMERS SECTION (Candidate Cards + Add to Cluster) */}
        <RecommendedFarmersList
          farmers={farmers}
          onToggleFarmerCluster={handleToggleFarmerCluster}
          onOpenAllFarmers={() => setIsAllFarmersModalOpen(true)}
        />

        {/* 7. AI RECOMMENDATION LOGIC (9 simple visual cards) */}
        <AiLogicExplained />

        {/* 8. MAP SECTION (Interactive Geospatial Cluster) */}
        <InteractiveMap
          demand={demand}
          farmers={farmers}
          onSelectFarmer={handleSelectFarmer}
        />

        {/* 9. FINAL CALL TO ACTION */}
        <section
          id="final-cta-section"
          className="bg-gradient-to-br from-[#0F3822] via-[#144A2D] to-[#0A2617] rounded-3xl p-8 sm:p-10 border border-[#215E3C] shadow-[0_16px_40px_rgba(10,38,23,0.2)] text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#22C55E]/20 text-[#86EFAC] px-3 py-1 rounded-full text-xs font-bold border border-[#22C55E]/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Smart Contract Verified & Ready for Logistics Dispatch</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to Lock This Farmer Cluster?
            </h2>

            <p className="text-sm sm:text-base text-[#C2E3CD] leading-relaxed">
              Synthesizes {activeClusterFarmers.length} smallholders into a unified commercial batch of {totalMatchedKg} kg {demand.product} for {demand.buyerName}.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="confirm-cluster-btn"
                onClick={() => {
                  setIsConfirmModalOpen(true);
                  confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.7 },
                  });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-[#0A2617] font-black text-base shadow-[0_8px_24px_rgba(34,197,94,0.35)] hover:shadow-[0_12px_32px_rgba(34,197,94,0.45)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0A2617]" />
                <span>Confirm AI Recommended Cluster</span>
              </button>

              <button
                id="view-all-farmers-btn"
                onClick={() => setIsAllFarmersModalOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#86EFAC]" />
                <span>View All Farmers (1,248)</span>
              </button>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-[#A7F3D0]">
              <span>✓ Instant Digitized Mandi Gatepass</span>
              <span>•</span>
              <span>✓ Automated Escrow Direct to Farmer Accounts</span>
              <span>•</span>
              <span>✓ QR Traceability</span>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E3EBE4] bg-white py-6 mt-12 text-center text-xs text-[#52796F]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0D2619]">DirectFarm</span>
            <span>— AI-Driven AgriTech Demand Aggregation System</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Developed for Smart India Hackathon 2026</span>
            <span>•</span>
            <span className="text-[#166534] font-semibold">SDG 2: Zero Hunger & SDG 9: Industry & Innovation</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ClusterConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        demand={demand}
        clusterFarmers={farmers}
      />

      <AllFarmersModal
        isOpen={isAllFarmersModalOpen}
        onClose={() => setIsAllFarmersModalOpen(false)}
        localFarmers={farmers}
        onToggleFarmerCluster={handleToggleFarmerCluster}
      />
    </div>
  );
}
