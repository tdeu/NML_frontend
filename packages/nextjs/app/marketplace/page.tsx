"use client";

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Address } from "~~/components/scaffold-eth";
import { 
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

const mockMasks = [
  { id: 1, name: "Yoruba Mask", tribe: "Yoruba", price: "0.5 ETH", image: "/api/placeholder/400/300" },
  { id: 2, name: "Dogon Mask", tribe: "Dogon", price: "0.7 ETH", image: "/api/placeholder/400/300" },
  { id: 3, name: "Senufo Mask", tribe: "Senufo", price: "0.6 ETH", image: "/api/placeholder/400/300" },
  { id: 4, name: "Bamana Mask", tribe: "Bamana", price: "0.8 ETH", image: "/api/placeholder/400/300" },
  { id: 5, name: "Fang Mask", tribe: "Fang", price: "1.0 ETH", image: "/api/placeholder/400/300" },
  { id: 6, name: "Chokwe Mask", tribe: "Chokwe", price: "0.9 ETH", image: "/api/placeholder/400/300" },
];

export default function MaskMarketplace() {
  const { address: connectedAddress } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTribe, setSelectedTribe] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filteredMasks = mockMasks.filter(mask => 
    mask.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTribe === '' || mask.tribe === selectedTribe)
  ).sort((a, b) => {
    if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10"></div>
        <main className="relative flex-grow container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12 pt-8">
            <h1 className="text-5xl font-['Grenze_Gotisch'] mb-6 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              Mask Marketplace
            </h1>
            <p className="text-xl mb-8 text-base-content/80">
              Discover and collect authentic African masks
            </p>
            <div className="flex justify-end items-center text-sm text-base-content/60">
              Connected: <Address address={connectedAddress} />
            </div>
          </section>

          {/* Search and Filter Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-2xl p-8 backdrop-blur border border-emerald-500/20">
              <div className="flex items-center justify-center mb-6">
                <MagnifyingGlassIcon className="w-12 h-12 text-emerald-500" />
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search masks..."
                    className="w-full p-4 rounded-lg bg-white/80 border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    className="w-full p-4 rounded-lg bg-white/80 border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={selectedTribe}
                    onChange={(e) => setSelectedTribe(e.target.value)}
                  >
                    <option value="">All Tribes</option>
                    <option value="Yoruba">Yoruba</option>
                    <option value="Dogon">Dogon</option>
                    <option value="Senufo">Senufo</option>
                    <option value="Bamana">Bamana</option>
                    <option value="Fang">Fang</option>
                    <option value="Chokwe">Chokwe</option>
                  </select>
                  <select
                    className="w-full p-4 rounded-lg bg-white/80 border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="">Sort by</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Marketplace Grid */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMasks.map(mask => (
                <div key={mask.id} className="bg-gradient-to-br from-green-500/10 to-teal-600/10 rounded-2xl overflow-hidden backdrop-blur border border-green-500/20">
                  <img 
                    src={mask.image} 
                    alt={mask.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-['Grenze_Gotisch'] text-green-500 mb-2">{mask.name}</h2>
                    <p className="text-base-content/80 mb-2">Tribe: {mask.tribe}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <CurrencyDollarIcon className="w-5 h-5 text-green-500" />
                      <span className="text-lg font-semibold">{mask.price}</span>
                    </div>
                    <button className="w-full py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white transition-all">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredMasks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-base-content/60">No masks found matching your criteria.</p>
              </div>
            )}
          </section>

          {/* List Mask Section */}
          <section className="text-center">
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-600/10 rounded-2xl p-8 backdrop-blur border border-teal-500/20 inline-block">
              <div className="flex items-center justify-center mb-4">
                <PlusCircleIcon className="w-12 h-12 text-teal-500" />
              </div>
              <button className="py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white transition-all">
                List a Mask for Sale
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}