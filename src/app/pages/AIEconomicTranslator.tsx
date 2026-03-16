import { motion } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  ArrowUp
} from "lucide-react";
import { Card } from "../components/ui/card";
import { MobileNav } from "../components/MobileNav";
import { Link } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Navbar } from "../components/Navbar";

const marketData = [
  { month: "Jan", price: 8500, demand: 65 },
  { month: "Feb", price: 9200, demand: 72 },
  { month: "Mar", price: 10100, demand: 85 },
  { month: "Apr", price: 9800, demand: 78 },
  { month: "May", price: 11200, demand: 92 },
  { month: "Jun", price: 12000, demand: 95 }
];

const seasonalForecast = [
  { season: "Q1 2026", demand: "Medium", confidence: 75 },
  { season: "Q2 2026", demand: "High", confidence: 82 },
  { season: "Q3 2026", demand: "Very High", confidence: 88 },
  { season: "Q4 2026", demand: "High", confidence: 80 }
];

const marketMetrics = [
  { label: "Market Share", value: 28, color: "#E67E22" }
];

export default function AIEconomicTranslator() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-24">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F3D2E] to-[#2C8C82] p-6 pb-8 mt-20">
        <Link to="/dashboard" className="text-white/80 text-sm mb-4 block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white mb-2">AI Economic Translator</h1>
        <p className="text-white/90 text-sm">
          Market intelligence and pricing insights powered by AI
        </p>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Current Commodity */}
        <Card className="p-5 bg-white shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-[#5a5a5a] mb-1">Analyzing</div>
              <div className="text-xl font-bold text-[#0F3D2E]">Organic Corn</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#5a5a5a] mb-1">Your Volume</div>
              <div className="text-xl font-bold text-[#1FAF6A]">2 tons/month</div>
            </div>
          </div>
        </Card>

        {/* Market Trends */}
        <div>
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#1FAF6A]" />
            Market Trends Analysis
          </h2>
          
          <Card className="p-5 bg-white">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#5a5a5a]">Price Trend (6 months)</span>
                <div className="flex items-center gap-1 text-sm text-[#1FAF6A]">
                  <ArrowUp className="w-4 h-4" />
                  <span className="font-semibold">+41% Growth</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0F3D2E10" />
                <XAxis 
                  dataKey="month" 
                  stroke="#5a5a5a" 
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#5a5a5a" 
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #0F3D2E20',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#1FAF6A" 
                  strokeWidth={3}
                  dot={{ fill: '#1FAF6A', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recommended Price Range */}
        <div>
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Recommended Price Range</h2>
          
          <Card className="p-5 bg-gradient-to-br from-[#1FAF6A] to-[#2C8C82] text-white">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-xs opacity-90 mb-1">Minimum</div>
                <div className="text-2xl font-bold">Rp 9,500</div>
                <div className="text-xs opacity-75">per kg</div>
              </div>
              <div>
                <div className="text-xs opacity-90 mb-1">Optimal</div>
                <div className="text-3xl font-bold">Rp 11,800</div>
                <div className="text-xs opacity-75">per kg</div>
              </div>
              <div>
                <div className="text-xs opacity-90 mb-1">Premium</div>
                <div className="text-2xl font-bold">Rp 13,500</div>
                <div className="text-xs opacity-75">per kg</div>
              </div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-xs mb-1 opacity-90">AI Recommendation</div>
              <div className="text-sm">
                Price at <span className="font-bold">Rp 11,800/kg</span> for optimal market penetration and margin balance
              </div>
            </div>
          </Card>
        </div>

        {/* Seasonal Forecast */}
        <div>
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Seasonal Demand Forecast</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {seasonalForecast.map((forecast, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-4 bg-white">
                  <div className="text-sm text-[#5a5a5a] mb-2">{forecast.season}</div>
                  <div className={`text-lg font-bold mb-2 ${
                    forecast.demand.includes('Very') ? 'text-[#1FAF6A]' : 
                    forecast.demand === 'High' ? 'text-[#2C8C82]' : 
                    'text-[#C6A75E]'
                  }`}>
                    {forecast.demand}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#F5F1E8] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#1FAF6A] rounded-full"
                        style={{ width: `${forecast.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#5a5a5a]">{forecast.confidence}%</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risk Analysis */}
        <div>
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Risk Analysis</h2>
          
          <Card className="p-5 bg-white">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1FAF6A]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#1FAF6A]" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#0F3D2E] mb-1">Market Demand Risk</div>
                  <div className="text-sm text-[#5a5a5a] mb-2">
                    Strong and growing demand for organic corn products in urban markets
                  </div>
                  <div className="inline-block px-2 py-1 bg-[#1FAF6A]/10 text-[#1FAF6A] text-xs rounded-full font-medium">
                    Low Risk
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#E3B505]/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#E3B505]" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#0F3D2E] mb-1">Price Volatility Risk</div>
                  <div className="text-sm text-[#5a5a5a] mb-2">
                    Moderate price fluctuations expected during harvest seasons
                  </div>
                  <div className="inline-block px-2 py-1 bg-[#E3B505]/10 text-[#E3B505] text-xs rounded-full font-medium">
                    Medium Risk
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1FAF6A]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#1FAF6A]" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#0F3D2E] mb-1">Supply Chain Risk</div>
                  <div className="text-sm text-[#5a5a5a] mb-2">
                    Stable logistics and established distribution channels
                  </div>
                  <div className="inline-block px-2 py-1 bg-[#1FAF6A]/10 text-[#1FAF6A] text-xs rounded-full font-medium">
                    Low Risk
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Market Opportunities */}
        <Card className="p-5 bg-gradient-to-br from-[#0F3D2E] to-[#1FAF6A] text-white">
          <h3 className="text-lg font-semibold mb-3">Key Market Opportunities</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] mt-2 flex-shrink-0" />
              <div className="text-sm">
                Growing health-conscious consumer segment willing to pay premium for organic products
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] mt-2 flex-shrink-0" />
              <div className="text-sm">
                Emerging demand from food processing companies seeking local organic ingredients
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] mt-2 flex-shrink-0" />
              <div className="text-sm">
                Export potential to Singapore and Malaysia markets with proper certification
              </div>
            </div>
          </div>
        </Card>
      </div>

      <MobileNav />
    </div>
  );
}