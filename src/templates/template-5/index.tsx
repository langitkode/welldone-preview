"use client";
import React, { useState } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  Instagram,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  ArrowRight,
  Minus,
} from "lucide-react";
import { UMKMConfig } from "@/types/config";
import { optimizeHeroImage, optimizeProductImage } from "@/utils/cloudinary";
import { getInstagramImageUrl } from "@/utils/instagram";

export default function Template5({ config }: { config: UMKMConfig }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme Configuration
  const primaryColor = config.theme.primaryColor || "#000000";
  const secondaryColor = config.theme.secondaryColor || "#FFFFFF";

  return (
    <div
      className="min-h-screen bg-white text-black font-sans antialiased"
      style={
        {
          "--primary": primaryColor,
          "--secondary": secondaryColor,
        } as React.CSSProperties
      }
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
        body {
          font-family: "Inter", sans-serif;
        }
        ::selection {
          background-color: var(--primary);
          color: var(--secondary);
        }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-black/5">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
          <a
            href="#home"
            className="text-xl font-light tracking-[0.2em] uppercase"
            style={{ color: "var(--primary)" }}
          >
            {config.businessName}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-12 font-light text-sm tracking-wider uppercase">
            <a
              href="#home"
              className="hover:opacity-50 transition-opacity duration-300"
            >
              Home
            </a>
            <a
              href="#catalog"
              className="hover:opacity-50 transition-opacity duration-300"
            >
              Collection
            </a>
            <a
              href="#about"
              className="hover:opacity-50 transition-opacity duration-300"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:opacity-50 transition-opacity"
            style={{ color: "var(--primary)" }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8">
          {["Home", "Collection", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-3xl font-light tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section id="home" className="pt-32 pb-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="space-y-8 max-w-xl">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-light leading-[1.1] tracking-tight">
                  {config.tagline}
                </h1>
                <div className="w-16 h-[1px] bg-black"></div>
              </div>
              <p className="text-lg font-light text-black/60 leading-relaxed">
                {config.description}
              </p>
              <a
                href="#catalog"
                className="inline-flex items-center gap-3 px-8 py-4 border border-black hover:bg-black hover:text-white transition-all duration-300 font-light tracking-wider uppercase text-sm group"
              >
                Explore Collection
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>

            {/* Right: Hero Image */}
            <div className="relative aspect-[3/4] lg:aspect-square">
              <div className="absolute inset-0 border border-black/10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimizeHeroImage(config.heroImage)}
                alt="Hero"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- CATALOG SECTION --- */}
      <section id="catalog" className="py-24 bg-black/[0.02]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-2">
                Collection
              </h2>
              <div className="w-12 h-[1px] bg-black"></div>
            </div>
            <p className="text-sm font-light tracking-wider uppercase text-black/40">
              {config.products.length} Items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.products.length > 0 ? (
              config.products.slice(0, 3).map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden border border-black/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={optimizeProductImage(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs font-light tracking-widest uppercase text-black/40 mb-1">
                          {product.category}
                        </p>
                        <h3 className="text-lg font-light tracking-tight">
                          {product.name}
                        </h3>
                      </div>
                      {product.link && (
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 border border-black/10 hover:bg-black hover:text-white transition-all duration-300"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    <p className="text-sm font-light text-black/50 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="pt-2 border-t border-black/5">
                      <p className="text-lg font-light tracking-tight">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center border border-dashed border-black/10">
                <p className="text-sm font-light tracking-widest uppercase text-black/30">
                  Collection Coming Soon
                </p>
              </div>
            )}
          </div>

          {config.products.length > 3 && (
            <div className="text-center mt-16">
              <a
                href={`https://wa.me/${config.contact.whatsapp}?text=Halo, saya ingin melihat koleksi lengkap.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-light uppercase tracking-widest hover:opacity-50 transition-opacity"
              >
                View More <ArrowRight size={14} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      {config.testimonials.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="mb-16">
              <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-2">
                Testimonials
              </h2>
              <div className="w-12 h-[1px] bg-black"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {config.testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="border border-black/5 p-8 space-y-6"
                >
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Minus
                        key={i}
                        size={16}
                        className="text-black"
                        strokeWidth={1}
                      />
                    ))}
                  </div>
                  <p className="text-lg font-light leading-relaxed text-black/70">
                    "{testimonial.comment}"
                  </p>
                  <p className="text-sm font-light tracking-wider uppercase text-black/40">
                    {testimonial.customerName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- ABOUT / CONTACT --- */}
      <section id="about" className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-2">
                  Visit Us
                </h2>
                <div className="w-12 h-[1px] bg-white"></div>
              </div>

              <div className="space-y-8 text-white/60 font-light">
                <div className="flex gap-4 items-start">
                  <MapPin size={20} className="mt-1 flex-shrink-0" />
                  <p className="leading-relaxed">{config.contact.address}</p>
                </div>
                {config.contact.openHours && (
                  <div className="flex gap-4 items-start">
                    <Clock size={20} className="mt-1 flex-shrink-0" />
                    <p>{config.contact.openHours}</p>
                  </div>
                )}
                <div className="flex gap-4 items-start">
                  <Phone size={20} className="mt-1 flex-shrink-0" />
                  <p>{config.contact.whatsapp}</p>
                </div>
                {config.contact.instagram && (
                  <div className="flex gap-4 items-start">
                    <Instagram size={20} className="mt-1 flex-shrink-0" />
                    <a
                      href={`https://instagram.com/${config.contact.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      @{config.contact.instagram}
                    </a>
                  </div>
                )}
              </div>

              <a
                href={`https://wa.me/${config.contact.whatsapp}`}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300 font-light tracking-wider uppercase text-sm"
              >
                Contact via WhatsApp
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Right: Instagram Grid */}
            {config.instagramImages && config.instagramImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {config.instagramImages.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square border border-white/10 overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getInstagramImageUrl(img)}
                      alt={`Instagram ${i + 1}`}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-black text-white border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-light tracking-wider uppercase text-white/40">
              {config.footer?.copyrightText ||
                `© ${new Date().getFullYear()} ${
                  config.businessName
                }. All Rights Reserved.`}
            </p>
            <div className="flex gap-8 text-sm font-light tracking-wider uppercase text-white/40">
              <a href="#home" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="#catalog" className="hover:text-white transition-colors">
                Collection
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING CTA --- */}
      <div className="fixed bottom-8 right-8 z-50">
        <a
          href={config.cta?.link || `https://wa.me/${config.contact.whatsapp}`}
          className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-full shadow-2xl hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300"
        >
          <span className="text-xs font-light uppercase tracking-widest">
            {config.cta?.text || "Order"}
          </span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
