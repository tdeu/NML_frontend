"use client";

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Address } from "~~/components/scaffold-eth";

// Mock data for masks (replace with actual data fetching logic later)
const mockMasks = [
  { id: 1, name: "Yoruba Mask", tribe: "Yoruba", price: "0.5 ETH", image: "/placeholder-mask-1.jpg" },
  { id: 2, name: "Dogon Mask", tribe: "Dogon", price: "0.7 ETH", image: "/placeholder-mask-2.jpg" },
  { id: 3, name: "Senufo Mask", tribe: "Senufo", price: "0.6 ETH", image: "/placeholder-mask-3.jpg" },
  { id: 4, name: "Bamana Mask", tribe: "Bamana", price: "0.8 ETH", image: "/placeholder-mask-4.jpg" },
  { id: 5, name: "Fang Mask", tribe: "Fang", price: "1.0 ETH", image: "/placeholder-mask-5.jpg" },
  { id: 6, name: "Chokwe Mask", tribe: "Chokwe", price: "0.9 ETH", image: "/placeholder-mask-6.jpg" },
];

export default function MaskMarketplace() {
  const { address: connectedAddress } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTribe, setSelectedTribe] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Filter and sort masks based on user input
  const filteredMasks = mockMasks.filter(mask => 
    mask.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTribe === '' || mask.tribe === selectedTribe)
  ).sort((a, b) => {
    if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mask Marketplace</h1>
        <div className="flex items-center">
          Connected: <Address address={connectedAddress} />
        </div>
      </header>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search masks..."
          className="input input-bordered w-full max-w-xs mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-4">
          <select
            className="select select-bordered"
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
            className="select select-bordered"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMasks.map(mask => (
          <div key={mask.id} className="card bg-base-100 shadow-xl">
            <figure><img src={mask.image} alt={mask.name} /></figure>
            <div className="card-body">
              <h2 className="card-title">{mask.name}</h2>
              <p>Tribe: {mask.tribe}</p>
              <p>Price: {mask.price}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMasks.length === 0 && (
        <p className="text-center mt-8">No masks found matching your criteria.</p>
      )}

      <div className="mt-8 text-center">
        <button className="btn btn-secondary">List a Mask for Sale</button>
      </div>
    </div>
  );
}