import { motion } from "motion/react";
import { 
  Award,
  CheckCircle,
  Users,
  TrendingUp,
  BookOpen,
  Activity,
  Target,
  Star
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { MobileNav } from "../components/MobileNav";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";

const achievements = [
  { title: "Data Validator", earned: true, icon: CheckCircle, color: "#1FAF6A" },
  { title: "Village Champion", earned: true, icon: Award, color: "#C6A75E" },
  { title: "AI Mentor", earned: false, icon: Star, color: "#5a5a5a" },
  { title: "Impact Leader", earned: false, icon: Target, color: "#5a5a5a" }
];

const recentActivities = [
  { 
    action: "Validated corn production data", 
    village: "Desa Makmur", 
    time: "2 hours ago",
    status: "completed"
  },
  { 
    action: "Conducted AI training session", 
    village: "Kampung Sejahtera", 
    time: "1 day ago",
    status: "completed"
  },
  { 
    action: "Marketplace setup assistance", 
    village: "Desa Harapan", 
    time: "2 days ago",
    status: "pending"
  }
];

const trainingModules = [
  { title: "Data Collection Basics", progress: 100, status: "completed" },
  { title: "AI Product Analysis", progress: 75, status: "in-progress" },
  { title: "Market Facilitation", progress: 30, status: "in-progress" },
  { title: "Impact Measurement", progress: 0, status: "not-started" }
];

const impactSummary = [
  { village: "Kampung Timur", status: "active", revenue: "Rp 12M", products: 8 }
];

export default function YouthAgentDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-24">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C6A75E] to-[#E67E22] p-6 pb-8 mt-20">
        <Link to="/dashboard" className="text-white/80 text-sm mb-4 block">
          ← Back to Dashboard
        </Link>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Youth Agent Portal</h1>
            <p className="text-white/90 text-sm">Facilitating village digital transformation</p>
          </div>
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Agent Profile Card */}
        <Card className="p-5 bg-white shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-[#5a5a5a] mb-1">Agent Name</div>
              <div className="text-xl font-bold text-[#0F3D2E]">Sarah Putri</div>
            </div>
            <Badge className="bg-[#1FAF6A] text-white">
              Level 2 Agent
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-[#1FAF6A]">8</div>
              <div className="text-xs text-[#5a5a5a]">Villages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#2C8C82]">156</div>
              <div className="text-xs text-[#5a5a5a]">Data Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#C6A75E]">92%</div>
              <div className="text-xs text-[#5a5a5a]">Accuracy</div>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <div>
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#1FAF6A]" />
            Performance Metrics
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#1FAF6A]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#1FAF6A]" />
                </div>
                <div>
                  <div className="text-sm text-[#5a5a5a]">Farmers Trained</div>
                  <div className="text-2xl font-bold text-[#0F3D2E]">45</div>
                </div>
              </div>
              <Progress value={75} className="h-1.5" />
              <div className="text-xs text-[#5a5a5a] mt-2">Target: 60</div>
            </Card>

            <Card className="p-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#2C8C82]/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#2C8C82]" />
                </div>
                <div>
                  <div className="text-sm text-[#5a5a5a]">Data Validated</div>
                  <div className="text-2xl font-bold text-[#0F3D2E]">156</div>
                </div>
              </div>
              <Progress value={85} className="h-1.5" />
              <div className="text-xs text-[#5a5a5a] mt-2">Target: 180</div>
            </Card>

            <Card className="p-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#C6A75E]/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#C6A75E]" />
                </div>
                <div>
                  <div className="text-sm text-[#5a5a5a]">Active Projects</div>
                  <div className="text-2xl font-bold text-[#0F3D2E]">12</div>
                </div>
              </div>
              <Progress value={60} className="h-1.5" />
              <div className="text-xs text-[#5a5a5a] mt-2">Ongoing</div>
            </Card>

            <Card className="p-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#E67E22]/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#E67E22]" />
                </div>
                <div>
                  <div className="text-sm text-[#5a5a5a]">Impact Score</div>
                  <div className="text-2xl font-bold text-[#0F3D2E]">8.7</div>
                </div>
              </div>
              <Progress value={87} className="h-1.5" />
              <div className="text-xs text-[#5a5a5a] mt-2">Excellent</div>
            </Card>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C6A75E]" />
            Achievements & Badges
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className={`p-4 ${
                    achievement.earned 
                      ? 'bg-white border-2' 
                      : 'bg-[#5a5a5a]/5 opacity-60'
                  }`}
                  style={{
                    borderColor: achievement.earned ? achievement.color : undefined
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto"
                    style={{ backgroundColor: `${achievement.color}15` }}
                  >
                    <achievement.icon 
                      className="w-6 h-6" 
                      style={{ color: achievement.color }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-[#0F3D2E] mb-1">
                      {achievement.title}
                    </div>
                    {achievement.earned ? (
                      <Badge className="bg-[#1FAF6A] text-white text-xs">
                        Earned
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-[#5a5a5a]/30 text-[#5a5a5a] text-xs">
                        Locked
                      </Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Training Modules */}
        <div>
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#2C8C82]" />
            AI Training Modules
          </h2>

          <div className="space-y-3">
            {trainingModules.map((module, index) => (
              <Card key={index} className="p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="font-semibold text-[#0F3D2E] mb-1">{module.title}</div>
                    <div className="text-sm text-[#5a5a5a]">{module.progress}% Complete</div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${
                      module.status === 'completed' 
                        ? 'bg-[#1FAF6A]/10 text-[#1FAF6A] border-0' 
                        : module.status === 'in-progress'
                        ? 'bg-[#E3B505]/10 text-[#E3B505] border-0'
                        : 'bg-[#5a5a5a]/10 text-[#5a5a5a] border-0'
                    }`}
                  >
                    {module.status === 'completed' ? 'Completed' : 
                     module.status === 'in-progress' ? 'In Progress' : 
                     'Not Started'}
                  </Badge>
                </div>
                <Progress value={module.progress} className="h-2" />
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div>
          <h2 className="text-lg font-semibold text-[#0F3D2E] mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#E67E22]" />
            Community Activity Log
          </h2>

          <Card className="p-5 bg-white">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 pb-4 border-b border-[#0F3D2E]/5 last:border-0 last:pb-0"
                >
                  <div 
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.status === 'completed' ? 'bg-[#1FAF6A]' : 'bg-[#E3B505]'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-sm text-[#0F3D2E] font-medium mb-1">
                      {activity.action}
                    </div>
                    <div className="text-xs text-[#5a5a5a]">
                      {activity.village} • {activity.time}
                    </div>
                  </div>
                  {activity.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-[#1FAF6A]" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[#E3B505]" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Impact Summary */}
        <Card className="p-5 bg-gradient-to-br from-[#0F3D2E] to-[#1FAF6A] text-white">
          <h3 className="text-lg font-semibold mb-3">Your Impact This Month</h3>
          <div className="space-y-3">
            {impactSummary.map((impact, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-white/90">Economic Value Created</span>
                <span className="text-xl font-bold">{impact.revenue}</span>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/90">Farmers Empowered</span>
              <span className="text-xl font-bold">45 people</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/90">Products Launched</span>
              <span className="text-xl font-bold">8 products</span>
            </div>
          </div>
        </Card>
      </div>

      <MobileNav />
    </div>
  );
}