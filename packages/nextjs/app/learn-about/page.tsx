"use client";

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Address } from "~~/components/scaffold-eth";

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
        // Handle search logic to filter masks based on selected filters
        console.log('Searching with filters:', filters);
    };

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Learn About African Masks</h1>
                <div className="flex items-center">
                    Connected: <Address address={connectedAddress} />
                </div>
            </header>

            <main className="space-y-8">
                <section className="bg-base-200 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Explore Masks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <select name="tribalGroup" value={filters.tribalGroup} onChange={handleFilterChange} className="select select-bordered w-full">
                            <option value="">Select Tribal Group</option>
                            <option value="Yoruba">Yoruba</option>
                            <option value="Dogon">Dogon</option>
                            <option value="Senufo">Senufo</option>
                            <option value="Bamana">Bamana</option>
                            <option value="Fang">Fang</option>
                        </select>
                        <select name="region" value={filters.region} onChange={handleFilterChange} className="select select-bordered w-full">
                            <option value="">Select Region</option>
                            <option value="West Africa">West Africa</option>
                            <option value="Central Africa">Central Africa</option>
                            <option value="East Africa">East Africa</option>
                        </select>
                        <select name="material" value={filters.material} onChange={handleFilterChange} className="select select-bordered w-full">
                            <option value="">Select Material</option>
                            <option value="Wood">Wood</option>
                            <option value="Metal">Metal</option>
                            <option value="Ivory">Ivory</option>
                            <option value="Clay">Clay</option>
                        </select>
                        <select name="age" value={filters.age} onChange={handleFilterChange} className="select select-bordered w-full">
                            <option value="">Select Age/Period</option>
                            <option value="Pre-19th Century">Pre-19th Century</option>
                            <option value="19th Century">19th Century</option>
                            <option value="20th Century">20th Century</option>
                        </select>
                    </div>
                    <button onClick={handleSearch} className="btn btn-primary mt-4">Search</button>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-base-200 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Mask of the Week</h2>
                        <div className="flex items-center space-x-4">
                            <img src="/placeholder-mask-of-week.jpg" alt="Mask of the Week" className="w-1/2 rounded-lg" />
                            <div>
                                <h3 className="text-xl font-semibold">Senufo Kpeliy'e Mask</h3>
                                <p className="text-sm text-gray-600">Origin: Côte d'Ivoire</p>
                                <p className="mt-2">This mask represents...</p>
                                <button className="btn btn-sm btn-outline mt-2">Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-base-200 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Featured Article</h2>
                        <h3 className="text-xl font-semibold">The Role of Masks in African Ceremonies</h3>
                        <p className="mt-2">African masks play a crucial role in various ceremonies and rituals...</p>
                        <button className="btn btn-sm btn-outline mt-2">Read Full Article</button>
                    </div>
                </section>

                <section className="bg-base-200 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Interactive Map</h2>
                    <p>Explore African mask origins and distributions across the continent.</p>
                    <div className="h-64 bg-gray-300 mt-4 flex items-center justify-center">
                        [Interactive Map Placeholder]
                    </div>
                </section>

                <section className="bg-primary text-primary-content p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Learn to Earn (Coming Soon)</h2>
                    <p>Complete quizzes and challenges about African masks to earn rewards!</p>
                    <ul className="list-disc list-inside mt-2">
                        <li>Test your knowledge</li>
                        <li>Earn tokens for correct answers</li>
                        <li>Unlock exclusive content</li>
                    </ul>
                    <button className="btn btn-secondary mt-4" disabled>Coming Soon</button>
                </section>
            </main>
        </div>
    );
}