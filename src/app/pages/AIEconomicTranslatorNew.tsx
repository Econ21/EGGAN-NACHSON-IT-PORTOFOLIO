import { useState } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown,
  Filter,
  X,
  Download
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MobileNav } from "../components/MobileNav";
import { Link } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Navbar } from "../components/Navbar";
import { useUserProfile } from "../contexts/UserProfileContext";

// Simulated market price data (in real app, this would come from API)
const generateMarketData = (commodityName: string, period: string) => {
  const basePrice = {
    'Corn': 15000,
    'Moringa': 95000,
    'Cocoa': 85000,
    'Coffee': 165000,
    'Seaweed': 95000
  }[commodityName] || 50000;

  const months = period === 'daily' ? 7 : period === 'weekly' ? 12 : 6;
  const data = [];
  
  for (let i = 0; i < months; i++) {
    const fluctuation = (Math.random() - 0.5) * 0.15;
    const marketPrice = basePrice * (1 + fluctuation);
    const userPrice = basePrice * 1.15; // User price 15% higher (value-added)
    const diff = ((userPrice - marketPrice) / marketPrice) * 100;
    
    data.push({
      period: period === 'daily' ? `Day ${i + 1}` : period === 'weekly' ? `Week ${i + 1}` : `Month ${i + 1}`,
      marketPrice: Math.round(marketPrice),
      userPrice: Math.round(userPrice),
      diff: diff.toFixed(1)
    });
  }
  
  return data;
};

const generateVolumeData = (commodityName: string, period: string) => {
  const baseVolume = {
    'Corn': 2500,
    'Moringa': 500,
    'Cocoa': 800,
    'Coffee': 300,
    'Seaweed': 400
  }[commodityName] || 1000;

  const months = period === 'daily' ? 7 : period === 'weekly' ? 12 : 6;
  const data = [];
  
  for (let i = 0; i < months; i++) {
    const production = baseVolume + Math.random() * 500;
    const sales = baseVolume * 0.85 + Math.random() * 300;
    const growth = ((sales - baseVolume * 0.85) / (baseVolume * 0.85)) * 100;
    
    data.push({
      period: period === 'daily' ? `Day ${i + 1}` : period === 'weekly' ? `Week ${i + 1}` : `Month ${i + 1}`,
      production: Math.round(production),
      sales: Math.round(sales),
      growth: growth.toFixed(1)
    });
  }
  
  return data;
};

