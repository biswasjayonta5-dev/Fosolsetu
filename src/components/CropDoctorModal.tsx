import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  ChevronRight, 
  Info, 
  ShieldCheck, 
  Share2, 
  Clock, 
  SlidersHorizontal,
  Leaf
} from 'lucide-react';
import { Language, CropDiseaseDiagnosis, SavedCropReport } from '../types';

interface CropDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const CROPS_LIST = [
  { id: 'rice', labelBn: 'ধান', labelEn: 'Rice', icon: '🌾' },
  { id: 'potato', labelBn: 'আলু', labelEn: 'Potato', icon: '🥔' },
  { id: 'tomato', labelBn: 'টমেটো', labelEn: 'Tomato', icon: '🍅' },
  { id: 'onion', labelBn: 'পেঁয়াজ', labelEn: 'Onion', icon: '🧅' },
  { id: 'mustard', labelBn: 'সরিষা', labelEn: 'Mustard', icon: '🌼' },
  { id: 'jute', labelBn: 'পাট', labelEn: 'Jute', icon: '🌿' },
  { id: 'eggplant', labelBn: 'বেগুন', labelEn: 'Eggplant', icon: '🍆' },
];

// Generate authentic PNG Base64 data URLs via Canvas
function generateSamplePng(type: 'blast' | 'blight' | 'healthy'): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  if (type === 'blast') {
    ctx.fillStyle = '#1e3322';
    ctx.fillRect(0, 0, 400, 300);
    ctx.fillStyle = '#3a7d44';
    ctx.beginPath();
    ctx.moveTo(40, 270);
    ctx.quadraticCurveTo(120, 150, 360, 40);
    ctx.quadraticCurveTo(240, 200, 100, 280);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#27592f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 265);
    ctx.quadraticCurveTo(150, 160, 350, 45);
    ctx.stroke();

    ctx.save();
    ctx.translate(180, 160);
    ctx.rotate(-0.55);
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.ellipse(0, 0, 32, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#dcd7cd';
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(240, 115);
    ctx.rotate(-0.5);
    ctx.fillStyle = '#7a3b10';
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#dcd7cd';
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Rice Leaf with Blast Lesions (Spindle spots)', 200, 280);
  } else if (type === 'blight') {
    ctx.fillStyle = '#162218';
    ctx.fillRect(0, 0, 400, 300);

    ctx.fillStyle = '#3f7044';
    ctx.beginPath();
    ctx.moveTo(90, 160);
    ctx.quadraticCurveTo(130, 60, 220, 75);
    ctx.quadraticCurveTo(310, 95, 330, 180);
    ctx.quadraticCurveTo(270, 260, 170, 240);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#2b1d14';
    ctx.beginPath();
    ctx.arc(155, 140, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#170e0a';
    ctx.beginPath();
    ctx.arc(155, 140, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#332317';
    ctx.beginPath();
    ctx.arc(235, 160, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#170e0a';
    ctx.beginPath();
    ctx.arc(235, 160, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#d6ded7';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(155, 140, 34, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Potato Foliage with Late Blight Lesions', 200, 280);
  } else {
    ctx.fillStyle = '#122315';
    ctx.fillRect(0, 0, 400, 300);

    ctx.fillStyle = '#389e47';
    ctx.beginPath();
    ctx.moveTo(50, 270);
    ctx.quadraticCurveTo(130, 160, 370, 40);
    ctx.quadraticCurveTo(250, 210, 120, 285);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#4cc45e';
    ctx.beginPath();
    ctx.moveTo(110, 280);
    ctx.quadraticCurveTo(190, 170, 380, 25);
    ctx.quadraticCurveTo(270, 220, 160, 290);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Vigorous Healthy Green Foliage (No Lesions)', 200, 280);
  }

  return canvas.toDataURL('image/png');
}

// Sample images metadata
const SAMPLE_PREVIEWS = [
  {
    id: 'sample-blast',
    type: 'blast' as const,
    nameBn: 'ধানের ব্লাস্ট রোগ (নমুনা)',
    nameEn: 'Rice Leaf Blast (Sample)',
    crop: 'rice',
  },
  {
    id: 'sample-blight',
    type: 'blight' as const,
    nameBn: 'আলুর নাভিধসা (নমুনা)',
    nameEn: 'Potato Late Blight (Sample)',
    crop: 'potato',
  },
  {
    id: 'sample-healthy',
    type: 'healthy' as const,
    nameBn: 'সুস্থ ধানগাছ (নমুনা)',
    nameEn: 'Healthy Rice Leaf (Sample)',
    crop: 'rice',
  },
];

export const CropDoctorModal: React.FC<CropDoctorModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'scan' | 'history'>('scan');
  const [selectedCrop, setSelectedCrop] = useState<string>('rice');
  
  // Image states
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [imageMeta, setImageMeta] = useState<{ name: string; sizeKb: number } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Analysis states
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [diagnosis, setDiagnosis] = useState<CropDiseaseDiagnosis | null>(null);
  const [reportLang, setReportLang] = useState<'bn' | 'en'>(lang);

  // Speech synthesis
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Saved reports history
  const [savedReports, setSavedReports] = useState<SavedCropReport[]>(() => {
    try {
      const stored = localStorage.getItem('fosolsetu_saved_reports');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  const [isReportSaved, setIsReportSaved] = useState<boolean>(false);
  const [inspectingReport, setInspectingReport] = useState<SavedCropReport | null>(null);

  // Input refs
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [sampleThumbs, setSampleThumbs] = useState<Record<string, string>>({});

  // Generate authentic PNG thumbnails on mount
  useEffect(() => {
    setSampleThumbs({
      blast: generateSamplePng('blast'),
      blight: generateSamplePng('blight'),
      healthy: generateSamplePng('healthy'),
    });
  }, []);

  // Sync lang prop to reportLang
  useEffect(() => {
    setReportLang(lang);
  }, [lang]);

  // Persist saved reports
  useEffect(() => {
    try {
      localStorage.setItem('fosolsetu_saved_reports', JSON.stringify(savedReports));
    } catch (e) {
      console.error('Failed to persist saved reports to localStorage:', e);
    }
  }, [savedReports]);

  // Stop speech when modal closes or unmounts
  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Process file upload (gallery or camera)
  const handleFileProcess = (file: File) => {
    setFileError(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setFileError(
        lang === 'bn'
          ? 'শুধুমাত্র JPG, PNG বা WEBP ফরম্যাটের ছবি আপলোড করুন।'
          : 'Please upload JPG, PNG, or WEBP image files only.'
      );
      return;
    }

    // Validate size (max 12MB)
    const maxSizeBytes = 12 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setFileError(
        lang === 'bn'
          ? 'ছবির সাইজ ১২ মেগাবাইটের বেশি হতে পারবে না। অনুগ্রহ করে ছোট ছবি দিন।'
          : 'Image file size must be less than 12MB. Please select a smaller photo.'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        // Optimize image through offscreen canvas if it's very large
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.88);
            setImagePreview(optimizedBase64);
            setImageMimeType('image/jpeg');
          } else {
            setImagePreview(result);
            setImageMimeType(file.type || 'image/jpeg');
          }

          setImageMeta({
            name: file.name,
            sizeKb: Math.round(file.size / 1024),
          });
          setDiagnosis(null);
          setIsReportSaved(false);
        };
        img.src = result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_PREVIEWS[0]) => {
    const pngDataUrl = sampleThumbs[sample.type] || generateSamplePng(sample.type);
    setSelectedCrop(sample.crop);
    setImagePreview(pngDataUrl);
    setImageMimeType('image/png');
    setImageMeta({
      name: sample.nameEn + '.png',
      sizeKb: 36,
    });
    setDiagnosis(null);
    setFileError(null);
    setIsReportSaved(false);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageMeta(null);
    setDiagnosis(null);
    setFileError(null);
    setIsReportSaved(false);
    if (galleryInputRef.current) galleryInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Diagnose with Gemini AI via /api/crop-disease/diagnose
  const handleDiagnose = async () => {
    if (!imagePreview) {
      setFileError(
        lang === 'bn'
          ? 'অনুগ্রহ করে প্রথমে ফসলের পাতার একটি ছবি তুলুন বা আপলোড করুন।'
          : 'Please capture or upload a crop photo first.'
      );
      return;
    }

    setAnalyzing(true);
    setFileError(null);
    setAnalysisStep(1);

    // Animation progress sequence for realistic feedback
    const stepTimer1 = setTimeout(() => setAnalysisStep(2), 700);
    const stepTimer2 = setTimeout(() => setAnalysisStep(3), 1600);

    try {
      const response = await fetch('/api/crop-disease/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: imageMimeType,
          crop: selectedCrop,
          lang,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to analyze crop image');
      }

      setDiagnosis(result.data);
      setIsReportSaved(false);
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Diagnosis failed:', error);
      setFileError(
        error.message ||
          (lang === 'bn'
            ? 'রোগ নির্ণয় করতে ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।'
            : 'Diagnosis request failed. Please check internet connection and try again.')
      );
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  // Save report to history
  const handleSaveReport = () => {
    if (!diagnosis || !imagePreview) return;

    const newReport: SavedCropReport = {
      id: 'rep_' + Date.now(),
      timestamp: new Date().toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      crop: selectedCrop,
      cropNameBn: diagnosis.cropNameBn,
      cropNameEn: diagnosis.cropNameEn,
      diseaseNameBn: diagnosis.diseaseNameBn,
      diseaseNameEn: diagnosis.diseaseNameEn,
      severity: diagnosis.severity,
      confidenceScore: diagnosis.confidenceScore,
      imageThumbnail: imagePreview,
      diagnosis,
    };

    setSavedReports((prev) => [newReport, ...prev]);
    setIsReportSaved(true);
  };

  const handleDeleteReport = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedReports((prev) => prev.filter((r) => r.id !== reportId));
    if (inspectingReport?.id === reportId) {
      setInspectingReport(null);
    }
  };

  // Text to speech narration
  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert(lang === 'bn' ? 'আপনার ব্রাউজারে ভয়েস সাপোর্ট নেই' : 'Speech synthesis not supported in this browser');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const currentDiag = inspectingReport?.diagnosis || diagnosis;
    if (!currentDiag) return;

    const speechText =
      reportLang === 'bn'
        ? `ফসলের নাম: ${currentDiag.cropNameBn}। রোগ বা অবস্থা: ${currentDiag.diseaseNameBn}। তীব্রতা: ${currentDiag.severityLabelBn}। নিশ্চিতকরণ হার: শতকরা ${currentDiag.confidenceScore} ভাগ। মূল লক্ষণ: ${currentDiag.symptoms.slice(0, 2).join(', ')}। সমাধান: ${currentDiag.treatments.slice(0, 2).join(', ')}। ${currentDiag.summarySummaryBn}`
        : `Crop: ${currentDiag.cropNameEn}. Identified condition: ${currentDiag.diseaseNameEn}. Severity: ${currentDiag.severityLabelEn}. Confidence: ${currentDiag.confidenceScore} percent. Symptoms: ${currentDiag.symptomsEn.slice(0, 2).join(', ')}. Recommended treatment: ${currentDiag.treatmentsEn.slice(0, 2).join(', ')}. ${currentDiag.summarySummaryEn}`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = reportLang === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Render severity pill
  const renderSeverityBadge = (severity: string, labelBn: string, labelEn: string) => {
    switch (severity) {
      case 'severe':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            {reportLang === 'bn' ? labelBn || 'তীব্র / জরুরি' : labelEn || 'Severe / Urgent'}
          </span>
        );
      case 'moderate':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            {reportLang === 'bn' ? labelBn || 'মাঝারি' : labelEn || 'Moderate'}
          </span>
        );
      case 'low':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-800 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            {reportLang === 'bn' ? labelBn || 'প্রাথমিক / মৃদু' : labelEn || 'Mild / Early'}
          </span>
        );
      case 'none':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            {reportLang === 'bn' ? labelBn || 'সুস্থ ফসল' : labelEn || 'Healthy Crop'}
          </span>
        );
    }
  };

  const activeDiagnosis = inspectingReport?.diagnosis || diagnosis;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Hidden file inputs */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="bg-white dark:bg-[#152317] rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl shadow-inner border border-white/20">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg tracking-tight">
                  {lang === 'bn' ? 'ফসলের রোগ নির্ণয় (এআই ক্রপ ডক্টর)' : 'AI Crop Doctor & Pathologist'}
                </h3>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-900/60 text-emerald-200 border border-emerald-500/40">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 font-medium">
                {lang === 'bn' 
                  ? 'ক্যামেরা ছবি তুলে সরাসরি রোগ শনাক্তকরণ ও কৃষি সমাধান' 
                  : 'Real-time leaf symptom diagnosis & DAE-approved treatment'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="bg-black/25 rounded-xl p-1 flex items-center text-xs">
              <button
                onClick={() => {
                  setActiveTab('scan');
                  setInspectingReport(null);
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  activeTab === 'scan'
                    ? 'bg-white text-emerald-900 shadow'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                {lang === 'bn' ? 'স্ক্যান' : 'Scan'}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                  activeTab === 'history'
                    ? 'bg-white text-emerald-900 shadow'
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                <span>{lang === 'bn' ? 'ইতিহাস' : 'History'}</span>
                {savedReports.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {savedReports.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/35 flex items-center justify-center text-white transition active:scale-95"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {activeTab === 'history' && !inspectingReport ? (
            /* Saved Reports List */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                    {lang === 'bn' ? 'সংরক্ষিত রিপোর্টসমূহ' : 'Saved Diagnostic Reports'}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {lang === 'bn' 
                      ? 'পূর্বে সংরক্ষিত পরীক্ষার ফলাফল ও সমাধান' 
                      : 'Previously saved plant pathology consultations'}
                  </p>
                </div>
                {savedReports.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm(lang === 'bn' ? 'সকল সংরক্ষিত রিপোর্ট মুছে ফেলতে চান?' : 'Clear all saved reports?')) {
                        setSavedReports([]);
                      }
                    }}
                    className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'সব মুছুন' : 'Clear All'}</span>
                  </button>
                )}
              </div>

              {savedReports.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-3xl bg-stone-50/50 dark:bg-stone-900/20">
                  <Bookmark className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    {lang === 'bn' ? 'কোনো সংরক্ষিত রিপোর্ট নেই' : 'No saved diagnostic reports yet'}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                    {lang === 'bn' 
                      ? 'নতুন ছবি পরীক্ষা করে "রিপোর্ট সংরক্ষণ করুন" বাটনে চাপ দিলে এখানে জমা থাকবে।' 
                      : 'Diagnose a crop leaf and click "Save Report" to view your historical records here.'}
                  </p>
                  <button
                    onClick={() => setActiveTab('scan')}
                    className="mt-4 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 shadow"
                  >
                    {lang === 'bn' ? 'নতুন ছবি স্ক্যান করুন' : 'Start New Diagnosis'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedReports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => setInspectingReport(report)}
                      className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition cursor-pointer flex gap-3 group relative"
                    >
                      <img
                        src={report.imageThumbnail}
                        alt="Crop thumbnail"
                        className="w-16 h-16 rounded-xl object-cover border border-stone-200 dark:border-stone-700 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                            {lang === 'bn' ? report.cropNameBn : report.cropNameEn}
                          </span>
                          <span className="text-[10px] text-stone-400 flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {report.timestamp}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-stone-800 dark:text-stone-200 truncate">
                          {lang === 'bn' ? report.diseaseNameBn : report.diseaseNameEn}
                        </h5>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-stone-500">
                            {lang === 'bn' ? `নিশ্চিত: ${report.confidenceScore}%` : `Conf: ${report.confidenceScore}%`}
                          </span>
                          <button
                            onClick={(e) => handleDeleteReport(report.id, e)}
                            className="text-stone-400 hover:text-rose-600 p-1 rounded-lg transition"
                            title="Delete report"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeDiagnosis ? (
            /* Result View (active diagnosis or inspected report) */
            <div className="space-y-5 animate-fade-in">
              {inspectingReport && (
                <div className="flex items-center justify-between bg-stone-100 dark:bg-stone-800/60 p-2.5 rounded-xl text-xs">
                  <button
                    onClick={() => setInspectingReport(null)}
                    className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                  >
                    ← {lang === 'bn' ? 'সংরক্ষিত তালিকায় ফিরে যান' : 'Back to Saved Reports'}
                  </button>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                    {inspectingReport.timestamp}
                  </span>
                </div>
              )}

              {/* Status Header Banner */}
              {!activeDiagnosis.isIdentifiable ? (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-rose-900 dark:text-rose-200 text-sm">
                      {reportLang === 'bn'
                        ? 'নমুনাটি স্পষ্ট নয় বা ফসলের পাতা শনাক্ত করা যায়নি'
                        : 'Image Unidentifiable or Insufficient Clarity'}
                    </h4>
                    <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">
                      {reportLang === 'bn'
                        ? activeDiagnosis.summarySummaryBn || 'ছবিটি অস্পষ্ট বা আলো কম থাকায় সঠিক রোগ নির্ণয় সম্ভব নয়। দিনের আলোতে আক্রান্ত পাতার স্পষ্ট ও ফোকাসযুক্ত ছবি তুলুন।'
                        : activeDiagnosis.summarySummaryEn || 'The photo is blurry, dark, or does not clearly show plant tissue. Please retake in bright natural daylight with sharp focus.'}
                    </p>
                  </div>
                </div>
              ) : activeDiagnosis.isHealthy ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm sm:text-base">
                        {reportLang === 'bn' ? 'ফসল সম্পূর্ণ সুস্থ ও স্বাভাবিক!' : 'Crop is Healthy & Disease-Free!'}
                      </h4>
                      {renderSeverityBadge('none', 'সুস্থ ফসল', 'Healthy Crop')}
                    </div>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                      {reportLang === 'bn'
                        ? activeDiagnosis.summarySummaryBn || 'পাতায় কোনো ক্ষতিকর ছত্রাক বা পোকার আক্রমণ নেই। গাছ সতেজ রয়েছে।'
                        : activeDiagnosis.summarySummaryEn || 'No visible fungal lesions or pest devastation detected on the foliage.'}
                    </p>
                  </div>
                </div>
              ) : (
                /* Disease Detected Banner */
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-300 dark:border-amber-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xl flex-shrink-0">
                      ⚠️
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                        {reportLang === 'bn' ? 'শনাক্তকৃত রোগ / সমস্যা' : 'Identified Disease Condition'}
                      </div>
                      <h4 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white">
                        {reportLang === 'bn' ? activeDiagnosis.diseaseNameBn : activeDiagnosis.diseaseNameEn}
                      </h4>
                      <div className="text-xs text-stone-500 dark:text-stone-400">
                        {reportLang === 'bn' ? `ফসল: ${activeDiagnosis.cropNameBn}` : `Crop: ${activeDiagnosis.cropNameEn}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
                    {renderSeverityBadge(
                      activeDiagnosis.severity,
                      activeDiagnosis.severityLabelBn,
                      activeDiagnosis.severityLabelEn
                    )}
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                      {reportLang === 'bn' ? `নিশ্চিত: ${activeDiagnosis.confidenceScore}%` : `Confidence: ${activeDiagnosis.confidenceScore}%`}
                    </span>
                  </div>
                </div>
              )}

              {/* Language and Audio Controls Bar */}
              <div className="flex items-center justify-between bg-stone-100 dark:bg-stone-900/60 p-2.5 rounded-2xl border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <span className="text-stone-500 dark:text-stone-400 text-[11px] mr-1">
                    {lang === 'bn' ? 'রিপোর্ট ভাষা:' : 'Report Language:'}
                  </span>
                  <button
                    onClick={() => setReportLang('bn')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      reportLang === 'bn'
                        ? 'bg-emerald-700 text-white font-bold shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    onClick={() => setReportLang('en')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      reportLang === 'en'
                        ? 'bg-emerald-700 text-white font-bold shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                    }`}
                  >
                    English
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleVoice}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      isSpeaking
                        ? 'bg-rose-600 text-white shadow-md animate-pulse'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-300 dark:border-emerald-800'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>{reportLang === 'bn' ? 'থামুন' : 'Stop'}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{reportLang === 'bn' ? 'পড়ে শুনুন' : 'Listen'}</span>
                      </>
                    )}
                  </button>

                  {!inspectingReport && (
                    <button
                      onClick={handleSaveReport}
                      disabled={isReportSaved}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        isReportSaved
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300'
                      }`}
                    >
                      {isReportSaved ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{lang === 'bn' ? 'সংরক্ষিত' : 'Saved'}</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>{lang === 'bn' ? 'সংরক্ষণ' : 'Save'}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Multi-Column Desktop Grid for Diagnosis Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visual Thumbnail & Observed Symptoms */}
                <div className="space-y-4">
                  {/* Photo Preview card */}
                  <div className="p-3 bg-stone-50 dark:bg-stone-900/40 rounded-2xl border border-stone-200 dark:border-stone-800 flex gap-3 items-center">
                    <img
                      src={inspectingReport?.imageThumbnail || imagePreview || ''}
                      alt="Crop specimen"
                      className="w-20 h-20 rounded-xl object-cover border border-stone-300 dark:border-stone-700 shadow-sm"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="font-bold text-stone-800 dark:text-stone-200">
                        {reportLang === 'bn' ? activeDiagnosis.cropNameBn : activeDiagnosis.cropNameEn}
                      </div>
                      <div className="text-stone-500 text-[11px] truncate mt-0.5">
                        {reportLang === 'bn' ? activeDiagnosis.diseaseNameBn : activeDiagnosis.diseaseNameEn}
                      </div>
                      <div className="mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        {reportLang === 'bn' ? 'ডিএই বাংলাদেশ নির্দেশিকা অনুসৃত' : 'DAE Bangladesh Compliant'}
                      </div>
                    </div>
                  </div>

                  {/* Observed Symptoms */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#121c13] border border-stone-200 dark:border-stone-800 space-y-2">
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {reportLang === 'bn' ? 'পরিলক্ষিত লক্ষণসমূহ (Symptoms)' : 'Observed Symptoms'}
                    </h5>
                    <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                      {(reportLang === 'bn' ? activeDiagnosis.symptoms : activeDiagnosis.symptomsEn).map(
                        (sym, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11.5px] leading-relaxed">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{sym}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Possible Causes */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#121c13] border border-stone-200 dark:border-stone-800 space-y-2">
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      {reportLang === 'bn' ? 'সম্ভাব্য কারণ ও আবহাওয়া (Causes)' : 'Favorable Conditions & Causes'}
                    </h5>
                    <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                      {(reportLang === 'bn' ? activeDiagnosis.causes : activeDiagnosis.causesEn).map(
                        (cause, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11.5px] leading-relaxed">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{cause}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Treatment & Solutions Panel */}
                <div className="space-y-4">
                  {/* Prescribed Remedies */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-2.5">
                    <h5 className="font-bold text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      {reportLang === 'bn' ? 'চিকিৎসা ও সমাধান (প্রেসক্রিপশন)' : 'Recommended Treatments & Dosage'}
                    </h5>
                    <div className="space-y-2">
                      {(reportLang === 'bn' ? activeDiagnosis.treatments : activeDiagnosis.treatmentsEn).map(
                        (treatment, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-white dark:bg-stone-900/70 border border-emerald-100 dark:border-emerald-900/40 text-[11.5px] text-stone-800 dark:text-stone-200 leading-relaxed flex items-start gap-2"
                          >
                            <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="flex-1">{treatment}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Preventive Measures */}
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#121c13] border border-stone-200 dark:border-stone-800 space-y-2">
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      {reportLang === 'bn' ? 'প্রতিরোধমূলক ব্যবস্থা (Prevention)' : 'Preventive Safeguards'}
                    </h5>
                    <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                      {(reportLang === 'bn' ? activeDiagnosis.preventiveMeasures : activeDiagnosis.preventiveMeasuresEn).map(
                        (prev, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11.5px] leading-relaxed">
                            <span className="text-teal-600 font-bold">✓</span>
                            <span>{prev}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Actionable Next Steps */}
                  <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/50 space-y-2">
                    <h5 className="font-bold text-xs sm:text-sm text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-teal-600" />
                      {reportLang === 'bn' ? 'পরবর্তী করণীয় পদক্ষেপ' : 'Next Actionable Steps'}
                    </h5>
                    <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                      {(reportLang === 'bn' ? activeDiagnosis.suggestedNextSteps : activeDiagnosis.suggestedNextStepsEn).map(
                        (step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                            <span className="text-teal-700 font-semibold">→</span>
                            <span>{step}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    clearImage();
                    setInspectingReport(null);
                  }}
                  className="w-full sm:flex-1 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'নতুন ছবি স্ক্যান করুন' : 'Scan Another Plant'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:flex-1 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white text-xs font-bold shadow-md transition"
                >
                  {lang === 'bn' ? 'সম্পন্ন (বন্ধ করুন)' : 'Done (Close)'}
                </button>
              </div>
            </div>
          ) : (
            /* Upload & Capture Form */
            <div className="space-y-5">
              {/* Step 1: Crop Selection */}
              <div>
                <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block mb-2">
                  {lang === 'bn' ? '১. আক্রান্ত ফসল নির্বাচন করুন' : '1. Select Affected Crop'}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {CROPS_LIST.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCrop(c.id)}
                      className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                        selectedCrop === c.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 shadow-sm scale-102 ring-2 ring-emerald-500/20'
                          : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-emerald-400'
                      }`}
                    >
                      <span className="text-2xl">{c.icon}</span>
                      <span className="text-xs font-bold truncate w-full">
                        {lang === 'bn' ? c.labelBn : c.labelEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Image Upload or Camera Area */}
              <div>
                <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block mb-2">
                  {lang === 'bn' ? '২. ফসলের পাতার ছবি তুলুন বা আপলোড করুন' : '2. Capture or Upload Leaf Photo'}
                </label>

                {imagePreview ? (
                  /* Image Preview Card */
                  <div className="relative rounded-3xl border-2 border-emerald-500/40 bg-stone-50 dark:bg-stone-900/50 p-4 overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative group w-full sm:w-48 h-48 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 shadow-md flex-shrink-0 bg-stone-900">
                        <img
                          src={imagePreview}
                          alt="Selected crop specimen"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={clearImage}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-600 transition"
                          title="Remove photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex-1 space-y-3 w-full">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                              {lang === 'bn' ? 'ছবি প্রস্তুত' : 'Image Ready'}
                            </span>
                            {imageMeta && (
                              <span className="text-[11px] text-stone-400">
                                {imageMeta.sizeKb} KB
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 mt-1 truncate">
                            {imageMeta?.name || (lang === 'bn' ? 'নমুনা ছবি' : 'Crop Leaf Photo')}
                          </h5>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                            {lang === 'bn'
                              ? 'এআই মডেল পাতার দাগ, ছত্রাক ও পুষ্টিহীনতার লক্ষণ স্ক্যান করবে।'
                              : 'Gemini AI will analyze lesions, spores, discoloration, and fungal blights.'}
                          </p>
                        </div>

                        {/* Replace Buttons */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => cameraInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center gap-1.5"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>{lang === 'bn' ? 'ক্যামেরা পুনরায় খুলুন' : 'Retake with Camera'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => galleryInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center gap-1.5"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{lang === 'bn' ? 'অন্য ছবি দিন' : 'Change Image'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Upload Dropzone with Dual Triggers */
                  <div className="border-2 border-dashed border-emerald-600/40 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/70 transition">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto mb-3 shadow-inner">
                      <Camera className="w-8 h-8" />
                    </div>

                    <h4 className="font-bold text-stone-800 dark:text-stone-100 text-sm sm:text-base">
                      {lang === 'bn' ? 'আক্রান্ত পাতার স্পষ্ট ছবি তুলুন' : 'Snap photo of infected leaf / plant'}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-md mx-auto">
                      {lang === 'bn'
                        ? 'সরাসরি মোবাইল ক্যামেরা দিয়ে ছবি তুলুন অথবা আপনার গ্যালারি থেকে আপলোড করুন।'
                        : 'Use your mobile camera for real-time capture or upload a clear photo from gallery.'}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>{lang === 'bn' ? 'ক্যামেরা চালু করুন' : 'Open Camera'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'bn' ? 'গ্যালারি থেকে বেছে নিন' : 'Upload from Gallery'}</span>
                      </button>
                    </div>

                    <div className="mt-4 text-[11px] text-stone-400 flex items-center justify-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'সমর্থিত: JPG, PNG, WEBP (সর্বোচ্চ ১২ মেগাবাইট)' : 'Supports JPG, PNG, WEBP up to 12MB'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sample Images for Instant Farmer Testing */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {lang === 'bn' ? 'অথবা নমুনা ছবি দিয়ে পরীক্ষা করুন:' : 'Or test with sample diseased leaves:'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SAMPLE_PREVIEWS.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className="p-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40 hover:border-emerald-500 text-left transition flex items-center gap-3 group"
                    >
                      <img
                        src={sampleThumbs[sample.type] || ''}
                        alt={sample.nameEn}
                        className="w-12 h-12 rounded-xl object-cover border border-stone-300 dark:border-stone-700 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                          {lang === 'bn' ? sample.nameBn : sample.nameEn}
                        </div>
                        <div className="text-[10px] text-stone-400 capitalize">
                          {sample.crop} sample
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {fileError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}

              {/* Diagnose Button with Progress State */}
              <button
                type="button"
                disabled={analyzing || !imagePreview}
                onClick={handleDiagnose}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 ${
                  analyzing
                    ? 'bg-emerald-800 text-white cursor-wait opacity-90'
                    : !imagePreview
                    ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white active:scale-98'
                }`}
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-emerald-200" />
                    <span>
                      {analysisStep === 1
                        ? lang === 'bn' ? 'ছবি প্রসেসিং হচ্ছে...' : 'Processing leaf photo...'
                        : analysisStep === 2
                        ? lang === 'bn' ? 'জেমিনাই এআই দ্বারা পাতার লক্ষণ বিশ্লেষণ...' : 'Gemini AI analyzing leaf pathology...'
                        : lang === 'bn' ? 'কৃষি বিশেষজ্ঞদের সমাধান ও প্রেসক্রিপশন তৈরি হচ্ছে...' : 'Formulating DAE remedies & prescription...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{lang === 'bn' ? 'রোগ পরীক্ষা করুন (Diagnose Symptoms)' : 'Diagnose Crop Leaf Symptoms'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer with Helpful Tips */}
        <div className="bg-stone-50 dark:bg-[#111c12] border-t border-stone-200 dark:border-stone-800 px-5 py-3 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {lang === 'bn'
                ? 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE) সুপারিশকৃত কৃষি তথ্যভাণ্ডার'
                : 'Bangladesh DAE compliant agricultural intelligence'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-stone-400">
            <span>FosolSetu AI Engine v3.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};
