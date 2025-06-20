"use client"

import type React from "react"

import Layout from "../../components/layout"
import { useState } from "react"

const faqData = [
  {
    question: "What is an NFT?",
    answer:
      "NFT stands for Non-Fungible Token. It's a unique digital certificate stored on a blockchain that proves ownership of a specific digital asset, such as artwork, music, or collectibles.",
  },
  {
    question: "How do I create my first NFT?",
    answer:
      "Navigate to the 'Create NFT' page, upload your digital artwork, fill in the details like name, description, and price, then click 'Create & Mint NFT'. You'll need a Solana wallet with enough SOL to cover minimal transaction fees.",
  },
  {
    question: "What wallets do you support?",
    answer:
      "We support Phantom, Solflare, Backpack, and most major Solana-compatible wallets. Make sure your wallet is connected to the Solana mainnet.",
  },
  {
    question: "What are transaction fees?",
    answer:
      "Transaction fees on Solana are extremely low (typically less than $0.01) and are required for minting, buying, or selling NFTs. Solana's efficient architecture keeps costs minimal compared to other blockchains.",
  },
  {
    question: "How do royalties work?",
    answer:
      "When you create an NFT, you can set a royalty percentage (0-50%). This means you'll receive that percentage of the sale price every time your NFT is resold in the future.",
  },
  {
    question: "Can I cancel a listing?",
    answer:
      "Yes, you can cancel your NFT listing at any time before it's sold. Go to your profile, find the listed NFT, and click 'Cancel Listing'. Note that this requires a small gas fee.",
  },
]

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("faq")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Layout title="SUPPORT">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-8">
        {["faq", "contact", "guides", "status"].map((tab) => (
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

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#a3ff12] mb-4">FREQUENTLY ASKED QUESTIONS</h2>
            <p className="text-gray-400">Find answers to common questions about our platform</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-[#a3ff12] bg-black bg-opacity-50 overflow-hidden"
                style={{ clipPath: "polygon(0 0, 98% 0, 100% 95%, 2% 100%)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-[#a3ff12] hover:bg-opacity-5 transition-all"
                >
                  <h3 className="text-[#a3ff12] font-semibold text-lg">{faq.question}</h3>
                  <span className="text-[#a3ff12] text-2xl">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#a3ff12] mb-4">CONTACT SUPPORT</h2>
            <p className="text-gray-400">Can't find what you're looking for? Send us a message</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-[#a3ff12] font-semibold mb-2">NAME *</label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                />
              </div>
              <div>
                <label className="block text-[#a3ff12] font-semibold mb-2">EMAIL *</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[#a3ff12] font-semibold mb-2">SUBJECT *</label>
              <select
                name="subject"
                value={contactForm.subject}
                onChange={handleContactChange}
                className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
              >
                <option value="">Select a topic</option>
                <option value="technical">Technical Issue</option>
                <option value="account">Account Problem</option>
                <option value="transaction">Transaction Issue</option>
                <option value="general">General Question</option>
                <option value="partnership">Partnership Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-[#a3ff12] font-semibold mb-2">MESSAGE *</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                rows={6}
                className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] text-[#a3ff12] placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all resize-none"
                style={{ clipPath: "polygon(0 0, 95% 0, 100% 95%, 5% 100%)" }}
                placeholder="Describe your issue or question in detail..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#a3ff12] text-black font-bold hover:bg-opacity-90 transition-all relative overflow-hidden group"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
            >
              <span className="relative z-10">SEND MESSAGE</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
            </button>
          </form>

          {/* Alternative Contact Methods */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "DISCORD", desc: "Join our community", action: "JOIN SERVER" },
              { title: "TWITTER", desc: "Follow for updates", action: "FOLLOW US" },
              { title: "EMAIL", desc: "Direct support", action: "SEND EMAIL" },
            ].map((contact, index) => (
              <div
                key={contact.title}
                className="text-center p-6 border border-[#a3ff12] bg-black bg-opacity-50 hover:shadow-[0_0_15px_#a3ff12] transition-all"
                style={{ clipPath: "polygon(5% 0, 95% 0, 100% 85%, 0% 100%)" }}
              >
                <h3 className="text-[#a3ff12] font-bold text-lg mb-2">{contact.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{contact.desc}</p>
                <button className="px-4 py-2 border border-[#a3ff12] text-[#a3ff12] text-sm hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all">
                  {contact.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guides Tab */}
      {activeTab === "guides" && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#a3ff12] mb-4">HELP GUIDES</h2>
            <p className="text-gray-400">Step-by-step tutorials to get you started</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Getting Started Guide",
                description: "Learn the basics of NFTs and how to use our platform",
                steps: ["Create a wallet", "Connect to platform", "Browse collections", "Make your first purchase"],
              },
              {
                title: "Creating Your First NFT",
                description: "Complete walkthrough of the NFT creation process",
                steps: ["Prepare your artwork", "Upload and set details", "Choose blockchain", "Mint your NFT"],
              },
              {
                title: "Buying & Selling NFTs",
                description: "Master the marketplace and trading features",
                steps: ["Browse marketplace", "Place bids", "Complete purchases", "List for sale"],
              },
              {
                title: "Wallet Setup Guide",
                description: "Configure your crypto wallet for optimal security",
                steps: ["Choose a wallet", "Install extension", "Secure your seed phrase", "Connect to platform"],
              },
            ].map((guide, index) => (
              <div
                key={guide.title}
                className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] hover:shadow-[0_0_20px_#a3ff12] transition-all"
                style={{ clipPath: "polygon(0 0, 95% 0, 100% 90%, 5% 100%)" }}
              >
                <h3 className="text-[#a3ff12] font-bold text-xl mb-3">{guide.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{guide.description}</p>

                <div className="space-y-2 mb-6">
                  {guide.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center space-x-3">
                      <span className="w-6 h-6 bg-[#a3ff12] text-black text-xs font-bold rounded-full flex items-center justify-center">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-300 text-sm">{step}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full px-4 py-2 border border-[#a3ff12] text-[#a3ff12] font-semibold hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all"
                  style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
                >
                  READ GUIDE
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Tab */}
      {activeTab === "status" && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#a3ff12] mb-4">PLATFORM STATUS</h2>
            <p className="text-gray-400">Real-time status of our services</p>
          </div>

          <div className="space-y-6">
            {/* Overall Status */}
            <div className="p-6 bg-black border-2 border-green-500 shadow-[0_0_10px_#00ff00] text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-500 font-bold text-xl">ALL SYSTEMS OPERATIONAL</span>
              </div>
              <p className="text-gray-300">All services are running normally</p>
            </div>

            {/* Service Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {[
                { service: "NFT Marketplace", status: "operational", uptime: "99.9%" },
                { service: "Minting Service", status: "operational", uptime: "99.8%" },
                { service: "User Authentication", status: "operational", uptime: "100%" },
                { service: "Payment Processing", status: "operational", uptime: "99.7%" },
                { service: "Image Storage", status: "operational", uptime: "99.9%" },
                { service: "API Services", status: "operational", uptime: "99.8%" },
              ].map((service, index) => (
                <div
                  key={service.service}
                  className="p-4 bg-black border border-[#a3ff12] flex justify-between items-center"
                  style={{ clipPath: "polygon(0 0, 95% 0, 100% 90%, 5% 100%)" }}
                >
                  <div>
                    <h3 className="text-[#a3ff12] font-semibold">{service.service}</h3>
                    <p className="text-gray-400 text-sm">Uptime: {service.uptime}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm font-semibold">ONLINE</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Incidents */}
            <div className="p-6 border border-[#a3ff12] bg-black bg-opacity-50">
              <h3 className="text-[#a3ff12] font-bold text-xl mb-4">RECENT INCIDENTS</h3>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✓</div>
                <p className="text-gray-400">No recent incidents to report</p>
                <p className="text-gray-500 text-sm mt-2">Last 30 days</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
