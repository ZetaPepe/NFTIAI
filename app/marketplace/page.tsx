"use client"

import Layout from "../../components/layout"
import Image from "next/image"
import { useState } from "react"

const marketplaceData = {
  trending: [
    { name: "Cyber Legends", volume: "1,247 SOL", change: "+23.5%" },
    { name: "Neon Warriors", volume: "892 SOL", change: "+18.2%" },
    { name: "Digital Spirits", volume: "654 SOL", change: "+12.8%" },
  ],
  recentSales: [
    { name: "Quantum Guardian #1247", price: "12.5 SOL", buyer: "0x7a2b...c4d8", time: "2 min ago" },
    { name: "Cyber Phoenix #892", price: "8.3 SOL", buyer: "0x9f1e...a2b6", time: "5 min ago" },
    { name: "Digital Samurai #445", price: "15.7 SOL", buyer: "0x3c8d...f9e2", time: "8 min ago" },
  ],
  topCollections: [
    {
      name: "Neon Shamans",
      image: "/neon-shaman.png",
      floorPrice: "2.1 SOL",
      volume: "1,247 SOL",
      items: "10,000",
    },
    {
      name: "Cyber Guardians",
      image: "/placeholder.svg?height=100&width=100",
      floorPrice: "1.8 SOL",
      volume: "892 SOL",
      items: "8,888",
    },
    {
      name: "Digital Phoenixes",
      image: "/placeholder.svg?height=100&width=100",
      floorPrice: "3.2 SOL",
      volume: "2,156 SOL",
      items: "5,555",
    },
  ],
}

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Layout title="MARKETPLACE">
      {/* Market Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
        {[
          { label: "24H VOLUME", value: "4,892 SOL", change: "+12.3%" },
          { label: "TOTAL SALES", value: "127,456", change: "+8.7%" },
          { label: "ACTIVE USERS", value: "23,891", change: "+15.2%" },
          { label: "AVG PRICE", value: "2.4 SOL", change: "+5.1%" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="p-4 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] text-center"
            style={{ clipPath: "polygon(5% 0, 95% 0, 100% 85%, 0% 100%)" }}
          >
            <div className="text-xl font-bold text-[#a3ff12]">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
            <div className="text-green-400 text-xs mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-8">
        {["overview", "trending", "collections", "activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition-all relative overflow-hidden group ${
              activeTab === tab
                ? "bg-[#a3ff12] text-black"
                : "border border-[#a3ff12] text-[#a3ff12] hover:bg-[#a3ff12] hover:bg-opacity-10"
            }`}
          >
            <span className="relative z-10">{tab.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-12">
          {/* Trending Collections */}
          <section>
            <h2 className="text-2xl font-bold text-[#a3ff12] mb-6">TRENDING COLLECTIONS</h2>
            <div className="space-y-4">
              {marketplaceData.trending.map((collection, index) => (
                <div
                  key={collection.name}
                  className="flex items-center justify-between p-4 bg-black border border-[#a3ff12] hover:shadow-[0_0_15px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(0 0, 98% 0, 100% 90%, 2% 100%)" }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-[#a3ff12] font-bold text-xl">#{index + 1}</span>
                    <div>
                      <h3 className="text-[#a3ff12] font-semibold">{collection.name}</h3>
                      <p className="text-gray-400 text-sm">Volume: {collection.volume}</p>
                    </div>
                  </div>
                  <div className="text-green-400 font-semibold">{collection.change}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Sales */}
          <section>
            <h2 className="text-2xl font-bold text-[#a3ff12] mb-6">RECENT SALES</h2>
            <div className="space-y-3">
              {marketplaceData.recentSales.map((sale, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-black border border-gray-700 hover:border-[#a3ff12] transition-all"
                >
                  <div>
                    <h3 className="text-[#a3ff12] font-semibold">{sale.name}</h3>
                    <p className="text-gray-400 text-sm">Sold to {sale.buyer}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#a3ff12] font-bold">{sale.price}</div>
                    <div className="text-gray-500 text-sm">{sale.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "collections" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {marketplaceData.topCollections.map((collection, index) => (
            <div
              key={collection.name}
              className="bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] hover:shadow-[0_0_20px_#a3ff12] transition-all duration-300 overflow-hidden"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 90%, 5% 100%)" }}
            >
              <div className="relative">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-[#a3ff12] font-bold text-xl">{collection.name}</h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Floor Price</span>
                    <div className="text-[#a3ff12] font-semibold">{collection.floorPrice}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Volume</span>
                    <div className="text-[#a3ff12] font-semibold">{collection.volume}</div>
                  </div>
                </div>

                <div className="text-gray-400 text-sm">{collection.items} items</div>

                <button
                  className="w-full px-4 py-2 bg-[#a3ff12] text-black font-semibold hover:bg-opacity-90 transition-all"
                  style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
                >
                  VIEW COLLECTION
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#a3ff12]">LIVE ACTIVITY</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#a3ff12] rounded-full animate-pulse"></div>
              <span className="text-[#a3ff12] text-sm">LIVE</span>
            </div>
          </div>

          <div className="space-y-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-black border border-gray-700 hover:border-[#a3ff12] transition-all text-sm"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-[#a3ff12]">SALE</span>
                  <span className="text-gray-300">Cyber Warrior #{1000 + i}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-[#a3ff12] font-semibold">{(Math.random() * 10 + 1).toFixed(1)} SOL</span>
                  <span className="text-gray-500">{Math.floor(Math.random() * 60)} sec ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}
