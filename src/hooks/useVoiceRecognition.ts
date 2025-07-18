import { useState, useEffect, useRef } from 'react';
import { VoiceRecognitionState } from '../types';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const useVoiceRecognition = () => {
  const [state, setState] = useState<VoiceRecognitionState>({
    isListening: false,
    transcript: '',
    confidence: 0,
    error: undefined
  });

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setState(prev => ({
        ...prev,
        error: 'Speech recognition not supported in this browser'
      }));
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }

        setState(prev => ({
          ...prev,
          transcript: finalTranscript || interimTranscript,
          confidence: confidence || 0,
          error: undefined
        }));
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      setState(prev => ({
        ...prev,
        error: event.error,
        isListening: false
      }));
    };

    recognitionRef.current.onend = () => {
      setState(prev => ({
        ...prev,
        isListening: false
      }));
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !state.isListening) {
      setState(prev => ({
        ...prev,
        isListening: true,
        transcript: '',
        error: undefined
      }));
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && state.isListening) {
      recognitionRef.current.stop();
      setState(prev => ({
        ...prev,
        isListening: false
      }));
    }
  };

  const resetTranscript = () => {
    setState(prev => ({
      ...prev,
      transcript: '',
      confidence: 0,
      error: undefined
    }));
  };

  return {
    ...state,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: !!recognitionRef.current
  };
};