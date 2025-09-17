"use client";

import { NextStep, NextStepProvider, Tour } from "nextstepjs";
import { ReadingStateData, UserData, HomepageModulesData, onboardingTranslations } from "./types";
import { useState, useRef, useEffect } from 'react';

import HomepageContent from "./OnboardingOverlay";

interface HomepageProps {
  readingStateData: ReadingStateData;
  homepageModulesData: HomepageModulesData;
  userData: UserData;
  lang?: 'id' | 'en';
}

// TTS context interface for sharing across components
export interface TTSContextType {
  isSpeaking: boolean;
  isPaused: boolean;
  currentSpeakingId: string | null;
  speakText: (text: string, id: string) => void;
  pauseSpeaking: () => void;
  resumeSpeaking: () => void;
  stopSpeaking: () => void;
  toggleSpeech: (text: string, id: string) => void;
}

const Homepage = ({ readingStateData, homepageModulesData, userData, lang }: HomepageProps) => {
    // Centralized TTS State Management
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    // TTS Functions
    const speakText = (text: string, id: string) => {
        if ('speechSynthesis' in window) {
            // Stop any ongoing speech
            window.speechSynthesis.cancel();
            
            speechRef.current = new SpeechSynthesisUtterance(text);
            speechRef.current.lang = lang === 'en' ? 'en-US' : 'id-ID';
            speechRef.current.rate = 0.9;
            speechRef.current.pitch = 1;
            
            speechRef.current.onstart = () => {
                setIsSpeaking(true);
                setIsPaused(false);
                setCurrentSpeakingId(id);
            };
            
            speechRef.current.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
                setCurrentSpeakingId(null);
            };
            
            speechRef.current.onerror = () => {
                setIsSpeaking(false);
                setIsPaused(false);
                setCurrentSpeakingId(null);
                // toast.error(lang === 'en' ? 'Browser does not support text-to-speech' : 'Browser tidak mendukung text-to-speech');
            };
            
            window.speechSynthesis.speak(speechRef.current);
        } else {
            // toast.error(lang === 'en' ? 'Browser does not support text-to-speech' : 'Browser tidak mendukung text-to-speech');
        }
    };

    const pauseSpeaking = () => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const resumeSpeaking = () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentSpeakingId(null);
    };

    const toggleSpeech = (text: string, id: string) => {
        if (currentSpeakingId === id && isSpeaking && !isPaused) {
            pauseSpeaking();
        } else if (currentSpeakingId === id && isPaused) {
            resumeSpeaking();
        } else {
            speakText(text, id);
        }
    };

    // TTS Context object
    const ttsContext: TTSContextType = {
        isSpeaking,
        isPaused,
        currentSpeakingId,
        speakText,
        pauseSpeaking,
        resumeSpeaking,
        stopSpeaking,
        toggleSpeech
    };

    // Cleanup speech on unmount
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const steps: Tour[] = [
        {
            tour: "mainTour",
            steps: [
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.streakProgress.title,
                    content: onboardingTranslations[lang || 'id'].steps.streakProgress.content,
                    selector: "#streak-progress",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.fyi.title,
                    content: onboardingTranslations[lang || 'id'].steps.fyi.content,
                    selector: "#fyi",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.discover.title,
                    content: onboardingTranslations[lang || 'id'].steps.discover.content,
                    selector: "#discover-section",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.moduleList.title,
                    content: onboardingTranslations[lang || 'id'].steps.moduleList.content,
                    selector: "#module-list",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.continueReading.title,
                    content: onboardingTranslations[lang || 'id'].steps.continueReading.content,
                    selector: "#continue-reading",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.finalQuiz.title,
                    content: onboardingTranslations[lang || 'id'].steps.finalQuiz.content,
                    selector: "#final-quiz",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.guideWebsite.title,
                    content: onboardingTranslations[lang || 'id'].steps.guideWebsite.content,
                    selector: "#guide-website",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.guideOffline.title,
                    content: onboardingTranslations[lang || 'id'].steps.guideOffline.content,
                    selector: "#guide-offlineProduct",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
            ],
        },
    ];

    return (
        <>
            <NextStepProvider>
                <NextStep steps={steps} onComplete={() => {
                    localStorage.setItem("completedTour", "true");
                }}
                onSkip={() => {
                    localStorage.setItem("completedTour", "true");
                }}>
                
                    <HomepageContent 
                        lang={lang}
                        readingStateData={readingStateData}
                        homepageModulesData={homepageModulesData}
                        userData={userData}
                        ttsContext={ttsContext}
                    />
                    
                </NextStep>
            </NextStepProvider>
        </>
    );
};

export default Homepage;
