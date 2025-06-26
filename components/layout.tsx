"use client"

import type React from "react"

import Link from "next/link"
import { useEffect, useState } from "react"

interface LayoutProps {
  children: React.ReactNode
  title: string
}

export default function Layout({ children, title }: LayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] relative overflow-hidden">
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
          <Link
            href="/"
            className={`flex items-center transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
          >
            <div className="w-6 h-6 rounded-full bg-[#a3ff12] flex items-center justify-center mr-2 animate-pulse">
              <div className="w-4 h-4 rounded-full border-2 border-black"></div>
            </div>
            <span className="text-[#a3ff12] font-bold relative">
              NFTI AI
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#a3ff12]"></span>
            </span>
          </Link>

          <nav
            className={`transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}
          >
            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center px-3 py-2 border border-[#a3ff12] text-[#a3ff12]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="text-xs">MENU</span>
            </button>

            {/* Desktop navigation */}
            <ul className="hidden md:flex space-x-1">
              {[
                { name: "AI IP MARKETPLACE", href: "/explore" },
                { name: "TOKENIZE AI", href: "/create" },
                { name: "RWA BRIDGE", href: "/marketplace" },
                { name: "MCP PROTOCOL", href: "/about" },
                { name: "SUPPORT", href: "/support" },
              ].map((item, index) => (
                <li
                  key={item.name}
                  className="transition-all duration-500"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={item.href}
                    className="px-2 py-1 text-xs bg-[#a3ff12] text-black font-semibold hover:bg-opacity-90 transition-all relative overflow-hidden group"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
                    }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile navigation menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-black border-2 border-[#a3ff12] mt-2 z-50">
                <ul className="flex flex-col">
                  {[
                    { name: "AI IP MARKETPLACE", href: "/explore" },
                    { name: "TOKENIZE AI", href: "/create" },
                    { name: "RWA BRIDGE", href: "/marketplace" },
                    { name: "MCP PROTOCOL", href: "/about" },
                    { name: "SUPPORT", href: "/support" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-[#a3ff12] border-b border-gray-700 hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </header>

        {/* Page Title */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}
        >
          <h1 className="text-[#a3ff12] font-extrabold text-3xl sm:text-4xl md:text-5xl leading-none tracking-tighter">
            {title}
          </h1>
          <div className="w-20 h-[2px] bg-[#a3ff12] mt-4"></div>
        </div>

        {/* Page Content */}
        <main
          className={`transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          {children}
        </main>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#a3ff12] via-transparent to-transparent opacity-5 pointer-events-none"></div>
    </div>
  )
}
