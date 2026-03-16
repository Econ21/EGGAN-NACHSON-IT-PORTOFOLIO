import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useUserProfile } from '../contexts/UserProfileContext';
import { toast } from 'sonner';
import { Package, Plus } from 'lucide-react';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const { profile, addProduct } = useUserProfile();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'commodity' | 'processed' | 'equipment'>('processed');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [minOrder, setMinOrder] = useState('1');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !selectedCommodity || !stock || !price || !costPrice) {
      toast.error('Lengkapi semua field yang diperlukan');
      return;
    }

    const numStock = parseFloat(stock);
    const numPrice = parseFloat(price);
    const numCostPrice = parseFloat(costPrice);
    
    if (isNaN(numStock) || numStock < 0) {
      toast.error('Stok harus valid');
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

    const newProduct = {
      name,
      commodity: selectedCommodity,
      price: `Rp ${numPrice.toLocaleString('id-ID')}/kg`,
      costPrice: numCostPrice,
      stock: numStock,
      sales: 0,
      revenue: 0
    };

    addProduct(newProduct);
    
    toast.success(`Produk "${name}" berhasil ditambahkan!`);
    
    // Reset form
    setName('');
    setCategory('processed');
    setSelectedCommodity('');
    setStock('');
    setPrice('');
    setCostPrice('');
    setMinOrder('1');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#0F3D2E] text-xl flex items-center gap-2">
            <Package className="w-6 h-6 text-[#1FAF6A]" />
            Tambah Produk Baru
          </DialogTitle>
          <DialogDescription className="text-[#5a5a5a]">
            Tambahkan produk baru ke marketplace Anda
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Nama Produk */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Nama Produk <span className="text-[#E67E22]">*</span></Label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Premium Organic Corn Flour"
              className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A]"
              required
            />
          </div>

          {/* Kategori */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Kategori <span className="text-[#E67E22]">*</span></Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'commodity', label: 'Komoditas' },
                { value: 'processed', label: 'Produk Olahan' },
                { value: 'equipment', label: 'Equipment' }
              ].map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value as any)}
                  className={`px-4 py-2.5 rounded-lg border-2 transition-all ${
                    category === cat.value
                      ? 'border-[#1FAF6A] bg-[#1FAF6A]/10 text-[#1FAF6A] font-medium'
                      : 'border-[#0F3D2E]/20 text-[#5a5a5a] hover:border-[#1FAF6A]/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Komoditas Dasar */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Komoditas Dasar <span className="text-[#E67E22]">*</span></Label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A] bg-white text-[#0F3D2E]"
              required
            >
              <option value="">-- Pilih Komoditas --</option>
              {profile.commodities.map((commodity) => (
                <option key={commodity.name} value={commodity.name}>
                  {commodity.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stok & Harga */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#0F3D2E] font-medium">Stok Awal <span className="text-[#E67E22]">*</span></Label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                  className="flex-1 px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A]"
                  required
                />
                <div className="px-3 py-2.5 bg-[#F5F1E8] border border-[#0F3D2E]/10 rounded-lg text-[#5a5a5a] text-sm">
                  kg
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#0F3D2E] font-medium">Harga Jual per Kg <span className="text-[#E67E22]">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a5a]">Rp</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="0"
                className="w-full pl-10 pr-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A]"
                required
              />
            </div>
            <p className="text-xs text-[#5a5a5a] mt-1">
              Harga modal mencakup biaya produksi, bahan baku, dan operasional
            </p>
          </div>

          {/* Auto Calculate Margin Preview */}
          {price && costPrice && (
            <div className="p-4 bg-gradient-to-r from-[#1FAF6A]/5 to-[#2C8C82]/5 rounded-lg border border-[#1FAF6A]/20">
              <div className="text-sm text-[#5a5a5a] mb-2">Preview Profit Margin</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-[#5a5a5a]">Harga Jual</div>
                  <div className="text-lg font-bold text-[#0F3D2E]">
                    Rp {parseFloat(price || '0').toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#5a5a5a]">Harga Modal</div>
                  <div className="text-lg font-bold text-[#E67E22]">
                    Rp {parseFloat(costPrice || '0').toLocaleString('id-ID')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#5a5a5a]">Margin</div>
                  <div className="text-lg font-bold text-[#1FAF6A]">
                    {price && costPrice ? (
                      ((parseFloat(price) - parseFloat(costPrice)) / parseFloat(price) * 100).toFixed(1)
                    ) : '0'}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Minimum Order */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Minimum Order (kg)</Label>
            <input
              type="number"
              step="0.1"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              placeholder="1"
              className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A]"
            />
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">Deskripsi Produk</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan kualitas, proses pembuatan, keunggulan produk..."
              rows={4}
              className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A] resize-none"
            />
          </div>

          {/* Preview */}
          {name && price && (
            <div className="p-4 bg-gradient-to-r from-[#F5F1E8] to-white rounded-lg border border-[#0F3D2E]/10">
              <div className="text-sm text-[#5a5a5a] mb-2">Preview Produk</div>
              <div className="font-semibold text-[#0F3D2E] text-lg">{name}</div>
              <div className="text-sm text-[#5a5a5a] mb-2">{selectedCommodity || 'Komoditas'}</div>
              <div className="text-lg font-bold text-[#1FAF6A]">
                Rp {parseFloat(price || '0').toLocaleString('id-ID')}/kg
              </div>
            </div>
          )}

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
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}