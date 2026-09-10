import React, { useState } from 'react';
import { X, Search, Filter, MapPin, Award, CheckCircle2, User, ChevronRight } from 'lucide-react';
import { Farmer } from '../types';

interface AllFarmersModalProps {
  isOpen: boolean;
  onClose: () => void;
  localFarmers: Farmer[];
  onToggleFarmerCluster: (farmerId: string) => void;
}

export const AllFarmersModal: React.FC<AllFarmersModalProps> = ({
  isOpen,
  onClose,
  localFarmers,
  onToggleFarmerCluster,
}) => {
  if (!isOpen) return null;

  const [search, setSearch] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  // Generate simulated expanded catalog from registered network
  const fullDirectory: Farmer[] = [
    ...localFarmers,
    {
      id: 'FARMER-008',
      name: 'Gurpreet Singh',
      village: 'Shivrajpur',
      location: 'Kanpur North',
      product: 'Tomato',
      availableQuantity: 340,
      allocatedQuantity: 0,
      distanceKm: 14.5,
      pricePerKg: 31,
      qualityGrade: 'Grade A',
      matchScore: 84,
      isRecommended: false,
      isInCluster: false,
      harvestDate: '12 September',
      certifiedOrganic: true,
      phone: '+91 94151 90214',
      coordinates: { x: 78, y: 18, lat: 26.68, lng: 80.12 },
      specialty: 'High-firmness polyhouse hybrid',
      reliabilityRating: 4.8,
    },
    {
      id: 'FARMER-009',
      name: 'Mohammad Farhan',
      village: 'Rura',
      location: 'Kanpur Dehat',
      product: 'Tomato',
      availableQuantity: 500,
      allocatedQuantity: 0,
      distanceKm: 19.8,
      pricePerKg: 30,
      qualityGrade: 'Grade A',
      matchScore: 78,
      isRecommended: false,
      isInCluster: false,
      harvestDate: '13 September',
      certifiedOrganic: false,
      phone: '+91 98394 12890',
      coordinates: { x: 12, y: 48, lat: 26.49, lng: 79.91 },
      specialty: 'Sauce variety processing lot',
      reliabilityRating: 4.6,
    },
    {
      id: 'FARMER-010',
      name: 'Shyam Sundar',
      village: 'Bidhnu',
      location: 'Kanpur South Outer',
      product: 'Potato',
      availableQuantity: 1200,
      allocatedQuantity: 0,
      distanceKm: 11.2,
      pricePerKg: 22,
      qualityGrade: 'Grade A',
      matchScore: 65,
      isRecommended: false,
      isInCluster: false,
      harvestDate: '14 September',
      certifiedOrganic: false,
      phone: '+91 97921 54320',
      coordinates: { x: 55, y: 88, lat: 26.25, lng: 80.32 },
      specialty: 'Kufri Pukhraj table potato',
      reliabilityRating: 4.7,
    },
    {
      id: 'FARMER-011',
      name: 'Kamleshwari Devi',
      village: 'Bilhaur',
      location: 'Kanpur North Border',
      product: 'Onion',
      availableQuantity: 800,
      allocatedQuantity: 0,
      distanceKm: 24.5,
      pricePerKg: 27,
      qualityGrade: 'Grade A',
      matchScore: 61,
      isRecommended: false,
      isInCluster: false,
      harvestDate: '15 September',
      certifiedOrganic: true,
      phone: '+91 94508 19023',
      coordinates: { x: 88, y: 12, lat: 26.85, lng: 80.05 },
      specialty: 'Red Nasik cured variety',
      reliabilityRating: 4.9,
    },
  ];

  const filtered = fullDirectory.filter((f) => {
    const matchQuery =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.village.toLowerCase().includes(search.toLowerCase()) ||
      f.product.toLowerCase().includes(search.toLowerCase());
    const matchCrop = selectedCrop === 'All' || f.product === selectedCrop;
    const matchGrade = selectedGrade === 'All' || f.qualityGrade === selectedGrade;
    return matchQuery && matchCrop && matchGrade;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-[#D5E3D8] shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E3EBE4]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#166534] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full">
                Registry
              </span>
              <span className="text-xs text-[#52796F] font-semibold">
                DirectFarm Agrinetwork
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D2619] tracking-tight mt-1">
              Registered Farmers Directory (1,248 Smallholders)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter / Search Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search by farmer name, village, or crop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-[#DDE5DE] bg-[#F8FAF8] text-[#0D2619] placeholder-[#9CA3AF] focus:outline-none focus:border-[#15803D]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6B7280] font-medium">Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-[#DDE5DE] bg-white text-[#0D2619] focus:outline-none"
            >
              <option value="All">All Crops</option>
              <option value="Tomato">Tomato</option>
              <option value="Potato">Potato</option>
              <option value="Onion">Onion</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6B7280] font-medium">Grade:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-[#DDE5DE] bg-white text-[#0D2619] focus:outline-none"
            >
              <option value="All">All Grades</option>
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
            </select>
          </div>
        </div>

        {/* Directory List Container */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-2.5 max-h-[500px]">
          {filtered.map((farmer) => {
            const inCluster = farmer.isInCluster;
            return (
              <div
                key={farmer.id}
                className="bg-[#FAFBF9] hover:bg-white rounded-xl p-3.5 border border-[#DDE7DF] hover:border-[#15803D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF5EE] text-[#166534] flex items-center justify-center font-bold text-xs shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0D2619]">{farmer.name}</span>
                      <span className="text-xs font-semibold text-[#166534] bg-[#EAF5EE] px-2 py-0.5 rounded">
                        {farmer.matchScore}% AI Match
                      </span>
                      {farmer.certifiedOrganic && (
                        <span className="text-[10px] text-[#15803D] bg-[#DCFCE7] px-1.5 py-0.2 rounded">
                          Organic
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#52796F] mt-1">
                      <span className="font-semibold text-[#0D2619]">{farmer.product}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#15803D]" />
                        {farmer.village} ({farmer.distanceKm} km away)
                      </span>
                      <span>•</span>
                      <span>₹{farmer.pricePerKg}/kg</span>
                      <span>•</span>
                      <span>{farmer.qualityGrade}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#0D2619] block">
                      {farmer.availableQuantity} kg
                    </span>
                    <span className="text-[10px] text-[#6B7280]">available stock</span>
                  </div>

                  {localFarmers.some((f) => f.id === farmer.id) && (
                    <button
                      onClick={() => onToggleFarmerCluster(farmer.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                        inCluster
                          ? 'bg-[#15803D] text-white border-[#15803D]'
                          : 'bg-white text-[#166534] border-[#166534] hover:bg-[#EAF5EE]'
                      }`}
                    >
                      {inCluster ? 'In Cluster' : 'Add to Cluster'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-3 border-t border-[#E3EBE4] flex items-center justify-between text-xs text-[#6B7280]">
          <span>Showing {filtered.length} of 1,248 geo-tagged smallholders</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0D2619] hover:bg-[#123F27] text-white font-bold transition-colors"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
