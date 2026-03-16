import { useState } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  Calculator
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { MobileNav } from "../components/MobileNav";
import { Link } from "react-router";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Navbar } from "../components/Navbar";

const priceOptions = [3500, 4000, 4500, 5000, 5500, 6000];

export default function MarketSimulation() {
  const [units, setUnits] = useState("500");
  const [price, setPrice] = useState("4500");

  const unitsNum = parseInt(units) || 0;
  const priceNum = parseInt(price) || 0;
  
  const grossRevenue = unitsNum * priceNum;
  const productionCost = unitsNum * 15000; // Rp 15,000 per unit
  const netProfit = grossRevenue - productionCost;
  const roi = productionCost > 0 ? ((netProfit / productionCost) * 100).toFixed(1) : 0;

  const monthlyData = Array.from({ length: 6 }, (_, i) => ({
    month: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'][i],
    revenue: grossRevenue * (1 + i * 0.15),
    profit: netProfit * (1 + i * 0.15)
  }));

  const costBreakdown = [
    { category: 'Raw Materials', amount: productionCost * 0.4 },
    { category: 'Processing', amount: productionCost * 0.25 },
    { category: 'Packaging', amount: productionCost * 0.2 },
    { category: 'Labor', amount: productionCost * 0.15 }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-24">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2C8C82] to-[#1FAF6A] p-6 pb-8 mt-20">
        <Link to="/product-generator" className="text-white/80 text-sm mb-4 block">
          ← Back to Products
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-6 h-6 text-white" />
          <h1 className="text-2xl font-bold text-white">Revenue Simulation</h1>
        </div>
        <p className="text-white/90 text-sm">
          Calculate potential earnings and break-even timeline
        </p>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Product Info */}
        <Card className="p-5 bg-white shadow-md">
          <div className="text-sm text-[#5a5a5a] mb-1">Simulating</div>
          <div className="text-xl font-bold text-[#0F3D2E]">Premium Roasted Corn Snack</div>
        </Card>

        {/* Input Parameters */}
        <Card className="p-5 bg-white">
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Simulation Parameters</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="units">Units per Month (kg)</Label>
              <Input
                id="units"
                type="number"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="mt-1 bg-[#F5F1E8] border-[#0F3D2E]/10"
              />
            </div>

            <div>
              <Label htmlFor="price">Selling Price (Rp per kg)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 bg-[#F5F1E8] border-[#0F3D2E]/10"
              />
              <div className="mt-1 text-xs text-[#5a5a5a]">
                Recommended: Rp 40,000 - Rp 50,000
              </div>
            </div>

            <div className="pt-2">
              <div className="text-sm text-[#5a5a5a] mb-2">Production Cost per kg</div>
              <div className="text-2xl font-bold text-[#C6A75E]">Rp 15,000</div>
              <div className="text-xs text-[#5a5a5a] mt-1">Based on AI cost analysis</div>
            </div>
          </div>
        </Card>

        {/* Revenue Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-5 bg-gradient-to-br from-[#1FAF6A] to-[#2C8C82] text-white">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue Projection</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 opacity-80" />
                  <div className="text-xs opacity-90">Gross Revenue</div>
                </div>
                <div className="text-2xl font-bold">
                  Rp {(grossRevenue / 1000000).toFixed(1)}M
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 opacity-80" />
                  <div className="text-xs opacity-90">Net Profit</div>
                </div>
                <div className="text-2xl font-bold">
                  Rp {(netProfit / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm opacity-90">Return on Investment (ROI)</div>
                <div className="text-3xl font-bold">{roi}%</div>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#C6A75E]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(parseFloat(roi as string), 100)}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 6-Month Projection Chart */}
        <Card className="p-5 bg-white">
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">6-Month Growth Projection</h2>
          
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0F3D2E10" />
              <XAxis 
                dataKey="month" 
                stroke="#5a5a5a" 
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#5a5a5a" 
                style={{ fontSize: '10px' }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #0F3D2E20',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => `Rp ${(value / 1000000).toFixed(2)}M`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#1FAF6A" 
                strokeWidth={2}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#C6A75E" 
                strokeWidth={2}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1FAF6A]" />
              <span className="text-[#5a5a5a]">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C6A75E]" />
              <span className="text-[#5a5a5a]">Profit</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#1FAF6A]/10 rounded-lg">
            <div className="text-xs text-[#5a5a5a] mb-1">Projection Note</div>
            <div className="text-sm text-[#0F3D2E]">
              Assuming 15% growth per month based on market expansion and brand recognition
            </div>
          </div>
        </Card>

        {/* Cost Breakdown */}
        <Card className="p-5 bg-white">
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Cost Breakdown</h2>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={costBreakdown} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#0F3D2E10" />
              <XAxis 
                type="number"
                stroke="#5a5a5a" 
                style={{ fontSize: '10px' }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <YAxis 
                type="category"
                dataKey="category"
                stroke="#5a5a5a" 
                style={{ fontSize: '12px' }}
                width={80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #0F3D2E20',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => `Rp ${(value / 1000).toLocaleString()}`}
              />
              <Bar 
                dataKey="amount" 
                fill="#2C8C82"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Break-even Analysis */}
        <Card className="p-5 bg-white">
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4">Break-even Analysis</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F5F1E8] rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#1FAF6A]" />
                <div>
                  <div className="text-sm text-[#5a5a5a]">Break-even Time</div>
                  <div className="text-xl font-bold text-[#0F3D2E]">3 months</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#5a5a5a]">Investment Required</div>
                <div className="text-xl font-bold text-[#C6A75E]">Rp 25M</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F5F1E8] rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-[#2C8C82]" />
                <div>
                  <div className="text-sm text-[#5a5a5a]">Units to Break-even</div>
                  <div className="text-xl font-bold text-[#0F3D2E]">833 kg</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#5a5a5a]">Current Target</div>
                <div className="text-xl font-bold text-[#1FAF6A]">{units} kg/mo</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            className="border-[#0F3D2E]/20 text-[#0F3D2E] hover:bg-[#0F3D2E]/5"
          >
            Download Report
          </Button>
          <Link to="/marketplace">
            <Button 
              className="w-full bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white hover:opacity-90"
            >
              Start Selling
            </Button>
          </Link>
        </div>

        {/* Risk Disclaimer */}
        <Card className="p-4 bg-[#E3B505]/10 border-[#E3B505]/20">
          <div className="text-xs text-[#5a5a5a] mb-1">Disclaimer</div>
          <div className="text-sm text-[#0F3D2E]">
            This simulation is based on AI analysis and market trends. Actual results may vary based on market conditions, competition, and execution quality.
          </div>
        </Card>
      </div>

      <MobileNav />
    </div>
  );
}