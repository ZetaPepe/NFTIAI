"use client"

import Layout from "../../components/layout"
import Image from "next/image"
import { useState } from "react"

const nftCollections = [
  {
    id: 1,
    name: "Neon Shamans",
    image: "/neon-shaman.png",
    price: "2.5 SOL",
    creator: "CyberArtist",
    category: "Digital Art",
  },
  {
    id: 2,
    name: "Neon Zephyr",
    image: "/neon-zephyr.png",
    price: "1.8 SOL",
    creator: "FutureVision",
    category: "3D Art",
  },
  {
    id: 3,
    name: "Emerald Enforcer",
    image: "/emerald-enforcer.png",
    price: "3.2 SOL",
    creator: "QuantumDesign",
    category: "Character",
  },
  {
    id: 4,
    name: "Cyber Guardian",
    image: "/cyber-guardian.png",
    price: "4.1 SOL",
    creator: "NeonMaster",
    category: "Digital Art",
  },
  {
    id: 5,
    name: "Digital Phoenix",
    image: "/digital-phoenix.png",
    price: "2.9 SOL",
    creator: "TechnoArt",
    category: "Fantasy",
  },
  {
    id: 6,
    name: "Matrix Warrior",
    image: "/matrix-warrior.png",
    price: "3.7 SOL",
    creator: "CodeVision",
    category: "Character",
  },
]

const categories = ["All", "Digital Art", "3D Art", "Character", "Fantasy"]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNFTs = nftCollections.filter((nft) => {
    const matchesCategory = selectedCategory === "All" || nft.category === selectedCategory
    const matchesSearch =
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.creator.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <Layout title="EXPLORE NFTS">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search NFTs, creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 text-sm font-semibold transition-all relative overflow-hidden group ${
                selectedCategory === category
                  ? "bg-[#a3ff12] text-black"
                  : "border border-[#a3ff12] text-[#a3ff12] hover:bg-[#a3ff12] hover:bg-opacity-10"
              }`}
            >
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredNFTs.map((nft, index) => (
          <div
            key={nft.id}
            className="bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] group hover:shadow-[0_0_20px_#a3ff12] transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 95% 0, 100% 85%, 5% 100%)",
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="relative overflow-hidden">
              <Image
                src={nft.image || "/placeholder.svg"}
                alt={nft.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-[#a3ff12] font-bold text-lg">{nft.name}</h3>
                <span className="text-xs bg-[#a3ff12] text-black px-2 py-1 font-semibold">{nft.category}</span>
              </div>

              <p className="text-gray-400 text-sm">by {nft.creator}</p>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[#a3ff12] font-bold text-xl">{nft.price}</span>
                <button
                  className="px-4 py-2 bg-[#a3ff12] text-black font-semibold hover:bg-opacity-90 transition-all relative overflow-hidden group"
                  style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 15% 100%)" }}
                >
                  <span className="relative z-10">BUY NOW</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "TOTAL NFTS", value: "12,847" },
          { label: "ACTIVE CREATORS", value: "3,291" },
          { label: "TOTAL VOLUME", value: "45,892 SOL" },
          { label: "FLOOR PRICE", value: "0.8 SOL" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="text-center p-4 border border-[#a3ff12] bg-black bg-opacity-50"
            style={{ clipPath: "polygon(10% 0, 90% 0, 100% 80%, 0% 100%)" }}
          >
            <div className="text-2xl font-bold text-[#a3ff12]">{stat.value}</div>
            <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
