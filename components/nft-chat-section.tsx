"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, MessageCircle, AlertCircle, Info, X } from "lucide-react"

interface Message {
  role: "user" | "assistant" | "error" | "demo"
  content: string
  timestamp: Date
}

// Demo responses for AI IP and RWA/MCP topics
const demoResponses = {
  "what is ai ip":
    "AI Intellectual Property (AI IP) refers to the ownership rights of AI models, algorithms, datasets, and related innovations. On NFTI AI, you can tokenize these assets as NFTs, enabling trading, licensing, and fractional ownership of AI technologies.",
  "how do i tokenize ai":
    "To tokenize your AI IP: 1) Prepare your AI model/algorithm documentation, 2) Verify ownership and originality, 3) Upload to our platform with metadata, 4) Set licensing terms and royalties, 5) Mint as an NFT with RWA backing. This creates a tradeable token representing your AI asset.",
  "what is rwa":
    "Real World Assets (RWA) are physical or digital assets that exist outside the blockchain but are represented as tokens. In our context, RWA bridges AI models, patents, and IP rights to blockchain, enabling fractional ownership and global trading of AI technologies.",
  "what is mcp":
    "Model Context Protocol (MCP) is a standardized way for AI systems to securely access and verify external resources. We use MCP to authenticate AI models, verify performance metrics, and ensure the integrity of tokenized AI assets on our platform.",
  "how does rwa bridge work":
    "Our RWA bridge connects real-world AI assets to blockchain through: 1) Asset verification and documentation, 2) Legal framework compliance, 3) Smart contract creation, 4) Token minting with asset backing, 5) Ongoing asset monitoring and updates. This ensures your AI IP maintains real-world value.",
  "ai model nft":
    "AI Model NFTs represent ownership of specific AI models, including their architecture, weights, training data rights, and usage licenses. These NFTs can be traded, licensed, or used as collateral, creating new monetization opportunities for AI developers and researchers.",
  "why choose solana for ai nfts?":
    "Solana offers several advantages for AI NFTs, including its high transaction speed (65,000 TPS), ultra-low fees (typically under $0.01), and environmental efficiency. Its growing NFT ecosystem also provides a vibrant marketplace for AI IP.",
  "how much do solana transactions cost?":
    "Solana transactions typically cost under $0.01, making it an ideal blockchain for frequent trading and fractional ownership of AI NFTs. These ultra-low fees enable more accessible and cost-effective AI IP tokenization.",
  "what wallets work with solana nfts?":
    "Popular Solana wallets like Phantom, Solflare, and Backpack are compatible with AI NFTs on our platform. These wallets provide secure storage and easy access to your tokenized AI assets.",
}

function getDemoResponse(question: string): string {
  const lowerQuestion = question.toLowerCase()

  // Find matching demo response
  for (const [key, response] of Object.entries(demoResponses)) {
    if (lowerQuestion.includes(key.replace(/\s+/g, " "))) {
      return response
    }
  }

  // Default demo response for AI IP context
  return "This is a demo response about AI IP tokenization. NFTI AI specializes in turning AI intellectual property into tradeable NFTs using RWA and MCP technologies. For real AI-powered answers about AI IP tokenization, RWA bridges, and MCP protocols, please configure a valid OpenAI API key."
}

