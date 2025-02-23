"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  BookOpenIcon, 
  TrophyIcon,
  RadioIcon,
  CurrencyDollarIcon 
} from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10"></div>
        <main className="relative flex-grow container mx-auto px-4 py-8">
          {/* Hero Content */}
          <section className="text-center mb-24 pt-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl font-['Grenze_Gotisch'] mb-6 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              Neural Mask Ledger
              </h1>
              <p className="text-2xl mb-8 text-base-content/80 font-ubuntu">
               Preserving African Mask Heritage through Blockchain & AI Technologies
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  href="/authentication" 
                  className="btn btn-primary btn-lg border-0 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                >
                  Authenticate Mask
                </Link>
                <Link href="/learn" className="btn btn-outline btn-lg">
                  Learn More
                </Link>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="stat bg-base-200/50 backdrop-blur rounded-xl border border-base-300">
                <div className="stat-figure text-emerald-500">
                  <ShieldCheckIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Authenticated Masks</div>
                <div className="stat-value text-emerald-500 font-['Grenze_Gotisch']">1,234</div>
                <div className="stat-desc">From 45 African tribes</div>
              </div>
              
              <div className="stat bg-base-200/50 backdrop-blur rounded-xl border border-base-300">
                <div className="stat-figure text-green-500">
                  <UserGroupIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Active Validators</div>
                <div className="stat-value text-green-500 font-['Grenze_Gotisch']">89</div>
                <div className="stat-desc">Expert authenticators</div>
              </div>
              
              <div className="stat bg-base-200/50 backdrop-blur rounded-xl border border-base-300">
                <div className="stat-figure text-teal-500">
                  <TrophyIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Success Rate</div>
                <div className="stat-value text-teal-500 font-['Grenze_Gotisch']">95%</div>
                <div className="stat-desc">Authentication accuracy</div>
              </div>
            </div>
          </section>

          {/* Main Features Section */}
          <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mask Owners Card */}
            <div className="card bg-gradient-to-br from-emerald-500/10 to-green-600/10 hover:from-emerald-500/20 hover:to-green-600/20 transition-all duration-300 backdrop-blur border border-emerald-500/20">
              <div className="card-body">
                <ShieldCheckIcon className="w-12 h-12 text-emerald-500 mb-4" />
                <h2 className="card-title text-2xl font-['Grenze_Gotisch'] text-emerald-500">For Mask Owners</h2>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>Verify authenticity with AI</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>Identify ethnic origin</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>Get NFT certification</span>
                  </li>
                </ul>
                <div className="card-actions justify-end">
                  <Link 
                    href="/authentication" 
                    className="btn bg-gradient-to-r from-emerald-500 to-green-600 border-0 hover:from-emerald-600 hover:to-green-700 text-white"
                  >
                    Authenticate Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Experts Card */}
            <div className="card bg-gradient-to-br from-green-500/10 to-teal-600/10 hover:from-green-500/20 hover:to-teal-600/20 transition-all duration-300 backdrop-blur border border-green-500/20">
              <div className="card-body">
                <UserGroupIcon className="w-12 h-12 text-green-500 mb-4" />
                <h2 className="card-title text-2xl font-['Grenze_Gotisch'] text-green-500">For Experts</h2>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Share cultural knowledge</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Earn validation tokens</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Build reputation score</span>
                  </li>
                </ul>
                <div className="card-actions justify-end">
                  <Link 
                    href="/validator-dashboard" 
                    className="btn bg-gradient-to-r from-green-500 to-teal-600 border-0 hover:from-green-600 hover:to-teal-700 text-white"
                  >
                    Start Validating
                  </Link>
                </div>
              </div>
            </div>

            {/* Collectors Card */}
            <div className="card bg-gradient-to-br from-teal-500/10 to-cyan-600/10 hover:from-teal-500/20 hover:to-cyan-600/20 transition-all duration-300 backdrop-blur border border-teal-500/20">
              <div className="card-body">
                <BookOpenIcon className="w-12 h-12 text-teal-500 mb-4" />
                <h2 className="card-title text-2xl font-['Grenze_Gotisch'] text-teal-500">For Collectors</h2>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <span>Browse verified pieces</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <span>Learn tribal histories</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <span>Build your collection</span>
                  </li>
                </ul>
                <div className="card-actions justify-end">
                  <Link 
                    href="/marketplace" 
                    className="btn bg-gradient-to-r from-teal-500 to-cyan-600 border-0 hover:from-teal-600 hover:to-cyan-700 text-white"
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Learn to Earn Section */}
          <section className="mb-24">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative bg-gradient-to-r from-emerald-500/10 to-green-600/10 p-12 backdrop-blur">
                <div className="max-w-3xl mx-auto text-center">
                  <BookOpenIcon className="w-16 h-16 mx-auto mb-6 text-emerald-500" />
                  <h2 className="text-4xl font-['Grenze_Gotisch'] mb-6 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    Learn to Earn
                  </h2>
                  <p className="text-xl mb-8">
                    Expand your knowledge of African cultural heritage while earning rewards. 
                    Validate authenticity, share insights, and grow with our community.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href="/learn" className="btn btn-lg bg-gradient-to-r from-emerald-500 to-green-600 border-0 hover:from-emerald-600 hover:to-green-700 text-white">
                      Start Learning
                    </Link>
                    <Link href="/rewards" className="btn btn-lg btn-outline">
                      View Rewards
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Community Section */}
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative bg-gradient-to-r from-green-500/10 to-teal-600/10 p-12 backdrop-blur">
                <div className="max-w-3xl mx-auto text-center">
                  <UserGroupIcon className="w-16 h-16 mx-auto mb-6 text-green-500" />
                  <h2 className="text-4xl font-['Grenze_Gotisch'] mb-6">Join Our Community</h2>
                  <p className="text-xl mb-8">
                    Connect with mask enthusiasts, experts, and collectors from around the world. 
                    Share knowledge and participate in community events.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href="/community" className="btn btn-lg bg-gradient-to-r from-green-500 to-teal-600 border-0 hover:from-green-600 hover:to-teal-700 text-white">
                      Join Now
                    </Link>
                    <Link href="/events" className="btn btn-lg btn-outline">
                      View Events
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;