import { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  TrendingUp,
  AlertCircle,
  Package,
  DollarSign,
  Clock,
  Target,
  ChevronRight,
  ShoppingCart,
  ExternalLink,
  Check
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MobileNav } from "../components/MobileNav";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import { productsByCommodity, commodityImages, type CommodityType } from "../data/productData";

export default function AIProductGenerator() {
  const { t } = useLanguage();
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityType>('corn');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [customCommodity, setCustomCommodity] = useState('');
  const [selectedMultipleCommodities, setSelectedMultipleCommodities] = useState<CommodityType[]>([]);

  const commodities: { value: CommodityType; label: string }[] = [
    { value: 'corn', label: t('generator.corn') },
    { value: 'seaweed', label: t('generator.seaweed') },
    { value: 'moringa', label: t('generator.moringa') },
    { value: 'cocoa', label: t('generator.cocoa') },
    { value: 'coffee', label: t('generator.coffee') },
    { value: 'cassava', label: t('generator.cassava') }
  ];

  const handleCommodityToggle = (value: CommodityType) => {
    if (!showOthersInput) {
      setSelectedCommodity(value);
      setIsGenerated(false);
      return;
    }

    // When Others is selected, allow multiple selection
    setSelectedMultipleCommodities(prev => 
      prev.includes(value) 
        ? prev.filter(c => c !== value)
        : [...prev, value]
    );
  };

  const handleOthersClick = () => {
    setShowOthersInput(!showOthersInput);
    setSelectedMultipleCommodities([]);
    setCustomCommodity('');
    setIsGenerated(false);
  };

  const currentProducts = showOthersInput && selectedMultipleCommodities.length > 0
    ? selectedMultipleCommodities.flatMap(c => productsByCommodity[c])
    : productsByCommodity[selectedCommodity];
  const currentImage = commodityImages[selectedCommodity];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-[#1FAF6A] bg-[#1FAF6A]/10';
      case 'medium': return 'text-[#E3B505] bg-[#E3B505]/10';
      case 'high': return 'text-[#E67E22] bg-[#E67E22]/10';
      default: return 'text-[#5a5a5a] bg-[#5a5a5a]/10';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'low': return 'text-[#1FAF6A] bg-[#1FAF6A]/10';
      case 'medium': return 'text-[#2C8C82] bg-[#2C8C82]/10';
      case 'high': return 'text-[#C6A75E] bg-[#C6A75E]/10';
      default: return 'text-[#5a5a5a] bg-[#5a5a5a]/10';
    }
  };

  const handleGenerate = () => {
    setIsGenerated(true);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-24">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C6A75E] to-[#E67E22] p-6 pb-8 mt-20">
        <Link to="/dashboard" className="text-white/80 text-sm mb-4 block">
          ← {t('dashboard.back')}
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-white" />
          <h1 className="text-2xl font-bold text-white">{t('generator.title')}</h1>
        </div>
        <p className="text-white/90 text-sm">
          {t('generator.subtitle')}
        </p>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Commodity Selector */}
        <Card className="p-5 bg-white shadow-md">
          <div className="mb-4">
            <label className="text-sm font-medium text-[#0F3D2E] mb-2 block">
              {t('generator.select')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {commodities.map((commodity) => (
                <button
                  key={commodity.value}
                  onClick={() => handleCommodityToggle(commodity.value)}
                  className={`p-3 rounded-lg border-2 transition-all relative ${
                    showOthersInput && selectedMultipleCommodities.includes(commodity.value)
                      ? 'border-[#1FAF6A] bg-[#1FAF6A]/10'
                      : !showOthersInput && selectedCommodity === commodity.value
                      ? 'border-[#1FAF6A] bg-[#1FAF6A]/5'
                      : 'border-[#0F3D2E]/10 hover:border-[#1FAF6A]/30'
                  }`}
                >
                  <div className="text-sm font-medium text-[#0F3D2E]">
                    {commodity.label}
                  </div>
                  {showOthersInput && selectedMultipleCommodities.includes(commodity.value) && (
                    <div className="absolute top-1 right-1 bg-[#1FAF6A] rounded-full p-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
              <button
                onClick={handleOthersClick}
                className={`p-3 rounded-lg border-2 transition-all ${
                  showOthersInput
                    ? 'border-[#1FAF6A] bg-[#1FAF6A]/5'
                    : 'border-[#0F3D2E]/10 hover:border-[#1FAF6A]/30'
                }`}
              >
                <div className="text-sm font-medium text-[#0F3D2E]">
                  {t('generator.others')}
                </div>
              </button>
            </div>
            {showOthersInput && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customCommodity}
                  onChange={(e) => setCustomCommodity(e.target.value)}
                  className="w-full p-2 border border-[#0F3D2E]/10 rounded-lg focus:outline-none focus:border-[#1FAF6A]"
                  placeholder={t('generator.enterCommodity')}
                />
              </div>
            )}
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white hover:opacity-90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {t('generator.generate')}
          </Button>
        </Card>

        {isGenerated && (
          <>
            {/* Selected Commodity Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-5 bg-white shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-[#5a5a5a] mb-1">{t('generator.analyzing')}</div>
                    <div className="text-xl font-bold text-[#0F3D2E] capitalize">
                      {commodities.find(c => c.value === selectedCommodity)?.label}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#5a5a5a] mb-1">{t('generator.available')}</div>
                    <div className="text-xl font-bold text-[#1FAF6A]">2 tons/month</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* AI Insight Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 bg-gradient-to-r from-[#1FAF6A]/10 to-[#2C8C82]/10 border-[#1FAF6A]/20">
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-[#1FAF6A] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#0F3D2E] mb-1">{t('generator.complete')}</div>
                    <div className="text-sm text-[#5a5a5a]">
                      {t('generator.completeDesc', { 
                        count: currentProducts.length.toString(),
                        commodity: commodities.find(c => c.value === selectedCommodity)?.label || ''
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Product Cards */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#0F3D2E]">{t('generator.options')}</h2>
              
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white border-[#0F3D2E]/10 hover:shadow-lg transition-shadow">
                    {/* Product Header */}
                    <div className="p-5 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#0F3D2E] mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                            <Target className="w-4 h-4" />
                            {product.targetMarket}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-[#C6A75E]">{product.margin}%</div>
                          <div className="text-xs text-[#5a5a5a]">{t('generator.margin')}</div>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[#1FAF6A]" />
                          <div>
                            <div className="text-xs text-[#5a5a5a]">{t('generator.cost')}</div>
                            <div className="text-sm font-semibold text-[#0F3D2E]">{product.productionCost}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[#2C8C82]" />
                          <div>
                            <div className="text-xs text-[#5a5a5a]">{t('generator.price')}</div>
                            <div className="text-sm font-semibold text-[#0F3D2E]">{product.sellingPrice}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#E3B505]" />
                          <div>
                            <div className="text-xs text-[#5a5a5a]">{t('generator.breakeven')}</div>
                            <div className="text-sm font-semibold text-[#0F3D2E]">{product.breakeven}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-[#C6A75E]" />
                          <div>
                            <div className="text-xs text-[#5a5a5a]">{t('generator.complexity')}</div>
                            <Badge className={`text-xs ${getComplexityColor(product.complexity)}`}>
                              {product.complexity}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Risk Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-4 h-4 text-[#5a5a5a]" />
                        <span className="text-sm text-[#5a5a5a]">{t('generator.risk')}:</span>
                        <Badge className={`text-xs ${getRiskColor(product.riskLevel)}`}>
                          {product.riskLevel}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#5a5a5a] mb-3">
                        {product.description}
                      </p>

                      {/* View Details Button */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                      >
                        {selectedProduct === product.id ? t('generator.hideDetails') : t('generator.viewFull')}
                        <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${selectedProduct === product.id ? 'rotate-90' : ''}`} />
                      </Button>
                    </div>

                    {/* Expanded Details */}
                    {selectedProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-[#0F3D2E]/10 bg-[#F5F1E8]/50 p-5"
                      >
                        {/* AI Reasoning */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-[#C6A75E]" />
                            <h4 className="font-semibold text-[#0F3D2E]">{t('generator.reasoning')}</h4>
                          </div>
                          <p className="text-sm text-[#5a5a5a] bg-white p-3 rounded-lg">
                            {product.reasoning}
                          </p>
                        </div>

                        {/* Equipment Needed */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-[#0F3D2E]">{t('generator.equipment')}</h4>
                            <Link to="/marketplace?category=equipment">
                              <Button variant="outline" size="sm" className="text-xs">
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                {t('generator.shopEquipment')}
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {product.equipment.map((eq, i) => (
                              <Badge key={i} variant="outline" className="bg-white">
                                {eq}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Packaging */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-[#0F3D2E]">{t('generator.packaging')}</h4>
                            <Link to="/marketplace?category=packaging">
                              <Button variant="outline" size="sm" className="text-xs">
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                {t('generator.shopPackaging')}
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          </div>
                          <p className="text-sm text-[#5a5a5a] bg-white p-3 rounded-lg">
                            {product.packaging}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {!isGenerated && (
          <Card className="p-8 text-center bg-white">
            <Sparkles className="w-12 h-12 text-[#C6A75E] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0F3D2E] mb-2">
              {t('generator.readyTitle')}
            </h3>
            <p className="text-sm text-[#5a5a5a]">
              {t('generator.readyDesc')}
            </p>
          </Card>
        )}
      </div>

      <MobileNav />
    </div>
  );
}