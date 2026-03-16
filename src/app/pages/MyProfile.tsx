import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  User,
  Package,
  TrendingUp,
  Warehouse,
  ShoppingCart,
  FileText,
  Plus,
  Edit,
  Download,
  Calendar,
  BarChart3,
  DollarSign,
  Activity
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Navbar } from '../components/Navbar';
import { UpdateStockDialog } from '../components/UpdateStockDialog';
import { AddSalesDialog } from '../components/AddSalesDialog';
import { AddProductDialog } from '../components/AddProductDialog';
import { ExportReportDialog } from '../components/ExportReportDialog';
import { useUserProfile } from '../contexts/UserProfileContext';
import { useLanguage } from '../contexts/LanguageContext';
import { format } from 'date-fns';

export default function MyProfile() {
  const { profile } = useUserProfile();
  const { t } = useLanguage();
  const [showAddSales, setShowAddSales] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showExportReport, setShowExportReport] = useState(false);

  // Calculate totals
  const totalMonthlyProduction = profile.commodities.reduce((sum, c) => sum + c.monthlyProduction, 0);
  const totalCurrentStock = profile.commodities.reduce((sum, c) => sum + c.currentStock, 0);
  const totalActiveProducts = profile.products.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-white to-[#F5F1E8]">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#0F3D2E] mb-2">
                  {profile.name}
                </h1>
                <p className="text-[#5a5a5a]">
                  {profile.village}, {profile.province}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-[#1FAF6A]/10 rounded-full">
                  <div className="w-2 h-2 bg-[#1FAF6A] rounded-full"></div>
                  <span className="text-sm font-medium text-[#1FAF6A]">
                    {t('profile.activePartner')}
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowExportReport(true)}
                className="bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('profile.exportReport')}
              </Button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="p-4 bg-white border-[#0F3D2E]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1FAF6A]/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#1FAF6A]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F3D2E]">{profile.commodities.length}</div>
                    <div className="text-xs text-[#5a5a5a]">{t('profile.totalCommodities')}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white border-[#0F3D2E]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2C8C82]/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#2C8C82]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F3D2E]">{totalMonthlyProduction.toFixed(1)} {t('profile.ton')}</div>
                    <div className="text-xs text-[#5a5a5a]">{t('profile.monthlyProduction')}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white border-[#0F3D2E]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C6A75E]/10 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-[#C6A75E]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F3D2E]">{totalActiveProducts}</div>
                    <div className="text-xs text-[#5a5a5a]">{t('profile.activeProducts')}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white border-[#0F3D2E]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E67E22]/10 flex items-center justify-center">
                    <Warehouse className="w-5 h-5 text-[#E67E22]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F3D2E]">{totalCurrentStock.toFixed(1)} {t('profile.ton')}</div>
                    <div className="text-xs text-[#5a5a5a]">{t('profile.currentStock')}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white border-[#0F3D2E]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1FAF6A]/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#1FAF6A]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F3D2E]">Rp {(profile.totalRevenue / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-[#5a5a5a]">{t('profile.totalRevenue')}</div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Commodities Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0F3D2E]">{t('profile.commodityDetails')}</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAddStock(true)}
                className="border-[#1FAF6A] text-[#1FAF6A]"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('profile.updateStock')}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.commodities.map((commodity, index) => {
                const stockPercentage = (commodity.currentStock / commodity.totalCapacity) * 100;
                const productsCount = profile.products.filter(p => p.commodity === commodity.name).length;
                const monthlySales = profile.products
                  .filter(p => p.commodity === commodity.name)
                  .reduce((sum, p) => sum + p.sales, 0);

                return (
                  <Card key={index} className="p-5 bg-white border-[#0F3D2E]/10 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-[#0F3D2E] text-lg">{commodity.name}</h3>
                        <p className="text-sm text-[#5a5a5a]">{t('profile.capacity')}: {commodity.totalCapacity} {commodity.unit}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 text-[#5a5a5a]" />
                      </Button>
                    </div>

                    {/* Stock Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#5a5a5a]">{t('profile.currentStock')}</span>
                        <span className="text-sm font-medium text-[#0F3D2E]">
                          {commodity.currentStock} / {commodity.totalCapacity} {commodity.unit}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#F5F1E8] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            stockPercentage > 70 ? 'bg-[#1FAF6A]' :
                            stockPercentage > 30 ? 'bg-[#C6A75E]' : 'bg-[#E67E22]'
                          }`}
                          style={{ width: `${stockPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[#5a5a5a]">{t('profile.derivedProducts')}:</span>
                        <span className="font-medium text-[#0F3D2E]">{productsCount} {t('profile.myProducts').toLowerCase()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#5a5a5a]">{t('profile.monthlyProduction')}:</span>
                        <span className="font-medium text-[#0F3D2E]">{commodity.monthlyProduction} {commodity.unit}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#5a5a5a]">{t('profile.monthlySales')}:</span>
                        <span className="font-medium text-[#1FAF6A]">{monthlySales} kg</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#0F3D2E]/5">
                        <span className="text-[#5a5a5a]">{t('profile.lastUpdate')}:</span>
                        <span className="text-xs text-[#5a5a5a]">
                          {format(commodity.lastUpdated, 'dd MMM yyyy')}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* My Products Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#0F3D2E]">{t('profile.myProductsMarketplace')}</h2>
              <Button 
                onClick={() => setShowAddProduct(true)}
                className="bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('profile.addProduct')}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {profile.products.slice(0, 8).map((product) => (
                <Card key={product.id} className="p-4 bg-white border-[#0F3D2E]/10 hover:shadow-lg transition-shadow">
                  <div className="mb-3">
                    <h3 className="font-semibold text-[#0F3D2E] mb-1">{product.name}</h3>
                    <p className="text-xs text-[#5a5a5a]">{product.commodity}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5a5a5a]">{t('profile.price')}:</span>
                      <span className="font-medium text-[#1FAF6A]">{product.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5a5a5a]">{t('profile.stock')}:</span>
                      <span className="font-medium text-[#0F3D2E]">{product.stock} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5a5a5a]">{t('profile.sold')}:</span>
                      <span className="font-medium text-[#2C8C82]">{product.sales} kg</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#0F3D2E]/5">
                    <div className="text-xs text-[#5a5a5a] mb-1">{t('profile.revenue')}</div>
                    <div className="text-lg font-bold text-[#C6A75E]">
                      Rp {(product.revenue / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {profile.products.length > 8 && (
              <div className="text-center mt-4">
                <Button variant="outline">
                  {t('profile.viewAll')} ({profile.products.length})
                </Button>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <Card className="p-6 bg-gradient-to-br from-[#1FAF6A] to-[#2C8C82] text-white hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/product-generator" className="block">
                <Activity className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">AI Product Generator</h3>
                <p className="text-sm text-white/80">Generate produk baru dari komoditas Anda</p>
              </Link>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#2C8C82] to-[#1FAF6A] text-white hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/ai-translator" className="block">
                <BarChart3 className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">AI Economic Insights</h3>
                <p className="text-sm text-white/80">Analisis mendalam performa bisnis Anda</p>
              </Link>
            </Card>

            <Card 
              className="p-6 bg-gradient-to-br from-[#C6A75E] to-[#E67E22] text-white hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setShowAddSales(true)}
            >
              <FileText className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-1">Input Penjualan</h3>
              <p className="text-sm text-white/80">Catat penjualan harian/mingguan/bulanan</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#E67E22] to-[#C6A75E] text-white hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/marketplace" className="block">
                <ShoppingCart className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">Kelola Marketplace</h3>
                <p className="text-sm text-white/80">Atur produk dan harga di marketplace</p>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Dialogs */}
      <UpdateStockDialog open={showAddStock} onOpenChange={setShowAddStock} />
      <AddSalesDialog open={showAddSales} onOpenChange={setShowAddSales} />
      <AddProductDialog open={showAddProduct} onOpenChange={setShowAddProduct} />
      <ExportReportDialog open={showExportReport} onOpenChange={setShowExportReport} />
    </div>
  );
}