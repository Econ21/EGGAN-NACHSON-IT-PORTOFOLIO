import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { MessageCircle, Mail, Instagram, Music, Globe } from "lucide-react";

interface SellerContact {
  whatsapp: string;
  email: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
}

interface SellerContactDialogProps {
  sellerName: string;
  productName: string;
  contact?: SellerContact;
}

const defaultContact: SellerContact = {
  whatsapp: "6281242457998",
  email: "miftah@gmail.com",
  instagram: "https://www.instagram.com/timurnetwork/",
  tiktok: "https://www.tiktok.com/@timurnetwork",
  website: "https://timurnetwork.org/"
};

export function SellerContactDialog({ sellerName, productName, contact = defaultContact }: SellerContactDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full border-[#1FAF6A] text-[#1FAF6A] hover:bg-[#1FAF6A] hover:text-white">
          Contact Seller
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#0F3D2E]">Contact {sellerName}</DialogTitle>
          <p className="text-sm text-[#5a5a5a]">{productName}</p>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-lg border border-[#0F3D2E]/10 hover:bg-[#1FAF6A]/5 hover:border-[#1FAF6A] transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#0F3D2E]">WhatsApp</div>
              <div className="text-xs text-[#5a5a5a]">Chat on WhatsApp</div>
            </div>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-4 p-4 rounded-lg border border-[#0F3D2E]/10 hover:bg-[#1FAF6A]/5 hover:border-[#1FAF6A] transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-[#EA4335]/10 flex items-center justify-center group-hover:bg-[#EA4335]/20 transition-colors">
              <Mail className="w-6 h-6 text-[#EA4335]" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#0F3D2E]">Email</div>
              <div className="text-xs text-[#5a5a5a]">{contact.email}</div>
            </div>
          </a>

          {contact.instagram && (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-[#0F3D2E]/10 hover:bg-[#1FAF6A]/5 hover:border-[#1FAF6A] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 flex items-center justify-center group-hover:from-[#833AB4]/20 group-hover:via-[#FD1D1D]/20 group-hover:to-[#F77737]/20 transition-all">
                <Instagram className="w-6 h-6 text-[#E4405F]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#0F3D2E]">Instagram</div>
                <div className="text-xs text-[#5a5a5a]">Follow on Instagram</div>
              </div>
            </a>
          )}

          {contact.tiktok && (
            <a
              href={contact.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-[#0F3D2E]/10 hover:bg-[#1FAF6A]/5 hover:border-[#1FAF6A] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#000000]/10 flex items-center justify-center group-hover:bg-[#000000]/20 transition-colors">
                <Music className="w-6 h-6 text-[#000000]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#0F3D2E]">TikTok</div>
                <div className="text-xs text-[#5a5a5a]">Follow on TikTok</div>
              </div>
            </a>
          )}

          {contact.website && (
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-[#0F3D2E]/10 hover:bg-[#1FAF6A]/5 hover:border-[#1FAF6A] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1FAF6A]/10 flex items-center justify-center group-hover:bg-[#1FAF6A]/20 transition-colors">
                <Globe className="w-6 h-6 text-[#1FAF6A]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#0F3D2E]">Website</div>
                <div className="text-xs text-[#5a5a5a]">{contact.website}</div>
              </div>
            </a>
          )}
        </div>

        <div className="mt-6 p-4 bg-[#F5F1E8] rounded-lg">
          <p className="text-xs text-[#5a5a5a]">
            <strong>Note:</strong> All sellers are required to provide a WhatsApp number. Instagram, TikTok, and website are optional but recommended.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
