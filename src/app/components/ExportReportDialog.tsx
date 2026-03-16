import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useUserProfile } from '../contexts/UserProfileContext';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';
import { Download, FileText, Calendar, Loader2 } from 'lucide-react';
import { format, startOfQuarter, endOfQuarter, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { id, enUS } from 'date-fns/locale';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';

interface ExportReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportReportDialog({ open, onOpenChange }: ExportReportDialogProps) {
  const { profile } = useUserProfile();
  const { language, t } = useLanguage();
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | null>(null);
  const [selectedQuarters, setSelectedQuarters] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [fileFormat, setFileFormat] = useState<'pdf' | 'word'>('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const isQuarterType = reportType && ['Q1', 'Q2', 'Q3', 'Q4'].includes(reportType);
  const isDateType = reportType && ['daily', 'weekly', 'monthly'].includes(reportType);

  const handleReportTypeClick = (type: typeof reportType) => {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const dateTypes = ['daily', 'weekly', 'monthly'];
    
    if (quarters.includes(type as string)) {
      // Quarter selection
      if (selectedQuarters.includes(type as string)) {
        setSelectedQuarters(selectedQuarters.filter(q => q !== type));
      } else {
        setSelectedQuarters([...selectedQuarters, type as string]);
      }
      setReportType(null); // Clear single report type
    } else {
      // Date type selection
      setReportType(type);
      setSelectedQuarters([]); // Clear quarter selections
    }
  };

  const isReportTypeDisabled = (type: string): boolean => {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const dateTypes = ['daily', 'weekly', 'monthly'];
    
    if (quarters.includes(type)) {
      // Disable quarters if a date type is selected
      return dateTypes.includes(reportType as string);
    } else {
      // Disable date types if any quarter is selected
      return selectedQuarters.length > 0;
    }
  };

  const needsDatePicker = isDateType;
  const needsYearPicker = selectedQuarters.length > 0;

  const generateReportData = () => {
    // Calculate date range based on report type
    let startDate = new Date(selectedDate);
    let endDate = new Date(selectedDate);
    
    if (reportType === 'weekly') {
      startDate = startOfWeek(new Date(selectedDate), { locale: id });
      endDate = endOfWeek(new Date(selectedDate), { locale: id });
    } else if (reportType === 'monthly') {
      startDate = startOfMonth(new Date(selectedDate));
      endDate = endOfMonth(new Date(selectedDate));
    } else if (['Q1', 'Q2', 'Q3', 'Q4'].includes(reportType)) {
      const quarterNum = parseInt(reportType.slice(1));
      const quarterStart = new Date(parseInt(selectedYear), (quarterNum - 1) * 3, 1);
      startDate = startOfQuarter(quarterStart);
      endDate = endOfQuarter(quarterStart);
    }

    // Safe access with defaults
    const salesHistory = profile.salesHistory || [];
    const products = profile.products || [];
    const commodities = profile.commodities || [];

    // Filter sales history by date range
    const filteredSales = salesHistory.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= startDate && saleDate <= endDate;
    });

    // Calculate metrics
    const totalSales = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);
    const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.revenue, 0);
    
    // Top selling product
    const productSales = products.map(product => ({
      ...product,
      periodSales: filteredSales.filter(s => products.find(p => p.commodity === s.commodity)?.id === product.id)
        .reduce((sum, s) => sum + s.amount, 0),
      periodRevenue: filteredSales.filter(s => products.find(p => p.commodity === s.commodity)?.id === product.id)
        .reduce((sum, s) => sum + s.revenue, 0)
    }));
    
    const topProduct = productSales.sort((a, b) => b.periodRevenue - a.periodRevenue)[0];
    const highestRevenueProduct = productSales.sort((a, b) => b.periodRevenue - a.periodRevenue)[0];
    
    // Financial calculations
    const estimatedCost = totalRevenue * 0.65; // 65% cost estimate
    const grossProfit = totalRevenue - estimatedCost;
    const netProfit = grossProfit * 0.85; // 15% operational cost
    const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    // Inventory analysis
    const fastMoving = products.filter(p => p.sales > 500).sort((a, b) => b.sales - a.sales).slice(0, 3);
    const slowMoving = products.filter(p => p.sales < 200).sort((a, b) => a.sales - b.sales).slice(0, 3);
    
    const totalStock = commodities.reduce((sum, c) => sum + c.currentStock, 0);
    const totalCapacity = commodities.reduce((sum, c) => sum + c.totalCapacity, 0);
    const stockEfficiency = totalCapacity > 0 ? (totalStock / totalCapacity) * 100 : 0;

    return {
      period: {
        type: reportType,
        start: startDate,
        end: endDate,
        label: format(startDate, 'dd MMMM yyyy', { locale: id }) + ' - ' + format(endDate, 'dd MMMM yyyy', { locale: id })
      },
      commodities: commodities,
      sales: {
        total: totalSales,
        revenue: totalRevenue,
        topProduct: topProduct?.name || 'N/A',
        transactions: filteredSales.length
      },
      marketplace: {
        topSelling: topProduct?.name || 'N/A',
        highestRevenue: highestRevenueProduct?.name || 'N/A',
        avgPrice: products.length > 0 ? products.reduce((sum, p) => {
          const priceMatch = p.price.match(/[\d,]+/);
          return sum + (priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0);
        }, 0) / products.length : 0
      },
      finance: {
        revenue: totalRevenue,
        cost: estimatedCost,
        grossProfit,
        netProfit,
        margin
      },
      inventory: {
        fastMoving,
        slowMoving,
        efficiency: stockEfficiency
      },
      products: productSales,
      salesHistory: filteredSales
    };
  };

  const generateStrategicRecommendation = (data: ReturnType<typeof generateReportData>) => {
    const { finance, inventory, commodities, products } = data;
    
    // Paragraph 1: Performance Analysis
    const marginHealth = finance.margin > 20 ? 'sangat sehat' : finance.margin > 10 ? 'cukup baik' : 'perlu ditingkatkan';
    const para1 = `Berdasarkan analisis mendalam terhadap performa bisnis periode ${data.period.label}, usaha Anda menunjukkan total pendapatan sebesar Rp ${finance.revenue.toLocaleString('id-ID')} dengan margin keuntungan bersih ${finance.margin.toFixed(1)}% yang tergolong ${marginHealth}. Efisiensi stok saat ini berada pada level ${inventory.efficiency.toFixed(1)}%, menandakan ${inventory.efficiency > 70 ? 'kapasitas produksi yang optimal' : 'masih ada ruang untuk peningkatan kapasitas'}. Produk dengan performa terbaik adalah ${data.marketplace.topSelling} yang berkontribusi signifikan terhadap total revenue.`;

    // Paragraph 2: Operational Efficiency
    const topCommodity = commodities.sort((a, b) => b.monthlyProduction - a.monthlyProduction)[0];
    const para2 = `Untuk meningkatkan efisiensi operasional, disarankan untuk fokus pada optimalisasi rotasi stok komoditas ${topCommodity.name} yang memiliki produksi bulanan tertinggi (${topCommodity.monthlyProduction} ${topCommodity.unit}). ${inventory.slowMoving.length > 0 ? `Produk slow-moving seperti ${inventory.slowMoving[0].name} perlu strategi promosi khusus atau penyesuaian harga untuk meningkatkan perputaran.` : 'Semua produk menunjukkan perputaran yang baik.'} Implementasi sistem tracking waste dan quality control yang lebih ketat dapat mengurangi kerugian operasional hingga 15-20%. Pertimbangkan juga untuk meningkatkan packaging produk unggulan guna memperluas jangkauan pasar.`;

    // Paragraph 3: Strategic Growth
    const highMarginProducts = products.filter(p => p.sales > 300).slice(0, 2);
    const para3 = `Rekomendasi strategis untuk pertumbuhan bisnis meliputi diversifikasi produk olahan dari komoditas existing, khususnya ${highMarginProducts.map(p => p.commodity).join(' dan ')} yang menunjukkan demand pasar yang kuat. Peluang ekspansi pasar dapat dimaksimalkan melalui kemitraan dengan distributor regional dan penetrasi pasar digital. ${finance.margin < 15 ? 'Evaluasi ulang struktur biaya dan negosiasi dengan supplier untuk meningkatkan margin keuntungan.' : 'Margin keuntungan yang sehat membuka peluang untuk reinvestasi pada infrastruktur produksi dan R&D produk baru.'} Investasi pada branding dan sertifikasi organik dapat meningkatkan nilai jual produk hingga 30-40%. Jangka panjang, pertimbangkan vertikal integration untuk mengontrol supply chain dan meningkatkan profitabilitas.`;

    return { para1, para2, para3 };
  };

  const generatePDF = async () => {
    const data = generateReportData();
    
    const doc = new jsPDF();
    
    // ==================== PAGE 1: PREMIUM COVER PAGE ====================
    // White background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Subtle light green accent bar at top
    doc.setFillColor(241, 250, 246); // Very light green #F1FAF6
    doc.rect(0, 0, 210, 50, 'F');
    
    // Elegant top decorative lines
    doc.setDrawColor(31, 175, 106); // Emerald green
    doc.setLineWidth(0.8);
    doc.line(75, 75, 135, 75);
    doc.setLineWidth(0.3);
    doc.line(75, 78, 135, 78);
    
    // Main Title - Deep Green and Bold
    doc.setFontSize(36);
    doc.setTextColor(15, 61, 46); // #0F3D2E
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.cover.title'), 105, 105, { align: 'center' });
    
    // Subtitle - Emerald Green
    doc.setFontSize(14);
    doc.setTextColor(31, 175, 106); // #1FAF6A emerald green
    doc.setFont('helvetica', 'normal');
    doc.text(t('report.cover.subtitle'), 105, 120, { align: 'center' });
    
    // Professional divider line
    doc.setDrawColor(15, 61, 46);
    doc.setLineWidth(0.5);
    doc.line(55, 135, 155, 135);
    
    // Dynamic Information Box
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    let yInfo = 155;
    
    doc.text(`${t('report.cover.partnerName')}: ${profile.name}`, 105, yInfo, { align: 'center' });
    yInfo += 7;
    doc.text(`${t('report.cover.location')}: ${profile.village}, ${profile.province}`, 105, yInfo, { align: 'center' });
    yInfo += 7;
    doc.text(`${t('report.cover.reportPeriod')}: ${data.period.label}`, 105, yInfo, { align: 'center' });
    yInfo += 7;
    const dateLocale = language === 'id' ? id : enUS;
    doc.text(`${t('report.cover.generatedDate')}: ${format(new Date(), 'dd MMMM yyyy', { locale: dateLocale })}`, 105, yInfo, { align: 'center' });
    
    // Professional Tagline - Gold accent
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(198, 167, 94); // #C6A75E (Gold)
    doc.text(t('report.cover.tagline1'), 105, 245, { align: 'center' });
    doc.text(t('report.cover.tagline2'), 105, 253, { align: 'center' });
    
    // Footer branding with subtle background
    doc.setFillColor(241, 250, 246);
    doc.rect(0, 270, 210, 27, 'F');
    doc.setFontSize(8);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'normal');
    doc.text(t('report.cover.poweredBy'), 105, 285, { align: 'center' });
    
    // ==================== PAGE 2: PROFIL KOMODITAS ====================
    doc.addPage();
    let yPos = 30;
    
    // Page Header with professional spacing
    doc.setFontSize(22);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.commodity.title'), 105, yPos, { align: 'center' });
    yPos += 5;
    
    // Section divider
    doc.setDrawColor(31, 175, 106);
    doc.setLineWidth(1);
    doc.line(60, yPos, 150, yPos);
    yPos += 15;
    
    // Table: Komoditas - 85% width, centered (pageWidth = 210, 85% = 178.5, leftMargin = 15.75)
    const pageWidth = 210;
    const tableWidth = pageWidth * 0.85;
    const leftMargin = (pageWidth - tableWidth) / 2;
    
    const commodityTableData = data.commodities.map(c => [
      c.name,
      `${c.currentStock.toFixed(2)} ${c.unit}`,
      `${c.totalCapacity.toFixed(2)} ${c.unit}`,
      `${c.monthlyProduction.toFixed(2)} ${c.unit}/${language === 'id' ? 'bulan' : 'month'}`,
      format(c.lastUpdated, 'dd MMM yyyy', { locale: dateLocale })
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [[t('report.commodity.name'), t('report.commodity.currentStock'), t('report.commodity.capacity'), t('report.commodity.production'), t('report.commodity.lastUpdate')]],
      body: commodityTableData,
      theme: 'striped',
      headStyles: { 
        fillColor: [31, 175, 106],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
        halign: 'center'
      },
      styles: { 
        fontSize: 9,
        cellPadding: 5,
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [245, 241, 232] // Soft Earth Beige
      },
      margin: { left: leftMargin, right: leftMargin }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 20;
    
    // Summary metrics in professional box
    const totalStockValue = data.commodities.reduce((sum, c) => sum + c.currentStock, 0);
    const totalCapacityValue = data.commodities.reduce((sum, c) => sum + c.totalCapacity, 0);
    const utilizationRate = totalCapacityValue > 0 ? (totalStockValue / totalCapacityValue * 100) : 0;
    
    doc.setFontSize(11);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'normal');
    
    doc.text(`${t('report.commodity.totalStock')}: ${totalStockValue.toFixed(2)} ${t('report.commodity.ton')}`, 105, yPos, { align: 'center' });
    yPos += 7;
    doc.text(`${t('report.commodity.utilization')}: ${utilizationRate.toFixed(1)}%`, 105, yPos, { align: 'center' });
    yPos += 15;
    
    // ==================== PAGE 3: PENJUALAN ====================
    doc.addPage();
    yPos = 20;
    
    // Header
    doc.setFontSize(16);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.sales.title'), 20, yPos);
    yPos += 10;
    
    // Calculate real data from sales and products
    const totalVolumeSold = data.products.reduce((sum, p) => sum + p.sales, 0);
    const totalTransactions = data.salesHistory.length;
    const totalSalesRevenue = data.products.reduce((sum, p) => sum + p.revenue, 0);
    
    // Summary metrics
    doc.setFontSize(11);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'normal');
    
    doc.text(`${t('report.sales.totalVolume')}: ${totalVolumeSold.toFixed(1)} ${t('report.sales.kg')}`, 20, yPos);
    yPos += 7;
    doc.text(`${t('report.sales.totalTransactions')}: ${totalTransactions}`, 20, yPos);
    yPos += 7;
    doc.text(`${t('report.sales.totalRevenue')}: Rp ${totalSalesRevenue.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`, 20, yPos);
    yPos += 12;
    
    // Top Products by Volume
    const topByVolume = [...data.products]
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
    
    doc.setFontSize(12);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.sales.topByVolume'), 20, yPos);
    yPos += 8;
    
    const topVolumeTableData = topByVolume.map(p => [
      p.name,
      p.commodity,
      `${p.sales.toFixed(1)} ${t('report.sales.kg')}`,
      p.price
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [[t('report.sales.product'), t('report.sales.commodity'), t('report.sales.volumeSold'), t('report.sales.price')]],
      body: topVolumeTableData,
      theme: 'grid',
      headStyles: { fillColor: [31, 175, 106] },
      styles: { fontSize: 9 }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 12;
    
    // Top Products by Revenue
    const topByRevenue = [...data.products]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
    
    doc.setFontSize(12);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.sales.topByRevenue'), 20, yPos);
    yPos += 8;
    
    const topRevenueTableData = topByRevenue.map(p => [
      p.name,
      `${p.sales.toFixed(1)} ${t('report.sales.kg')}`,
      p.price,
      `Rp ${p.revenue.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [[t('report.sales.product'), t('report.sales.volume'), t('report.sales.price'), t('report.sales.revenue')]],
      body: topRevenueTableData,
      theme: 'grid',
      headStyles: { fillColor: [31, 175, 106] },
      styles: { fontSize: 9 }
    });
    
    // ==================== PAGE 4: PERFORMA MARKETPLACE ====================
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(16);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.marketplace.title'), 20, yPos);
    yPos += 12;
    
    // Calculate weighted average price
    let totalWeightedPrice = 0;
    let totalWeight = 0;
    data.products.forEach(p => {
      const priceMatch = p.price.match(/[\d,]+/);
      if (priceMatch && p.sales > 0) {
        const price = parseFloat(priceMatch[0].replace(/,/g, ''));
        totalWeightedPrice += price * p.sales;
        totalWeight += p.sales;
      }
    });
    const avgPrice = totalWeight > 0 ? totalWeightedPrice / totalWeight : 0;
    
    // Metrics
    doc.setFontSize(11);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'normal');
    
    doc.text(`${t('report.marketplace.topSelling')}: ${topByVolume[0]?.name || '-'}`, 20, yPos);
    yPos += 7;
    doc.text(`${t('report.marketplace.highestRevenue')}: ${topByRevenue[0]?.name || '-'}`, 20, yPos);
    yPos += 7;
    doc.text(`${t('report.marketplace.avgPrice')}: Rp ${avgPrice.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}/kg`, 20, yPos);
    yPos += 7;
    doc.text(`${t('report.marketplace.totalRevenue')}: Rp ${totalSalesRevenue.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`, 20, yPos);
    yPos += 7;
    doc.text(`${t('report.marketplace.totalTransactions')}: ${totalTransactions}`, 20, yPos);
    yPos += 12;
    
    // Performance table
    doc.setFontSize(12);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.marketplace.performanceDetail'), 20, yPos);
    yPos += 8;
    
    const performanceTableData = topByRevenue.map(p => {
      const priceMatch = p.price.match(/[\\d,]+/);
      const price = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0;
      return [
        p.name,
        `${p.sales.toFixed(1)} ${t('report.sales.kg')}`,
        `Rp ${price.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
        `Rp ${p.revenue.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
        `${((p.revenue / totalSalesRevenue) * 100).toFixed(1)}%`
      ];
    });
    
    autoTable(doc, {
      startY: yPos,
      head: [[t('report.sales.product'), t('report.sales.volume'), t('report.sales.price'), t('report.sales.revenue'), t('report.marketplace.share')]],
      body: performanceTableData,
      theme: 'grid',
      headStyles: { fillColor: [31, 175, 106] },
      styles: { fontSize: 9 }
    });
    
    // ==================== PAGE 5: PRICE TREND ANALYSIS ====================
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(16);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.priceTrend.title'), 20, yPos);
    yPos += 12;
    
    // For each commodity, show price analysis WITH CHART
    data.commodities.slice(0, 2).forEach((commodity, idx) => {
      if (idx > 0) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(13);
      doc.setTextColor(31, 175, 106);
      doc.setFont('helvetica', 'bold');
      doc.text(`${commodity.name}`, 20, yPos);
      yPos += 10;
      
      // Simulated market data (in real app, this would be from API)
      const userProducts = data.products.filter(p => p.commodity === commodity.name);
      const userAvgPrice = userProducts.length > 0 
        ? userProducts.reduce((sum, p) => {
            const priceMatch = p.price.match(/[\d,]+/);
            return sum + (priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0);
          }, 0) / userProducts.length
        : 0;
      
      const marketPrice = userAvgPrice * 0.85; // Simulated market price (15% lower)
      const priceDiff = ((userAvgPrice - marketPrice) / marketPrice) * 100;
      
      doc.setFontSize(10);
      doc.setTextColor(15, 61, 46);
      doc.setFont('helvetica', 'normal');
      
      doc.text(`${t('report.priceTrend.userPrice')}: Rp ${userAvgPrice.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}/kg`, 20, yPos);
      yPos += 6;
      doc.text(`${t('report.priceTrend.marketPrice')}: Rp ${marketPrice.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}/kg`, 20, yPos);
      yPos += 6;
      doc.text(`${t('report.priceTrend.difference')}: ${priceDiff >= 0 ? '+' : ''}${priceDiff.toFixed(1)}%`, 20, yPos);
      yPos += 12;
      
      // ===== PRICE CHART (LINE CHART) =====
      doc.setFontSize(11);
      doc.setTextColor(31, 175, 106);
      doc.setFont('helvetica', 'bold');
      doc.text(t('report.priceTrend.priceChart'), 20, yPos);
      yPos += 8;
      
      // Chart dimensions
      const chartX = 20;
      const chartY = yPos;
      const chartWidth = 170;
      const chartHeight = 60;
      
      // Draw chart background
      doc.setFillColor(250, 250, 250);
      doc.rect(chartX, chartY, chartWidth, chartHeight, 'F');
      
      // Draw grid lines
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.3);
      for (let i = 0; i <= 4; i++) {
        const y = chartY + (chartHeight / 4) * i;
        doc.line(chartX, y, chartX + chartWidth, y);
      }
      
      // Simulated 6-month price data
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
      const userPrices = [
        userAvgPrice * 0.92,
        userAvgPrice * 0.95,
        userAvgPrice * 0.98,
        userAvgPrice * 1.00,
        userAvgPrice * 1.02,
        userAvgPrice
      ];
      const marketPrices = userPrices.map(p => p * 0.85);
      
      const maxPrice = Math.max(...userPrices, ...marketPrices);
      const minPrice = Math.min(...userPrices, ...marketPrices);
      const priceRange = maxPrice - minPrice;
      
      // Draw user price line (emerald green)
      doc.setDrawColor(31, 175, 106);
      doc.setLineWidth(2);
      for (let i = 0; i < userPrices.length - 1; i++) {
        const x1 = chartX + (chartWidth / (userPrices.length - 1)) * i;
        const y1 = chartY + chartHeight - ((userPrices[i] - minPrice) / priceRange * chartHeight);
        const x2 = chartX + (chartWidth / (userPrices.length - 1)) * (i + 1);
        const y2 = chartY + chartHeight - ((userPrices[i + 1] - minPrice) / priceRange * chartHeight);
        doc.line(x1, y1, x2, y2);
      }
      
      // Draw market price line (orange)
      doc.setDrawColor(230, 126, 34);
      doc.setLineWidth(2);
      for (let i = 0; i < marketPrices.length - 1; i++) {
        const x1 = chartX + (chartWidth / (marketPrices.length - 1)) * i;
        const y1 = chartY + chartHeight - ((marketPrices[i] - minPrice) / priceRange * chartHeight);
        const x2 = chartX + (chartWidth / (marketPrices.length - 1)) * (i + 1);
        const y2 = chartY + chartHeight - ((marketPrices[i + 1] - minPrice) / priceRange * chartHeight);
        doc.line(x1, y1, x2, y2);
      }
      
      // Draw data points
      userPrices.forEach((price, i) => {
        const x = chartX + (chartWidth / (userPrices.length - 1)) * i;
        const y = chartY + chartHeight - ((price - minPrice) / priceRange * chartHeight);
        doc.setFillColor(31, 175, 106);
        doc.circle(x, y, 2, 'F');
      });
      
      marketPrices.forEach((price, i) => {
        const x = chartX + (chartWidth / (marketPrices.length - 1)) * i;
        const y = chartY + chartHeight - ((price - minPrice) / priceRange * chartHeight);
        doc.setFillColor(230, 126, 34);
        doc.circle(x, y, 2, 'F');
      });
      
      // Chart legend
      yPos = chartY + chartHeight + 8;
      doc.setFontSize(8);
      
      // User price legend
      doc.setFillColor(31, 175, 106);
      doc.rect(chartX, yPos - 2, 3, 3, 'F');
      doc.setTextColor(15, 61, 46);
      doc.setFont('helvetica', 'normal');
      doc.text(t('report.priceTrend.userPrice'), chartX + 5, yPos + 1);
      
      // Market price legend
      doc.setFillColor(230, 126, 34);
      doc.rect(chartX + 60, yPos - 2, 3, 3, 'F');
      doc.text(t('report.priceTrend.marketPrice'), chartX + 65, yPos + 1);
      
      yPos += 10;
      
      // AI Insight
      doc.setFontSize(9);
      doc.setTextColor(90, 90, 90);
      doc.setFont('helvetica', 'italic');
      const insight = language === 'id'
        ? `Produk ${commodity.name} menunjukkan harga jual yang kompetitif dengan margin positif ${priceDiff.toFixed(1)}% di atas harga pasar. Ini mengindikasikan nilai tambah yang baik dari proses pengolahan dan branding produk. Rekomendasi: pertahankan kualitas premium dan strategi positioning saat ini.`
        : `${commodity.name} products show competitive selling prices with a positive margin of ${priceDiff.toFixed(1)}% above market price. This indicates good value-add from processing and product branding. Recommendation: maintain premium quality and current positioning strategy.`;
      const splitInsight = doc.splitTextToSize(insight, 170);
      doc.text(splitInsight, 20, yPos);
      yPos += splitInsight.length * 4 + 10;
    });
    
    // ==================== PAGE 6: MITRA GROWTH TREND ====================
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(16);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.growth.title'), 20, yPos);
    yPos += 12;
    
    // Simulated growth data (in real app, calculate from historical data)
    const revenueGrowth = 15.5; // %
    const volumeGrowth = 12.3; // %
    const marginGrowth = 2.1; // %
    
    doc.setFontSize(11);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'normal');
    
    doc.text(`${t('report.growth.revenueGrowth')}: +${revenueGrowth}%`, 20, yPos);
    yPos += 7;
    doc.text(`${t('report.growth.volumeGrowth')}: +${volumeGrowth}%`, 20, yPos);
    yPos += 7;
    doc.text(`${t('report.growth.marginGrowth')}: +${marginGrowth}%`, 20, yPos);
    yPos += 15;
    
    // Growth analysis
    doc.setFontSize(12);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.growth.analysisTitle'), 20, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    doc.setFont('helvetica', 'normal');
    const growthAnalysis = language === 'id'
      ? `Berdasarkan data historis, mitra menunjukkan tren pertumbuhan yang positif dengan peningkatan revenue sebesar ${revenueGrowth}% dan volume penjualan ${volumeGrowth}%. Margin keuntungan juga mengalami peningkatan ${marginGrowth}%, menandakan efisiensi operasional yang membaik. Momentum pertumbuhan ini didorong oleh diversifikasi produk dan ekspansi pasar yang efektif.`
      : `Based on historical data, the partner shows a positive growth trend with revenue increases of ${revenueGrowth}% and sales volume ${volumeGrowth}%. Profit margins also increased by ${marginGrowth}%, indicating improved operational efficiency. This growth momentum is driven by product diversification and effective market expansion.`;
    const splitGrowth = doc.splitTextToSize(growthAnalysis, 170);
    doc.text(splitGrowth, 20, yPos);
    yPos += splitGrowth.length * 5 + 15;
    
    // ==================== PAGE 7: SEASONAL DEMAND FORECAST ====================
    doc.addPage();
    yPos = 20;
    
    doc.setFontSize(16);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.forecast.title'), 20, yPos);
    yPos += 12;
    
    doc.setFontSize(11);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'normal');
    doc.text(t('report.forecast.subtitle'), 20, yPos);
    yPos += 10;
    
    // Forecast table (simulated AI forecasting)
    const forecastData = language === 'id'
      ? [
          ['Maret 2025', 'Corn, Coffee', '+18%', 'Musim panen tinggi'],
          ['April 2025', 'Seaweed, Moringa', '+25%', 'Peak demand musiman'],
          ['Mei 2025', 'Cocoa', '+12%', 'Peningkatan moderate'],
          ['Juni 2025', 'Coffee', '+30%', 'Festival kopi lokal'],
          ['Juli 2025', 'Corn, Seaweed', '+15%', 'Stabil high demand'],
          ['Agustus 2025', 'All Products', '+8%', 'Normalisasi demand']
        ]
      : [
          ['March 2025', 'Corn, Coffee', '+18%', 'High Harvest Season'],
          ['April 2025', 'Seaweed, Moringa', '+25%', 'Peak Seasonal Demand'],
          ['May 2025', 'Cocoa', '+12%', 'Moderate Increase'],
          ['June 2025', 'Coffee', '+30%', 'Local Coffee Festival'],
          ['July 2025', 'Corn, Seaweed', '+15%', 'Stable High Demand'],
          ['August 2025', 'All Products', '+8%', 'Demand Normalization']
        ];
    
    autoTable(doc, {
      startY: yPos,
      head: [[t('report.forecast.period'), t('report.forecast.topProducts'), t('report.forecast.projectedGrowth'), t('report.forecast.notes')]],
      body: forecastData,
      theme: 'grid',
      headStyles: { fillColor: [31, 175, 106] },
      styles: { fontSize: 9 }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 12;
    
    // AI Insights
    doc.setFontSize(12);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.forecast.insightsTitle'), 20, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    doc.setFont('helvetica', 'normal');
    const forecastInsight = language === 'id'
      ? `Proyeksi menunjukkan peningkatan demand signifikan untuk produk Coffee di bulan Juni (+30%) dan Seaweed/Moringa di April (+25%). Rekomendasi: tingkatkan kapasitas produksi untuk komoditas tersebut mulai 2 bulan sebelumnya, dan pastikan stok bahan baku mencukupi. Peluang untuk pre-order dan bundling produk sangat potensial di periode peak demand.`
      : `Forecast shows significant demand increase for Coffee in June (+30%) and Seaweed/Moringa in April (+25%). Recommendation: increase production capacity for these commodities 2 months in advance and ensure sufficient raw material stock. Pre-order and product bundling opportunities are highly potential during peak demand periods.`;
    const splitForecast = doc.splitTextToSize(forecastInsight, 170);
    doc.text(splitForecast, 20, yPos);
    
    // ==================== PAGE 8: LAPORAN KEUANGAN (LANDSCAPE) ====================
    doc.addPage('a4', 'landscape');
    yPos = 20;
    
    // Landscape dimensions
    const landscapeWidth = 297;
    const landscapeTableWidth = landscapeWidth * 0.85;
    const landscapeLeftMargin = (landscapeWidth - landscapeTableWidth) / 2;
    
    // Centered Title
    doc.setFontSize(20);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.financial.title'), 148.5, yPos, { align: 'center' });
    yPos += 8;
    
    // Divider
    doc.setDrawColor(31, 175, 106);
    doc.setLineWidth(1.5);
    doc.line(100, yPos, 197, yPos);
    yPos += 15;
    
    // Calculate financial data
    const financialData = data.products.map(p => {
      const priceMatch = p.price.match(/[\d,]+/);
      const sellingPrice = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : 0;
      const costPrice = p.costPrice || sellingPrice * 0.65;
      const volume = p.sales;
      const revenue = sellingPrice * volume;
      const totalCost = costPrice * volume;
      const grossProfit = revenue - totalCost;
      const margin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
      
      return {
        name: p.name,
        volume,
        sellingPrice,
        costPrice,
        revenue,
        totalCost,
        grossProfit,
        margin
      };
    });
    
    // A. REVENUE - CENTERED TABLE
    doc.setFontSize(13);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.financial.revenueSection'), landscapeLeftMargin, yPos);
    yPos += 8;
    
    const revenueTableData = financialData.map(f => [
      f.name,
      `${f.volume.toFixed(1)} kg`,
      `Rp ${f.sellingPrice.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
      `Rp ${f.revenue.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`
    ]);
    
    const totalRevenue = financialData.reduce((sum, f) => sum + f.revenue, 0);
    revenueTableData.push([
      t('report.financial.total'),
      '',
      '',
      `Rp ${totalRevenue.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [[t('report.financial.product'), t('report.financial.volume'), t('report.financial.sellingPrice'), t('report.financial.totalRevenue')]],
      body: revenueTableData,
      theme: 'striped',
      headStyles: { 
        fillColor: [31, 175, 106],
        fontSize: 10,
        halign: 'center',
        fontStyle: 'bold'
      },
      styles: { fontSize: 9, cellPadding: 4, halign: 'center' },
      alternateRowStyles: { fillColor: [245, 241, 232] },
      margin: { left: landscapeLeftMargin, right: landscapeLeftMargin },
      didParseCell: (data) => {
        if (data.row.index === revenueTableData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [198, 167, 94]; // Gold
          data.cell.styles.textColor = [255, 255, 255];
        }
      }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 12;
    
    // B. BIAYA PRODUKSI - CENTERED TABLE
    doc.setFontSize(13);
    doc.setTextColor(230, 126, 34);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.financial.costSection'), landscapeLeftMargin, yPos);
    yPos += 8;
    
    const costTableData = financialData.map(f => [
      f.name,
      `${f.volume.toFixed(1)} kg`,
      `Rp ${f.costPrice.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
      `Rp ${f.totalCost.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`
    ]);
    
    const totalCost = financialData.reduce((sum, f) => sum + f.totalCost, 0);
    costTableData.push([
      t('report.financial.total'),
      '',
      '',
      `Rp ${totalCost.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [[t('report.financial.product'), t('report.financial.volume'), t('report.financial.costPrice'), t('report.financial.totalCost')]],
      body: costTableData,
      theme: 'striped',
      headStyles: { 
        fillColor: [230, 126, 34],
        fontSize: 10,
        halign: 'center',
        fontStyle: 'bold'
      },
      styles: { fontSize: 9, cellPadding: 4, halign: 'center' },
      alternateRowStyles: { fillColor: [245, 241, 232] },
      margin: { left: landscapeLeftMargin, right: landscapeLeftMargin },
      didParseCell: (data) => {
        if (data.row.index === costTableData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [230, 126, 34];
          data.cell.styles.textColor = [255, 255, 255];
        }
      }
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 12;
    
    // C, D, E. GROSS PROFIT, NET PROFIT & MARGIN - CENTERED TABLE
    doc.setFontSize(13);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.financial.profitSection'), landscapeLeftMargin, yPos);
    yPos += 8;
    
    const totalGrossProfit = financialData.reduce((sum, f) => sum + f.grossProfit, 0);
    const overallMargin = totalRevenue > 0 ? (totalGrossProfit / totalRevenue) * 100 : 0;
    
    const profitMarginTableData = financialData.map(f => [
      f.name,
      `Rp ${f.revenue.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
      `Rp ${f.totalCost.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
      `Rp ${f.grossProfit.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
      `${f.margin.toFixed(1)}%`
    ]);
    
    profitMarginTableData.push([
      t('report.financial.totalAvg'),
      `Rp ${totalRevenue.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
      `Rp ${totalCost.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
      `Rp ${totalGrossProfit.toLocaleString(language === 'id' ? 'id-ID' : 'en-US')}`,
      `${overallMargin.toFixed(1)}%`
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [[t('report.financial.product'), t('report.financial.revenue'), t('report.financial.cost'), t('report.financial.netProfit'), t('report.financial.margin')]],
      body: profitMarginTableData,
      theme: 'striped',
      headStyles: { 
        fillColor: [31, 175, 106],
        fontSize: 10,
        halign: 'center',
        fontStyle: 'bold'
      },
      styles: { fontSize: 9, cellPadding: 4, halign: 'center' },
      alternateRowStyles: { fillColor: [245, 241, 232] },
      margin: { left: landscapeLeftMargin, right: landscapeLeftMargin },
      columnStyles: {
        4: { fontStyle: 'bold', textColor: [31, 175, 106] }
      },
      didParseCell: (data) => {
        if (data.row.index === profitMarginTableData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [31, 175, 106];
          data.cell.styles.textColor = [255, 255, 255];
        }
      }
    });
    
    // ==================== PAGE 9: STRATEGIC RECOMMENDATION (PORTRAIT) ====================
    doc.addPage('a4', 'portrait');
    yPos = 30;
    
    // Title
    doc.setFontSize(26);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.strategy.title'), 105, yPos, { align: 'center' });
    yPos += 8;
    
    doc.setDrawColor(31, 175, 106);
    doc.setLineWidth(1.5);
    doc.line(40, yPos, 170, yPos);
    yPos += 20;
    
    // Get strategic recommendations
    const recommendation = generateStrategicRecommendation(data);
    
    // Paragraph 1: Current Position Analysis
    doc.setFontSize(12);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.strategy.section1'), leftMargin, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    const para1Lines = doc.splitTextToSize(recommendation.para1, tableWidth);
    doc.text(para1Lines, leftMargin, yPos, { align: 'justify', maxWidth: tableWidth });
    yPos += para1Lines.length * 5 + 12;
    
    // Paragraph 2: Operational Excellence
    doc.setFontSize(12);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.strategy.section2'), leftMargin, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    const para2Lines = doc.splitTextToSize(recommendation.para2, tableWidth);
    doc.text(para2Lines, leftMargin, yPos, { align: 'justify', maxWidth: tableWidth });
    yPos += para2Lines.length * 5 + 12;
    
    // Paragraph 3: Strategic Growth Vision
    doc.setFontSize(12);
    doc.setTextColor(31, 175, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(t('report.strategy.section3'), leftMargin, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    const para3Lines = doc.splitTextToSize(recommendation.para3, tableWidth);
    doc.text(para3Lines, leftMargin, yPos, { align: 'justify', maxWidth: tableWidth });
    yPos += para3Lines.length * 5 + 15;
    
    // Closing signature box
    doc.setFillColor(245, 241, 232);
    doc.roundedRect(leftMargin, yPos, tableWidth, 25, 3, 3, 'F');
    
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    doc.setFont('helvetica', 'italic');
    doc.text(t('report.strategy.generatedBy'), leftMargin + tableWidth/2, yPos + 10, { align: 'center' });
    doc.text(t('report.strategy.poweredBy'), leftMargin + tableWidth/2, yPos + 17, { align: 'center' });
    
    // Save PDF
    const filename = `Laporan_Mitra_RIN_${profile.name.replace(/\s+/g, '_')}_${format(new Date(), 'yyyyMMdd')}.pdf`;
    doc.save(filename);
  };

  const generateWord = async () => {
    const data = generateReportData();
    const recommendation = generateStrategicRecommendation(data);

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Header
          new Paragraph({
            text: 'LAPORAN EKONOMI DESA',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: 'Rural Intelligence Network',
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          
          // Profile
          new Paragraph({
            children: [
              new TextRun({ text: `Nama Mitra: `, bold: true }),
              new TextRun(profile.name)
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Lokasi: `, bold: true }),
              new TextRun(`${profile.village}, ${profile.province}`)
            ],
            spacing: { after: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Periode Laporan: `, bold: true }),
              new TextRun(data.period.label)
            ],
            spacing: { after: 400 }
          }),

          // Section 1
          new Paragraph({
            text: '1. PROFIL KOMODITAS',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 200 }
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'Komoditas', bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Stok', bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Kapasitas', bold: true })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Update', bold: true })] })
                ]
              }),
              ...data.commodities.map(c => new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(c.name)] }),
                  new TableCell({ children: [new Paragraph(`${c.currentStock} ${c.unit}`)] }),
                  new TableCell({ children: [new Paragraph(`${c.totalCapacity} ${c.unit}`)] }),
                  new TableCell({ children: [new Paragraph(format(c.lastUpdated, 'dd/MM/yyyy'))] })
                ]
              }))
            ]
          }),

          // Section 2
          new Paragraph({
            text: '2. PENJUALAN',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Total Volume: `, bold: true }),
              new TextRun(`${data.sales.total.toFixed(2)} kg`)
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Total Revenue: `, bold: true }),
              new TextRun(`Rp ${data.sales.revenue.toLocaleString('id-ID')}`)
            ]
          }),

          // Section 6: Recommendation
          new Paragraph({
            text: '6. REKOMENDASI STRATEGIS',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          }),
          new Paragraph({
            text: recommendation.para1,
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: recommendation.para2,
            spacing: { after: 200 }
          }),
          new Paragraph({
            text: recommendation.para3,
            spacing: { after: 200 }
          })
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    const filename = `Laporan_RIN_${profile.name.replace(/\s+/g, '_')}_${reportType}_${format(new Date(), 'yyyyMMdd')}.docx`;
    saveAs(blob, filename);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      if (fileFormat === 'pdf') {
        await generatePDF();
        toast.success('Laporan PDF berhasil diunduh!');
      } else {
        await generateWord();
        toast.success('Laporan Word berhasil diunduh!');
      }
      
      setTimeout(() => {
        onOpenChange(false);
        setIsGenerating(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Gagal membuat laporan. Silakan coba lagi.');
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#0F3D2E] text-xl flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#C6A75E]" />
            Export Laporan
          </DialogTitle>
          <DialogDescription className="text-[#5a5a5a]">
            Generate laporan lengkap dengan analisis dan rekomendasi strategis
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Report Type */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Tipe Laporan</Label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 'daily', label: 'Harian' },
                { value: 'weekly', label: 'Mingguan' },
                { value: 'monthly', label: 'Bulanan' },
                { value: 'Q1', label: 'Q1' },
                { value: 'Q2', label: 'Q2' },
                { value: 'Q3', label: 'Q3' },
                { value: 'Q4', label: 'Q4' }
              ].map((type) => {
                const isQuarter = ['Q1', 'Q2', 'Q3', 'Q4'].includes(type.value);
                const isSelected = isQuarter 
                  ? selectedQuarters.includes(type.value)
                  : reportType === type.value;
                const isDisabled = isReportTypeDisabled(type.value);

                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => !isDisabled && handleReportTypeClick(type.value as any)}
                    disabled={isDisabled}
                    className={`px-2 py-2 rounded-lg border-2 text-sm transition-all ${
                      isSelected
                        ? 'border-[#C6A75E] bg-[#C6A75E] text-white font-medium'
                        : isDisabled
                        ? 'border-[#0F3D2E]/10 text-[#5a5a5a]/40 bg-gray-50 cursor-not-allowed'
                        : 'border-[#0F3D2E]/20 text-[#5a5a5a] hover:border-[#C6A75E]/50'
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Picker */}
          {needsDatePicker && (
            <div className="space-y-2">
              <Label className="text-[#0F3D2E] font-medium">Pilih Tanggal</Label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A75E] pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a5a5a] pointer-events-none" />
              </div>
            </div>
          )}

          {/* Year Picker */}
          {needsYearPicker && (
            <div className="space-y-2">
              <Label className="text-[#0F3D2E] font-medium">Pilih Tahun</Label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A75E] bg-white"
              >
                {[2024, 2025, 2026].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          )}

          {/* File Format */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Format File</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFileFormat('pdf')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  fileFormat === 'pdf'
                    ? 'border-[#E67E22] bg-[#E67E22]/10 text-[#E67E22] font-medium'
                    : 'border-[#0F3D2E]/20 text-[#5a5a5a] hover:border-[#E67E22]/50'
                }`}
              >
                <FileText className="w-5 h-5" />
                PDF
              </button>
              <button
                type="button"
                onClick={() => setFileFormat('word')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  fileFormat === 'word'
                    ? 'border-[#2C8C82] bg-[#2C8C82]/10 text-[#2C8C82] font-medium'
                    : 'border-[#0F3D2E]/20 text-[#5a5a5a] hover:border-[#2C8C82]/50'
                }`}
              >
                <FileText className="w-5 h-5" />
                Word (.docx)
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-[#C6A75E] to-[#E67E22] text-white py-6 text-base"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Generate Laporan {fileFormat.toUpperCase()}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}