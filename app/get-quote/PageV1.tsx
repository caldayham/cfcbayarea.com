'use client';

import { useEffect, useRef } from 'react';
import contactQuestions from '@/data/contactQuestions';
import { useFormPersistence } from '@/lib/hooks/useFormPersistence';

export default function PageV1() {
  const { answers, setAnswers, currentStep, setCurrentStep, clearFormState } = useFormPersistence();
  const containerRef = useRef<HTMLDivElement>(null);

  // Debug info
  const totalSlides = contactQuestions.length + 1; // +1 for success slide

  useEffect(() => {
    console.log('Debug Info:', {
      currentStep,
      totalSlides,
      contactQuestionsLength: contactQuestions.length,
      transform: `translateX(-${currentStep * 100}%)`,
      slideWidth: `${100 / totalSlides}%`
    });
  }, [currentStep, totalSlides]);

  /* ─ Emit progress updates ─ */
  useEffect(() => {
    const progress = (currentStep / totalSlides) * 100;
    const event = new CustomEvent('progressUpdate', {
      detail: { progress, totalSlides }  // Add totalSlides here
    });
    window.dispatchEvent(event);
  }, [currentStep, totalSlides]);

  /* ─ Navigation helpers ─ */
  const handleAnswer = (id: string, value: any) =>
    setAnswers(prev => ({ ...prev, [id]: value }));

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = () => {
    console.log('Submitted:', answers);
    // Clear localStorage after successful submission
    clearFormState();
    setCurrentStep(contactQuestions.length);
  };

  const handleStartOver = () => {
    clearFormState();
    window.location.reload();
  };

  /* ─ Button styles using inline styles for CSS variables ─ */
  const navBtnStyle = {
    borderColor: 'var(--color-accent)',
    color: 'var(--color-accent)',
  };

  // Check if we're on the success slide
  const isSuccessSlide = currentStep === contactQuestions.length;
  // Check if we're on the first slide
  const isFirstSlide = currentStep === 0;
  // Check if we're on the last form slide
  const isLastFormSlide = currentStep === contactQuestions.length - 1;

  return (
    <div ref={containerRef} className=" bg-white bg-grid overflow-hidden pt-20">
      <div className="flex flex-col">

        {/* Sliding Content Container */}
        <div className="overflow-hidden h-1/2">
          <div
            className="slider-track flex transition-transform duration-500 ease-in-out h-full"
            style={{
              transform: `translateX(-${currentStep * (100 / totalSlides)}%)`,
              width: `${totalSlides * 100}%`
            }}
          >

            {/* ── Form Steps ── */}
            {contactQuestions.map((q, i) => (
              <div
                key={q.id}
                className="h-full bg-white rounded-lg border border-gray-200 shadow-sm slide flex flex-col items-center px-4 overflow-hidden" style={{
                  width: `${100 / totalSlides}%`
                }}
              >
                {/* Question Title */}
                <h2 className="text-3xl font-bold mb-4 text-primary text-center max-w-2xl flex-shrink-0 mt-4">
                  {q.question}
                </h2>

                {/* Scrollable Answer Content */}
                <div className="w-full max-w-4xl mx-auto">
                  <div className=" overflow-y-auto p-6" style={{ maxHeight: 'max(50vh, 200px)' }}>
                    {/* Choice Questions */}
                    {q.type === 'choice' && q.options && (
                      <div className="flex gap-4 flex-wrap justify-center">
                        {q.options.map(opt => (
                          <button
                            key={opt}
                            className={`px-6 py-3 border rounded font-medium transition-all duration-200 ${answers[q.id] === opt
                              ? 'text-white'
                              : 'border-primary/20'
                              }`}
                            style={{
                              ...(answers[q.id] === opt && {
                                backgroundColor: 'var(--color-accent)',
                                borderColor: 'var(--color-accent-dark)',
                              })
                            }}
                            onClick={() => handleAnswer(q.id, opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Textarea Questions */}
                    {q.type === 'textarea' && (
                      <div className="space-y-6 w-full">
                        <textarea
                          className="h-20 w-full p-4 border border-gray-300 rounded focus:border-accent focus:outline-none"
                          rows={5}
                          placeholder={q.placeholder}
                          value={answers[q.id] || ''}
                          onChange={e => handleAnswer(q.id, e.target.value)}
                        />

                        {/* Add Images Section */}
                        <div>
                          <label className="block font-medium text-sm text-primary mb-1">
                            Add images (optional)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="w-full p-3 border border-gray-300 rounded text-sm file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 mb-2"
                          />
                        </div>

                        {/* Search the Web Section */}
                        <button
                          type="button"
                          className="mb-2 w-full p-2 border border-gray-300 rounded text-sm text-left bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3"
                          onClick={() => {
                            // Add your search functionality here
                            console.log('Search the web clicked');
                          }}
                        >
                          <span className="inline-block w-6 h-6 bg-blue-100 rounded text-xs flex items-center justify-center text-blue-600 font-medium">🔍</span>
                          Search for reference images or inspiration
                        </button>

                        {/* Take a Photo Section */}
                        <button
                          type="button"
                          className="w-full p-2 border border-gray-300 rounded text-sm text-left bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3"
                          onClick={() => {
                            // Add your camera functionality here
                            console.log('Take a photo clicked');
                          }}
                        >
                          <span className="inline-block w-6 h-6 bg-green-100 rounded text-xs flex items-center justify-center text-green-600 font-medium">📷</span>
                          Use your camera to capture images
                        </button>
                      </div>
                    )}

                    {/* Text Field Questions */}
                    {q.type === 'text' && q.fields && (
                      <div className="space-y-4 w-full">
                        {q.fields.map(field => (
                          <div key={field.id}>
                            <label className="block mb-1 text-primary font-medium">
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              className="w-full p-2 border border-gray-300 rounded focus:border-accent focus:outline-none"
                              value={answers[field.id] || ''}
                              onChange={e => handleAnswer(field.id, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* ── Success/Next Steps Slide ── */}
            <div
              className="slide flex flex-col items-center justify-center px-4 h-full"
              style={{
                width: `${100 / totalSlides}%`
              }}
            >
              <h2 className="text-3xl font-bold text-primary mb-4">Next Steps</h2>
              <p className="text-lg text-secondary text-center max-w-md mb-8">
                Cal or Fynn will reach out to you within 24 business hours to see if we'd be a good fit
                and to schedule your free consultation!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-2 border rounded transition-colors duration-200 hover:text-white"
                  style={navBtnStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                >
                  Return Home
                </button>

                <span className="text-muted text-sm">or</span>

                <button
                  onClick={handleStartOver}
                  className="px-6 py-2 border rounded transition-colors duration-200 hover:text-white"
                  style={navBtnStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                >
                  Submit Another Project!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Navigation Button Container */}
        <div className="flex justify-center items-center gap-4 h-20 flex-shrink-0">
          {/* Back Button */}
          {!isFirstSlide && !isSuccessSlide && (
            <button
              onClick={handleBack}
              className="px-8 py-1.5 border rounded transition-colors duration-200 hover:text-white text-lg font-medium"
              style={navBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
            >
              Back
            </button>
          )}

          {/* Next/Submit Button */}
          {!isSuccessSlide && (
            <>
              {!isLastFormSlide ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-1.5 border rounded transition-colors duration-200 hover:text-white text-lg font-medium"
                  style={navBtnStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-1.5 border rounded transition-colors duration-200 hover:text-white text-lg font-medium"
                  style={navBtnStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                >
                  Submit
                </button>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}