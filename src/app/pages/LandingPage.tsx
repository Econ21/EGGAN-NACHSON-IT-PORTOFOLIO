import rinLogo from "figma:asset/efeb7d0bd887f5db29735459340366b37c9a8673.png";
import timurLogo from "figma:asset/90fc08784087137556e7b4655635904407daf4ab.png";
import heroImage from "figma:asset/f2dddff10fce8c5cc0468d3c13d16d6eeadcbdb7.png";
import { Link } from "react-router";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Database, 
  Brain, 
  Sparkles, 
  ShoppingBag, 
  TrendingUp,
  Users,
  Sprout,
  BarChart3,
  Network
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SellerContactDialog } from "../components/SellerContactDialog";
import { useLanguage } from "../contexts/LanguageContext";

const coreModules = [
  {
    icon: Database,
    title: "Community Data Engine",
    description: "Digitize village economic assets, commodities, and capabilities into actionable data.",
    color: "#1FAF6A"
  },
  {
    icon: Brain,
    title: "AI Economic Translator",
    description: "Transform raw village data into market insights, pricing strategies, and demand forecasts.",
    color: "#2C8C82"
  },
  {
    icon: Sparkles,
    title: "AI Product Generator",
    description: "AI-powered product ideation from local commodities with margin analysis and feasibility scores.",
    color: "#C6A75E"
  },
  {
    icon: ShoppingBag,
    title: "Rural Market Link",
    description: "Direct marketplace connecting villages to buyers with transparent pricing and smart contracts.",
    color: "#E67E22"
  },
  {
    icon: TrendingUp,
    title: "Impact Intelligence",
    description: "Real-time tracking of economic growth, margin improvements, and community transformation.",
    color: "#E3B505"
  }
];

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1759261158814-e5c651e30714?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXJzJTIwd29ya2luZyUyMHJpY2UlMjBmaWVsZCUyMGhhcnZlc3R8ZW58MXx8fHwxNzcxNTkyMDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D2E]/85 via-[#0F3D2E]/75 to-[#1FAF6A]/60" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}<br />
              {t('hero.title2')}
            </h1>
            <p className="text-xl md:text-2xl text-[#F5F1E8] mb-12 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 backdrop-blur-sm"
              >
                <Link to="/data-engine">
                  {t('hero.join')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is RIN */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl text-[#5a5a5a] max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: t('about.data.title'),
                description: t('about.data.desc')
              },
              {
                icon: Brain,
                title: t('about.ai.title'),
                description: t('about.ai.desc')
              },
              {
                icon: TrendingUp,
                title: t('about.market.title'),
                description: t('about.market.desc')
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full border-[#0F3D2E]/10 hover:shadow-lg transition-shadow">
                  <item.icon className="w-12 h-12 text-[#1FAF6A] mb-4" />
                  <h3 className="text-xl font-semibold text-[#0F3D2E] mb-3">{item.title}</h3>
                  <p className="text-[#5a5a5a]">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section id="modules" className="relative py-24 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1762926565822-26d167b2bf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwYm9hdHMlMjBvY2VhbiUyMGNvYXN0YWwlMjB2aWxsYWdlJTIwYmx1ZSUyMHdhdGVyfGVufDF8fHx8MTc3MTU5NjY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#AFC9D8] via-[#9FBFD3] to-[#8FAEC4]" style={{ opacity: 0.92 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F3D2E]/5 to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-6">
              {t('modules.title')}
            </h2>
            <p className="text-xl text-[#2F3E46] max-w-3xl mx-auto">
              {t('modules.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: t('modules.data.title'),
                description: t('modules.data.desc'),
                color: "#1FAF6A"
              },
              {
                icon: Brain,
                title: t('modules.translator.title'),
                description: t('modules.translator.desc'),
                color: "#2C8C82"
              },
              {
                icon: Sparkles,
                title: t('modules.generator.title'),
                description: t('modules.generator.desc'),
                color: "#C6A75E"
              },
              {
                icon: ShoppingBag,
                title: t('modules.marketplace.title'),
                description: t('modules.marketplace.desc'),
                color: "#E67E22"
              },
              {
                icon: TrendingUp,
                title: t('modules.impact.title'),
                description: t('modules.impact.desc'),
                color: "#E3B505"
              }
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full bg-white/95 backdrop-blur-sm border-[#0F3D2E]/10 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${module.color}15` }}
                  >
                    <module.icon className="w-7 h-7" style={{ color: module.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F3D2E] mb-3">{module.title}</h3>
                  <p className="text-[#5a5a5a]">{module.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section id="impact" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-6">
              {t('impact.title')}
            </h2>
            <p className="text-xl text-[#5a5a5a] max-w-3xl mx-auto">
              {t('impact.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: t('impact.villages'), value: 127, suffix: "" },
              { label: t('impact.products'), value: 342, suffix: "" },
              { label: t('impact.transactions'), value: 1850, suffix: "" },
              { label: t('impact.growth'), value: 45, suffix: "%" }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-[#C6A75E] mb-2">
                  <CountUp end={metric.value} />
                  {metric.suffix}
                </div>
                <div className="text-lg text-[#5a5a5a]">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Product Showcase */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1689118398153-d24137d57e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwaGFydmVzdCUyMGFncmljdWx0dXJhbCUyMGZpZWxkJTIwZ29sZGVuJTIwd2hlYXQlMjBmYXJtfGVufDF8fHx8MTc3MTU5NjY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#C58B42]/75 via-[#B8824F]/70 to-[#D4A25A]/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('showcase.title')}
            </h2>
            <p className="text-xl text-white/95 max-w-3xl mx-auto mb-8">
              {t('showcase.description')}
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-white text-[#B8824F] hover:bg-[#F5F1E8]"
            >
              <Link to="/product-generator">
                {t('showcase.try')}
                <Sparkles className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                commodity: t('generator.corn'),
                product: "Premium Roasted Corn Snack",
                margin: "68%",
                market: "Urban Retail"
              },
              {
                commodity: t('generator.seaweed'),
                product: "Organic Seaweed Jelly Dessert",
                margin: "72%",
                market: "Health Food Stores"
              },
              {
                commodity: t('generator.moringa'),
                product: "Artisan Moringa Tea Blend",
                margin: "85%",
                market: "Premium Wellness"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/95 backdrop-blur-sm">
                  <div className="text-sm text-[#C58B42] font-medium mb-2">{t('showcase.from')}: {item.commodity}</div>
                  <h3 className="text-lg font-semibold text-[#0F3D2E] mb-4">{item.product}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#C58B42]">{item.margin}</div>
                      <div className="text-sm text-[#5a5a5a]">{t('showcase.margin')}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#5a5a5a]">{t('showcase.target')}</div>
                      <div className="font-medium text-[#0F3D2E]">{item.market}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="py-24 px-6 bg-[#F5F1E8]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3D2E] mb-6">
              {t('marketplace.title')}
            </h2>
            <p className="text-xl text-[#5a5a5a] max-w-3xl mx-auto mb-8">
              {t('marketplace.description')}
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white hover:opacity-90"
            >
              <Link to="/marketplace">
                {t('marketplace.browse')}
                <ShoppingBag className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { village: "Desa Makmur", product: `Organic ${t('generator.corn')}`, capacity: "2 tons/month" },
              { village: "Kampung Sejahtera", product: `Fresh ${t('generator.seaweed')}`, capacity: "500 kg/month" },
              { village: "Desa Harapan", product: `${t('generator.moringa')} Powder`, capacity: "150 kg/month" }
            ].map((item, index) => (
              <Card key={index} className="p-6 bg-white border-[#0F3D2E]/10 hover:shadow-lg transition-shadow">
                <Sprout className="w-10 h-10 text-[#1FAF6A] mb-4" />
                <div className="text-sm text-[#5a5a5a] mb-1">{item.village}</div>
                <h3 className="text-xl font-semibold text-[#0F3D2E] mb-2">{item.product}</h3>
                <div className="text-sm text-[#5a5a5a] mb-4">{t('marketplace.capacity')}: {item.capacity}</div>
                <SellerContactDialog 
                  sellerName={item.village}
                  productName={item.product}
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F3D2E] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src={rinLogo} 
              alt="RIN Logo" 
              className="w-14 h-14 object-contain"
            />
            <span className="text-xl font-semibold">Rural Intelligence Network</span>
          </div>
          <p className="text-[#F5F1E8] mb-6">
            {t('footer.description')}
          </p>
          <div className="h-px bg-white/20 mb-6"></div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <p className="text-sm text-[#D9C7A3]">Powered by</p>
            <div className="flex items-center gap-2">
              <img 
                src={timurLogo} 
                alt="Timur Network Foundation" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-sm text-[#D9C7A3]">TIMUR NETWORK FOUNDATION</span>
            </div>
          </div>
          <p className="text-xs text-[#D9C7A3] mt-2">
            {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}