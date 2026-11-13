import { useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types';
import { getSpeechRecognition, isSpeechRecognitionSupported } from '../utils/speech';

export interface UseVoiceToTextReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  interimTranscript: string;
  errorMessage: string | null;
  startListening: (lang: Language) => void;
  stopListening: () => void;
  resetTranscript: () => void;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
}

export function useVoiceToText(initialText: string = ''): UseVoiceToTextReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialText);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const isSupported = isSpeechRecognitionSupported();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const startListening = useCallback((lang: Language) => {
    setErrorMessage(null);
    const SpeechRecognitionClass = getSpeechRecognition();

    if (!SpeechRecognitionClass) {
      setErrorMessage(
        lang === 'bn'
          ? 'আপনার ব্রাউজারে ভয়েস-টু-টেক্সট সুবিধাটি সরাসরি সমর্থিত নয়। ক্রোম বা এজ ব্রাউজার ব্যবহার করুন।'
          : 'Voice-to-Text is not supported in this browser. Please use Google Chrome or Microsoft Edge.'
      );
      return;
    }

    try {
      // Stop previous instance if running
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }

      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      
      // Configure language: Bengali (Bangladesh) or English (US)
      recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';
        let finalChunk = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalChunk += item[0].transcript;
          } else {
            currentInterim += item[0].transcript;
          }
        }

        if (finalChunk) {
          setTranscript((prev) => {
            const trimmedPrev = prev.trim();
            const trimmedFinal = finalChunk.trim();
            if (!trimmedPrev) return trimmedFinal;
            return `${trimmedPrev} ${trimmedFinal}`;
          });
          setInterimTranscript('');
        } else {
          setInterimTranscript(currentInterim);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error event:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage(
            lang === 'bn'
              ? 'মাইক্রোফোনের অনুমতি প্রয়োজন। অনুগ্রহ করে ব্রাউজার সেটিংসে অনুমতি দিন।'
              : 'Microphone permission denied. Please allow microphone access.'
          );
        } else if (event.error === 'network') {
          setErrorMessage(
            lang === 'bn'
              ? 'নেটওয়ার্ক সংযোগ ত্রুটি। ইন্টারনেট সংযোগ পরীক্ষা করুন।'
              : 'Network error. Please check your internet connection.'
          );
        } else if (event.error !== 'no-speech') {
          setErrorMessage(
            lang === 'bn'
              ? 'ভয়েস শনাক্তকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
              : `Speech recognition error (${event.error}). Please try again.`
          );
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setErrorMessage(
        lang === 'bn'
          ? 'মাইক্রোফোন চালু করতে সমস্যা হয়েছে।'
          : 'Could not access microphone.'
      );
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setErrorMessage(null);
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    errorMessage,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript,
  };
}
