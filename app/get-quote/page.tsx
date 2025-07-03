'use client';

import React, { useState, useEffect } from 'react';
import FormActionButton from '@/components/GetQuote_Components/FormActionButton';
import ProgressBar from '@/components/GetQuote_Components/ProgressBar';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

/**
 * Form data interface for type safety
 */
interface FormData {
  location: string;
  projectDescription: string;
  name: string;
  phone: string;
}

/**
 * Get Quote sliding form page
 * Each question appears on its own slide with smooth transitions
 * Progress is saved to localStorage and restored on page reload
 */
const GetQuotePage = () => {
  // Hydration fix - track if component has mounted on client
  const [isMounted, setIsMounted] = useState(false);
  
  // Current slide index (0-based)
  const [currentStep, setCurrentStep] = useLocalStorage<number>('quote-form-step', 0);
  
  // Form data with localStorage persistence
  const [formData, setFormData, clearFormData] = useLocalStorage<FormData>('quote-form-data', {
    location: '',
    projectDescription: '',
    name: '',
    phone: ''
  });

  // Total number of slides (3 form slides + 1 success slide)
  const totalSlides = 4;

  // Set mounted to true after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const totalQuestions = 3; // Only 3 actual questions

  /**
   * Update a specific field in the form data
   */
  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Navigate to the next slide
   */
  const handleNext = () => {
    if (currentStep < totalSlides - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Navigate to the previous slide
   */
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Submit the form and show success page
   */
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    setCurrentStep(totalSlides - 1); // Go to success page
  };

  /**
   * Reset form and start over
   */
  const handleStartOver = () => {
    clearFormData();
    setCurrentStep(0);
  };

  /**
   * Handle Enter key press for navigation
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentStep === 2) { // Last form slide
        handleSubmit();
      } else if (currentStep < 2) {
        handleNext();
      }
    }
  };

  // Determine which buttons to show - use safe values during SSR
  const safeCurrentStep = isMounted ? currentStep : 0;
  const isFirstSlide = safeCurrentStep === 0;
  const isLastFormSlide = safeCurrentStep === 2;
  const isSuccessSlide = safeCurrentStep === 3;

  return (
    /**
     * Main outer container with grid background
     * Fills parent container completely without scrolling
     */
    <div className="w-full bg-grid flex flex-col overflow-hidden">
      
      {/**
       * Centering container that organizes the layout
       * Provides structure for progress bar, form, and buttons
       * Uses consistent width for progress bar and form alignment
       */}
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full px-6">

        {/**
         * Progress bar section - matches form width exactly
         * Shows completion percentage based on current step position
         */}
        <div className="flex-shrink-0 pt-4">
          <ProgressBar 
            currentStep={currentStep} 
            totalSlides={totalQuestions} // Use totalQuestions for progress calculation
            className="mb-4"
          />
        </div>

        {/**
         * Sliding form container with light border and card styling
         * Contains all form slides with smooth horizontal transitions
         * Matches progress bar width exactly - REDUCED HEIGHT to prevent scrolling
         */}
        <div className="h-96 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Sliding content wrapper */}
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${safeCurrentStep * (100 / totalSlides)}%)`,
              width: `${totalSlides * 100}%`
            }}
          >
            
            {/**
             * SLIDE 1: Location Question (Yes/No)
             * Asks if they live near Palo Alto for service area verification
             */}
            <div 
              className="flex flex-col items-center justify-center px-6 py-8"
              style={{ width: `${100 / totalSlides}%` }}
              onKeyPress={handleKeyPress}
            >
              <div className="text-center max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Do you live near Palo Alto?
                </h1>
                <p className="text-gray-600 italic mb-6">
                  CFC is typically a local-only company, San Francisco to San Jose.
                </p>
                
                {/* Yes/No buttons */}
                <div className="flex gap-4 justify-center">
                  <button
                    className={`px-6 py-2 border rounded-lg font-medium transition-all duration-200 ${
                      formData.location === 'Yes' 
                        ? 'bg-accent text-white border-accent' 
                        : 'border-gray-300 hover:border-accent'
                    }`}
                    onClick={() => updateFormField('location', 'Yes')}
                  >
                    Yes
                  </button>
                  <button
                    className={`px-6 py-2 border rounded-lg font-medium transition-all duration-200 ${
                      formData.location === 'No' 
                        ? 'bg-accent text-white border-accent' 
                        : 'border-gray-300 hover:border-accent'
                    }`}
                    onClick={() => updateFormField('location', 'No')}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/**
             * SLIDE 2: Project Description (Text area)
             * Collects detailed information about their project
             */}
            <div 
              className="flex flex-col items-center justify-center px-6 py-8"
              style={{ width: `${100 / totalSlides}%` }}
            >
              <div className="w-full max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center">
                  Tell us a little more about your project
                </h1>
                <p className="text-gray-600 italic mb-6 text-center">
                  ex: "Raised redwood garden box for my side yard, thinking around 8 feet by 4 feet."
                </p>
                
                <textarea
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:border-accent focus:outline-none resize-none"
                  placeholder="Describe your project..."
                  value={formData.projectDescription}
                  onChange={(e) => updateFormField('projectDescription', e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/**
             * SLIDE 3: Contact Information (Name and Phone)
             * Collects customer contact details with privacy assurance
             */}
            <div 
              className="flex flex-col items-center justify-center px-6 py-8"
              style={{ width: `${100 / totalSlides}%` }}
            >
              <div className="w-full max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center">
                  What is your name and phone number?
                </h1>
                <p className="text-gray-600 italic mb-6 text-center">
                  We only use your information to contact you directly. We never share or sell your information.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-accent focus:outline-none"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => updateFormField('name', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-accent focus:outline-none"
                      placeholder="(650) 123-4567"
                      value={formData.phone}
                      onChange={(e) => updateFormField('phone', e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/**
             * SLIDE 4: Success/Thank You Page
             * Shows confirmation and next steps after form submission
             */}
            <div 
              className="flex flex-col items-center justify-center px-6 py-8"
              style={{ width: `${100 / totalSlides}%` }}
            >
              <div className="text-center max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Thank You!
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Cal or Fynn will reach out to you within 24 business hours to see if we'd be a good fit 
                  and to schedule your free consultation!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors duration-200"
                  >
                    Return Home
                  </button>
                  
                  <button
                    onClick={handleStartOver}
                    className="px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors duration-200"
                  >
                    Submit Another Project
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/**
         * Action buttons section - positioned at bottom
         * Conditionally renders Back, Next, and Submit buttons
         * Uses ActionButton component for consistent styling
         */}
        <div className="flex-shrink-0 py-4">
          <div className="flex justify-center items-center gap-4">
            
            {/* Back Button - shown on all slides except first and success */}
            {!isFirstSlide && !isSuccessSlide && (
              <FormActionButton>
                <button onClick={handleBack}>
                  {`<`}
                </button>
              </FormActionButton>
            )}

            {/* Next/Submit Button - shown on all form slides */}
            {!isSuccessSlide && (
              <FormActionButton>
                <button onClick={isLastFormSlide ? handleSubmit : handleNext}>
                  {isLastFormSlide ? 'Submit' : 'Next'}
                </button>
              </FormActionButton>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default GetQuotePage;