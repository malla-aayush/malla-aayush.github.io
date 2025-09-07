"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface MobileNavigationProps {
  activeSection: string;
  sections: string[];
  onNavigate: (section: string) => void;
}

export default function MobileNavigation({ activeSection, sections, onNavigate }: MobileNavigationProps) {
  const currentIndex = sections.indexOf(activeSection)
  const isFirstSection = currentIndex === 0
  const isLastSection = currentIndex === sections.length - 1
  const showUpArrow = !isFirstSection
  const showDownArrow = (!isLastSection && activeSection !== "home") || activeSection === "contact"

  return (
    <>
      {/* Up Arrow */}
      {showUpArrow && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              if (currentIndex > 0) {
                onNavigate(sections[currentIndex - 1])
              }
            }}
            className="text-gray-400/90 hover:text-cyan-400 transition-colors duration-300"
            aria-label="Previous section"
          >
            <ChevronUp className="w-8 h-8" strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* Down Arrow */}
      {showDownArrow && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              if (activeSection === "contact") {
                onNavigate("home")
              } else if (currentIndex < sections.length - 1) {
                onNavigate(sections[currentIndex + 1])
              }
            }}
            className="text-gray-400/90 hover:text-cyan-400 transition-colors duration-300"
            aria-label="Next section"
          >
            <ChevronDown className="w-8 h-8" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </>
  );
}