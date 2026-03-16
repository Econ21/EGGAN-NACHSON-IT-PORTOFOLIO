import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useUserProfile } from '../contexts/UserProfileContext';
import { toast } from 'sonner';
import { Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface AddSalesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSalesDialog({ open, onOpenChange }: AddSalesDialogProps) {
  const { profile, addSales } = useUserProfile();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [salesType, setSalesType] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [volume, setVolume] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [costPricePerUnit, setCostPricePerUnit] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct || !volume || !pricePerUnit || !costPricePerUnit) {
      toast.error('Lengkapi semua field yang diperlukan');
      return;
    }

    const numVolume = parseFloat(volume);
    const numPrice = parseFloat(pricePerUnit);
    const numCostPrice = parseFloat(costPricePerUnit);
    
    if (isNaN(numVolume) || numVolume <= 0) {
      toast.error('Volume harus lebih dari 0');
      return;
    }

    if (isNaN(numPrice) || numPrice <= 0) {
      toast.error('Harga jual harus lebih dari 0');
      return;
    }

    if (isNaN(numCostPrice) || numCostPrice <= 0) {
      toast.error('Harga modal harus lebih dari 0');
      return;
    }

    if (numCostPrice >= numPrice) {
      toast.error('Harga modal harus lebih rendah dari harga jual');
      return;
    }

    const productId = parseInt(selectedProduct);
    const product = profile.products.find(p => p.id === productId);

    if (!product) {
      toast.error('Produk tidak ditemukan');
      return;
    }

    if (product.stock < numVolume) {
      toast.error(`Stok tidak cukup! Tersedia: ${product.stock} kg`);
      return;
    }

    addSales(productId, numVolume, numPrice, new Date(date));
    
    const totalRevenue = numVolume * numPrice;
    const totalProfit = (numPrice - numCostPrice) * numVolume;
    toast.success(`Penjualan berhasil dicatat! Revenue: Rp ${totalRevenue.toLocaleString('id-ID')} | Profit: Rp ${totalProfit.toLocaleString('id-ID')}`);
    
    // Reset form
    setSelectedProduct('');
    setVolume('');
    setPricePerUnit('');
    setCostPricePerUnit('');
    setDate(format(new Date(), 'yyyy-MM-dd'));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#0F3D2E] text-xl flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#1FAF6A]" />
            Input Penjualan
          </DialogTitle>
          <DialogDescription className="text-[#5a5a5a]">
            Catat penjualan produk Anda untuk tracking revenue dan stok
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Pilih Produk */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Pilih Produk</Label>
            <select
              value={selectedProduct}
              onChange={(e) => {
                setSelectedProduct(e.target.value);
                // Auto-fill price from product
                const product = profile.products.find(p => p.id === parseInt(e.target.value));
                if (product) {
                  const priceMatch = product.price.match(/[\d,]+/);
                  if (priceMatch) {
                    const price = priceMatch[0].replace(/,/g, '');
                    setPricePerUnit(price);
                  }
                }
              }}
              className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A] bg-white text-[#0F3D2E]"
              required
            >
              <option value="">-- Pilih Produk --</option>
              {profile.products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.commodity}) - Stok: {product.stock} kg
                </option>
              ))}
            </select>
          </div>

          {/* Jenis Penjualan */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Jenis Penjualan</Label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 'daily', label: 'Harian' },
                { value: 'weekly', label: 'Mingguan' },
                { value: 'monthly', label: 'Bulanan' },
                { value: 'yearly', label: 'Tahunan' }
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSalesType(type.value as any)}
                  className={`px-3 py-2.5 rounded-lg border-2 text-sm transition-all font-medium ${
                    salesType === type.value
                      ? 'border-[#1FAF6A] bg-[#1FAF6A] text-white'
                      : 'border-[#0F3D2E]/20 text-[#5a5a5a] hover:border-[#1FAF6A]/50'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Volume & Price - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#0F3D2E] font-medium">Volume Terjual</Label>
              <input
                type="number"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#0F3D2E] font-medium">Harga Jual per Kg</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a5a]">Rp</span>
                <input
                  type="number"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(e.target.value)}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Harga Modal per Kg */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Harga Modal per Kg <span className="text-[#E67E22]">*</span></Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a5a]">Rp</span>
              <input
                type="number"
                value={costPricePerUnit}
                onChange={(e) => setCostPricePerUnit(e.target.value)}
                placeholder="0"
                className="w-full pl-10 pr-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A]"
                required
              />
            </div>
            <p className="text-xs text-[#5a5a5a] mt-1">
              Untuk menghitung profit margin yang akurat
            </p>
          </div>

          {/* Auto Calc Profit Preview */}
          {volume && pricePerUnit && costPricePerUnit && (
            <div className="p-4 bg-gradient-to-r from-[#1FAF6A]/5 to-[#2C8C82]/5 rounded-lg border border-[#1FAF6A]/20">
              <div className="text-sm text-[#5a5a5a] mb-3">Preview Penjualan</div>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <div className="text-xs text-[#5a5a5a]">Total Revenue</div>
                  <div className="text-base font-bold text-[#0F3D2E]">
                    Rp {(parseFloat(volume) * parseFloat(pricePerUnit)).toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#5a5a5a]">Total Cost</div>
                  <div className="text-base font-bold text-[#E67E22]">
                    Rp {(parseFloat(volume) * parseFloat(costPricePerUnit)).toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#5a5a5a]">Profit</div>
                  <div className="text-base font-bold text-[#1FAF6A]">
                    Rp {((parseFloat(volume) * parseFloat(pricePerUnit)) - (parseFloat(volume) * parseFloat(costPricePerUnit))).toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#5a5a5a]">Margin</div>
                  <div className="text-base font-bold text-[#1FAF6A]">
                    {(((parseFloat(pricePerUnit) - parseFloat(costPricePerUnit)) / parseFloat(pricePerUnit)) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tanggal */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Tanggal Penjualan</Label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A] pr-10"
                required
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a5a5a] pointer-events-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white"
            >
              Simpan Penjualan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}