import { createContext, useContext, useState, ReactNode } from 'react';

export interface CommodityStock {
  name: string;
  currentStock: number;
  totalCapacity: number;
  unit: string;
  lastUpdated: Date;
  monthlyProduction: number;
}

export interface UserProduct {
  id: number;
  name: string;
  commodity: string;
  price: string;
  costPrice?: number; // Harga modal per kg
  stock: number;
  sales: number;
  revenue: number;
}

export interface SalesRecord {
  date: Date;
  commodity: string;
  amount: number;
  unit: string;
  revenue: number;
}

export interface UserProfile {
  name: string;
  village: string;
  province: string;
  economicScore: number;
  commodities: CommodityStock[];
  products: UserProduct[];
  salesHistory: SalesRecord[];
  totalRevenue: number;
  isPartner: boolean;
}

interface UserProfileContextType {
  profile: UserProfile;
  updateStock: (commodityName: string, type: 'add' | 'reduce', amount: number, notes?: string) => void;
  addSales: (productId: number, volume: number, pricePerUnit: number, date: Date) => void;
  addProduct: (product: Omit<UserProduct, 'id'>) => void;
  setProfile: (profile: UserProfile) => void;
}

const defaultProfile: UserProfile = {
  name: "Pak Miftah",
  village: "Desa Makmur",
  province: "Maluku",
  economicScore: 78,
  commodities: [
    {
      name: "Corn",
      currentStock: 12,
      totalCapacity: 24,
      unit: "ton",
      lastUpdated: new Date("2025-02-15"),
      monthlyProduction: 2.5
    },
    {
      name: "Moringa",
      currentStock: 0.8,
      totalCapacity: 2,
      unit: "ton",
      lastUpdated: new Date("2025-02-18"),
      monthlyProduction: 0.5
    },
    {
      name: "Cocoa",
      currentStock: 1.5,
      totalCapacity: 3,
      unit: "ton",
      lastUpdated: new Date("2025-02-17"),
      monthlyProduction: 0.8
    },
    {
      name: "Coffee",
      currentStock: 0.6,
      totalCapacity: 1.5,
      unit: "ton",
      lastUpdated: new Date("2025-02-19"),
      monthlyProduction: 0.3
    },
    {
      name: "Seaweed",
      currentStock: 0.4,
      totalCapacity: 1,
      unit: "ton",
      lastUpdated: new Date("2025-02-16"),
      monthlyProduction: 0.4
    }
  ],
  products: [
    {
      id: 1,
      name: "Premium Roasted Corn Snack",
      commodity: "Corn",
      price: "Rp 45,000/kg",
      costPrice: 20000, // Harga modal per kg
      stock: 500,
      sales: 1250,
      revenue: 56250000
    },
    {
      id: 2,
      name: "Organic Corn Flour",
      commodity: "Corn",
      price: "Rp 18,000/kg",
      costPrice: 10000, // Harga modal per kg
      stock: 1000,
      sales: 3200,
      revenue: 57600000
    },
    {
      id: 3,
      name: "Organic Moringa Tea",
      commodity: "Moringa",
      price: "Rp 120,000/kg",
      costPrice: 50000, // Harga modal per kg
      stock: 200,
      sales: 450,
      revenue: 54000000
    },
    {
      id: 4,
      name: "Moringa Powder (Bulk)",
      commodity: "Moringa",
      price: "Rp 95,000/kg",
      costPrice: 40000, // Harga modal per kg
      stock: 150,
      sales: 320,
      revenue: 30400000
    },
    {
      id: 5,
      name: "Artisan Cocoa Powder",
      commodity: "Cocoa",
      price: "Rp 85,000/kg",
      costPrice: 40000, // Harga modal per kg
      stock: 300,
      sales: 800,
      revenue: 68000000
    },
    {
      id: 6,
      name: "Premium Cocoa Nibs",
      commodity: "Cocoa",
      price: "Rp 105,000/kg",
      costPrice: 50000, // Harga modal per kg
      stock: 250,
      sales: 550,
      revenue: 57750000
    },
    {
      id: 7,
      name: "Specialty Coffee Beans",
      commodity: "Coffee",
      price: "Rp 180,000/kg",
      costPrice: 80000, // Harga modal per kg
      stock: 600,
      sales: 1100,
      revenue: 198000000
    },
    {
      id: 8,
      name: "Coffee Roasted (Medium)",
      commodity: "Coffee",
      price: "Rp 165,000/kg",
      costPrice: 70000, // Harga modal per kg
      stock: 400,
      sales: 680,
      revenue: 112200000
    },
    {
      id: 9,
      name: "Premium Seaweed Chips",
      commodity: "Seaweed",
      price: "Rp 65,000/kg",
      costPrice: 30000, // Harga modal per kg
      stock: 400,
      sales: 920,
      revenue: 59800000
    },
    {
      id: 10,
      name: "Seaweed Extract Powder",
      commodity: "Seaweed",
      price: "Rp 145,000/kg",
      costPrice: 60000, // Harga modal per kg
      stock: 150,
      sales: 280,
      revenue: 40600000
    },
    {
      id: 11,
      name: "Corn Tea Blend",
      commodity: "Corn",
      price: "Rp 42,000/100g",
      costPrice: 2000, // Harga modal per 100g
      stock: 800,
      sales: 450,
      revenue: 18900000
    },
    {
      id: 12,
      name: "Moringa Capsules",
      commodity: "Moringa",
      price: "Rp 135,000/bottle",
      costPrice: 60000, // Harga modal per bottle
      stock: 300,
      sales: 220,
      revenue: 29700000
    }
  ],
  salesHistory: [],
  totalRevenue: 783200000,
  isPartner: true
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateStock = (commodityName: string, type: 'add' | 'reduce', amount: number, notes?: string) => {
    setProfile(prev => ({
      ...prev,
      commodities: prev.commodities.map(c => 
        c.name === commodityName 
          ? { 
              ...c, 
              currentStock: type === 'add' ? c.currentStock + amount : c.currentStock - amount,
              totalCapacity: type === 'add' ? c.totalCapacity + amount : c.totalCapacity - amount,
              lastUpdated: new Date()
            }
          : c
      )
    }));
  };

  const addSales = (productId: number, volume: number, pricePerUnit: number, date: Date) => {
    const product = profile.products.find(p => p.id === productId);
    if (product) {
      const revenue = volume * pricePerUnit;
      setProfile(prev => ({
        ...prev,
        salesHistory: [{ date, commodity: product.commodity, amount: volume, unit: 'kg', revenue }, ...prev.salesHistory],
        totalRevenue: prev.totalRevenue + revenue,
        products: prev.products.map(p => 
          p.id === productId 
            ? { 
                ...p, 
                stock: p.stock - volume,
                sales: p.sales + volume,
                revenue: p.revenue + revenue
              }
            : p
        ),
        commodities: prev.commodities.map(c =>
          c.name === product.commodity
            ? { ...c, currentStock: c.currentStock - (volume / 1000) } // Convert kg to ton
            : c
        )
      }));
    }
  };

  const addProduct = (product: Omit<UserProduct, 'id'>) => {
    setProfile(prev => ({
      ...prev,
      products: [...prev.products, { ...product, id: prev.products.length + 1 }]
    }));
  };

  return (
    <UserProfileContext.Provider value={{ 
      profile, 
      updateStock, 
      addSales, 
      addProduct,
      setProfile 
    }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within UserProfileProvider');
  }
  return context;
}