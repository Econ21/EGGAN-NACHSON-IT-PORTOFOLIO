import { Home, Database, Brain, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Database, label: "Data", path: "/data-engine" },
  { icon: Brain, label: "AI", path: "/ai-translator" },
  { icon: ShoppingBag, label: "Market", path: "/marketplace" },
  { icon: User, label: "Profile", path: "/youth-agent" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#0F3D2E]/10 px-4 py-3 z-50 md:hidden">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 transition-colors"
            >
              <Icon 
                className={`w-5 h-5 ${
                  isActive ? "text-[#1FAF6A]" : "text-[#5a5a5a]"
                }`} 
              />
              <span 
                className={`text-xs ${
                  isActive ? "text-[#1FAF6A] font-medium" : "text-[#5a5a5a]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