export default function NFTChatSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI IP assistant. Ask me about tokenizing AI models on Solana, RWA bridges, MCP protocols, and turning AI intellectual property into NFTs with ultra-low fees!",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiKeyError, setApiKeyError] = useState<string | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle mobile keyboard visibility
  useEffect(() => {
    if (!isMobile) return

    const handleResize = () => {
      // Scroll to input when keyboard appears
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)
    setApiKeyError(null)

    // Blur input on mobile to hide keyboard after sending
    if (isMobile && inputRef.current) {
      inputRef.current.blur()
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message.content,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsDemoMode(false)
      } else {
        // Handle specific error types
        if (data.errorType === "account_deactivated") {
          setApiKeyError(
            "Your OpenAI account has been deactivated. Please check your email from OpenAI or create a new account.",
          )
          setIsDemoMode(true)
        } else if (data.errorType === "quota_exceeded") {
          setApiKeyError("OpenAI quota exceeded. Please add billing information to your OpenAI account.")
          setIsDemoMode(true)
        } else if (data.errorType === "missing_key" || data.errorType === "invalid_key") {
          setApiKeyError("OpenAI API key required. Please configure your API key in environment variables.")
          setIsDemoMode(true)
        } else {
          setApiKeyError(data.error || "API error occurred.")
          setIsDemoMode(true)
        }

        // Provide demo response
        const demoMessage: Message = {
          role: "demo",
          content: getDemoResponse(currentInput),
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, demoMessage])
      }
    } catch (error) {
      console.error("Chat error:", error)
      setApiKeyError("Network error occurred.")
      setIsDemoMode(true)

      const demoMessage: Message = {
        role: "demo",
        content: getDemoResponse(currentInput),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, demoMessage])
    } finally {
      setIsLoading(false)
      // Re-focus input on mobile after response
      if (isMobile && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 500)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle input focus on mobile
  const handleInputFocus = () => {
    if (isMobile) {
      // Scroll to input area when focused on mobile
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 300)
    }
  }

  const suggestedQuestions = [
    "What is AI IP tokenization?",
    "How do I tokenize my AI model?",
    "What is RWA bridge?",
    "How does MCP protocol work?",
    "Can I license my AI NFT?",
    "What are AI model royalties?",
    "Why choose Solana for AI NFTs?",
    "How much do Solana transactions cost?",
    "What wallets work with Solana NFTs?",
  ]

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question)
    if (inputRef.current) {
      inputRef.current.focus()
      // On mobile, scroll to input after setting question
      if (isMobile) {
        setTimeout(() => {
          inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 100)
      }
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#a3ff12] text-black shadow-[0_0_20px_#a3ff12] hover:shadow-[0_0_30px_#a3ff12] transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle size={24} />
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Section - Only shown when isVisible is true */}
      {isVisible && (
        <section className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-black border-2 border-[#a3ff12] shadow-[0_0_30px_#a3ff12] rounded-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-[#a3ff12] text-black p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <MessageCircle size={16} className="text-[#a3ff12]" />
                </div>
                <div>
                  <h2 className="font-bold text-sm">AI IP ASSISTANT</h2>
                  <p className="text-xs opacity-80">
                    {isDemoMode
                      ? "Demo Mode - Get expert answers about AI IP"
                      : "Get expert answers about AI IP tokenization"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="hover:bg-black hover:bg-opacity-10 p-1 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Rest of the chat section content */}
          <div className="p-4">
            {/* API Key Error Warning */}
            {apiKeyError && (
              <div className="mb-4 p-3 bg-red-900 border-2 border-red-500 text-red-100 rounded text-xs">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p>{apiKeyError}</p>
                    <p className="mt-1">
                      <strong>Demo mode is active.</strong> Configure OpenAI API for AI-powered answers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="bg-gray-900 border-2 border-gray-700 h-[300px] overflow-y-auto p-3 mb-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {(message.role === "assistant" || message.role === "error" || message.role === "demo") && (
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "error"
                            ? "bg-red-500"
                            : message.role === "demo"
                              ? "bg-yellow-500"
                              : "bg-[#a3ff12]"
                        }`}
                      >
                        {message.role === "error" ? (
                          <AlertCircle size={isMobile ? 16 : 20} className="text-white" />
                        ) : message.role === "demo" ? (
                          <Info size={isMobile ? 16 : 20} className="text-black" />
                        ) : (
                          <Bot size={isMobile ? 16 : 20} className="text-black" />
                        )}
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-3 text-xs ${
                        message.role === "user"
                          ? "bg-[#a3ff12] text-black"
                          : message.role === "error"
                            ? "bg-red-900 text-red-100 border border-red-500"
                            : message.role === "demo"
                              ? "bg-yellow-900 text-yellow-100 border border-yellow-500"
                              : "bg-gray-800 text-gray-100 border border-gray-600"
                      }`}
                      style={{
                        clipPath:
                          message.role === "user"
                            ? "polygon(5% 0, 100% 0, 95% 100%, 0% 100%)"
                            : "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                      }}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      {message.role === "demo" && (
                        <p className="text-xs opacity-80 mt-2 italic">
                          💡 This is a demo response about AI IP. Configure OpenAI API for AI-powered answers.
                        </p>
                      )}
                      <p className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                        <User size={isMobile ? 16 : 20} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#a3ff12] flex items-center justify-center flex-shrink-0">
                      <Bot size={isMobile ? 16 : 20} className="text-black" />
                    </div>
                    <div
                      className="bg-gray-800 text-gray-100 border border-gray-600 p-3"
                      style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                    >
                      <div className="flex items-center gap-2">
                        <Loader2 size={isMobile ? 16 : 20} className="animate-spin text-[#a3ff12]" />
                        <span className="text-xs">
                          {isDemoMode ? "Preparing AI IP demo response..." : "AI is analyzing your AI IP question..."}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-black border-2 border-[#a3ff12] p-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={handleInputFocus}
                  placeholder="Ask about AI IP..."
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 text-white text-sm rounded focus:outline-none focus:border-[#a3ff12] transition-colors"
                  disabled={isLoading}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-3 py-2 bg-[#a3ff12] text-black rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
