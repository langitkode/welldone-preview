"use client";

import React, { useState } from "react";
import { UMKMConfig } from "@/types/config";
import { Monitor, Smartphone } from "lucide-react";

// Dynamic Imports based on generated site content
import template4 from "@/templates/template-4";
import template5 from "@/templates/template-5";
import template6 from "@/templates/template-6";

interface PreviewWrapperProps {
  config: UMKMConfig;
}

const templates: Record<string, React.ComponentType<{ config: UMKMConfig }>> = {
  "template-4": template4,
  "template-5": template5,
  "template-6": template6,
};

export default function PreviewWrapper({ config }: PreviewWrapperProps) {
  const [activeTemplate, setActiveTemplate] = useState<string>(
    config.templateId || "template-6"
  );
  
  const [isOpen, setIsOpen] = useState(false);

  // Available templates from config or fallback to just the active one
  const availableTemplates = Object.keys(templates);

  const CurrentTemplate = templates[activeTemplate] || templates["template-6"] || Object.values(templates)[0];

  const activeConfig = {
    ...config,
    templateId: activeTemplate as UMKMConfig["templateId"],
  };

  return (
    <>
      <div className="w-full relative min-h-screen bg-gray-50">
        <CurrentTemplate config={activeConfig} />
      </div>

      {/* Floating Preview Switcher */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-4">
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 flex flex-col gap-2 min-w-[200px] animate-fade-in-up mb-2">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-2">
              Select Template
            </h3>
            {availableTemplates.map((tempId) => (
              <button
                key={tempId}
                onClick={() => {
                  setActiveTemplate(tempId);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTemplate === tempId
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tempId.replace("template-", "Template ")}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-4 ${
            isOpen
              ? "bg-white text-black border-black rotate-90"
              : "bg-black text-white border-transparent"
          }`}
        >
          {isOpen ? <Smartphone size={24} /> : <Monitor size={24} />}
        </button>
      </div>
    </>
  );
}
