"use client"

import type React from "react"

import Layout from "../../components/layout"
import { useState } from "react"

export default function CreatePage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Digital Art",
    royalties: "10",
    blockchain: "Solana",
  })

  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  return (
    <Layout title="CREATE NFT">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-gray-400 text-lg">
            Transform your digital art into unique NFTs on the Solana blockchain. Upload your creation and set your
            terms.
          </p>
        </div>

        <form className="space-y-8">
          {/* File Upload Section */}
          <div className="space-y-4">
            <label className="block text-[#a3ff12] font-semibold text-lg">UPLOAD ARTWORK *</label>
            <div
              className={`relative border-2 border-dashed transition-all duration-300 p-8 text-center ${
                dragActive
                  ? "border-[#a3ff12] bg-[#a3ff12] bg-opacity-10 shadow-[0_0_20px_#a3ff12]"
                  : "border-gray-600 hover:border-[#a3ff12]"
              }`}
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 90%, 5% 100%)" }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {uploadedFile ? (
                <div className="space-y-2">
                  <div className="text-[#a3ff12] text-xl">✓ File Uploaded</div>
                  <div className="text-gray-400">{uploadedFile.name}</div>
                  <div className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl text-gray-600">⬆</div>
                  <div className="text-[#a3ff12] text-xl font-semibold">Drag & Drop or Click to Upload</div>
                  <div className="text-gray-400">Supports: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG</div>
                  <div className="text-sm text-gray-500">Max size: 100MB</div>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[#a3ff12] font-semibold mb-2">NFT NAME *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter NFT name"
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                />
              </div>

              <div>
                <label className="block text-[#a3ff12] font-semibold mb-2">PRICE (SOL) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                />
              </div>

              <div>
                <label className="block text-[#a3ff12] font-semibold mb-2">CATEGORY</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                >
                  <option value="Digital Art">Digital Art</option>
                  <option value="3D Art">3D Art</option>
                  <option value="Character">Character</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Photography">Photography</option>
                  <option value="Music">Music</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[#a3ff12] font-semibold mb-2">DESCRIPTION</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your NFT..."
                  rows={4}
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all resize-none"
                  style={{ clipPath: "polygon(0 0, 95% 0, 100% 95%, 5% 100%)" }}
                />
              </div>

              <div>
                <label className="block text-[#a3ff12] font-semibold mb-2">ROYALTIES (%)</label>
                <input
                  type="number"
                  name="royalties"
                  value={formData.royalties}
                  onChange={handleInputChange}
                  placeholder="10"
                  min="0"
                  max="50"
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                />
                <p className="text-gray-500 text-sm mt-1">Percentage you'll receive from future sales</p>
              </div>

              <div>
                <label className="block text-[#a3ff12] font-semibold mb-2">BLOCKCHAIN</label>
                <select
                  name="blockchain"
                  value={formData.blockchain}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                >
                  <option value="Solana">Solana</option>
                  <option value="Polygon">Polygon</option>
                  <option value="Ethereum">Ethereum</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-8">
            <button
              type="button"
              className="w-full px-6 py-4 border-2 border-[#a3ff12] text-[#a3ff12] font-bold hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">PREVIEW NFT</span>
            </button>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-[#a3ff12] text-black font-bold hover:bg-opacity-90 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">CREATE & MINT NFT</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
            </button>
          </div>
        </form>

        {/* Creation Tips */}
        <div className="mt-16 p-4 sm:p-6 border border-[#a3ff12] bg-black bg-opacity-50">
          <h3 className="text-[#a3ff12] font-bold text-xl mb-4">CREATION TIPS</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-gray-400">
            <div>
              <h4 className="text-[#a3ff12] font-semibold mb-2">Quality Matters</h4>
              <p className="text-sm">
                High-resolution images (at least 1000x1000px) perform better in the marketplace.
              </p>
            </div>
            <div>
              <h4 className="text-[#a3ff12] font-semibold mb-2">Unique Content</h4>
              <p className="text-sm">
                Original artwork and creative concepts attract more collectors and higher prices.
              </p>
            </div>
            <div>
              <h4 className="text-[#a3ff12] font-semibold mb-2">Detailed Description</h4>
              <p className="text-sm">Include the story behind your art, inspiration, and creation process.</p>
            </div>
            <div>
              <h4 className="text-[#a3ff12] font-semibold mb-2">Fair Pricing</h4>
              <p className="text-sm">Research similar NFTs to set competitive prices for your first creations.</p>
            </div>
            <div>
              <h4 className="text-[#a3ff12] font-semibold mb-2">Low Fees on Solana</h4>
              <p className="text-sm">
                Take advantage of Solana's low transaction fees to make your NFTs more accessible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
