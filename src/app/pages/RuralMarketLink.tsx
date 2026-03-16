import { useState } from "react";
import { motion } from "motion/react";
import { 
  Search,
  MapPin,
  Package,
  CheckCircle,
  MessageCircle,
  Filter,
  Star,
  X
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { MobileNav } from "../components/MobileNav";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { SellerContactDialog } from "../components/SellerContactDialog";
import { useLanguage } from "../contexts/LanguageContext";
import { indonesianProvinces } from "../data/provinces";

const cornImage = "https://images.unsplash.com/photo-1598533639123-ab55777ef8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwc25hY2slMjBwcm9kdWN0fGVufDF8fHx8MTc3MTU4NDYxN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const moringaImage = "https://images.unsplash.com/photo-1671778440118-4bc5eced58e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JpbmdhJTIwdGVhJTIwbGVhdmVzfGVufDF8fHx8MTc3MTU4NDYxOHww&ixlib=rb-4.1.0&q=80&w=1080";
const cocoaImage = "https://images.unsplash.com/photo-1634303316622-33b4d64f1f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NvYSUyMGJlYW5zJTIwY2hvY29sYXRlfGVufDF8fHx8MTc3MTU4NDYxOHww&ixlib=rb-4.1.0&q=80&w=1080";
const seaweedImage = "https://images.unsplash.com/photo-1547514714-6a26e50ab07d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWF3ZWVkJTIwb2NlYW58ZW58MXx8fHwxNzcxNTg0NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080";
const coffeeImage = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHBsYW50fGVufDF8fHx8MTc3MTU4NDYxOHww&ixlib=rb-4.1.0&q=80&w=1080";
const cassavaImage = "https://images.unsplash.com/photo-1588566565463-180a5b2090d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwcm9vdHxlbnwxfHx8fDE3NzE1ODQ2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const equipmentImage = "https://images.unsplash.com/photo-1768737180431-9b986c7dd1e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZm9vZCUyMHByb2Nlc3NpbmclMjBlcXVpcG1lbnQlMjBtYWNoaW5lfGVufDF8fHx8MTc3MTU5Mjg0OHww&ixlib=rb-4.1.0&q=80&w=1080";
const packagingImage = "https://images.unsplash.com/photo-1629227071576-e91767cc3024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBtYXRlcmlhbHMlMjBmb2lsJTIwcG91Y2glMjBib3R0bGVzfGVufDF8fHx8MTc3MTU5Mjg0OXww&ixlib=rb-4.1.0&q=80&w=1080";

const products = [
  {
    id: 1,
    name: "Premium Roasted Corn Snack",
    village: "Desa Makmur",
    province: "Maluku",
    commodity: "Corn",
    image: cornImage,
    capacity: "500 kg/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 45,000/kg",
    certified: true,
    rating: 4.8,
    description: "Artisanal roasted corn with sea salt and herbs. Organic certified."
  },
  {
    id: 2,
    name: "Organic Moringa Tea Blend",
    village: "Kampung Sejahtera",
    province: "Nusa Tenggara Timur",
    commodity: "Moringa",
    image: moringaImage,
    capacity: "200 kg/month",
    stock: "Available",
    isHighStock: false,
    price: "Rp 120,000/kg",
    certified: true,
    rating: 4.9,
    description: "Premium moringa tea with traditional herbal blend. Caffeine-free wellness tea."
  },
  {
    id: 3,
    name: "Artisan Cocoa Powder",
    village: "Desa Harapan",
    province: "Papua",
    commodity: "Cocoa",
    image: cocoaImage,
    capacity: "300 kg/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 85,000/kg",
    certified: true,
    rating: 4.7,
    description: "Single-origin cocoa powder. Rich flavor profile perfect for premium chocolates."
  },
  {
    id: 4,
    name: "Organic Corn Flour",
    village: "Desa Berkah",
    province: "Maluku",
    commodity: "Corn",
    image: cornImage,
    capacity: "1 ton/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 18,000/kg",
    certified: true,
    rating: 4.6,
    description: "Fine-grade corn flour for bakeries. Consistent quality, bulk available."
  },
  {
    id: 5,
    name: "Moringa Powder (Bulk)",
    village: "Kampung Maju",
    province: "Nusa Tenggara Barat",
    commodity: "Moringa",
    image: moringaImage,
    capacity: "150 kg/month",
    stock: "Low Stock",
    isHighStock: false,
    price: "Rp 95,000/kg",
    certified: false,
    rating: 4.5,
    description: "Fresh moringa leaf powder. High nutritional value for supplement industry."
  },
  {
    id: 6,
    name: "Premium Cocoa Nibs",
    village: "Desa Sentosa",
    province: "Papua",
    commodity: "Cocoa",
    image: cocoaImage,
    capacity: "250 kg/month",
    stock: "Available",
    isHighStock: false,
    price: "Rp 105,000/kg",
    certified: true,
    rating: 4.8,
    description: "Raw cocoa nibs. Perfect for artisan chocolate makers and health food products."
  },
  {
    id: 7,
    name: "Seaweed Chips",
    village: "Kampung Bahari",
    province: "Sulawesi Selatan",
    commodity: "Seaweed",
    image: seaweedImage,
    capacity: "400 kg/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 65,000/kg",
    certified: true,
    rating: 4.7,
    description: "Crispy seaweed snacks. Low-calorie, high-protein healthy snack."
  },
  {
    id: 8,
    name: "Specialty Coffee Beans",
    village: "Desa Kopi",
    province: "Sulawesi Utara",
    commodity: "Coffee",
    image: coffeeImage,
    capacity: "600 kg/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 180,000/kg",
    certified: true,
    rating: 4.9,
    description: "Single-origin arabica coffee. SCA score 85+. Premium specialty grade."
  },
  {
    id: 9,
    name: "Cassava Chips",
    village: "Desa Subur",
    province: "Jawa Timur",
    commodity: "Cassava",
    image: cassavaImage,
    capacity: "800 kg/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 38,000/kg",
    certified: false,
    rating: 4.6,
    description: "Traditional cassava chips with gourmet flavors. Gluten-free snack."
  },
  {
    id: 10,
    name: "Seaweed Extract Powder",
    village: "Pesisir Indah",
    province: "Sulawesi Tengah",
    commodity: "Seaweed",
    image: seaweedImage,
    capacity: "150 kg/month",
    stock: "Low Stock",
    isHighStock: false,
    price: "Rp 145,000/kg",
    certified: true,
    rating: 4.8,
    description: "High-purity seaweed extract for cosmetics. Rich in minerals and antioxidants."
  },
  {
    id: 11,
    name: "Roasting Machine (Commercial Grade)",
    village: "Supplier Center",
    province: "Jawa Timur",
    commodity: "Equipment",
    image: equipmentImage,
    capacity: "5 units/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 8,500,000/unit",
    certified: true,
    rating: 4.9,
    description: "Commercial roasting machine for corn, coffee, nuts. Capacity 50kg/batch. Stainless steel construction."
  },
  {
    id: 12,
    name: "Packaging Sealer Machine",
    village: "Supplier Center",
    province: "Jawa Tengah",
    commodity: "Equipment",
    image: equipmentImage,
    capacity: "10 units/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 3,200,000/unit",
    certified: true,
    rating: 4.8,
    description: "Automatic heat sealing machine for plastic pouches. Adjustable temperature and sealing width."
  },
  {
    id: 13,
    name: "Industrial Grinder/Blender",
    village: "Supplier Center",
    province: "Jawa Barat",
    commodity: "Equipment",
    image: equipmentImage,
    capacity: "8 units/month",
    stock: "Available",
    isHighStock: false,
    price: "Rp 5,750,000/unit",
    certified: true,
    rating: 4.7,
    description: "Heavy-duty grinder for processing corn, moringa, spices. 100kg/hour capacity. Food-grade stainless steel."
  },
  {
    id: 14,
    name: "Cold-Press Oil Extractor",
    village: "Supplier Center",
    province: "Jawa Timur",
    commodity: "Equipment",
    image: equipmentImage,
    capacity: "3 units/month",
    stock: "Available",
    isHighStock: false,
    price: "Rp 18,500,000/unit",
    certified: true,
    rating: 4.9,
    description: "Cold-press extraction system for premium oils. Maintains nutrients and flavor. 20kg/hour processing."
  },
  {
    id: 15,
    name: "Filtration System (Food Grade)",
    village: "Supplier Center",
    province: "Jawa Tengah",
    commodity: "Equipment",
    image: equipmentImage,
    capacity: "6 units/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 4,200,000/unit",
    certified: true,
    rating: 4.8,
    description: "Multi-stage filtration for oils and liquids. Removes impurities. Food-grade components."
  },
  {
    id: 16,
    name: "Tea Bag Packaging Machine",
    village: "Supplier Center",
    province: "Jawa Barat",
    commodity: "Equipment",
    image: equipmentImage,
    capacity: "4 units/month",
    stock: "Low Stock",
    isHighStock: false,
    price: "Rp 12,000,000/unit",
    certified: true,
    rating: 4.9,
    description: "Automatic tea bag filling and sealing machine. 60 bags/minute. Includes tag attachment."
  },
  {
    id: 17,
    name: "Industrial Drying Machine",
    village: "Supplier Center",
    province: "Jawa Timur",
    commodity: "Equipment",
    image: equipmentImage,
    capacity: "7 units/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 9,800,000/unit",
    certified: true,
    rating: 4.7,
    description: "Dehydrator for fruits, herbs, vegetables. Temperature control 40-80°C. Energy efficient."
  },
  {
    id: 18,
    name: "Premium Foil Pouches (200g)",
    village: "Packaging Supplier",
    province: "Jakarta",
    commodity: "Packaging",
    image: packagingImage,
    capacity: "10,000 units/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 2,500/unit",
    certified: true,
    rating: 4.8,
    description: "200g premium foil pouches with transparent window. For snacks, tea, coffee. Heat sealable. Recommended for corn snacks, tea blends."
  },
  {
    id: 19,
    name: "Food-Grade Paper Bags (5kg & 25kg)",
    village: "Packaging Supplier",
    province: "Jakarta",
    commodity: "Packaging",
    image: packagingImage,
    capacity: "5,000 units/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 4,500/unit",
    certified: true,
    rating: 4.7,
    description: "Multi-layer kraft paper with moisture barrier. For flour, powder products. Eco-friendly. Recommended for corn flour, moringa powder."
  },
  {
    id: 20,
    name: "Dark Glass Bottles (250ml)",
    village: "Packaging Supplier",
    province: "Jakarta",
    commodity: "Packaging",
    image: packagingImage,
    capacity: "8,000 units/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 8,000/unit",
    certified: true,
    rating: 4.9,
    description: "250ml dark glass bottles with premium labels. UV protection for oils. Includes caps. Recommended for premium oils."
  },
  {
    id: 21,
    name: "Premium Tea Tins with Window",
    village: "Packaging Supplier",
    province: "Jakarta",
    commodity: "Packaging",
    image: packagingImage,
    capacity: "6,000 units/month",
    stock: "Available",
    isHighStock: false,
    price: "Rp 12,000/unit",
    certified: true,
    rating: 4.9,
    description: "Airtight metal tins for premium tea. Clear window lid. Keeps tea fresh. Recommended for herbal tea, moringa tea."
  },
  {
    id: 22,
    name: "Biodegradable Tea Bags (100 pcs)",
    village: "Packaging Supplier",
    province: "Jakarta",
    commodity: "Packaging",
    image: packagingImage,
    capacity: "15,000 units/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 25,000/pack",
    certified: true,
    rating: 4.8,
    description: "Eco-friendly biodegradable tea bags. Heat-sealed. 100 bags per pack. Recommended for corn tea, moringa tea."
  },
  {
    id: 23,
    name: "Sachet Packaging (Individual)",
    village: "Packaging Supplier",
    province: "Jakarta",
    commodity: "Packaging",
    image: packagingImage,
    capacity: "20,000 units/month",
    stock: "Available",
    isHighStock: true,
    price: "Rp 500/unit",
    certified: true,
    rating: 4.7,
    description: "Individual sachets for instant products. Heat sealable. Moisture resistant. Recommended for instant porridge, powder mixes."
  },
  {
    id: 24,
    name: "Premium Printed Boxes (5-sachet set)",
    village: "Packaging Supplier",
    province: "Jakarta",
    commodity: "Packaging",
    image: packagingImage,
    capacity: "8,000 units/month",
    stock: "Available",
    isHighStock: false,
    price: "Rp 5,500/unit",
    certified: true,
    rating: 4.8,
    description: "Custom printed boxes for sachet sets. High-quality cardboard. Holds 5 sachets. Recommended for instant porridge sets."
  }
];

const productTypes = ["All Products", "Corn", "Moringa", "Cocoa", "Seaweed", "Coffee", "Cassava", "Equipment", "Packaging"];

export default function RuralMarketLink() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedProductType, setSelectedProductType] = useState("All Products");
  const [showCertifiedOnly, setShowCertifiedOnly] = useState(false);
  const [showHighStockOnly, setShowHighStockOnly] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const { language } = useLanguage();

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.province.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = selectedRegion === "All Regions" || product.province === selectedRegion;
    const matchesProductType = selectedProductType === "All Products" || product.commodity === selectedProductType;
    const matchesCertified = !showCertifiedOnly || product.certified;
    const matchesHighStock = !showHighStockOnly || product.isHighStock;

    return matchesSearch && matchesRegion && matchesProductType && matchesCertified && matchesHighStock;
  });

  const resetFilters = () => {
    setSelectedRegion("All Regions");
    setSelectedProductType("All Products");
    setShowCertifiedOnly(false);
    setShowHighStockOnly(false);
  };

  const activeFiltersCount = 
    (selectedRegion !== "All Regions" ? 1 : 0) +
    (selectedProductType !== "All Products" ? 1 : 0) +
    (showCertifiedOnly ? 1 : 0) +
    (showHighStockOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-24">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F3D2E] to-[#1FAF6A] p-6 pb-8 mt-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Rural Market Link</h1>
            <p className="text-white/90 text-sm">
              Direct marketplace connecting villages to buyers
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a5a]" />
          <Input
            placeholder="Search products, villages, or regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-none"
          />
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Filter Button & Active Filters */}
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#5a5a5a]" />
              <span className="text-sm font-medium text-[#0F3D2E]">Filters</span>
              {activeFiltersCount > 0 && (
                <Badge className="bg-[#1FAF6A] text-white text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilterDialog(true)}
              className="text-xs"
            >
              Adjust Filters
            </Button>
          </div>

          {/* Active Filter Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex gap-2 flex-wrap">
              {selectedRegion !== "All Regions" && (
                <Badge variant="outline" className="border-[#1FAF6A] text-[#1FAF6A] text-xs gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedRegion}
                  <button onClick={() => setSelectedRegion("All Regions")} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedProductType !== "All Products" && (
                <Badge variant="outline" className="border-[#2C8C82] text-[#2C8C82] text-xs gap-1">
                  <Package className="w-3 h-3" />
                  {selectedProductType}
                  <button onClick={() => setSelectedProductType("All Products")} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {showCertifiedOnly && (
                <Badge variant="outline" className="border-[#C6A75E] text-[#C6A75E] text-xs gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Certified
                  <button onClick={() => setShowCertifiedOnly(false)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {showHighStockOnly && (
                <Badge variant="outline" className="border-[#E67E22] text-[#E67E22] text-xs gap-1">
                  High Stock
                  <button onClick={() => setShowHighStockOnly(false)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <button 
                onClick={resetFilters}
                className="text-xs text-[#5a5a5a] hover:text-[#0F3D2E] underline"
              >
                Reset all
              </button>
            </div>
          )}
        </Card>

        {/* Filter Dialog */}
        <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Product Filters</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Region Filter */}
              <div>
                <label className="text-sm font-medium text-[#0F3D2E] mb-2 block">
                  Region
                </label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Regions">All Regions</SelectItem>
                    {indonesianProvinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Type Filter */}
              <div>
                <label className="text-sm font-medium text-[#0F3D2E] mb-2 block">
                  Product Type
                </label>
                <Select value={selectedProductType} onValueChange={setSelectedProductType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Certified Only */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#0F3D2E]">
                  Certified Only
                </label>
                <button
                  onClick={() => setShowCertifiedOnly(!showCertifiedOnly)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    showCertifiedOnly ? 'bg-[#1FAF6A]' : 'bg-[#D9C7A3]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      showCertifiedOnly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* High Stock Only */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#0F3D2E]">
                  High Stock Only
                </label>
                <button
                  onClick={() => setShowHighStockOnly(!showHighStockOnly)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    showHighStockOnly ? 'bg-[#1FAF6A]' : 'bg-[#D9C7A3]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      showHighStockOnly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex-1"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => setShowFilterDialog(false)}
                  className="flex-1 bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats Banner */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 bg-white text-center">
            <div className="text-2xl font-bold text-[#1FAF6A]">127</div>
            <div className="text-xs text-[#5a5a5a]">Villages</div>
          </Card>
          <Card className="p-3 bg-white text-center">
            <div className="text-2xl font-bold text-[#2C8C82]">{filteredProducts.length}</div>
            <div className="text-xs text-[#5a5a5a]">Products</div>
          </Card>
          <Card className="p-3 bg-white text-center">
            <div className="text-2xl font-bold text-[#C6A75E]">1,850</div>
            <div className="text-xs text-[#5a5a5a]">Transactions</div>
          </Card>
        </div>

        {/* Product Grid */}
        <div>
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">
            Available Products ({filteredProducts.length})
          </h2>

          {filteredProducts.length === 0 ? (
            <Card className="p-8 bg-white text-center">
              <Package className="w-12 h-12 text-[#5a5a5a] mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-[#0F3D2E] mb-2">
                No products found
              </h3>
              <p className="text-sm text-[#5a5a5a] mb-4">
                Try adjusting your filters or search query
              </p>
              <Button onClick={resetFilters} variant="outline">
                Reset Filters
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    {/* Product Image */}
                    <div className="relative h-40 bg-[#F5F1E8]">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.certified && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-[#1FAF6A] text-white text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Certified
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <Badge className={`text-xs ${
                          product.stock === 'Available' 
                            ? 'bg-[#2C8C82] text-white' 
                            : 'bg-[#E3B505] text-white'
                        }`}>
                          {product.stock}
                        </Badge>
                      </div>
                      {product.isHighStock && (
                        <div className="absolute bottom-2 left-2">
                          <Badge className="bg-[#E67E22] text-white text-xs">
                            High Stock
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-[#0F3D2E] mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-[#5a5a5a] mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{product.village}, {product.province}</span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-xs text-[#5a5a5a]">Price</div>
                          <div className="text-lg font-bold text-[#C6A75E]">{product.price}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-[#5a5a5a]">Capacity</div>
                          <div className="text-sm font-semibold text-[#0F3D2E]">{product.capacity}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-[#E3B505] text-[#E3B505]'
                                : 'text-[#D9C7A3]'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-[#5a5a5a] ml-1">({product.rating})</span>
                      </div>

                      <p className="text-sm text-[#5a5a5a] mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <SellerContactDialog 
                        sellerName={product.village}
                        productName={product.name}
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  );
}