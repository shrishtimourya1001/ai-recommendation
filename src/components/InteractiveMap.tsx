import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  Info,
  CheckCircle2,
  Maximize2,
  Sparkles,
  Award
} from 'lucide-react';
import { BuyerDemand, Farmer } from '../types';

interface InteractiveMapProps {
  demand: BuyerDemand;
  farmers: Farmer[];
  onSelectFarmer: (farmerId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  demand,
  farmers,
  onSelectFarmer,
}) => {
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>('FARMER-A');
  const [showRings, setShowRings] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const buyerCoord = { x: 50, y: 50 }; // Center of map canvas

  const selectedFarmer = farmers.find((f) => f.id === selectedFarmerId);
  const recommendedFarmers = farmers.filter((f) => f.isInCluster);
  const otherFarmers = farmers.filter((f) => !f.isInCluster);

  return (
    <div
      id="map-section"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5E3D8] shadow-[0_4px_24px_rgba(18,63,39,0.05)]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-[#E5EDE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#EAF5EE] px-2.5 py-1 rounded-md">
              Geospatial Dispatch Map
            </span>
            <span className="text-xs font-semibold text-[#52796F]">
              Kanpur Agro Hub Cluster (20 km Radius)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D2619] tracking-tight mt-1">
            Cluster Logistics & Sourcing Radius
          </h3>
          <p className="text-xs sm:text-sm text-[#52796F]">
            Visualizing farmer geo-coordinates, centroid procurement distances, and live cluster transit corridors
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-[#F4F8F5] px-3 py-1.5 rounded-xl border border-[#D5E3D8] self-start sm:self-auto">
          <div className="flex items-center gap-1.5 font-bold text-[#0D2619]">
            <span className="w-3 h-3 rounded-full bg-[#D97706] border-2 border-white shadow-xs" />
            <span>Buyer Hub</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#166534]">
            <span className="w-3 h-3 rounded-full bg-[#15803D] border-2 border-white shadow-xs" />
            <span>In Recommended Cluster</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-[#64748B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8] border border-white" />
            <span>Other Available Farmers</span>
          </div>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="mt-6 relative bg-[#EEF5F0] rounded-2xl border border-[#CADBCF] overflow-hidden min-h-[460px] sm:min-h-[520px] select-none">
        
        {/* Subtle Map Grid Lines & Terrain Textures */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#15803D 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Map Action Bar */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-[#0D2619] shadow-sm border border-[#D5E3D8] flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#15803D]" />
            Kanpur Central Hub (26.4499° N, 80.3319° E)
          </span>
          <button
            onClick={() => setShowRings(!showRings)}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all ${
              showRings
                ? 'bg-[#166534] text-white border-[#166534]'
                : 'bg-white text-[#4B5563] border-[#D5E3D8]'
            }`}
          >
            {showRings ? 'Radius Rings: ON' : 'Radius Rings: OFF'}
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-[#D5E3D8] shadow-sm">
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            className="p-1.5 hover:bg-[#F3F4F6] text-[#374151] rounded-lg"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
            className="p-1.5 hover:bg-[#F3F4F6] text-[#374151] rounded-lg"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* SVG Container for Connection Lines and Radius Circles */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
        >
          {/* Concentric Distance Rings */}
          {showRings && (
            <>
              {/* 5 km Ring */}
              <circle
                cx="50%"
                cy="50%"
                r="18%"
                fill="none"
                stroke="#15803D"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                strokeOpacity="0.45"
              />
              <text x="50%" y="31%" fill="#166534" fontSize="10" fontWeight="700" textAnchor="middle">
                5 KM RADIUS
              </text>

              {/* 10 km Ring */}
              <circle
                cx="50%"
                cy="50%"
                r="34%"
                fill="none"
                stroke="#15803D"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                strokeOpacity="0.3"
              />
              <text x="50%" y="15%" fill="#166534" fontSize="10" fontWeight="700" textAnchor="middle">
                10 KM RADIUS
              </text>

              {/* 20 km Ring */}
              <circle
                cx="50%"
                cy="50%"
                r="46%"
                fill="none"
                stroke="#15803D"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                strokeOpacity="0.15"
              />
            </>
          )}

          {/* Connection Lines from Recommended Farmers to Buyer */}
          {recommendedFarmers.map((f) => (
            <g key={`line-${f.id}`}>
              {/* Base line */}
              <line
                x1="50%"
                y1="50%"
                x2={`${f.coordinates.x}%`}
                y2={`${f.coordinates.y}%`}
                stroke="#15803D"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
                strokeOpacity="0.85"
              />
              {/* Distance mid-tag */}
              <rect
                x={`${(50 + f.coordinates.x) / 2 - 24}%`}
                y={`${(50 + f.coordinates.y) / 2 - 10}%`}
                width="48"
                height="20"
                rx="4"
                fill="#123F27"
                fillOpacity="0.9"
              />
              <text
                x={`${(50 + f.coordinates.x) / 2}%`}
                y={`${(50 + f.coordinates.y) / 2}%`}
                fill="#86EFAC"
                fontSize="10"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {f.distanceKm} km
              </text>
            </g>
          ))}
        </svg>

        {/* Interactive Map Nodes / Pins */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
        >
          {/* 1. Central Buyer Hub Marker */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
            style={{ left: `${buyerCoord.x}%`, top: `${buyerCoord.y}%` }}
          >
            {/* Pulsing ring */}
            <div className="absolute -inset-3 bg-[#F59E0B]/30 rounded-full animate-ping" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D97706] to-[#B45309] text-white flex items-center justify-center shadow-lg border-2 border-white relative z-10 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            {/* Label */}
            <div className="absolute top-13 left-1/2 -translate-x-1/2 bg-[#0D2619] text-white px-2.5 py-1 rounded-lg text-center whitespace-nowrap shadow-md border border-[#F59E0B]/50 z-20">
              <p className="text-[11px] font-extrabold text-[#FDE68A]">Buyer Hub: {demand.location}</p>
              <p className="text-[10px] text-[#A7F3D0]">Demand: {demand.requiredQuantity} kg {demand.product}</p>
            </div>
          </div>

          {/* 2. Recommended Farmers Pins (Highlighted with green badges and quantity tags) */}
          {recommendedFarmers.map((farmer, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = selectedFarmerId === farmer.id;

            return (
              <div
                key={farmer.id}
                onClick={() => {
                  setSelectedFarmerId(farmer.id);
                  onSelectFarmer(farmer.id);
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                style={{ left: `${farmer.coordinates.x}%`, top: `${farmer.coordinates.y}%` }}
              >
                {/* Ping wave */}
                <div className="absolute -inset-2 bg-[#22C55E]/40 rounded-full animate-pulse" />
                
                {/* Farmer Pin Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs shadow-md border-2 border-white transition-all ${
                    isSelected
                      ? 'bg-[#15803D] text-white scale-125 ring-2 ring-[#22C55E]'
                      : 'bg-[#166534] text-white hover:scale-110'
                  }`}
                >
                  {letter}
                </div>

                {/* Micro Tag */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-[#166534] px-2 py-0.5 rounded-md text-[10px] font-extrabold whitespace-nowrap shadow-xs border border-[#86EFAC]">
                  {farmer.allocatedQuantity} kg
                </div>
              </div>
            );
          })}

          {/* 3. Other Available Farmers Pins (Muted Slate) */}
          {otherFarmers.map((farmer) => {
            const isSelected = selectedFarmerId === farmer.id;

            return (
              <div
                key={farmer.id}
                onClick={() => {
                  setSelectedFarmerId(farmer.id);
                  onSelectFarmer(farmer.id);
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-15 cursor-pointer group"
                style={{ left: `${farmer.coordinates.x}%`, top: `${farmer.coordinates.y}%` }}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold border border-white shadow-xs transition-transform ${
                    isSelected
                      ? 'bg-[#1E293B] text-white scale-125 ring-2 ring-[#94A3B8]'
                      : 'bg-[#64748B] text-white hover:scale-110 hover:bg-[#475569]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Detail Popup for Selected Farmer */}
        {selectedFarmer && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-84 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#D5E3D8] shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    selectedFarmer.isInCluster
                      ? 'bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]'
                      : 'bg-[#F1F5F9] text-[#475569]'
                  }`}>
                    {selectedFarmer.isInCluster ? 'IN RECOMMENDED CLUSTER' : 'AVAILABLE POOL'}
                  </span>
                  <span className="text-xs font-bold text-[#15803D]">
                    {selectedFarmer.matchScore}% Match
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0D2619] mt-1">
                  {selectedFarmer.name}
                </h4>
                <p className="text-[11px] text-[#6B7280]">
                  {selectedFarmer.village}, {selectedFarmer.location}
                </p>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold text-[#0D2619]">
                  {selectedFarmer.availableQuantity} kg
                </span>
                <span className="text-[10px] text-[#6B7280] block">available</span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-xs bg-[#F8FAF8] p-2 rounded-xl border border-[#E3EBE4]">
              <div>
                <span className="text-[10px] text-[#6B7280] block">Distance</span>
                <span className="font-bold text-[#0D2619]">{selectedFarmer.distanceKm} km</span>
              </div>
              <div className="border-x border-[#E3EBE4]">
                <span className="text-[10px] text-[#6B7280] block">Rate</span>
                <span className="font-bold text-[#0D2619]">₹{selectedFarmer.pricePerKg}/kg</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B7280] block">Quality</span>
                <span className="font-bold text-[#166534]">{selectedFarmer.qualityGrade}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
