import { motion } from "motion/react";
import { 
  TrendingUp, 
  Package, 
  BarChart3, 
  DollarSign,
  Sparkles,
  MapPin,
  Calendar
} from "lucide-react";
import { Card } from "../components/ui/card";
import { MobileNav } from "../components/MobileNav";
import { Progress } from "../components/ui/progress";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/Navbar";

const bgImage = "https://images.unsplash.com/photo-1566622246836-12802785656a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYWdlJTIwbGFuZHNjYXBlJTIwaW5kb25lc2lhJTIwcnVyYWx8ZW58MXx8fHwxNzcxNTg0NjE2fDA&ixlib=rb-4.1.0&q=80&w=1080";

const statCards = [
  { 
    icon: Package, 
    label: "Total Commodities", 
    value: "5", 
    color: "#1FAF6A",
    bgColor: "#1FAF6A15"
  },
  { 
    icon: BarChart3, 
    label: "Monthly Production", 
    value: "3.2 tons", 
    color: "#2C8C82",
    bgColor: "#2C8C8215"
  },
  { 
    icon: TrendingUp, 
    label: "Active Products", 
    value: "12", 
    color: "#C6A75E",
    bgColor: "#C6A75E15"
  },
  { 
    icon: DollarSign, 
    label: "Revenue This Month", 
    value: "Rp 45M", 
    color: "#E67E22",
    bgColor: "#E67E2215"
  }
];

const aiRecommendations = [
  {
    title: "High Demand Alert",
    description: "Organic corn snacks trending in urban markets. Consider production.",
    priority: "high"
  },
  {
    title: "Seasonal Opportunity",
    description: "Peak harvest season coming. Optimize storage and logistics.",
    priority: "medium"
  },
  {
    title: "Price Optimization",
    description: "Current corn price 15% below optimal. Adjust pricing strategy.",
    priority: "medium"
  }
];

export default function VillageDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-24">
      {/* Navbar */}
      <Navbar />

      {/* Header with Background */}
      <div className="relative h-48 overflow-hidden mt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D2E]/90 to-[#1FAF6A]/70" />
        
        <div className="relative z-10 h-full flex flex-col justify-end p-6 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-4 h-4 text-white/80" />
            <span className="text-sm">Desa Makmur, Maluku</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Selamat Pagi, Pak Miftah</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-[#1FAF6A] rounded-full animate-pulse" />
              <span className="text-sm text-white font-medium">Economic Visibility Score</span>
            </div>
            <span className="text-2xl font-bold text-[#C6A75E]">78</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="p-4 bg-white border-none shadow-sm"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-sm text-[#5a5a5a] mb-1">{stat.label}</div>
                <div className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-5 bg-white border-none shadow-sm">
          <h3 className="text-lg font-semibold text-[#0F3D2E] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/data-engine">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border-[#1FAF6A]/30 text-[#0F3D2E] hover:bg-[#1FAF6A]/5"
              >
                <Package className="w-4 h-4 text-[#1FAF6A]" />
                <span className="text-sm">Input Data</span>
              </Button>
            </Link>
            <Link to="/product-generator">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border-[#C6A75E]/30 text-[#0F3D2E] hover:bg-[#C6A75E]/5"
              >
                <Sparkles className="w-4 h-4 text-[#C6A75E]" />
                <span className="text-sm">AI Products</span>
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border-[#2C8C82]/30 text-[#0F3D2E] hover:bg-[#2C8C82]/5"
              >
                <BarChart3 className="w-4 h-4 text-[#2C8C82]" />
                <span className="text-sm">Marketplace</span>
              </Button>
            </Link>
            <Link to="/ai-translator">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border-[#E67E22]/30 text-[#0F3D2E] hover:bg-[#E67E22]/5"
              >
                <TrendingUp className="w-4 h-4 text-[#E67E22]" />
                <span className="text-sm">AI Insights</span>
              </Button>
            </Link>
          </div>
        </Card>

        {/* Production Progress */}
        <Card className="p-5 bg-white border-none shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#0F3D2E]">Monthly Production Goal</h3>
            <span className="text-sm text-[#5a5a5a]">68% Complete</span>
          </div>
          <Progress value={68} className="h-2 mb-3" />
          <div className="flex items-center gap-2 text-sm text-[#5a5a5a]">
            <Calendar className="w-4 h-4" />
            <span>12 days remaining this month</span>
          </div>
        </Card>

        {/* AI Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#C6A75E]" />
            <h3 className="text-lg font-semibold text-[#0F3D2E]">AI Recommendations</h3>
          </div>
          
          <div className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Card className="p-4 bg-white border-l-4 shadow-sm" style={{
                  borderLeftColor: rec.priority === 'high' ? '#E67E22' : '#1FAF6A'
                }}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-[#0F3D2E]">{rec.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.priority === 'high' 
                        ? 'bg-[#E67E22]/10 text-[#E67E22]' 
                        : 'bg-[#1FAF6A]/10 text-[#1FAF6A]'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-[#5a5a5a]">{rec.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-5 bg-white border-none shadow-sm">
          <h3 className="text-lg font-semibold text-[#0F3D2E] mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: "Updated corn inventory", time: "2 hours ago", icon: Package },
              { action: "New AI product suggestion", time: "5 hours ago", icon: Sparkles },
              { action: "Marketplace inquiry received", time: "1 day ago", icon: BarChart3 }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-[#0F3D2E]/5 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-[#1FAF6A]/10 flex items-center justify-center">
                  <activity.icon className="w-4 h-4 text-[#1FAF6A]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#0F3D2E]">{activity.action}</div>
                  <div className="text-xs text-[#5a5a5a]">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <MobileNav />
    </div>
  );
}