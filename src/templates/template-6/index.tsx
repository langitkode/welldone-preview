"use client";
import React from "react";
import { ShoppingBag, Phone, MapPin, Clock, Star } from "lucide-react";
import { UMKMConfig } from "@/types/config";
import { optimizeHeroImage, optimizeProductImage } from "@/utils/cloudinary";
import { getInstagramImageUrl } from "@/utils/instagram";

export default function StreetPop({ config }: { config: UMKMConfig }) {
  const primary = config.theme.primaryColor || "#EF4444";
  const secondary = config.theme.secondaryColor || "#111827";

  return (
    <div
      className="min-h-screen font-sans bg-zinc-100"
      style={
        {
          "--primary": primary,
          "--secondary": secondary,
        } as React.CSSProperties
      }
    >
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4"
        style={{ borderColor: "var(--primary)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <div
            className="text-2xl font-black uppercase tracking-tight"
            style={{ color: "var(--secondary)" }}
          >
            {config.businessName}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 text-sm font-black uppercase">
            <a href="#home" className="hover:opacity-70">
              Home
            </a>
            <a href="#menu" className="hover:opacity-70">
              Menu
            </a>
            <a href="#contact" className="hover:opacity-70">
              Contact
            </a>
          </div>

          {/* CTA */}
          <a
            href={
              config.cta?.link || `https://wa.me/${config.contact.whatsapp}`
            }
            className="px-6 py-3 text-sm font-black rounded-full text-white shadow-lg hover:scale-105 transition"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {config.cta?.text || "Order"}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden">
        <img
          src={optimizeHeroImage(config.heroImage)}
          className="absolute inset-0 w-full h-full object-cover"
          alt="hero"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight">
            {config.tagline}
          </h1>
          <p className="mt-6 text-lg text-zinc-200">{config.description}</p>
          <a
            href={
              config.cta?.link || `https://wa.me/${config.contact.whatsapp}`
            }
            className="inline-block mt-8 px-10 py-4 text-lg font-black rounded-full text-black"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {config.cta?.text || "Order Sekarang"}
          </a>
        </div>
      </section>

      {/* PRODUCT LIST */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black uppercase mb-12 text-center">
          Menu Favorit
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {config.products.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-[1.02] transition"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={optimizeProductImage(p.image)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs uppercase font-bold text-zinc-400">
                  {p.category}
                </span>
                <h3 className="text-2xl font-black mt-1">{p.name}</h3>
                <p className="text-zinc-500 text-sm mt-2 line-clamp-2">
                  {p.description}
                </p>

                <div className="flex items-center justify-between mt-6">
                  <span
                    className="text-xl font-black"
                    style={{ color: "var(--primary)" }}
                  >
                    Rp {p.price.toLocaleString("id-ID")}
                  </span>
                  <a
                    href={p.link}
                    className="p-4 rounded-full text-white"
                    style={{ backgroundColor: "var(--secondary)" }}
                  >
                    <ShoppingBag />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      {config.testimonials.length > 0 && (
        <section className="py-20 bg-black text-white">
          <h2 className="text-4xl font-black text-center uppercase mb-12">
            Kata Mereka
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
            {config.testimonials.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800"
              >
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-zinc-300 italic">“{t.comment}”</p>
                <p className="mt-4 font-bold">{t.customerName}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INSTAGRAM GALLERY (NEW for Standardization) */}
      {config.instagramImages && config.instagramImages.length > 0 && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-12 text-center">
            Galeri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {config.instagramImages.map((img, i) => (
              <a
                href={img}
                target="_blank"
                rel="noreferrer"
                key={i}
                className="aspect-square bg-zinc-200 overflow-hidden rounded-xl"
              >
                {/* Simplified image for now - in real implementation use proper loader */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getInstagramImageUrl(img)}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  alt="IG"
                />
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href={
                config.contact.instagram
                  ? `https://instagram.com/${config.contact.instagram}`
                  : "#"
              }
              className="inline-block px-8 py-3 rounded-full font-black text-white hover:opacity-80 transition"
              style={{ backgroundColor: "var(--secondary)" }}
            >
              Follow Instagram
            </a>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section
        className="py-20 px-6 text-white"
        style={{ backgroundColor: "var(--primary)" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center font-bold">
          <div className="flex flex-col items-center gap-4">
            <MapPin />
            <p>{config.contact.address}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Clock />
            <p>{config.contact.openHours}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Phone />
            <p>{config.contact.whatsapp}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-black text-center text-zinc-400 text-xs uppercase tracking-widest">
        {config.footer?.copyrightText}
      </footer>

      {/* FLOATING CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={config.cta?.link || `https://wa.me/${config.contact.whatsapp}`}
          className="flex items-center justify-center w-16 h-16 rounded-full text-white shadow-2xl hover:scale-110 transition"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
}
