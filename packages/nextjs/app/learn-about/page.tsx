"use client";

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Address } from "~~/components/scaffold-eth";
import { 
  BookOpenIcon, 
  MapIcon, 
  TrophyIcon, 
  AcademicCapIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

export default function LearnPage() {
    const { address: connectedAddress } = useAccount();
    const [filters, setFilters] = useState({
        tribalGroup: '',
        region: '',
        material: '',
        age: '',
    });

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        console.log('Searching with filters:', filters);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10"></div>
                <main className="relative flex-grow container mx-auto px-4 py-8">
                    {/* Hero Section */}
                    <section className="text-center mb-12 pt-8">
                        <h1 className="text-5xl font-['Grenze_Gotisch'] mb-6 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                            Learn About African Masks
                        </h1>
                        <p className="text-xl mb-8 text-base-content/80">
                            Discover the rich cultural heritage and traditions behind African masks
                        </p>
                        <div className="flex justify-end items-center text-sm text-base-content/60">
                            Connected: <Address address={connectedAddress} />
                        </div>
                    </section>

                    {/* Explore Section */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-2xl p-8 backdrop-blur border border-emerald-500/20">
                            <div className="flex items-center justify-center mb-6">
                                <GlobeAltIcon className="w-12 h-12 text-emerald-500" />
                            </div>
                            <h2 className="text-3xl font-['Grenze_Gotisch'] mb-6 text-center text-emerald-500">Explore Masks</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <select 
                                    name="tribalGroup" 
                                    value={filters.tribalGroup} 
                                    onChange={handleFilterChange} 
                                    className="w-full p-3 rounded-lg bg-white/80 border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">Select Tribal Group</option>
                                    <option value="Yoruba">Yoruba</option>
                                    <option value="Dogon">Dogon</option>
                                    <option value="Senufo">Senufo</option>
                                    <option value="Bamana">Bamana</option>
                                    <option value="Fang">Fang</option>
                                </select>
                                {/* Other select elements with same styling */}
                                <select 
                                    name="region" 
                                    value={filters.region} 
                                    onChange={handleFilterChange} 
                                    className="w-full p-3 rounded-lg bg-white/80 border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">Select Region</option>
                                    <option value="West Africa">West Africa</option>
                                    <option value="Central Africa">Central Africa</option>
                                    <option value="East Africa">East Africa</option>
                                </select>
                                <select 
                                    name="material" 
                                    value={filters.material} 
                                    onChange={handleFilterChange} 
                                    className="w-full p-3 rounded-lg bg-white/80 border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">Select Material</option>
                                    <option value="Wood">Wood</option>
                                    <option value="Metal">Metal</option>
                                    <option value="Ivory">Ivory</option>
                                    <option value="Clay">Clay</option>
                                </select>
                                <select 
                                    name="age" 
                                    value={filters.age} 
                                    onChange={handleFilterChange} 
                                    className="w-full p-3 rounded-lg bg-white/80 border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">Select Age/Period</option>
                                    <option value="Pre-19th Century">Pre-19th Century</option>
                                    <option value="19th Century">19th Century</option>
                                    <option value="20th Century">20th Century</option>
                                </select>
                            </div>
                            <button 
                                onClick={handleSearch} 
                                className="w-full mt-6 py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white transition-all"
                            >
                                Search Masks
                            </button>
                        </div>
                    </section>

                    {/* Featured Content Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-green-500/10 to-teal-600/10 rounded-2xl p-8 backdrop-blur border border-green-500/20">
                            <div className="flex items-center justify-center mb-6">
                                <TrophyIcon className="w-12 h-12 text-green-500" />
                            </div>
                            <h2 className="text-3xl font-['Grenze_Gotisch'] mb-6 text-green-500">Mask of the Week</h2>
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <img src="/api/placeholder/400/300" alt="Mask of the Week" className="w-full md:w-1/2 rounded-xl shadow-lg" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Senufo Kpeliy'e Mask</h3>
                                    <p className="text-base-content/60 mb-4">Origin: Côte d'Ivoire</p>
                                    <p className="mb-4">This mask represents...</p>
                                    <button className="py-2 px-4 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white transition-all">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/10 to-teal-600/10 rounded-2xl p-8 backdrop-blur border border-green-500/20">
                            <div className="flex items-center justify-center mb-6">
                                <BookOpenIcon className="w-12 h-12 text-green-500" />
                            </div>
                            <h2 className="text-3xl font-['Grenze_Gotisch'] mb-6 text-green-500">Featured Article</h2>
                            <h3 className="text-xl font-semibold mb-4">The Role of Masks in African Ceremonies</h3>
                            <p className="mb-6">African masks play a crucial role in various ceremonies and rituals...</p>
                            <button className="py-2 px-4 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white transition-all">
                                Read Full Article
                            </button>
                        </div>
                    </section>

                    {/* Map Section */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-br from-teal-500/10 to-cyan-600/10 rounded-2xl p-8 backdrop-blur border border-teal-500/20">
                            <div className="flex items-center justify-center mb-6">
                                <MapIcon className="w-12 h-12 text-teal-500" />
                            </div>
                            <h2 className="text-3xl font-['Grenze_Gotisch'] mb-6 text-center text-teal-500">Interactive Map</h2>
                            <p className="text-center mb-6">Explore African mask origins and distributions across the continent.</p>
                            <div className="h-64 bg-white/20 rounded-xl backdrop-blur flex items-center justify-center">
                                [Interactive Map Placeholder - Coming Soon]
                            </div>
                        </div>
                    </section>

                    {/* Learn to Earn Section */}
                    <section>
                        <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-2xl p-8 backdrop-blur border border-emerald-500/20">
                            <div className="flex items-center justify-center mb-6">
                                <AcademicCapIcon className="w-12 h-12 text-emerald-500" />
                            </div>
                            <h2 className="text-3xl font-['Grenze_Gotisch'] mb-6 text-center text-emerald-500">Learn to Earn</h2>
                            <p className="text-center text-lg mb-6">Complete quizzes and challenges about African masks to earn rewards!</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white/20 rounded-lg p-4 backdrop-blur text-center">
                                    <h3 className="font-semibold mb-2">Test Your Knowledge</h3>
                                    <p>Take quizzes on mask history and culture</p>
                                </div>
                                <div className="bg-white/20 rounded-lg p-4 backdrop-blur text-center">
                                    <h3 className="font-semibold mb-2">Earn Tokens</h3>
                                    <p>Get rewarded for correct answers</p>
                                </div>
                                <div className="bg-white/20 rounded-lg p-4 backdrop-blur text-center">
                                    <h3 className="font-semibold mb-2">Unlock Content</h3>
                                    <p>Access exclusive educational materials</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-green-600 opacity-50 cursor-not-allowed text-white">
                                    Coming Soon
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}