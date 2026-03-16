import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useUserProfile } from '../contexts/UserProfileContext';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';
import { Calendar, Plus, Minus } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface UpdateStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateStockDialog({ open, onOpenChange }: UpdateStockDialogProps) {
  const { profile, updateStock } = useUserProfile();
  const { t } = useLanguage();
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [updateType, setUpdateType] = useState<'add' | 'reduce'>('add');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCommodity || !amount) {
      toast.error(t('profile.selectCommodityError'));
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error(t('profile.amountError'));
      return;
    }

    updateStock(selectedCommodity, updateType, numAmount, notes);
    
    const successMessage = updateType === 'add' 
      ? `${t('profile.addStockSuccess').replace('{amount}', numAmount.toString()).replace('{commodity}', selectedCommodity)}`
      : `${t('profile.reduceStockSuccess').replace('{amount}', numAmount.toString()).replace('{commodity}', selectedCommodity)}`;
    
    toast.success(successMessage);
    
    // Reset form
    setSelectedCommodity('');
    setAmount('');
    setNotes('');
    setDate(format(new Date(), 'yyyy-MM-dd'));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#0F3D2E] text-xl">{t('profile.updateStockTitle')}</DialogTitle>
          <DialogDescription className="text-[#5a5a5a]">
            {t('profile.updateStockDesc')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Pilih Komoditas */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">{t('profile.selectCommodity')}</Label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A] bg-white text-[#0F3D2E]"
              required
            >
              <option value="">{t('profile.selectCommodityPlaceholder')}</option>
              {profile.commodities.map((commodity) => (
                <option key={commodity.name} value={commodity.name}>
                  {commodity.name} ({t('profile.stock')}: {commodity.currentStock} / {commodity.totalCapacity} {commodity.unit})
                </option>
              ))}
            </select>
          </div>

          {/* Tipe Update */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">{t('profile.updateType')}</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUpdateType('add')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  updateType === 'add'
                    ? 'border-[#1FAF6A] bg-[#1FAF6A]/10 text-[#1FAF6A] font-medium'
                    : 'border-[#0F3D2E]/20 text-[#5a5a5a] hover:border-[#1FAF6A]/50'
                }`}
              >
                <Plus className="w-5 h-5" />
                {t('profile.addProduction')}
              </button>
              <button
                type="button"
                onClick={() => setUpdateType('reduce')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  updateType === 'reduce'
                    ? 'border-[#E67E22] bg-[#E67E22]/10 text-[#E67E22] font-medium'
                    : 'border-[#0F3D2E]/20 text-[#5a5a5a] hover:border-[#E67E22]/50'
                }`}
              >
                <Minus className="w-5 h-5" />
                {t('profile.manualReduction')}
              </button>
            </div>
          </div>

          {/* Jumlah */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">{t('profile.amount')}</Label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t('profile.enterAmount')}
                className="flex-1 px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A]"
                required
              />
              <div className="px-4 py-2.5 bg-[#F5F1E8] border border-[#0F3D2E]/10 rounded-lg text-[#5a5a5a] min-w-[70px] flex items-center justify-center">
                {selectedCommodity 
                  ? profile.commodities.find(c => c.name === selectedCommodity)?.unit || t('profile.ton')
                  : t('profile.ton')
                }
              </div>
            </div>
          </div>

          {/* Tanggal */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">{t('profile.date')}</Label>
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

          {/* Catatan */}
          <div className="space-y-2">
            <Label className="text-[#0F3D2E] font-medium">{t('profile.notesOptional')}</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('profile.addNotes')}
              rows={3}
              className="w-full px-4 py-2.5 border border-[#0F3D2E]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF6A] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white"
            >
              {t('profile.saveUpdateStock')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}