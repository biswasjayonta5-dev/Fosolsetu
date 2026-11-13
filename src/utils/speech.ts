import { Language } from '../types';

export function speakText(text: string, lang: Language): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose voice based on language
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'bn') {
      const bnVoice = voices.find(v => v.lang.startsWith('bn') || v.lang.includes('Bengali') || v.lang.includes('Bangla'));
      if (bnVoice) {
        utterance.voice = bnVoice;
      }
      utterance.lang = 'bn-BD';
    } else {
      const enVoice = voices.find(v => v.lang.startsWith('en'));
      if (enVoice) {
        utterance.voice = enVoice;
      }
      utterance.lang = 'en-US';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Speech synthesis error:', err);
  }
}

// Web Speech API Voice-to-Text Recognition Helper
export function getSpeechRecognition(): any {
  if (typeof window === 'undefined') return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}
