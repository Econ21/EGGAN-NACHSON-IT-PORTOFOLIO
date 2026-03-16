import { motion } from "motion/react";
import { 
  BarChart3,
  Users,
  TrendingUp,
  MapPin,
  Package,
  DollarSign,
  Activity,
  CheckCircle,
  Sparkles,
  Target
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { MobileNav } from "../components/MobileNav";
import { Link } from "react-router";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Navbar } from "../components/Navbar";

const growthData = [
  { month: "Jul", villages: 65, transactions: 420, revenue: 180 },
  { month: "Aug", villages: 78, transactions: 580, revenue: 245 },
  { month: "Sep", villages: 92, transactions: 820, revenue: 320 },
  { month: "Oct", villages: 105, transactions: 1140, revenue: 425 },
  { month: "Nov", villages: 118, transactions: 1520, revenue: 550 },
  { month: "Dec", villages: 127, transactions: 1850, revenue: 680 }
];

const commodityDistribution = [
  { name: "Corn", value: 35, color: "#E3B505" },
  { name: "Seaweed", value: 25, color: "#2C8C82" },
  { name: "Moringa", value: 20, color: "#1FAF6A" },
  { name: "Cocoa", value: 15, color: "#C6A75E" },
  { name: "Others", value: 5, color: "#5a5a5a" }
];

const marginGrowthData = [
  { region: "Maluku", growth: 52 },
  { region: "NTT", growth: 48 },
  { region: "Papua", growth: 45 },
  { region: "NTB", growth: 42 },
  { region: "Sulawesi", growth: 38 }
];

const topVillages = [
  { name: "Desa Makmur", products: 12, revenue: "Rp 45M", growth: "+68%" },
  { name: "Kampung Sejahtera", products: 10, revenue: "Rp 38M", growth: "+52%" },
  { name: "Desa Harapan", products: 8, revenue: "Rp 32M", growth: "+45%" },
  { name: "Desa Berkah", products: 7, revenue: "Rp 28M", growth: "+42%" }
];

