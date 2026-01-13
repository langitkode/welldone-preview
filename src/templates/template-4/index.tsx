"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  Instagram,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";
import { getInstagramImageUrl } from "@/utils/instagram";
import { optimizeHeroImage, optimizeProductImage } from "@/utils/cloudinary";
import { UMKMConfig } from "@/types/config";

export default function Template4({ config }: { config: UMKMConfig }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const primaryColor = config.theme.primaryColor || "#FFD700";
  const secondaryColor = config.theme.secondaryColor || "#000000";

  return (
    <div
      className="min-h-screen bg-zinc-900 text-white font-body overflow-x-hidden"
      style={
        {
          "--primary": primaryColor,
          "--secondary": secondaryColor,
        } as React.CSSProperties
      }
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Outfit:wght@300;400;700&family=Permanent+Marker&display=swap");
        .font-heading {
          font-family: "Oswald", sans-serif;
        }
        .font-body {
          font-family: "Outfit", sans-serif;
        }
        .font-graffiti {
          font-family: "Permanent Marker", cursive;
        }
        ::selection {
          background-color: var(--primary);
          color: black;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* --- FLOATING CTA --- */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={config.cta?.link || `https://wa.me/${config.contact.whatsapp}`}
          style={{ backgroundColor: "var(--primary)" }}
          className="flex items-center gap-2 text-black px-6 py-4 font-heading font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_white]"
        >
          {config.cta?.text || "Order Now"}
        </a>
      </div>

      {/* --- NAVBAR --- */}
      <nav
        style={{ borderBottomColor: "var(--primary)" }}
        className="fixed top-0 left-0 w-full z-50 bg-zinc-900/90 backdrop-blur-sm border-b-4"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a
            href="#"
            style={{ color: "var(--primary)" }}
            className="text-3xl md:text-4xl font-heading transform -rotate-1 hover:rotate-0 transition-transform duration-300 font-bold uppercase tracking-wider"
          >
            {config.businessName}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Catalog", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-bold uppercase tracking-wider hover:text-[var(--primary)] hover:underline decoration-4 decoration-[var(--primary)] underline-offset-4 transition-all"
              >
                {item}
              </a>
            ))}
            <a
              href={
                config.cta?.link || `https://wa.me/${config.contact.whatsapp}`
              }
              style={{ backgroundColor: "var(--primary)" }}
              className="text-black px-6 py-2 font-heading font-bold uppercase transform skew-x-[-10deg] hover:skew-x-0 transition-transform tracking-wider"
            >
              {config.cta?.text || "Order Now"}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            style={{ color: "var(--primary)" }}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-900 flex flex-col items-center justify-center gap-8 p-8">
          {["Home", "Catalog", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-4xl font-heading font-bold uppercase text-white hover:text-[var(--primary)]"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href={`https://wa.me/${config.contact.whatsapp}`}
            style={{ backgroundColor: "var(--primary)" }}
            className="text-2xl font-heading font-bold text-black px-8 py-4 uppercase"
            onClick={() => setIsMenuOpen(false)}
          >
            Order Now
          </a>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={optimizeHeroImage(config.heroImage)}
            alt="Hero Background"
            className="w-full h-full object-cover filter brightness-[0.3] contrast-125"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wall-4-light.png')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div
            style={{ backgroundColor: "var(--primary)" }}
            className="inline-block text-black font-bold px-4 py-1 mb-6 transform -rotate-2"
          >
            EST. {new Date().getFullYear()} // AUTHENTIC STREETWEAR
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 leading-none uppercase tracking-tighter">
            {config.tagline.split(" ")[0]}{" "}
            <span
              style={
                {
                  backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                } as React.CSSProperties
              }
              className="block"
            >
              {config.tagline.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
            {config.description}
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a
              href="#catalog"
              className="group relative bg-white text-black px-8 py-4 font-heading font-bold uppercase tracking-widest overflow-hidden hover:text-[var(--primary)] transition-colors"
            >
              <span className="relative z-10 flex items-center gap-2">
                Browse Collection{" "}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </a>
          </div>
        </div>
      </section>

      {/* --- CATALOG SECTION --- */}
      <section id="catalog" className="py-20 bg-zinc-900 relative">
        <div className="container mx-auto px-4">
          <div
            style={{ borderBottomColor: "var(--primary)" }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 pb-4"
          >
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase">
              Latest <span style={{ color: "var(--primary)" }}>Heat</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest mb-2 md:mb-0">
              /// Limited Stock Only
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {config.products.length > 0 ? (
              config.products.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  style={
                    {
                      "--ring-color": primaryColor,
                    } as React.CSSProperties
                  }
                  className="group relative bg-zinc-800 border-4 border-transparent hover:border-[var(--primary)] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--primary)]"
                >
                  <div className="relative h-80 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={optimizeProductImage(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div
                      style={{ backgroundColor: "var(--primary)" }}
                      className="absolute top-4 left-4 text-black font-black px-3 py-1 uppercase transform -rotate-3 text-sm"
                    >
                      {product.category}
                    </div>
                  </div>

                  <div className="p-6 relative">
                    <h3 className="text-2xl font-heading font-bold uppercase mb-2 line-clamp-1 tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mt-6">
                      <span
                        style={{ color: "var(--primary)" }}
                        className="font-bold text-xl font-mono"
                      >
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                      {product.link ? (
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-white text-black p-3 hover:bg-[var(--primary)] transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      ) : (
                        <button className="bg-white text-black p-3 hover:bg-[var(--primary)] transition-colors">
                          <ShoppingBag size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{ borderColor: "var(--primary)" }}
                className="col-span-full py-20 text-center text-gray-500 font-heading font-bold uppercase tracking-widest border-4 border-dashed"
              >
                Drop Coming Soon
              </div>
            )}
          </div>

          {config.products.length > 3 && (
            <div className="text-center mt-16">
              <a
                href={`https://wa.me/${config.contact.whatsapp}?text=Halo, saya ingin melihat koleksi lengkapnya.`}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: primaryColor }}
                className="inline-block text-black font-heading font-bold uppercase px-8 py-3 transform -skew-x-12 hover:skew-x-0 transition-transform"
              >
                View Full Collection
              </a>
            </div>
          )}
        </div>
      </section>

      {/* --- INFO / ABOUT SECTION --- */}
      <section
        id="about"
        style={{ backgroundColor: primaryColor }}
        className="py-20 text-black pattern-dots"
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-black p-8 md:p-12 text-white shadow-[12px_12px_0px_0px_#fff]">
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-8">
              Visit The <span style={{ color: "var(--primary)" }}>Base</span>
            </h2>
            <div className="space-y-6 text-lg font-medium">
              <div className="flex items-start gap-4">
                <MapPin
                  style={{ color: "var(--primary)" }}
                  className="mt-1"
                  size={24}
                />
                <p>{config.contact.address}</p>
              </div>
              <div className="flex items-start gap-4">
                <Clock
                  style={{ color: "var(--primary)" }}
                  className="mt-1"
                  size={24}
                />
                <p>{config.contact.openHours}</p>
              </div>
              <div className="flex items-start gap-4">
                <Phone
                  style={{ color: "var(--primary)" }}
                  className="mt-1"
                  size={24}
                />
                <p>{config.contact.whatsapp}</p>
              </div>
            </div>
            <div className="mt-10">
              <a
                href={config.contact.gmapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: "var(--primary)" }}
                className="inline-block text-black font-black uppercase px-8 py-3 hover:bg-white transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              {config.instagramImages?.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="aspect-square bg-zinc-800 border-4 border-black overflow-hidden relative group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getInstagramImageUrl(img)}
                    alt="IG"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={`https://instagram.com/${config.contact.instagram}`}
                className="inline-flex items-center gap-2 text-2xl font-heading font-bold uppercase border-b-4 border-black pb-1 hover:text-white hover:border-white transition-colors"
              >
                <Instagram size={28} /> @{config.contact.instagram}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Graffiti Wall) --- */}
      {config.testimonials.length > 0 && (
        <section className="py-20 bg-zinc-900 border-t border-zinc-800">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-4xl font-heading font-bold text-white mb-16 uppercase">
              Street{" "}
              <span
                style={{ color: "var(--primary)" }}
                className="font-graffiti normal-case text-5xl"
              >
                Cred
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {config.testimonials.map((t) => (
                <div
                  key={t.id}
                  style={{ borderLeftColor: "var(--primary)" }}
                  className="bg-zinc-800 p-8 rounded-tr-3xl rounded-bl-3xl border-l-4 relative"
                >
                  <span className="absolute top-4 right-4 text-6xl text-zinc-700 font-serif leading-none opacity-50">
                    &quot;
                  </span>
                  <p className="text-xl italic text-gray-300 mb-6">
                    {t.comment}
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      style={{ backgroundColor: "var(--primary)" }}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-black"
                    >
                      {t.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white uppercase">
                        {t.customerName}
                      </p>
                      <div
                        style={{ color: "var(--primary)" }}
                        className="flex text-xs"
                      >
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FOOTER --- */}
      <footer
        style={{ borderTopColor: "var(--primary)" }}
        className="bg-black py-12 border-t-8"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-8xl font-heading font-bold text-zinc-800 mb-8 select-none uppercase tracking-tighter">
            {config.businessName}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-gray-400 font-heading font-bold uppercase tracking-widest text-sm mb-12">
            <a href="#home" className="hover:text-[var(--primary)]">
              HOME
            </a>
            <a href="#catalog" className="hover:text-[var(--primary)]">
              CATALOG
            </a>
            <a href="#about" className="hover:text-[var(--primary)]">
              LOCATION
            </a>
            <a
              href={`https://wa.me/${config.contact.whatsapp}`}
              className="hover:text-[var(--primary)]"
            >
              CONTACT
            </a>
          </div>
          <p className="text-zinc-600 text-xs uppercase tracking-widest">
            {config.footer?.copyrightText ||
              `© ${config.businessName.toUpperCase()}. ALL RIGHTS RESERVED.`}
          </p>
        </div>
      </footer>
    </div>
  );
}