export default function AIEconomicTranslator() {
  const { profile } = useUserProfile();
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(['monthly']);
  const [selectedCommodities, setSelectedCommodities] = useState<string[]>(['Corn']);

  const periods = [
    { value: 'daily', label: 'Harian' },
    { value: 'weekly', label: 'Mingguan' },
    { value: 'monthly', label: 'Bulanan' },
    { value: 'Q1', label: 'Q1' },
    { value: 'Q2', label: 'Q2' },
    { value: 'Q3', label: 'Q3' },
    { value: 'Q4', label: 'Q4' }
  ];

  const commodityList = profile.commodities.map(c => c.name);

  const togglePeriod = (period: string) => {
    if (selectedPeriods.includes(period)) {
      if (selectedPeriods.length > 1) {
        setSelectedPeriods(selectedPeriods.filter(p => p !== period));
      }
    } else {
      setSelectedPeriods([...selectedPeriods, period]);
    }
  };

  const toggleCommodity = (commodity: string) => {
    if (selectedCommodities.includes(commodity)) {
      if (selectedCommodities.length > 1) {
        setSelectedCommodities(selectedCommodities.filter(c => c !== commodity));
      }
    } else {
      setSelectedCommodities([...selectedCommodities, commodity]);
    }
  };

  const generateAIInsight = (commodity: string, priceData: any[], volumeData: any[]) => {
    const avgMarketPrice = priceData.reduce((sum, d) => sum + d.marketPrice, 0) / priceData.length;
    const avgUserPrice = priceData.reduce((sum, d) => sum + d.userPrice, 0) / priceData.length;
    const priceDiff = ((avgUserPrice - avgMarketPrice) / avgMarketPrice) * 100;
    const volumeGrowth = parseFloat(volumeData[volumeData.length - 1].growth);

    return `Analisis untuk ${commodity}: Harga jual rata-rata Anda sebesar Rp ${Math.round(avgUserPrice).toLocaleString('id-ID')}/kg menunjukkan margin positif ${priceDiff.toFixed(1)}% dibandingkan harga pasar. Hal ini mengindikasikan positioning produk yang sangat baik dengan nilai tambah dari proses pengolahan dan branding premium. Volume penjualan menunjukkan trend ${volumeGrowth > 0 ? 'pertumbuhan' : 'penurunan'} ${Math.abs(volumeGrowth).toFixed(1)}% yang ${volumeGrowth > 5 ? 'sangat positif' : volumeGrowth > 0 ? 'cukup baik' : 'perlu perhatian'}. Rekomendasi: ${priceDiff > 20 ? 'Pertahankan strategi premium pricing dan fokus pada kualitas produk.' : priceDiff > 10 ? 'Tingkatkan differentiation produk untuk mempertahankan margin.' : 'Evaluasi strategi pricing dan value proposition produk.'} ${volumeGrowth < 0 ? 'Perluas channel distribusi dan tingkatkan aktivitas promosi untuk mendorong penjualan.' : 'Manfaatkan momentum pertumbuhan dengan scaling up kapasitas produksi.'}`;
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-24">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F3D2E] to-[#2C8C82] p-6 pb-8 mt-20">
        <Link to="/dashboard" className="text-white/80 text-sm mb-4 block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white mb-2">AI Economic Translator</h1>
        <p className="text-white/90 text-sm">
          Market Trend Analysis dengan Filter Dinamis
        </p>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Filter Section */}
        <Card className="p-5 bg-white shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#1FAF6A]" />
            <h3 className="font-semibold text-[#0F3D2E]">Filter Analisis</h3>
          </div>

          {/* Period Filter */}
          <div className="mb-4">
            <label className="text-sm font-medium text-[#0F3D2E] block mb-2">
              Periode Analisis
            </label>
            <div className="grid grid-cols-4 gap-2">
              {periods.map(period => (
                <button
                  key={period.value}
                  onClick={() => togglePeriod(period.value)}
                  className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    selectedPeriods.includes(period.value)
                      ? 'border-[#1FAF6A] bg-[#1FAF6A] text-white'
                      : 'border-[#0F3D2E]/20 text-[#5a5a5a] hover:border-[#1FAF6A]/50'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Commodity Filter */}
          <div className="mb-4">
            <label className="text-sm font-medium text-[#0F3D2E] block mb-2">
              Komoditas
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCommodities(commodityList)}
                className="px-3 py-2 rounded-lg border-2 border-[#2C8C82] bg-[#2C8C82]/10 text-[#2C8C82] text-sm font-medium hover:bg-[#2C8C82]/20 transition-all"
              >
                Pilih Semua
              </button>
              {commodityList.map(commodity => (
                <button
                  key={commodity}
                  onClick={() => toggleCommodity(commodity)}
                  className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    selectedCommodities.includes(commodity)
                      ? 'border-[#1FAF6A] bg-[#1FAF6A] text-white'
                      : 'border-[#0F3D2E]/20 text-[#5a5a5a] hover:border-[#1FAF6A]/50'
                  }`}
                >
                  {commodity}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Filters Display */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-[#0F3D2E]/10">
            <span className="text-sm text-[#5a5a5a]">Aktif:</span>
            {selectedPeriods.map(period => (
              <span key={period} className="px-2 py-1 bg-[#1FAF6A]/10 text-[#1FAF6A] text-xs rounded-full flex items-center gap-1">
                {periods.find(p => p.value === period)?.label}
                {selectedPeriods.length > 1 && (
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => togglePeriod(period)}
                  />
                )}
              </span>
            ))}
            {selectedCommodities.map(commodity => (
              <span key={commodity} className="px-2 py-1 bg-[#2C8C82]/10 text-[#2C8C82] text-xs rounded-full flex items-center gap-1">
                {commodity}
                {selectedCommodities.length > 1 && (
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => toggleCommodity(commodity)}
                  />
                )}
              </span>
            ))}
          </div>
        </Card>

        {/* Charts Section */}
        <div className="space-y-8">
          {selectedCommodities.map(commodity => (
            <div key={commodity} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Commodity Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#0F3D2E]">{commodity}</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-[#5a5a5a]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                {selectedPeriods.map(period => {
                  const priceData = generateMarketData(commodity, period);
                  const volumeData = generateVolumeData(commodity, period);
                  const aiInsight = generateAIInsight(commodity, priceData, volumeData);

                  return (
                    <div key={`${commodity}-${period}`} className="space-y-4 mb-8">
                      {/* Period Label */}
                      <div className="inline-block px-3 py-1 bg-[#1FAF6A]/10 text-[#1FAF6A] text-sm font-medium rounded-full">
                        {periods.find(p => p.value === period)?.label}
                      </div>

                      {/* Price Trend Chart */}
                      <Card className="p-5 bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-[#0F3D2E] mb-1">Price Trend</h3>
                            <p className="text-xs text-[#5a5a5a]">Perbandingan Harga Jual vs Harga Pasar</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-[#5a5a5a]">Selisih Rata-rata</div>
                            <div className="text-lg font-bold text-[#1FAF6A]">
                              +{priceData[0]?.diff || 0}%
                            </div>
                          </div>
                        </div>

                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={priceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0F3D2E10" />
                            <XAxis 
                              dataKey="period" 
                              stroke="#5a5a5a" 
                              style={{ fontSize: '11px' }}
                            />
                            <YAxis 
                              stroke="#5a5a5a" 
                              style={{ fontSize: '11px' }}
                              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white',
                                border: '1px solid #0F3D2E20',
                                borderRadius: '8px',
                                fontSize: '12px'
                              }}
                              formatter={(value: any) => `Rp ${value.toLocaleString('id-ID')}`}
                            />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="userPrice" 
                              stroke="#1FAF6A" 
                              strokeWidth={2}
                              name="Harga Jual Anda"
                              dot={{ fill: '#1FAF6A', r: 4 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="marketPrice" 
                              stroke="#E67E22" 
                              strokeWidth={2}
                              name="Harga Pasar"
                              dot={{ fill: '#E67E22', r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Card>

                      {/* Volume Trend Chart */}
                      <Card className="p-5 bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-[#0F3D2E] mb-1">Volume Trend</h3>
                            <p className="text-xs text-[#5a5a5a]">Produksi vs Penjualan</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-[#5a5a5a]">Growth</div>
                            <div className={`text-lg font-bold ${parseFloat(volumeData[volumeData.length - 1]?.growth || '0') > 0 ? 'text-[#1FAF6A]' : 'text-[#E67E22]'}`}>
                              {parseFloat(volumeData[volumeData.length - 1]?.growth || '0') > 0 ? '+' : ''}
                              {volumeData[volumeData.length - 1]?.growth || 0}%
                            </div>
                          </div>
                        </div>

                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={volumeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0F3D2E10" />
                            <XAxis 
                              dataKey="period" 
                              stroke="#5a5a5a" 
                              style={{ fontSize: '11px' }}
                            />
                            <YAxis 
                              stroke="#5a5a5a" 
                              style={{ fontSize: '11px' }}
                              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white',
                                border: '1px solid #0F3D2E20',
                                borderRadius: '8px',
                                fontSize: '12px'
                              }}
                              formatter={(value: any) => `${value.toLocaleString('id-ID')} kg`}
                            />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="production" 
                              stroke="#2C8C82" 
                              strokeWidth={2}
                              name="Volume Produksi"
                              dot={{ fill: '#2C8C82', r: 4 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="sales" 
                              stroke="#C6A75E" 
                              strokeWidth={2}
                              name="Volume Penjualan"
                              dot={{ fill: '#C6A75E', r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Card>

                      {/* AI Insight */}
                      <Card className="p-5 bg-gradient-to-r from-[#1FAF6A]/5 to-[#2C8C82]/5 border border-[#1FAF6A]/20">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#1FAF6A] flex items-center justify-center flex-shrink-0 mt-1">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#0F3D2E] mb-2">AI Insight</h4>
                            <p className="text-sm text-[#5a5a5a] leading-relaxed">
                              {aiInsight}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <MobileNav />
    </div>
  );
}