import { useState, useEffect, useRef } from 'react';

interface TextToSpeechState {
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  error?: string;
}

export const useTextToSpeech = () => {
  const [state, setState] = useState<TextToSpeechState>({
    isSpeaking: false,
    isPaused: false,
    isSupported: false,
    error: undefined
  });

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setState(prev => ({ ...prev, isSupported: true }));
    } else {
      setState(prev => ({
        ...prev,
        isSupported: false,
        error: 'Text-to-speech not supported in this browser'
      }));
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speak = (text: string, options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: SpeechSynthesisVoice;
  }) => {
    if (!synthRef.current || !state.isSupported) {
      setState(prev => ({
        ...prev,
        error: 'Text-to-speech not available'
      }));
      return;
    }

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set options
    if (options) {
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      if (options.voice) {
        utterance.voice = options.voice;
      }
    }

    // Event handlers
    utterance.onstart = () => {
      setState(prev => ({
        ...prev,
        isSpeaking: true,
        isPaused: false,
        error: undefined
      }));
    };

    utterance.onend = () => {
      setState(prev => ({
        ...prev,
        isSpeaking: false,
        isPaused: false
      }));
    };

    utterance.onerror = (event) => {
      setState(prev => ({
        ...prev,
        isSpeaking: false,
        isPaused: false,
        error: event.error
      }));
    };

    utterance.onpause = () => {
      setState(prev => ({
        ...prev,
        isPaused: true
      }));
    };

    utterance.onresume = () => {
      setState(prev => ({
        ...prev,
        isPaused: false
      }));
    };

    synthRef.current.speak(utterance);
  };

  const pause = () => {
    if (synthRef.current && state.isSpeaking && !state.isPaused) {
      synthRef.current.pause();
    }
  };

  const resume = () => {
    if (synthRef.current && state.isSpeaking && state.isPaused) {
      synthRef.current.resume();
    }
  };

  const cancel = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setState(prev => ({
        ...prev,
        isSpeaking: false,
        isPaused: false
      }));
    }
  };

  const getVoices = (): SpeechSynthesisVoice[] => {
    if (!synthRef.current) return [];
    return synthRef.current.getVoices();
  };

  return {
    ...state,
    speak,
    pause,
    resume,
    cancel,
    getVoices
  };
};