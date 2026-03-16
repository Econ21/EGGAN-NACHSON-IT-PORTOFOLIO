import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { CheckCircle2, Home, User } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1612958668852-797cdb4a70c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwZmFybWVyJTIwY2hpbGQlMjBzbWlsaW5nJTIwaGFydmVzdCUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzcxNTk3NTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')` 
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F3D2E]/85 via-[#1FAF6A]/75 to-[#0F3D2E]/80" />
      
      {/* Animated Background Zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1612958668852-797cdb4a70c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwZmFybWVyJTIwY2hpbGQlMjBzbWlsaW5nJTIwaGFydmVzdCUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzcxNTk3NTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')` 
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Subtle Particle Effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.3 
          }}
          className="inline-block mb-8"
        >
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/40">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Terima Kasih Telah Menjadi<br />
          <span className="text-[#D4B06A]">Mitra Desa RIN</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-white/95 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Langkah Anda hari ini bukan hanya tentang data.<br />
          Ini adalah awal dari perjalanan baru untuk meningkatkan nilai, memperkuat ekonomi desa, 
          dan membuka peluang yang lebih besar bagi generasi berikutnya.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Button 
            asChild
            size="lg"
            className="bg-white text-[#0F3D2E] hover:bg-[#F5F1E8] text-lg px-8 py-6 shadow-lg"
          >
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Kembali ke Halaman Utama
            </Link>
          </Button>
          
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 backdrop-blur-sm shadow-lg"
          >
            <Link to="/my-profile">
              <User className="w-5 h-5 mr-2" />
              Masuk ke My Profile
            </Link>
          </Button>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        />

        {/* Footer Message */}
        <motion.p
          className="mt-6 text-white/80 text-sm italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          "Bersama membangun ekonomi pedesaan yang berkelanjutan"
        </motion.p>
      </motion.div>
    </div>
  );
}