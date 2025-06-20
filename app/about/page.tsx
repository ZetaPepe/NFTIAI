"use client"

import Layout from "../../components/layout"

export default function AboutPage() {
  return (
    <Layout title="ABOUT US">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Mission Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-[#a3ff12]">OUR MISSION</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Democratizing digital art ownership through Solana blockchain technology, creating a decentralized
              ecosystem where creators and collectors thrive with lightning-fast transactions and minimal fees.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#a3ff12]">THE STORY</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded in 2023, NFTCONNECT emerged from a vision to bridge the gap between traditional art and the
                digital frontier. Our team of blockchain enthusiasts, artists, and technologists came together with a
                shared belief: every creator deserves ownership and fair compensation for their work.
              </p>
              <p>
                We chose Solana for its incredible speed, low costs, and environmental efficiency, making NFT creation
                and trading accessible to everyone.
              </p>
            </div>
          </div>
          <div
            className="h-64 bg-gradient-to-br from-[#a3ff12] to-transparent opacity-20 border-2 border-[#a3ff12]"
            style={{ clipPath: "polygon(0 0, 90% 0, 100% 80%, 10% 100%)" }}
          ></div>
        </section>

        {/* Values Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-[#a3ff12] text-center">OUR VALUES</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "TRANSPARENCY",
                description:
                  "Every transaction is recorded on the blockchain, ensuring complete transparency and trust in our ecosystem.",
              },
              {
                title: "INNOVATION",
                description:
                  "We continuously push the boundaries of what's possible in the NFT space, pioneering new features and experiences.",
              },
              {
                title: "COMMUNITY",
                description:
                  "Our platform is built by and for the community, with creators and collectors at the heart of every decision.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="p-6 bg-black border-2 border-[#a3ff12] shadow-[0_0_10px_#a3ff12] text-center space-y-4"
                style={{ clipPath: "polygon(5% 0, 95% 0, 100% 85%, 0% 100%)" }}
              >
                <h3 className="text-[#a3ff12] font-bold text-xl">{value.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-[#a3ff12] text-center">CORE TEAM</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                name: "Alex Chen",
                role: "CEO & Co-Founder",
                bio: "Blockchain architect with 8+ years in decentralized systems. Previously led engineering at major DeFi protocols.",
              },
              {
                name: "Maya Rodriguez",
                role: "CTO & Co-Founder",
                bio: "Full-stack developer and digital artist. Passionate about merging technology with creative expression.",
              },
              {
                name: "Jordan Kim",
                role: "Head of Community",
                bio: "Community builder and NFT collector. Dedicated to fostering meaningful connections between creators and collectors.",
              },
            ].map((member, index) => (
              <div
                key={member.name}
                className="p-6 bg-black border border-[#a3ff12] hover:shadow-[0_0_15px_#a3ff12] transition-all space-y-4"
                style={{ clipPath: "polygon(0 0, 95% 0, 100% 90%, 5% 100%)" }}
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#a3ff12] to-transparent border-2 border-[#a3ff12] rounded-full"></div>
                <div className="text-center">
                  <h3 className="text-[#a3ff12] font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-[#a3ff12] text-center">BY THE NUMBERS</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { number: "50K+", label: "NFTS CREATED" },
              { number: "15K+", label: "ACTIVE CREATORS" },
              { number: "100K+", label: "COMMUNITY MEMBERS" },
              { number: "2M+", label: "SOL TRADED" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 border-2 border-[#a3ff12] bg-black bg-opacity-50"
                style={{ clipPath: "polygon(10% 0, 90% 0, 100% 80%, 0% 100%)" }}
              >
                <div className="text-3xl font-bold text-[#a3ff12] mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center space-y-6 p-8 border border-[#a3ff12] bg-black bg-opacity-50">
          <h2 className="text-2xl font-bold text-[#a3ff12]">GET IN TOUCH</h2>
          <p className="text-gray-300">Have questions or want to partner with us? We'd love to hear from you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-6 py-3 bg-[#a3ff12] text-black font-semibold hover:bg-opacity-90 transition-all"
              style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
            >
              CONTACT US
            </button>
            <button
              className="px-6 py-3 border border-[#a3ff12] text-[#a3ff12] font-semibold hover:bg-[#a3ff12] hover:bg-opacity-10 transition-all"
              style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0% 100%)" }}
            >
              JOIN DISCORD
            </button>
          </div>
        </section>
      </div>
    </Layout>
  )
}