const activeRegions = [
  { name: "Maluku Utara", villages: 31, revenue: "Rp 89M", growth: "+22%" },
  { name: "NTT", lat: -8.5, long: 120, villages: 28 },
  { name: "Papua", lat: -4.0, long: 138, villages: 22 },
  { name: "NTB", lat: -8.5, long: 117, villages: 20 },
  { name: "Sulawesi", lat: -1.5, long: 121, villages: 22 }
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F3D2E] to-[#1FAF6A] p-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">RIN Impact Dashboard</h1>
              <p className="text-white/90">Real-time platform analytics and impact metrics</p>
            </div>
            <Link to="/">
              <Badge className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 cursor-pointer">
                View Public Site
              </Badge>
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: MapPin, label: "Villages Connected", value: "127", change: "+12%", color: "#1FAF6A" },
              { icon: Package, label: "Active Products", value: "342", change: "+28%", color: "#2C8C82" },
              { icon: BarChart3, label: "Total Transactions", value: "1,850", change: "+35%", color: "#C6A75E" },
              { icon: TrendingUp, label: "Avg Margin Growth", value: "45%", change: "+8%", color: "#E67E22" }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-5 bg-white/95 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${metric.color}15` }}
                    >
                      <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                    </div>
                    <Badge className="bg-[#1FAF6A]/10 text-[#1FAF6A] text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-sm text-[#5a5a5a] mb-1">{metric.label}</div>
                  <div className="text-3xl font-bold text-[#0F3D2E]">{metric.value}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Growth Trends */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Platform Growth */}
          <Card className="p-6 bg-white">
            <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Platform Growth (6 Months)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={growthData}>
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
                  dataKey="villages" 
                  stroke="#1FAF6A" 
                  strokeWidth={3}
                  name="Villages"
                />
                <Line 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#2C8C82" 
                  strokeWidth={3}
                  name="Transactions"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1FAF6A]" />
                <span className="text-[#5a5a5a]">Villages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2C8C82]" />
                <span className="text-[#5a5a5a]">Transactions</span>
              </div>
            </div>
          </Card>

          {/* Commodity Distribution */}
          <Card className="p-6 bg-white">
            <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Commodity Distribution</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={commodityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {commodityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {commodityDistribution.map((commodity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: commodity.color }}
                  />
                  <span className="text-sm text-[#5a5a5a]">
                    {commodity.name} ({commodity.value}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Margin Growth by Region */}
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Margin Growth by Region</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={marginGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0F3D2E10" />
              <XAxis 
                dataKey="region" 
                stroke="#5a5a5a" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#5a5a5a" 
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #0F3D2E20',
                  borderRadius: '8px'
                }}
                formatter={(value) => `${value}%`}
              />
              <Bar 
                dataKey="growth" 
                fill="#1FAF6A"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Performing Villages & Map */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Villages */}
          <Card className="p-6 bg-white">
            <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Top Performing Villages</h2>
            <div className="space-y-3">
              {topVillages.map((village, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#F5F1E8] rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1FAF6A] text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-[#0F3D2E]">{village.name}</div>
                      <div className="text-sm text-[#5a5a5a]">{village.products} products</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#0F3D2E]">{village.revenue}</div>
                    <div className="text-sm text-[#1FAF6A]">{village.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Interactive Map */}
          <Card className="p-6 bg-white">
            <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Active Regions Map</h2>
            <div className="relative h-64 bg-gradient-to-br from-[#2C8C82]/10 to-[#1FAF6A]/10 rounded-lg overflow-hidden">
              {/* Simplified Indonesia Map Representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-[#1FAF6A] mx-auto mb-4" />
                  <div className="text-2xl font-bold text-[#0F3D2E] mb-2">Eastern Indonesia</div>
                  <div className="text-sm text-[#5a5a5a]">Coverage across 5 regions</div>
                </div>
              </div>
              
              {/* Region Markers */}
              {activeRegions.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="absolute"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + (index % 2) * 20}%`
                  }}
                >
                  <div className="relative group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-[#1FAF6A] opacity-20 animate-ping absolute" />
                    <div className="w-12 h-12 rounded-full bg-[#1FAF6A] flex items-center justify-center relative">
                      <span className="text-white font-bold text-sm">{region.villages}</span>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#0F3D2E] text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {region.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              {activeRegions.map((region, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-[#5a5a5a]">{region.name}</span>
                  <Badge variant="outline" className="border-[#1FAF6A]/30 text-[#1FAF6A]">
                    {region.villages} villages
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Product Success */}
        <Card className="p-6 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#C6A75E]" />
            <h2 className="text-lg font-semibold text-[#0F3D2E]">AI-Generated Products Performance</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4 bg-[#1FAF6A]/5">
              <div className="text-sm text-[#5a5a5a] mb-1">Total AI Products</div>
              <div className="text-3xl font-bold text-[#1FAF6A]">342</div>
              <div className="text-xs text-[#5a5a5a] mt-1">Across all villages</div>
            </Card>
            <Card className="p-4 bg-[#2C8C82]/5">
              <div className="text-sm text-[#5a5a5a] mb-1">Success Rate</div>
              <div className="text-3xl font-bold text-[#2C8C82]">78%</div>
              <div className="text-xs text-[#5a5a5a] mt-1">Products in market</div>
            </Card>
            <Card className="p-4 bg-[#C6A75E]/5">
              <div className="text-sm text-[#5a5a5a] mb-1">Avg Margin Increase</div>
              <div className="text-3xl font-bold text-[#C6A75E]">65%</div>
              <div className="text-xs text-[#5a5a5a] mt-1">vs. raw commodity</div>
            </Card>
            <Card className="p-4 bg-[#E67E22]/5">
              <div className="text-sm text-[#5a5a5a] mb-1">Revenue Generated</div>
              <div className="text-3xl font-bold text-[#E67E22]">Rp 680M</div>
              <div className="text-xs text-[#5a5a5a] mt-1">Last 6 months</div>
            </Card>
          </div>
        </Card>

        {/* Youth Agents Impact */}
        <Card className="p-6 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-[#E67E22]" />
            <h2 className="text-lg font-semibold text-[#0F3D2E]">Youth Agents Impact</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F5F1E8] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-[#5a5a5a]">Active Agents</div>
                <Target className="w-4 h-4 text-[#1FAF6A]" />
              </div>
              <div className="text-3xl font-bold text-[#0F3D2E] mb-1">58</div>
              <div className="text-xs text-[#5a5a5a]">Across all regions</div>
            </div>
            <div className="p-4 bg-[#F5F1E8] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-[#5a5a5a]">Farmers Trained</div>
                <Users className="w-4 h-4 text-[#2C8C82]" />
              </div>
              <div className="text-3xl font-bold text-[#0F3D2E] mb-1">2,450</div>
              <div className="text-xs text-[#5a5a5a]">Community members</div>
            </div>
            <div className="p-4 bg-[#F5F1E8] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-[#5a5a5a]">Data Points Validated</div>
                <BarChart3 className="w-4 h-4 text-[#C6A75E]" />
              </div>
              <div className="text-3xl font-bold text-[#0F3D2E] mb-1">8,920</div>
              <div className="text-xs text-[#5a5a5a]">92% accuracy rate</div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <Card className="p-6 bg-gradient-to-br from-[#0F3D2E] to-[#1FAF6A] text-white text-center">
          <div className="text-sm opacity-90 mb-2">Powered by</div>
          <div className="text-2xl font-bold">Timur Network Foundation</div>
          <div className="text-sm opacity-75 mt-2">
            Building intelligent rural economic systems across Eastern Indonesia
          </div>
        </Card>
      </div>
    </div>
  );
}