"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import type React from "react"
import { Github, Twitter, Wallet } from "lucide-react"

export default function NFTMarketplace() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Digital Art",
    royalties: "10",
    blockchain: "Solana",
  })
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState("")
  const [isChatLoading, setIsChatLoading] = useState(false)

  const [typedText, setTypedText] = useState("")
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const heroLines = ["AI INTELLECTUAL", "PROPERTY TO", "NFT PLATFORM"]

  // Wallet connection state
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  // NFT Collections Data
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

  const filteredNFTs = nftCollections.filter((nft) => {
    const matchesCategory = selectedCategory === "All" || nft.category === selectedCategory
    const matchesSearch =
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.creator.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Wallet connection functions
  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      // Check if Phantom wallet is available
      if (typeof window !== "undefined" && window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect()
        setWalletAddress(response.publicKey.toString())
        setIsWalletConnected(true)
        console.log("Connected to Phantom wallet:", response.publicKey.toString())
      } else {
        // Show error if Phantom is not installed
        alert("Phantom wallet not found! Please install Phantom wallet extension from phantom.app")
        console.error("Phantom wallet not installed")
      }
    } catch (error) {
      console.error("Failed to connect to Phantom wallet:", error)
      alert("Failed to connect to Phantom wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
    if (typeof window !== "undefined" && window.solana && window.solana.disconnect) {
      window.solana.disconnect()
    }
    console.log("Phantom wallet disconnected")
  }

  const formatAddress = (address: string) => {
    if (address.length <= 8) return address
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm({
      ...contactForm,
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

  const handleQuickQuestion = (question) => {
    setChatInput(question)
  }

  const handleChatKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendChatMessage()
    }
  }

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return

    const userMessage = {
      role: "user",
      content: chatInput.trim(),
      timestamp: new Date(),
    }

    // Add user message to chat
    const messagesContainer = document.getElementById("chat-messages")
    const userMessageDiv = document.createElement("div")
    userMessageDiv.className = "flex gap-3 justify-end"
    userMessageDiv.innerHTML = `
    <div class="bg-[#a3ff12] text-black p-3 rounded-lg max-w-[80%]">
      <p class="text-sm">${userMessage.content}</p>
      <p class="text-xs opacity-60 mt-2">Just now</p>
    </div>
    <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
      <span class="text-white text-xs font-bold">YOU</span>
    </div>
  `
    messagesContainer.appendChild(userMessageDiv)

    setChatInput("")
    setIsChatLoading(true)

    // Add loading message
    const loadingDiv = document.createElement("div")
    loadingDiv.className = "flex gap-3 justify-start"
    loadingDiv.id = "loading-message"
    loadingDiv.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-[#a3ff12] flex items-center justify-center flex-shrink-0">
      <span class="text-black text-xs font-bold">AI</span>
    </div>
    <div class="bg-gray-800 text-gray-100 border border-gray-700 p-3 rounded-lg">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-[#a3ff12] rounded-full animate-pulse"></div>
        <span class="text-sm">AI is thinking about your AI IP question...</span>
      </div>
    </div>
  `
    messagesContainer.appendChild(loadingDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [userMessage],
        }),
      })

      const data = await response.json()

      // Remove loading message
      const loadingElement = document.getElementById("loading-message")
      if (loadingElement) {
        loadingElement.remove()
      }

      if (data.success) {
        // Add AI response
        const aiMessageDiv = document.createElement("div")
        aiMessageDiv.className = "flex gap-3 justify-start"
        aiMessageDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-[#a3ff12] flex items-center justify-center flex-shrink-0">
          <span class="text-black text-xs font-bold">AI</span>
        </div>
        <div class="bg-gray-800 text-gray-100 border border-gray-700 p-3 rounded-lg max-w-[80%]">
          <p class="text-sm whitespace-pre-wrap">${data.message.content}</p>
          <p class="text-xs opacity-60 mt-2">Just now</p>
        </div>
      `
        messagesContainer.appendChild(aiMessageDiv)
      } else {
        // Add error message
        const errorDiv = document.createElement("div")
        errorDiv.className = "flex gap-3 justify-start"
        errorDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
          <span class="text-white text-xs font-bold">!</span>
        </div>
        <div class="bg-red-900 text-red-100 border border-red-500 p-3 rounded-lg max-w-[80%]">
          <p class="text-sm">Sorry, I'm having trouble responding. This is a demo about AI IP tokenization on Solana. Please configure OpenAI API for full functionality.</p>
          <p class="text-xs opacity-60 mt-2">Just now</p>
        </div>
      `
        messagesContainer.appendChild(errorDiv)
      }
    } catch (error) {
      // Remove loading message
      const loadingElement = document.getElementById("loading-message")
      if (loadingElement) {
        loadingElement.remove()
      }

      // Add demo response
      const demoDiv = document.createElement("div")
      demoDiv.className = "flex gap-3 justify-start"
      demoDiv.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
        <span class="text-black text-xs font-bold">AI</span>
      </div>
      <div class="bg-yellow-900 text-yellow-100 border border-yellow-500 p-3 rounded-lg max-w-[80%]">
        <p class="text-sm">This is a demo response about AI IP tokenization on Solana. To tokenize AI models, you'll need to prepare your model documentation, verify ownership, and mint as an NFT with RWA backing. Configure OpenAI API for detailed AI-powered responses.</p>
        <p class="text-xs opacity-60 mt-2">Demo mode - Just now</p>
      </div>
    `
      messagesContainer.appendChild(demoDiv)
    } finally {
      setIsChatLoading(false)
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }

  // Animation for particles
  useEffect(() => {
    if (typeof window === "undefined") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
    }[] = []

    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          color: "#a3ff12",
          alpha: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(163, 255, 18, ${p.alpha})`
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height
      }

      requestAnimationFrame(animateParticles)
    }

    createParticles()
    animateParticles()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Page load animation
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Typing animation effect
  useEffect(() => {
    const handleTyping = () => {
      const currentLine = heroLines[currentLineIndex]

      if (isPaused) {
        setTimeout(() => setIsPaused(false), 2000) // Pause for 2 seconds at end of each line
        return
      }

      if (isDeleting) {
        if (currentCharIndex > 0) {
          setCurrentCharIndex((prev) => prev - 1)
          setTypedText(currentLine.substring(0, currentCharIndex - 1))
        } else {
          setIsDeleting(false)
          setCurrentLineIndex((prev) => (prev + 1) % heroLines.length)
        }
      } else {
        if (currentCharIndex < currentLine.length) {
          setCurrentCharIndex((prev) => prev + 1)
          setTypedText(currentLine.substring(0, currentCharIndex + 1))
        } else {
          setIsPaused(true)
          setTimeout(() => setIsDeleting(true), 1000) // Wait 1 second before deleting
        }
      }
    }

    const speed = isDeleting ? 50 : 100 // Faster deletion, slower typing
    const timer = setTimeout(handleTyping, speed)

    return () => clearTimeout(timer)
  }, [currentLineIndex, currentCharIndex, isDeleting, isPaused, heroLines])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#121212] relative overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30 pointer-events-none" />

      {/* Green glow border effect - adjusted for mobile */}
      <div className="absolute inset-0 border-[1px] border-[#a3ff12] shadow-[0_0_15px_#a3ff12] m-1 sm:m-2 md:m-4 lg:m-8 pointer-events-none"></div>

      {/* Corner brackets - adjusted for mobile */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 border-t-2 border-l-2 border-[#a3ff12] shadow-[0_0_5px_#a3ff12] pointer-events-none"></div>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 border-t-2 border-r-2 border-[#a3ff12] shadow-[0_0_5px_#a3ff12] pointer-events-none"></div>
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 border-b-2 border-l-2 border-[#a3ff12] shadow-[0_0_5px_#a3ff12] pointer-events-none"></div>
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 border-b-2 border-r-2 border-[#a3ff12] shadow-[0_0_5px_#a3ff12] pointer-events-none"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div
            className={`flex items-center transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
          >
            {/* Social Icons */}
            <div className="flex items-center gap-3 mr-4">
              <a
                href="https://github.com/Axarb/NFTIAI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#a3ff12] flex items-center justify-center hover:bg-[#a3ff12] hover:text-black transition-all duration-300 group"
              >
                <Github className="w-4 h-4 text-[#a3ff12] group-hover:text-black transition-colors" />
              </a>
              <a
                href="https://x.com/nfti_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#a3ff12] flex items-center justify-center hover:bg-[#a3ff12] hover:text-black transition-all duration-300 group"
              >
                <Twitter className="w-4 h-4 text-[#a3ff12] group-hover:text-black transition-colors" />
              </a>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#a3ff12] flex items-center justify-center mr-2 animate-pulse">
                <div className="w-4 h-4 rounded-full border-2 border-black"></div>
              </div>
              <span className="gradient-text font-bold relative">
                NFTI AI
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#a3ff12] grow-underline"></span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav
              className={`transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}
            >
              {/* Mobile menu button */}
              <button
                className="md:hidden flex items-center px-3 py-2 border border-[#a3ff12] gradient-text text-xs relative z-[9999]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
              </button>

              {/* Desktop navigation */}
              <ul className="hidden md:flex space-x-1">
                {[
                  { name: "AI IP MARKETPLACE", href: "#marketplace" },
                  { name: "TOKENIZE AI", href: "#tokenize" },
                  { name: "RWA BRIDGE", href: "#rwa-bridge" },
                  { name: "MCP PROTOCOL", href: "#mcp-protocol" },
                  { name: "SUPPORT", href: "#support" },
                ].map((item, index) => (
                  <li
                    key={item.name}
                    className="transition-all duration-500"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <button
                      onClick={() => scrollToSection(item.href.substring(1))}
                      className="px-2 py-1 text-xs bg-[#a3ff12] text-black font-semibold hover:bg-opacity-90 transition-all relative overflow-hidden group"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                      }}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Mobile navigation menu */}
              {mobileMenuOpen && (
                <>
                  {/* Backdrop overlay */}
                  <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[9998]"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  {/* Menu container - positioned closer to left */}
                  <div className="md:hidden fixed top-16 left-4 right-auto bg-black border-2 border-[#a3ff12] shadow-[0_0_20px_#a3ff12] z-[9999] w-64 max-w-[calc(100vw-2rem)]">
                    <ul className="flex flex-col py-4">
                      {[
                        { name: "AI IP MARKETPLACE", href: "#marketplace" },
                        { name: "TOKENIZE AI", href: "#tokenize" },
                        { name: "RWA BRIDGE", href: "#rwa-bridge" },
                        { name: "MCP PROTOCOL", href: "#mcp-protocol" },
                        { name: "SUPPORT", href: "#support" },
                      ].map((item) => (
                        <li key={item.name}>
                          <button
                            onClick={() => scrollToSection(item.href.substring(1))}
                            className="block w-full text-left px-6 py-4 gradient-text hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all text-sm font-semibold border-b border-gray-700 last:border-b-0"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </nav>

            {/* Wallet Connect Button */}
            <div
              className={`transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}
              style={{ transitionDelay: "600ms" }}
            >
              {!isWalletConnected ? (
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-[#a3ff12] to-[#8fd610] text-black font-bold hover:from-[#8fd610] hover:to-[#a3ff12] transition-all relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                  style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
                >
                  <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="relative z-10 hidden sm:inline">
                    {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
                  </span>
                  <span className="relative z-10 sm:hidden">{isConnecting ? "..." : "CONNECT"}</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] text-xs sm:text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="gradient-text font-semibold hidden sm:inline">{formatAddress(walletAddress)}</span>
                    <span className="gradient-text font-semibold sm:hidden">
                      {formatAddress(walletAddress).slice(0, 6)}
                    </span>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="px-2 sm:px-3 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-semibold"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <div
            className={`flex flex-col justify-center transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
          >
            <h1 className="text-[#a3ff12] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tighter">
              <div className="overflow-hidden">
                <div className="transform transition-transform duration-1000" style={{ transitionDelay: "300ms" }}>
                  <span>{typedText}</span>
                  <span className="animate-pulse text-[#a3ff12]">|</span>
                </div>
              </div>
            </h1>

            <p
              className="text-gray-400 mt-8 text-sm leading-relaxed max-w-md transform transition-all duration-1000"
              style={{ transitionDelay: "900ms" }}
            >
              TRANSFORM AI MODELS, ALGORITHMS, AND INTELLECTUAL PROPERTY INTO TRADEABLE NFTS ON SOLANA. BRIDGE
              REAL-WORLD AI ASSETS WITH LIGHTNING-FAST, LOW-COST BLOCKCHAIN TECHNOLOGY USING RWA AND MCP PROTOCOLS.
            </p>

            <div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 transform transition-all duration-1000"
              style={{ transitionDelay: "1000ms" }}
            >
              <button
                onClick={() => scrollToSection("tokenize")}
                className="px-4 sm:px-6 py-2 bg-[#a3ff12] font-bold hover:bg-opacity-90 transition-all relative group overflow-hidden text-sm sm:text-base"
              >
                <span className="relative z-10 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold">
                  TOKENIZE AI IP
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
              <button
                onClick={() => scrollToSection("rwa-bridge")}
                className="px-4 sm:px-6 py-2 border border-[#a3ff12] font-bold hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all relative group overflow-hidden text-sm sm:text-base"
              >
                <span className="relative z-10 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold">
                  EXPLORE SOLANA RWA
                </span>
                <span className="absolute inset-0 bg-[#a3ff12] opacity-0 group-hover:opacity-10 transition-opacity"></span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#a3ff12] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            </div>

            {/* Technology Stack Indicators */}
            <div
              className="flex flex-wrap gap-2 mt-8 transform transition-all duration-1000"
              style={{ transitionDelay: "1200ms" }}
            >
              <div className="px-3 py-1 bg-gray-800 border border-[#a3ff12] gradient-text text-xs font-semibold">
                SOLANA BLOCKCHAIN
              </div>
              <div className="px-3 py-1 bg-gray-800 border border-[#a3ff12] gradient-text text-xs font-semibold">
                RWA PROTOCOL
              </div>
              <div className="px-3 py-1 bg-gray-800 border border-[#a3ff12] gradient-text text-xs font-semibold">
                MCP INTEGRATION
              </div>
              <div className="px-3 py-1 bg-gray-800 border border-[#a3ff12] gradient-text text-xs font-semibold">
                AI IP TOKENIZATION
              </div>
            </div>
          </div>

          <div
            className={`relative transform transition-all duration-1000 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
            style={{ transitionDelay: "500ms" }}
          >
            {/* AI-themed NFT Images */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 relative">
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] group transition-all duration-300 hover:shadow-[0_0_20px_#a3ff12] transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                <Image
                  src="/neon-shaman.png"
                  alt="AI Neural Network NFT"
                  width={200}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 z-20">
                  <div className="gradient-text text-xs font-bold">AI NEURAL NET</div>
                  <div className="text-gray-300 text-xs">SOLANA RWA</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#a3ff12] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-20"></div>
              </div>

              <div className="col-span-1 row-span-2 relative overflow-hidden rounded-lg border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] group transition-all duration-300 hover:shadow-[0_0_20px_#a3ff12] transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                <Image
                  src="/neon-zephyr.png"
                  alt="AI Algorithm NFT"
                  width={250}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 z-20">
                  <div className="gradient-text text-xs font-bold">ML ALGORITHM</div>
                  <div className="text-gray-300 text-xs">MCP VERIFIED</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#a3ff12] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-20"></div>
              </div>

              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] group transition-all duration-300 hover:shadow-[0_0_20px_#a3ff12] transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                <Image
                  src="/emerald-enforcer.png"
                  alt="AI Model NFT"
                  width={200}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 z-20">
                  <div className="gradient-text text-xs font-bold">AI MODEL IP</div>
                  <div className="text-gray-300 text-xs">SOLANA NATIVE</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#a3ff12] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-20"></div>
              </div>
            </div>

            {/* Tech lines with AI/RWA/MCP indicators */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-[#a3ff12] opacity-50">
              <div className="absolute -top-6 -right-6 gradient-text text-xs font-bold">SOLANA</div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-[#a3ff12] opacity-50">
              <div className="absolute -bottom-6 -left-6 gradient-text text-xs font-bold">MCP</div>
            </div>

            {/* Enhanced floating geometric shapes with more green objects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Original floating shapes */}
              <div className="absolute top-20 left-10 w-20 h-20 border border-[#a3ff12] opacity-20 rotate-45 animate-spin-slow parallax"></div>
              <div className="absolute top-40 right-20 w-16 h-16 border border-[#a3ff12] opacity-15 animate-pulse parallax"></div>
              <div className="absolute bottom-40 left-20 w-24 h-24 border border-[#a3ff12] opacity-10 rotate-12 animate-bounce parallax"></div>
              <div className="absolute bottom-20 right-40 w-12 h-12 border border-[#a3ff12] opacity-25 -rotate-45 animate-spin-slow parallax"></div>

              {/* Additional green floating objects */}
              <div
                className="absolute top-32 left-1/3 w-8 h-8 bg-[#a3ff12] opacity-10 rounded-full animate-pulse parallax"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-60 right-1/4 w-14 h-14 border-2 border-[#a3ff12] opacity-20 rotate-12 animate-spin-slow parallax"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-60 left-1/2 w-10 h-10 bg-[#a3ff12] opacity-15 transform rotate-45 animate-bounce parallax"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-1/2 left-16 w-6 h-6 border border-[#a3ff12] opacity-30 rounded-full animate-pulse parallax"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute bottom-32 right-16 w-18 h-18 border-2 border-[#a3ff12] opacity-12 rotate-90 animate-spin-slow parallax"
                style={{ animationDelay: "3s" }}
              ></div>

              {/* Hexagonal shapes */}
              <div
                className="absolute top-1/4 right-1/3 w-12 h-12 border border-[#a3ff12] opacity-18 transform rotate-30 animate-pulse parallax"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  animationDelay: "2.5s",
                }}
              ></div>
              <div
                className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-[#a3ff12] opacity-8 transform -rotate-15 animate-bounce parallax"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  animationDelay: "1.8s",
                }}
              ></div>

              {/* Triangle shapes */}
              <div
                className="absolute top-3/4 right-1/2 w-10 h-10 border border-[#a3ff12] opacity-22 animate-spin-slow parallax"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", animationDelay: "0.8s" }}
              ></div>
              <div
                className="absolute top-16 left-2/3 w-8 h-8 bg-[#a3ff12] opacity-14 animate-pulse parallax"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", animationDelay: "2.2s" }}
              ></div>

              {/* Diamond shapes */}
              <div
                className="absolute bottom-16 left-1/3 w-12 h-12 border-2 border-[#a3ff12] opacity-16 rotate-45 animate-bounce parallax"
                style={{ animationDelay: "1.2s" }}
              ></div>
              <div
                className="absolute top-2/3 right-20 w-14 h-14 bg-[#a3ff12] opacity-9 transform rotate-12 animate-pulse parallax"
                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", animationDelay: "3.5s" }}
              ></div>

              {/* Small scattered dots */}
              <div
                className="absolute top-1/3 left-1/5 w-4 h-4 bg-[#a3ff12] opacity-25 rounded-full animate-pulse parallax"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-[#a3ff12] opacity-20 rounded-full animate-bounce parallax"
                style={{ animationDelay: "2.8s" }}
              ></div>
              <div
                className="absolute top-1/2 right-1/3 w-5 h-5 bg-[#a3ff12] opacity-18 rounded-full animate-pulse parallax"
                style={{ animationDelay: "1.7s" }}
              ></div>
              <div
                className="absolute bottom-1/2 left-1/6 w-4 h-4 bg-[#a3ff12] opacity-22 rounded-full animate-bounce parallax"
                style={{ animationDelay: "0.9s" }}
              ></div>

              {/* Larger accent shapes */}
              <div
                className="absolute top-1/5 right-1/6 w-20 h-20 border border-[#a3ff12] opacity-8 rotate-30 animate-spin-slow parallax"
                style={{ animationDelay: "4s" }}
              ></div>
              <div
                className="absolute bottom-1/5 left-1/8 w-22 h-22 bg-[#a3ff12] opacity-6 transform -rotate-20 animate-pulse parallax"
                style={{
                  clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  animationDelay: "3.2s",
                }}
              ></div>
            </div>
          </div>
        </main>

        {/* AI Chat Interface Section */}
        <section
          className={`mb-16 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          style={{ transitionDelay: "1300ms" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold gradient-text mb-4">ASK OUR AI IP ASSISTANT</h2>
              <p className="text-gray-400">Get expert guidance on AI tokenization, RWA bridges, and MCP protocols</p>
            </div>

            <div className="bg-black border-2 border-[#a3ff12] shadow-[0_0_20px_#a3ff12] rounded-lg overflow-hidden">
              {/* Chat Header */}
              <div className="bg-[#a3ff12] text-black p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-[#a3ff12]"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">AI IP EXPERT</h3>
                    <p className="text-xs opacity-80">Specialized in Solana AI tokenization</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold">ONLINE</span>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="h-80 overflow-y-auto p-4 bg-gray-900">
                <div className="space-y-4" id="chat-messages">
                  {/* Initial AI Message */}
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#a3ff12] flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xs font-bold">AI</span>
                    </div>
                    <div className="bg-gray-800 text-gray-100 border border-gray-700 p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">
                        Hello! I'm your AI IP specialist. I can help you understand how to tokenize AI models on Solana,
                        set up RWA bridges, and implement MCP protocols. What would you like to know?
                      </p>
                      <p className="text-xs opacity-60 mt-2">Just now</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="p-4 border-t border-gray-700 bg-gray-900">
                <p className="text-xs text-gray-400 mb-3">Quick questions:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    "How do I tokenize my AI model?",
                    "What is RWA bridge?",
                    "Solana transaction costs?",
                    "MCP protocol benefits?",
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-gray-800 text-gray-300 px-3 py-2 rounded border border-gray-600 hover:bg-[#a3ff12] hover:text-black transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-700 bg-black">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleChatKeyPress}
                    placeholder="Ask about AI IP tokenization, RWA, or MCP..."
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 text-white text-sm rounded focus:outline-none focus:border-[#a3ff12] transition-colors"
                    disabled={isChatLoading}
                  />
                  <button
                    onClick={handleSendChatMessage}
                    disabled={!chatInput.trim() || isChatLoading}
                    className="px-6 py-3 bg-[#a3ff12] text-black rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
                  >
                    {isChatLoading ? "..." : "SEND"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Features Section */}
        <section
          className={`mb-24 grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          style={{ transitionDelay: "1400ms" }}
        >
          <div className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] hover:shadow-[0_0_20px_#a3ff12] transition-all">
            <h3 className="gradient-text font-bold text-xl mb-4">SOLANA-POWERED AI IP</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your AI models, algorithms, and intellectual property into tradeable NFTs on Solana with
              lightning-fast transactions and minimal fees (under $0.01).
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#a3ff12] rounded-full animate-pulse"></div>
              <span className="gradient-text text-xs font-semibold">ULTRA-LOW FEES</span>
            </div>
          </div>

          <div className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] hover:shadow-[0_0_20px_#a3ff12] transition-all">
            <h3 className="gradient-text font-bold text-xl mb-4">RWA BRIDGE</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bridge real-world AI assets to Solana blockchain through our RWA protocol, enabling fractional ownership
              and instant global trading of AI IP.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#a3ff12] rounded-full animate-pulse"></div>
              <span className="gradient-text text-xs font-semibold">INSTANT SETTLEMENT</span>
            </div>
          </div>

          <div className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] hover:shadow-[0_0_20px_#a3ff12] transition-all">
            <h3 className="gradient-text font-bold text-xl mb-4">MCP PROTOCOL</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leverage Model Context Protocol for secure AI model verification on Solana, ensuring authenticity and
              performance metrics of tokenized AI assets.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-500 text-xs font-semibold">COMING SOON</span>
            </div>
          </div>
        </section>

        {/* 1. AI IP MARKETPLACE Section */}
        <section id="marketplace" className="mb-24">
          <div className="mb-8">
            <h1 className="gradient-text font-extrabold text-3xl sm:text-4xl md:text-5xl leading-none tracking-tighter">
              AI IP MARKETPLACE
            </h1>
            <div className="w-20 h-[2px] bg-[#a3ff12] mt-4"></div>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-6">
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search NFTs, creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                />
              </div>
            </div>
            \`\`\`jsx
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 text-sm font-semibold transition-all relative overflow-hidden group ${
                    selectedCategory === category
                      ? "bg-[#a3ff12] text-black"
                      : "border border-[#a3ff12] hover:bg-[#a3ff12] hover:bg-opacity-10"
                  }`}
                >
                  <span
                    className={`relative z-10 ${selectedCategory === category ? "" : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"}`}
                  >
                    {category}
                  </span>
                </button>
              ))}
            </div>
            \`\`\`
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
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
                    <h3 className="gradient-text font-bold text-lg">{nft.name}</h3>
                    <span className="text-xs bg-[#a3ff12] text-black px-2 py-1 font-semibold">{nft.category}</span>
                  </div>

                  <p className="text-gray-400 text-sm">by {nft.creator}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. TOKENIZE AI Section */}
        <section id="tokenize" className="mb-24">
          <div className="mb-8">
            <h1 className="gradient-text font-extrabold text-3xl sm:text-4xl md:text-5xl leading-none tracking-tighter">
              TOKENIZE AI
            </h1>
            <div className="w-20 h-[2px] bg-[#a3ff12] mt-4"></div>
          </div>

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
                <label className="block gradient-text font-semibold text-lg">UPLOAD ARTWORK *</label>
                <div
                  className={`relative border-2 border-dashed transition-all duration-300 p-8 text-center ${
                    dragActive
                      ? "border-[#a3ff12] bg-[#a3ff12] bg-opacity-10 shadow-[0_0_20px_#a3ff12]"
                      : "border-gray-600 hover:border-[#a3"
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
                      <div className="gradient-text text-xl">✓ File Uploaded</div>
                      <div className="text-gray-400">{uploadedFile.name}</div>
                      <div className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl text-gray-600">⬆</div>
                      <div className="gradient-text text-xl font-semibold">Drag & Drop or Click to Upload</div>
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
                    <label className="block gradient-text font-semibold mb-2">NFT NAME *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter NFT name"
                      className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                      style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                    />
                  </div>

                  <div>
                    <label className="block gradient-text font-semibold mb-2">PRICE (SOL) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                      style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                    />
                  </div>

                  <div>
                    <label className="block gradient-text font-semibold mb-2">CATEGORY</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
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
                    <label className="block gradient-text font-semibold mb-2">DESCRIPTION</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your NFT..."
                      rows={4}
                      className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all resize-none"
                      style={{ clipPath: "polygon(0 0, 95% 0, 100% 95%, 5% 100%)" }}
                    />
                  </div>

                  <div>
                    <label className="block gradient-text font-semibold mb-2">ROYALTIES (%)</label>
                    <input
                      type="number"
                      name="royalties"
                      value={formData.royalties}
                      onChange={handleInputChange}
                      placeholder="10"
                      min="0"
                      max="50"
                      className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                      style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                    />
                    <p className="text-gray-500 text-sm mt-1">Percentage you'll receive from future sales</p>
                  </div>

                  <div>
                    <label className="block gradient-text font-semibold mb-2">BLOCKCHAIN</label>
                    <select
                      name="blockchain"
                      value={formData.blockchain}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
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
                  className="w-full px-6 py-4 border-2 border-[#a3ff12] gradient-text font-bold hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all relative overflow-hidden group"
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
              <h3 className="gradient-text font-bold text-xl mb-4">CREATION TIPS</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-gray-400">
                <div>
                  <h4 className="gradient-text font-semibold mb-2">Quality Matters</h4>
                  <p className="text-sm">
                    High-resolution images (at least 1000x1000px) perform better in the marketplace.
                  </p>
                </div>
                <div>
                  <h4 className="gradient-text font-semibold mb-2">Unique Content</h4>
                  <p className="text-sm">
                    Original artwork and creative concepts attract more collectors and higher prices.
                  </p>
                </div>
                <div>
                  <h4 className="gradient-text font-semibold mb-2">Detailed Description</h4>
                  <p className="text-sm">Include the story behind your art, inspiration, and creation process.</p>
                </div>
                <div>
                  <h4 className="gradient-text font-semibold mb-2">Fair Pricing</h4>
                  <p className="text-sm">Research similar NFTs to set competitive prices for your first creations.</p>
                </div>
                <div>
                  <h4 className="gradient-text font-semibold mb-2">Low Fees on Solana</h4>
                  <p className="text-sm">
                    Take advantage of Solana's low transaction fees to make your NFTs more accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Team Section */}
        <section id="core-team" className="mb-24">
          <div className="mb-8">
            <h1 className="gradient-text font-extrabold text-3xl sm:text-4xl md:text-5xl leading-none tracking-tighter">
              CORE TEAM
            </h1>
            <div className="w-20 h-[2px] bg-[#a3ff12] mt-4"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold gradient-text mb-4">MEET THE VISIONARIES</h2>
              <p className="text-gray-400 text-lg">
                The innovative minds behind NFTI AI's revolutionary approach to AI intellectual property tokenization
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Psyche Wizard */}
              <div className="group">
                <div className="bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] hover:shadow-[0_0_20px_#a3ff12] transition-all duration-300 p-8 text-center space-y-6">
                  <div className="relative mx-auto w-32 h-32 overflow-hidden rounded-full border-4 border-[#a3ff12] shadow-[0_0_15px_#a3ff12] group-hover:shadow-[0_0_25px_#a3ff12] transition-all duration-300">
                    <Image
                      src="/psyche-wizard-avatar.jpg"
                      alt="Psyche Wizard"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-20"></div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="gradient-text font-bold text-2xl">PSYCHE WIZARD</h3>
                    <div className="space-y-2">
                      <p className="text-[#a3ff12] font-semibold text-sm">CO-FOUNDER</p>
                    </div>

                    <div className="flex justify-center space-x-4 pt-4">
                      <a
                        href="https://x.com/psychewizard/status/1938144521721712718?s=46"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-[#a3ff12] gradient-text text-sm hover:bg-[#a3ff12] hover:text-black transition-all duration-300 group"
                      >
                        <Twitter className="w-4 h-4" />
                        <span>FOLLOW</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brutal Mindset */}
              <div className="group">
                <div className="bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] hover:shadow-[0_0_20px_#a3ff12] transition-all duration-300 p-8 text-center space-y-6">
                  <div className="relative mx-auto w-32 h-32 overflow-hidden rounded-full border-4 border-[#a3ff12] shadow-[0_0_15px_#a3ff12] group-hover:shadow-[0_0_25px_#a3ff12] transition-all duration-300">
                    <Image
                      src="/brutal-mindset-avatar.jpg"
                      alt="Brutal Mindset"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-20"></div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="gradient-text font-bold text-2xl">BRUTAL MINDSET</h3>
                    <div className="space-y-2">
                      <p className="text-[#a3ff12] font-semibold text-sm">PARTNER</p>
                    </div>

                    <div className="flex justify-center space-x-4 pt-4">
                      <a
                        href="https://x.com/brutalmindset/status/1937808517743730733?s=46"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-[#a3ff12] gradient-text text-sm hover:bg-[#a3ff12] hover:text-black transition-all duration-300 group"
                      >
                        <Twitter className="w-4 h-4" />
                        <span>FOLLOW</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "COMBINED EXPERIENCE", value: "15+ YEARS" },
                { label: "AI PROJECTS LAUNCHED", value: "50+" },
                { label: "BLOCKCHAIN EXPERTISE", value: "SOLANA NATIVE" },
                { label: "COMMUNITY REACH", value: "100K+" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 border border-[#a3ff12] bg-black bg-opacity-50 hover:shadow-[0_0_10px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(10% 0, 90% 0, 100% 80%, 0% 100%)" }}
                >
                  <div className="text-xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="mt-16 text-center space-y-6 p-8 border-2 border-[#a3ff12] bg-black bg-opacity-50 shadow-[0_0_20px_#a3ff12]">
              <h3 className="text-2xl font-bold gradient-text">OUR MISSION</h3>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                "We believe that AI intellectual property should be as liquid and tradeable as any other digital asset.
                By combining cutting-edge blockchain technology with innovative AI verification protocols, we're
                creating the infrastructure for the next generation of AI innovation and monetization."
              </p>
              <div className="flex justify-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="gradient-text font-bold">PSYCHE WIZARD</div>
                  <div className="text-gray-400 text-xs">AI ARCHITECT</div>
                </div>
                <div className="text-center">
                  <div className="gradient-text font-bold">BRUTAL MINDSET</div>
                  <div className="text-gray-400 text-xs">BLOCKCHAIN STRATEGIST</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. RWA BRIDGE Section */}
        <section id="rwa-bridge" className="mb-24">
          <div className="mb-8">
            <h1 className="gradient-text font-extrabold text-3xl sm:text-4xl md:text-5xl leading-none tracking-tighter">
              RWA BRIDGE
            </h1>
            <div className="w-20 h-[2px] bg-[#a3ff12] mt-4"></div>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {/* Introduction Section */}
            <section className="text-center space-y-6">
              <h2 className="text-3xl font-bold gradient-text">BRIDGING AI INTELLECTUAL PROPERTY TO BLOCKCHAIN</h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                NFTI AI's Real World Asset (RWA) Bridge revolutionizes how AI intellectual property is tokenized,
                traded, and monetized on the Solana blockchain. Transform your AI models, algorithms, and datasets into
                verifiable, tradeable digital assets.
              </p>
            </section>

            {/* How NFTI AI RWA Bridge Works */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold gradient-text text-center">HOW NFTI AI RWA BRIDGE WORKS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "ASSET VERIFICATION",
                    description:
                      "Submit your AI intellectual property with comprehensive documentation, performance metrics, and ownership proof.",
                  },
                  {
                    step: "02",
                    title: "LEGAL COMPLIANCE",
                    description:
                      "Our legal framework ensures your AI assets comply with intellectual property laws and international regulations.",
                  },
                  {
                    step: "03",
                    title: "BLOCKCHAIN MINTING",
                    description:
                      "Your verified AI assets are minted as NFTs on Solana with immutable metadata and provenance tracking.",
                  },
                  {
                    step: "04",
                    title: "GLOBAL TRADING",
                    description:
                      "Trade, license, or fractionalize your AI IP globally with instant settlement and transparent pricing.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.step}
                    className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] text-center space-y-4"
                  >
                    <div className="w-12 h-12 mx-auto bg-[#a3ff12] text-black font-bold text-xl flex items-center justify-center rounded-full">
                      {item.step}
                    </div>
                    <h3 className="gradient-text font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Remove BENEFITS OF AI IP TOKENIZATION Section */}

            {/* Use Cases Section */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold gradient-text text-center">REAL-WORLD USE CASES</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "AI RESEARCH FUNDING",
                    description:
                      "Researchers can tokenize their AI models to raise funding for continued development while retaining ownership and control.",
                    example:
                      "A university research team tokenizes their breakthrough language model, raising $2M for further research while maintaining academic freedom.",
                  },
                  {
                    title: "ENTERPRISE AI LICENSING",
                    description:
                      "Companies can license specific AI capabilities without purchasing entire systems, enabling cost-effective AI adoption.",
                    example:
                      "A startup licenses computer vision algorithms from a tech giant for their autonomous vehicle project, paying only for usage.",
                  },
                  {
                    title: "AI MODEL MARKETPLACE",
                    description:
                      "Create a liquid market for AI models where developers can buy, sell, and trade specialized algorithms and datasets.",
                    example:
                      "A fintech company sells their fraud detection model to multiple banks, generating ongoing revenue through smart contract royalties.",
                  },
                  {
                    title: "COLLABORATIVE AI DEVELOPMENT",
                    description:
                      "Multiple parties can co-own and develop AI systems, with transparent profit-sharing and contribution tracking.",
                    example:
                      "Three AI labs collaborate on a medical diagnosis model, with ownership and profits automatically distributed based on contributions.",
                  },
                ].map((useCase, index) => (
                  <div
                    key={useCase.title}
                    className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] space-y-4"
                  >
                    <h3 className="gradient-text font-bold text-xl">{useCase.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{useCase.description}</p>
                    <div className="p-4 bg-gray-900 border-l-4 border-[#a3ff12]">
                      <p className="text-gray-400 text-xs italic">Example: {useCase.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Architecture */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold gradient-text text-center">TECHNICAL ARCHITECTURE</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    layer: "ASSET LAYER",
                    description:
                      "Physical AI models, algorithms, datasets, and intellectual property stored securely off-chain with cryptographic proofs.",
                    technologies: [
                      "IPFS Storage",
                      "Cryptographic Hashing",
                      "Performance Metrics",
                      "Legal Documentation",
                    ],
                  },
                  {
                    layer: "BRIDGE LAYER",
                    description:
                      "Smart contracts that connect real-world AI assets to blockchain tokens with verification and compliance mechanisms.",
                    technologies: [
                      "Solana Programs",
                      "Oracle Integration",
                      "Verification Protocols",
                      "Compliance Checks",
                    ],
                  },
                  {
                    layer: "TOKEN LAYER",
                    description:
                      "NFT representations of AI assets with metadata, ownership rights, and automated smart contract functionality.",
                    technologies: [
                      "Metaplex Standard",
                      "Royalty Automation",
                      "Fractional Ownership",
                      "Trading Mechanisms",
                    ],
                  },
                ].map((layer, index) => (
                  <div
                    key={layer.layer}
                    className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] space-y-4"
                  >
                    <h3 className="gradient-text font-bold text-xl text-center">{layer.layer}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{layer.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-[#a3ff12] font-semibold text-sm">Key Technologies:</h4>
                      <ul className="space-y-1">
                        {layer.technologies.map((tech, techIndex) => (
                          <li key={techIndex} className="text-gray-400 text-xs flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#a3ff12] rounded-full"></span>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center space-y-6 p-8 border-2 border-[#a3ff12] bg-black bg-opacity-50 shadow-[0_0_20px_#a3ff12]">
              <h2 className="text-2xl font-bold gradient-text">READY TO TOKENIZE YOUR AI INTELLECTUAL PROPERTY?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join the future of AI asset ownership and trading. Transform your AI innovations into liquid, tradeable
                assets on the Solana blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection("tokenize")}
                  className="px-8 py-4 bg-[#a3ff12] text-black font-bold hover:bg-opacity-90 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">START TOKENIZING</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                </button>
                <button
                  onClick={() => scrollToSection("support")}
                  className="px-8 py-4 border-2 border-[#a3ff12] gradient-text font-bold hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all"
                >
                  LEARN MORE
                </button>
              </div>
            </section>
          </div>
        </section>

        {/* 4. MCP PROTOCOL Section */}
        <section id="mcp-protocol" className="mb-24">
          <div className="mb-8">
            <h1 className="gradient-text font-extrabold text-3xl sm:text-4xl md:text-5xl leading-none tracking-tighter">
              MCP PROTOCOL
            </h1>
            <div className="w-20 h-[2px] bg-[#a3ff12] mt-4"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction Section */}
            <section className="text-center space-y-6">
              <h2 className="text-3xl font-bold gradient-text">MODEL CONTEXT PROTOCOL FOR AI VERIFICATION</h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                NFTI AI leverages the Model Context Protocol (MCP) to ensure secure, verifiable, and authenticated AI
                model interactions on the Solana blockchain. MCP provides the foundation for trustless AI asset
                verification and performance validation.
              </p>
            </section>

            {/* What is MCP Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold gradient-text">WHAT IS MODEL CONTEXT PROTOCOL?</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Model Context Protocol (MCP) is a standardized framework that enables AI systems to securely access,
                    verify, and interact with external resources and data sources. In NFTI AI's ecosystem, MCP serves as
                    the verification backbone for:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-[#a3ff12] font-bold">•</span>
                      <span>AI Model Authentication and Integrity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#a3ff12] font-bold">•</span>
                      <span>Performance Metrics Validation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#a3ff12] font-bold">•</span>
                      <span>Training Data Provenance Tracking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#a3ff12] font-bold">•</span>
                      <span>Real-time Model Behavior Monitoring</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#a3ff12] font-bold">•</span>
                      <span>Cross-Platform AI Asset Interoperability</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-8 bg-black border-2 border-[#a3ff12] shadow-[0_0_20px_#a3ff12]">
                <h3 className="gradient-text font-bold text-xl mb-4">MCP INTEGRATION STATUS</h3>
                <div className="space-y-4">
                  {[
                    { feature: "AI Model Verification", status: "ACTIVE", color: "text-green-400" },
                    { feature: "Performance Tracking", status: "ACTIVE", color: "text-green-400" },
                    { feature: "Cross-Chain Bridge", status: "BETA", color: "text-yellow-400" },
                    { feature: "Real-time Monitoring", status: "COMING SOON", color: "text-gray-400" },
                  ].map((item, index) => (
                    <div
                      key={item.feature}
                      className="flex justify-between items-center p-3 border border-[#a3ff12] bg-black bg-opacity-50"
                    >
                      <span className="text-gray-300 text-sm">{item.feature}</span>
                      <span className={`text-xs font-semibold ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Remove HOW MCP ENHANCES AI TOKENIZATION Section */}

            {/* Technical Implementation */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold gradient-text text-center">TECHNICAL IMPLEMENTATION</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "MCP SERVER ARCHITECTURE",
                    description:
                      "Decentralized network of MCP servers that validate AI model integrity and performance across the Solana ecosystem.",
                    features: [
                      "Distributed Validation Network",
                      "Cryptographic Proof Generation",
                      "Real-time Performance Monitoring",
                      "Cross-Platform Compatibility",
                    ],
                  },
                  {
                    title: "SMART CONTRACT INTEGRATION",
                    description:
                      "Native Solana programs that leverage MCP protocols for automated AI asset verification and compliance checking.",
                    features: [
                      "Automated Verification Triggers",
                      "Performance-Based Pricing",
                      "Compliance Enforcement",
                      "Resource Allocation Management",
                    ],
                  },
                ].map((implementation, index) => (
                  <div
                    key={implementation.title}
                    className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] space-y-4"
                  >
                    <h3 className="gradient-text font-bold text-xl">{implementation.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{implementation.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-[#a3ff12] font-semibold text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {implementation.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-gray-400 text-xs flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#a3ff12] rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits for Developers */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold gradient-text text-center">BENEFITS FOR AI DEVELOPERS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "TRUST & TRANSPARENCY",
                    description:
                      "MCP provides verifiable proof of your AI model's capabilities and performance, building trust with potential buyers and investors.",
                    benefits: [
                      "Cryptographic Verification",
                      "Performance Guarantees",
                      "Transparent Metrics",
                      "Audit Trail",
                    ],
                  },
                  {
                    title: "AUTOMATED MONETIZATION",
                    description:
                      "Smart contracts automatically handle licensing, usage tracking, and revenue distribution based on MCP-verified performance metrics.",
                    benefits: [
                      "Usage-Based Pricing",
                      "Automatic Royalties",
                      "Performance Bonuses",
                      "Compliance Monitoring",
                    ],
                  },
                  {
                    title: "GLOBAL ACCESSIBILITY",
                    description:
                      "MCP standardization ensures your AI models can be accessed and verified across different platforms and blockchain networks.",
                    benefits: [
                      "Cross-Platform Support",
                      "Universal Standards",
                      "Global Marketplace",
                      "Seamless Integration",
                    ],
                  },
                  {
                    title: "ENHANCED SECURITY",
                    description:
                      "Built-in security protocols protect your AI intellectual property while enabling secure sharing and collaboration.",
                    benefits: ["IP Protection", "Secure Execution", "Access Control", "Tamper Detection"],
                  },
                ].map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="p-6 bg-black border border-[#a3ff12] hover:shadow-[0_0_15px_#a3ff12] transition-all space-y-4"
                  >
                    <h3 className="gradient-text font-bold text-xl">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {benefit.benefits.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-xs text-gray-400 flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#a3ff12] rounded-full"></span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Future Roadmap */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold gradient-text text-center">MCP DEVELOPMENT ROADMAP</h2>
              <div className="space-y-6">
                {[
                  {
                    phase: "PHASE 1 - FOUNDATION",
                    status: "COMPLETED",
                    timeline: "Q4 2024",
                    features: [
                      "Basic MCP Integration",
                      "AI Model Verification",
                      "Solana Smart Contracts",
                      "Initial Testing",
                    ],
                  },
                  {
                    phase: "PHASE 2 - ENHANCEMENT",
                    status: "IN PROGRESS",
                    timeline: "Q1 2025",
                    features: [
                      "Performance Monitoring",
                      "Cross-Chain Support",
                      "Advanced Analytics",
                      "Developer Tools",
                    ],
                  },
                  {
                    phase: "PHASE 3 - EXPANSION",
                    status: "PLANNED",
                    timeline: "Q2 2025",
                    features: [
                      "Multi-Model Orchestration",
                      "AI Marketplace Integration",
                      "Enterprise Features",
                      "Global Scaling",
                    ],
                  },
                ].map((phase, index) => (
                  <div key={phase.phase} className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12]">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <h3 className="gradient-text font-bold text-xl">{phase.phase}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm">{phase.timeline}</span>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded ${
                            phase.status === "COMPLETED"
                              ? "bg-green-600 text-white"
                              : phase.status === "IN PROGRESS"
                                ? "bg-yellow-600 text-black"
                                : "bg-gray-600 text-white"
                          }`}
                        >
                          {phase.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {phase.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="text-gray-300 text-sm flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#a3ff12] rounded-full"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center space-y-6 p-8 border-2 border-[#a3ff12] bg-black bg-opacity-50 shadow-[0_0_20px_#a3ff12]">
              <h2 className="text-2xl font-bold gradient-text">READY TO LEVERAGE MCP FOR YOUR AI MODELS?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join the next generation of AI development with Model Context Protocol integration. Ensure your AI
                assets are verified, secure, and ready for global tokenization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection("tokenize")}
                  className="px-8 py-4 bg-[#a3ff12] text-black font-bold hover:bg-opacity-90 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">START BUILDING</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                </button>
                <button
                  onClick={() => scrollToSection("support")}
                  className="px-8 py-4 border-2 border-[#a3ff12] gradient-text font-bold hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all"
                >
                  LEARN MORE
                </button>
              </div>
            </section>
          </div>
        </section>

        {/* 5. SUPPORT Section */}
        <section id="support" className="mb-24">
          <div className="mb-8">
            <h1 className="gradient-text font-extrabold text-3xl sm:text-4xl md:text-5xl leading-none tracking-tighter">
              SUPPORT
            </h1>
            <div className="w-20 h-[2px] bg-[#a3ff12] mt-4"></div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold gradient-text mb-4">FREQUENTLY ASKED QUESTIONS</h2>
              <p className="text-gray-400">Find answers to common questions about our platform</p>
            </div>

            <div className="space-y-4 mb-12">
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
                    <h3 className="gradient-text font-semibold text-lg">{faq.question}</h3>
                    <span className="gradient-text text-2xl">{openFaq === index ? "−" : "+"}</span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold gradient-text mb-4">CONTACT SUPPORT</h2>
              <p className="text-gray-400">Can't find what you're looking for? Send us a message</p>
            </div>

            <form className="space-y-6 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block gradient-text font-semibold mb-2">NAME *</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                    style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                  />
                </div>
                <div>
                  <label className="block gradient-text font-semibold mb-2">EMAIL *</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
                    style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block gradient-text font-semibold mb-2">SUBJECT *</label>
                <select
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all"
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
                <label className="block gradient-text font-semibold mb-2">MESSAGE *</label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-black border-2 border-[#a3ff12] gradient-text placeholder-gray-500 focus:outline-none focus:shadow-[0_0_10px_#a3ff12] transition-all resize-none"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { title: "TWITTER", desc: "Follow for updates", action: "FOLLOW US", link: "https://x.com/nfti_ai" },
                { title: "GITHUB", desc: "View our code", action: "FOLLOW US", link: "https://github.com/Axarb/NFTIAI" },
              ].map((contact, index) => (
                <div
                  key={contact.title}
                  className="text-center p-6 border border-[#a3ff12] bg-black bg-opacity-50 hover:shadow-[0_0_15px_#a3ff12] transition-all"
                  style={{ clipPath: "polygon(5% 0, 95% 0, 100% 85%, 0% 100%)" }}
                >
                  <h3 className="gradient-text font-bold text-lg mb-2">{contact.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{contact.desc}</p>
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 border border-[#a3ff12] gradient-text text-sm hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all"
                  >
                    {contact.action}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll indicator - hidden on mobile */}
        <div className="hidden sm:block absolute bottom-12 right-12 w-20 h-20 animate-spin-slow">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#a3ff12] rounded-full"></div>
            </div>
            <svg className="w-full h-full gradient-text" viewBox="0 0 100 100">
              <path
                d="M 50,50 m 0,-45 a 45,45 0 1,1 0,90 a 45,45 0 1,1 0,-90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <text
                x="50"
                y="5"
                textAnchor="middle"
                fill="currentColor"
                fontSize="8"
                fontWeight="bold"
                style={{ transform: "rotate(0deg)", transformOrigin: "center" }}
              >
                SCROLL
              </text>
              <text
                x="50"
                y="95"
                textAnchor="middle"
                fill="currentColor"
                fontSize="8"
                fontWeight="bold"
                style={{ transform: "rotate(180deg)", transformOrigin: "center" }}
              >
                SCROLL
              </text>
            </svg>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 mb-16 pt-8 text-center space-y-2 relative z-20">
          <p className="text-gray-400 text-sm">© 2025 NFTI AI. Virtual IP becomes tokenized.</p>
          <p className="text-gray-400 text-sm">
            Contact us:{" "}
            <a href="mailto:contact@nftiai.io" className="gradient-text hover:text-[#a3ff12] transition-colors">
              contact@selfyai.io
            </a>
          </p>
        </footer>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz4MWgtNHYMWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

      {/* Green glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a3ff12] via-transparent to-transparent opacity-5 pointer-events-none"></div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-[2px] bg-[#a3ff12] opacity-10 scanline"></div>
      </div>
    </div>
  )
}
