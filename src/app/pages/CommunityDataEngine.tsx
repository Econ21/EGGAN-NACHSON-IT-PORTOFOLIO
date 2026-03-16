import { useState } from "react";
import { motion } from "motion/react";
import { 
  ChevronRight,
  Check,
  Wheat,
  Fish,
  Leaf,
  Coffee,
  Package,
  MapPin,
  User,
  Home,
  Plus,
  X
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { MobileNav } from "../components/MobileNav";
import { Link, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import { indonesianProvinces } from "../data/provinces";

const commodities = [
  { id: "corn", name: "Corn", icon: Wheat, color: "#E3B505" },
  { id: "seaweed", name: "Seaweed", icon: Fish, color: "#2C8C82" },
  { id: "moringa", name: "Moringa", icon: Leaf, color: "#1FAF6A" },
  { id: "cocoa", name: "Cocoa", icon: Coffee, color: "#C6A75E" },
  { id: "coffee", name: "Coffee", icon: Coffee, color: "#8B4513" },
  { id: "cassava", name: "Cassava", icon: Package, color: "#D2691E" },
  { id: "other", name: "Other", icon: Package, color: "#5a5a5a" }
];

// Multi-select options
const skillsOptions = [
  "Pengolahan hasil pertanian",
  "Pengemasan produk",
  "Produksi makanan olahan",
  "Kerajinan tangan",
  "Pengeringan tradisional",
  "Fermentasi",
  "Branding & desain kemasan",
  "Distribusi lokal",
  "E-commerce / pemasaran digital",
  "Manajemen koperasi",
  "Other"
];

const equipmentOptions = [
  "Mesin pengering",
  "Alat pengemas",
  "Mesin penggiling",
  "Mesin roasting",
  "Freezer",
  "Timbangan digital",
  "Kendaraan distribusi",
  "Gudang penyimpanan",
  "Cold storage",
  "Other"
];

const logisticsOptions = [
  "Dekat pelabuhan",
  "Dekat pasar kota",
  "Transportasi darat tersedia",
  "Transportasi laut tersedia",
  "Akses internet stabil",
  "Akses listrik stabil",
  "Other"
];

export default function CommunityDataEngine() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCommodities, setSelectedCommodities] = useState<string[]>([]);
  const [customCommodities, setCustomCommodities] = useState<string[]>([]);
  const [newCommodityInput, setNewCommodityInput] = useState("");
  
  // Multi-select states
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState("");
  
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [customEquipment, setCustomEquipment] = useState<string[]>([]);
  const [newEquipmentInput, setNewEquipmentInput] = useState("");
  
  const [selectedLogistics, setSelectedLogistics] = useState<string[]>([]);
  const [customLogistics, setCustomLogistics] = useState<string[]>([]);
  const [newLogisticsInput, setNewLogisticsInput] = useState("");
  
  const [formData, setFormData] = useState({
    // Step 1: Village Data
    villageName: "",
    villageType: "",
    population: "",
    
    // Step 2: PIC Data
    picName: "",
    whatsapp: "",
    instagram: "",
    tiktok: "",
    website: "",
    
    // Step 3: Location Data
    address: "",
    rt: "",
    rw: "",
    kelurahan: "",
    kecamatan: "",
    city: "",
    province: "",
    postalCode: "",
    pinLocation: "",
    
    // Step 4: Production Data
    monthlyVolume: "",
    qualityLevel: "",
    harvestSeason: "",
  });

  const steps = [
    { id: 1, title: t('dataEngine.step1') },
    { id: 2, title: t('dataEngine.step2') },
    { id: 3, title: t('dataEngine.step3') },
    { id: 4, title: t('dataEngine.step4') },
    { id: 5, title: t('dataEngine.step5') },
    { id: 6, title: t('dataEngine.step6') }
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pb-24">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F3D2E] to-[#1FAF6A] p-6 pb-8 mt-20">
        <Link to="/dashboard" className="text-white/80 text-sm mb-4 block">
          ← {t('dashboard.back')}
        </Link>
        <h1 className="text-2xl font-bold text-white mb-2">{t('dataEngine.title')}</h1>
        <p className="text-white/90 text-sm">
          {t('dataEngine.subtitle')}
        </p>
      </div>

      {/* Stepper */}
      <div className="px-6 -mt-4 mb-6">
        <Card className="p-4 bg-white shadow-md">
          <div className="flex items-center justify-between mb-2 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      currentStep > step.id
                        ? "bg-[#1FAF6A] text-white"
                        : currentStep === step.id
                        ? "bg-[#1FAF6A] text-white ring-4 ring-[#1FAF6A]/20"
                        : "bg-[#F5F1E8] text-[#5a5a5a]"
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={`text-xs mt-2 text-center hidden sm:block ${
                    currentStep >= step.id ? "text-[#0F3D2E] font-medium" : "text-[#5a5a5a]"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-colors ${
                      currentStep > step.id ? "bg-[#1FAF6A]" : "bg-[#F5F1E8]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile step indicator */}
          <div className="sm:hidden text-center mt-3">
            <span className="text-sm font-medium text-[#0F3D2E]">
              {steps[currentStep - 1]?.title}
            </span>
          </div>
        </Card>
      </div>

      {/* Form Content */}
      <div className="px-6">
        <Card className="p-6 bg-white shadow-md">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Village Data */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-6 h-6 text-[#1FAF6A]" />
                  <h2 className="text-xl font-semibold text-[#0F3D2E]">{t('step1.title')}</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="villageName">{t('step1.villageName')}</Label>
                    <Input
                      id="villageName"
                      placeholder={t('step1.villageName.placeholder')}
                      value={formData.villageName}
                      onChange={(e) => handleInputChange('villageName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="villageType">{t('step1.villageType')}</Label>
                    <Select value={formData.villageType} onValueChange={(val) => handleInputChange('villageType', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('step1.villageType.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agricultural">{t('step1.villageType.agricultural')}</SelectItem>
                        <SelectItem value="coastal">{t('step1.villageType.coastal')}</SelectItem>
                        <SelectItem value="mountain">{t('step1.villageType.mountain')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="population">{t('step1.population')}</Label>
                    <Input
                      id="population"
                      type="number"
                      placeholder={t('step1.population.placeholder')}
                      value={formData.population}
                      onChange={(e) => handleInputChange('population', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: PIC Data */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-[#1FAF6A]" />
                  <h2 className="text-xl font-semibold text-[#0F3D2E]">{t('step2.title')}</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="picName">{t('step2.fullName')}</Label>
                    <Input
                      id="picName"
                      placeholder={t('step2.fullName.placeholder')}
                      value={formData.picName}
                      onChange={(e) => handleInputChange('picName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">{t('step2.whatsapp')}</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder={t('step2.whatsapp.placeholder')}
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="instagram">{t('step2.instagram')}</Label>
                    <Input
                      id="instagram"
                      placeholder={t('step2.instagram.placeholder')}
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tiktok">{t('step2.tiktok')}</Label>
                    <Input
                      id="tiktok"
                      placeholder={t('step2.tiktok.placeholder')}
                      value={formData.tiktok}
                      onChange={(e) => handleInputChange('tiktok', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">{t('step2.website')}</Label>
                    <Input
                      id="website"
                      placeholder={t('step2.website.placeholder')}
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location Data */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-[#1FAF6A]" />
                  <h2 className="text-xl font-semibold text-[#0F3D2E]">{t('step3.title')}</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="address">{t('step3.address')}</Label>
                    <Textarea
                      id="address"
                      placeholder={t('step3.address.placeholder')}
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="rt">{t('step3.rt')}</Label>
                      <Input
                        id="rt"
                        placeholder={t('step3.rt.placeholder')}
                        value={formData.rt}
                        onChange={(e) => handleInputChange('rt', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="rw">{t('step3.rw')}</Label>
                      <Input
                        id="rw"
                        placeholder={t('step3.rw.placeholder')}
                        value={formData.rw}
                        onChange={(e) => handleInputChange('rw', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="kelurahan">{t('step3.kelurahan')}</Label>
                    <Input
                      id="kelurahan"
                      placeholder={t('step3.kelurahan.placeholder')}
                      value={formData.kelurahan}
                      onChange={(e) => handleInputChange('kelurahan', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="kecamatan">{t('step3.kecamatan')}</Label>
                    <Input
                      id="kecamatan"
                      placeholder={t('step3.kecamatan.placeholder')}
                      value={formData.kecamatan}
                      onChange={(e) => handleInputChange('kecamatan', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">{t('step3.city')}</Label>
                    <Input
                      id="city"
                      placeholder={t('step3.city.placeholder')}
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="province">{t('step3.province')}</Label>
                    <Select value={formData.province} onValueChange={(val) => handleInputChange('province', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('step3.province.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {indonesianProvinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="postalCode">{t('step3.postalCode')}</Label>
                    <Input
                      id="postalCode"
                      placeholder={t('step3.postalCode.placeholder')}
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pinLocation">{t('step3.pinLocation')}</Label>
                    <Input
                      id="pinLocation"
                      placeholder={t('step3.pinLocation.placeholder')}
                      value={formData.pinLocation}
                      onChange={(e) => handleInputChange('pinLocation', e.target.value)}
                    />
                    <div className="mt-3 p-4 bg-[#F5F1E8] rounded-lg border border-[#0F3D2E]/10">
                      <div className="flex items-center gap-2 text-sm text-[#5a5a5a] mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{t('step3.mapPreview')}</span>
                      </div>
                      <div className="w-full h-32 bg-white rounded flex items-center justify-center text-[#5a5a5a] text-sm">
                        Map preview placeholder
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Production Data */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-[#1FAF6A]" />
                  <h2 className="text-xl font-semibold text-[#0F3D2E]">{t('step4.title')}</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label>{t('step4.commodityType')}</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {commodities.map((commodity) => (
                        <button
                          key={commodity.id}
                          onClick={() => setSelectedCommodities(prev => {
                            if (prev.includes(commodity.id)) {
                              return prev.filter(id => id !== commodity.id);
                            } else {
                              return [...prev, commodity.id];
                            }
                          })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedCommodities.includes(commodity.id)
                              ? 'border-[#1FAF6A] bg-[#1FAF6A]/5'
                              : 'border-[#0F3D2E]/10 hover:border-[#1FAF6A]/30'
                          }`}
                        >
                          <commodity.icon className="w-6 h-6 mx-auto mb-2" style={{ color: commodity.color }} />
                          <div className="text-sm font-medium text-[#0F3D2E]">
                            {commodity.name}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Label>{t('step4.addCustomCommodity')}</Label>
                      <div className="flex items-center">
                        <Input
                          id="newCommodityInput"
                          placeholder={t('step4.addCustomCommodity.placeholder')}
                          value={newCommodityInput}
                          onChange={(e) => setNewCommodityInput(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (newCommodityInput.trim()) {
                              setCustomCommodities(prev => [...prev, newCommodityInput]);
                              setNewCommodityInput("");
                            }
                          }}
                        >
                          {t('button.add')}
                        </Button>
                      </div>
                      <div className="mt-2">
                        {customCommodities.map((commodity, index) => (
                          <div key={index} className="flex items-center mb-1">
                            <span className="text-sm text-[#0F3D2E] font-medium">{commodity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2"
                              onClick={() => setCustomCommodities(prev => prev.filter(c => c !== commodity))}
                            >
                              <X className="w-4 h-4 text-[#5a5a5a]" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="monthlyVolume">{t('step4.monthlyVolume')}</Label>
                    <Input
                      id="monthlyVolume"
                      placeholder={t('step4.monthlyVolume.placeholder')}
                      value={formData.monthlyVolume}
                      onChange={(e) => handleInputChange('monthlyVolume', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="qualityLevel">{t('step4.qualityLevel')}</Label>
                    <Select value={formData.qualityLevel} onValueChange={(val) => handleInputChange('qualityLevel', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('step4.qualityLevel.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium">{t('step4.qualityLevel.premium')}</SelectItem>
                        <SelectItem value="standard">{t('step4.qualityLevel.standard')}</SelectItem>
                        <SelectItem value="basic">{t('step4.qualityLevel.basic')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="harvestSeason">{t('step4.harvestSeason')}</Label>
                    <Select value={formData.harvestSeason} onValueChange={(val) => handleInputChange('harvestSeason', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('step4.harvestSeason.placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yearRound">{t('step4.harvestSeason.yearRound')}</SelectItem>
                        <SelectItem value="rainy">{t('step4.harvestSeason.rainy')}</SelectItem>
                        <SelectItem value="dry">{t('step4.harvestSeason.dry')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Community Assets */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-[#1FAF6A]" />
                  <h2 className="text-xl font-semibold text-[#0F3D2E]">{t('step5.title')}</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label>{t('step5.skills')}</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {skillsOptions.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => setSelectedSkills(prev => {
                            if (prev.includes(skill)) {
                              return prev.filter(s => s !== skill);
                            } else {
                              return [...prev, skill];
                            }
                          })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedSkills.includes(skill)
                              ? 'border-[#1FAF6A] bg-[#1FAF6A]/5'
                              : 'border-[#0F3D2E]/10 hover:border-[#1FAF6A]/30'
                          }`}
                        >
                          <div className="text-sm font-medium text-[#0F3D2E]">
                            {skill}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Label>{t('step5.addCustomSkill')}</Label>
                      <div className="flex items-center">
                        <Input
                          id="newSkillInput"
                          placeholder={t('step5.addCustomSkill.placeholder')}
                          value={newSkillInput}
                          onChange={(e) => setNewSkillInput(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (newSkillInput.trim()) {
                              setCustomSkills(prev => [...prev, newSkillInput]);
                              setNewSkillInput("");
                            }
                          }}
                        >
                          {t('button.add')}
                        </Button>
                      </div>
                      <div className="mt-2">
                        {customSkills.map((skill, index) => (
                          <div key={index} className="flex items-center mb-1">
                            <span className="text-sm text-[#0F3D2E] font-medium">{skill}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2"
                              onClick={() => setCustomSkills(prev => prev.filter(s => s !== skill))}
                            >
                              <X className="w-4 h-4 text-[#5a5a5a]" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>{t('step5.equipment')}</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {equipmentOptions.map((equipment) => (
                        <button
                          key={equipment}
                          onClick={() => setSelectedEquipment(prev => {
                            if (prev.includes(equipment)) {
                              return prev.filter(e => e !== equipment);
                            } else {
                              return [...prev, equipment];
                            }
                          })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedEquipment.includes(equipment)
                              ? 'border-[#1FAF6A] bg-[#1FAF6A]/5'
                              : 'border-[#0F3D2E]/10 hover:border-[#1FAF6A]/30'
                          }`}
                        >
                          <div className="text-sm font-medium text-[#0F3D2E]">
                            {equipment}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Label>{t('step5.addCustomEquipment')}</Label>
                      <div className="flex items-center">
                        <Input
                          id="newEquipmentInput"
                          placeholder={t('step5.addCustomEquipment.placeholder')}
                          value={newEquipmentInput}
                          onChange={(e) => setNewEquipmentInput(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (newEquipmentInput.trim()) {
                              setCustomEquipment(prev => [...prev, newEquipmentInput]);
                              setNewEquipmentInput("");
                            }
                          }}
                        >
                          {t('button.add')}
                        </Button>
                      </div>
                      <div className="mt-2">
                        {customEquipment.map((equipment, index) => (
                          <div key={index} className="flex items-center mb-1">
                            <span className="text-sm text-[#0F3D2E] font-medium">{equipment}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2"
                              onClick={() => setCustomEquipment(prev => prev.filter(e => e !== equipment))}
                            >
                              <X className="w-4 h-4 text-[#5a5a5a]" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>{t('step5.logistics')}</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {logisticsOptions.map((logistics) => (
                        <button
                          key={logistics}
                          onClick={() => setSelectedLogistics(prev => {
                            if (prev.includes(logistics)) {
                              return prev.filter(l => l !== logistics);
                            } else {
                              return [...prev, logistics];
                            }
                          })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedLogistics.includes(logistics)
                              ? 'border-[#1FAF6A] bg-[#1FAF6A]/5'
                              : 'border-[#0F3D2E]/10 hover:border-[#1FAF6A]/30'
                          }`}
                        >
                          <div className="text-sm font-medium text-[#0F3D2E]">
                            {logistics}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Label>{t('step5.addCustomLogistics')}</Label>
                      <div className="flex items-center">
                        <Input
                          id="newLogisticsInput"
                          placeholder={t('step5.addCustomLogistics.placeholder')}
                          value={newLogisticsInput}
                          onChange={(e) => setNewLogisticsInput(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (newLogisticsInput.trim()) {
                              setCustomLogistics(prev => [...prev, newLogisticsInput]);
                              setNewLogisticsInput("");
                            }
                          }}
                        >
                          {t('button.add')}
                        </Button>
                      </div>
                      <div className="mt-2">
                        {customLogistics.map((logistics, index) => (
                          <div key={index} className="flex items-center mb-1">
                            <span className="text-sm text-[#0F3D2E] font-medium">{logistics}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-2"
                              onClick={() => setCustomLogistics(prev => prev.filter(l => l !== logistics))}
                            >
                              <X className="w-4 h-4 text-[#5a5a5a]" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Review */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Check className="w-6 h-6 text-[#1FAF6A]" />
                  <h2 className="text-xl font-semibold text-[#0F3D2E]">{t('step6.title')}</h2>
                </div>

                <div className="space-y-4">
                  {/* Village Info */}
                  <Card className="p-4 bg-[#F5F1E8]/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#0F3D2E]">{t('step6.villageInfo')}</h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                        {t('step6.edit')}
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step1.villageName')}:</span>
                        <span className="text-[#0F3D2E] font-medium">{formData.villageName || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step1.villageType')}:</span>
                        <span className="text-[#0F3D2E] font-medium">{formData.villageType || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step1.population')}:</span>
                        <span className="text-[#0F3D2E] font-medium">{formData.population || '-'}</span>
                      </div>
                    </div>
                  </Card>

                  {/* PIC Info */}
                  <Card className="p-4 bg-[#F5F1E8]/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#0F3D2E]">{t('step6.picInfo')}</h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
                        {t('step6.edit')}
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step2.fullName')}:</span>
                        <span className="text-[#0F3D2E] font-medium">{formData.picName || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step2.whatsapp')}:</span>
                        <span className="text-[#0F3D2E] font-medium">{formData.whatsapp || '-'}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Location Info */}
                  <Card className="p-4 bg-[#F5F1E8]/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#0F3D2E]">{t('step6.locationInfo')}</h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)}>
                        {t('step6.edit')}
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step3.province')}:</span>
                        <span className="text-[#0F3D2E] font-medium">{formData.province || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step3.city')}:</span>
                        <span className="text-[#0F3D2E] font-medium">{formData.city || '-'}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Production Info */}
                  <Card className="p-4 bg-[#F5F1E8]/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#0F3D2E]">{t('step6.productionInfo')}</h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(4)}>
                        {t('step6.edit')}
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step4.commodityType')}:</span>
                        <span className="text-[#0F3D2E] font-medium">
                          {selectedCommodities.map(id => commodities.find(c => c.id === id)?.name).join(', ')}
                          {customCommodities.join(', ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step4.monthlyVolume')}:</span>
                        <span className="text-[#0F3D2E] font-medium">{formData.monthlyVolume || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5a5a5a]">{t('step4.qualityLevel')}:</span>
                        <span className="text-[#0F3D2E] font-medium">{formData.qualityLevel || '-'}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Assets Info */}
                  <Card className="p-4 bg-[#F5F1E8]/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[#0F3D2E]">{t('step6.assetsInfo')}</h3>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(5)}>
                        {t('step6.edit')}
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-[#5a5a5a]">{t('step5.skills')}:</span>
                        <p className="text-[#0F3D2E] mt-1">
                          {selectedSkills.join(', ')}
                          {customSkills.join(', ')}
                        </p>
                      </div>
                      <div>
                        <span className="text-[#5a5a5a]">{t('step5.equipment')}:</span>
                        <p className="text-[#0F3D2E] mt-1">
                          {selectedEquipment.join(', ')}
                          {customEquipment.join(', ')}
                        </p>
                      </div>
                      <div>
                        <span className="text-[#5a5a5a]">{t('step5.logistics')}:</span>
                        <p className="text-[#0F3D2E] mt-1">
                          {selectedLogistics.join(', ')}
                          {customLogistics.join(', ')}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                {t('button.back')}
              </Button>
            )}
            {currentStep < 6 ? (
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white hover:opacity-90"
              >
                {t('button.next')}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/thank-you')}
                className="flex-1 bg-gradient-to-r from-[#1FAF6A] to-[#2C8C82] text-white hover:opacity-90"
              >
                {t('step6.submit')}
              </Button>
            )}
          </div>
        </Card>
      </div>

      <MobileNav />
    </div>
  );
}