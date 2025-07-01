import { useState, useEffect } from 'react';

interface FormState {
  answers: Record<string, any>;
  currentStep: number;
}

const STORAGE_KEY = 'quote-form-state';

export function useFormPersistence() {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { answers: savedAnswers, currentStep: savedStep }: FormState = JSON.parse(saved);
        setAnswers(savedAnswers || {});
        setCurrentStep(savedStep || 0);
      }
    } catch (error) {
      console.warn('Failed to load form state from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever answers or currentStep changes
  useEffect(() => {
    try {
      const formState: FormState = { answers, currentStep };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
    } catch (error) {
      console.warn('Failed to save form state to localStorage:', error);
    }
  }, [answers, currentStep]);

  // Clear localStorage (for when form is submitted or reset)
  const clearFormState = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setAnswers({});
      setCurrentStep(0);
    } catch (error) {
      console.warn('Failed to clear form state from localStorage:', error);
    }
  };

  return {
    answers,
    setAnswers,
    currentStep,
    setCurrentStep,
    clearFormState,
  };
}