import { Link } from "react-router";
import { Button } from "./ui/button";
import { ChevronDown, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import rinLogo from "figma:asset/efeb7d0bd887f5db29735459340366b37c9a8673.png";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#0F3D2E]/10 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src={rinLogo} 
            alt="RIN Logo" 
            className="w-12 h-12 object-contain"
          />
          <span className="text-xl font-semibold text-[#0F3D2E]">Rural Intelligence Network</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a href="/#about" className="text-[#1E1E1E] hover:text-[#1FAF6A] transition-colors">
            {t('nav.about')}
          </a>
          <a href="/#modules" className="text-[#1E1E1E] hover:text-[#1FAF6A] transition-colors">
            {t('nav.modules')}
          </a>
          <a href="/#impact" className="text-[#1E1E1E] hover:text-[#1FAF6A] transition-colors">
            {t('nav.impact')}
          </a>
          
          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowProductsDropdown(true)}
            onMouseLeave={() => setShowProductsDropdown(false)}
          >
            <button className="flex items-center gap-1 text-[#1E1E1E] hover:text-[#1FAF6A] transition-colors">
              {t('nav.products')}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showProductsDropdown && (
              <div className="absolute top-full left-0 pt-2">
                <div className="w-64 bg-white rounded-lg shadow-lg border border-[#0F3D2E]/10 py-2">
                  <Link 
                    to="/product-generator" 
                    className="block px-4 py-3 text-[#1E1E1E] hover:bg-[#F5F1E8] transition-colors"
                    onClick={() => setShowProductsDropdown(false)}
                  >
                    {t('nav.products.generator')}
                  </Link>
                  <Link 
                    to="/marketplace" 
                    className="block px-4 py-3 text-[#1E1E1E] hover:bg-[#F5F1E8] transition-colors"
                    onClick={() => setShowProductsDropdown(false)}
                  >
                    {t('nav.products.marketplace')}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-[#F5F1E8] rounded-lg p-1">
            <button
              onClick={() => setLanguage('id')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                language === 'id' 
                  ? 'bg-white text-[#0F3D2E] shadow-sm' 
                  : 'text-[#5a5a5a] hover:text-[#0F3D2E]'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                language === 'en' 
                  ? 'bg-white text-[#0F3D2E] shadow-sm' 
                  : 'text-[#5a5a5a] hover:text-[#0F3D2E]'
              }`}
            >
              EN
            </button>
          </div>

          <Button asChild className="bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white hover:opacity-90">
            <Link to="/my-profile">
              {t('nav.myProfile')}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}