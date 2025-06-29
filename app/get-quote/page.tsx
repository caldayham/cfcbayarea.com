'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GetQuotePage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [inPaloAlto, setInPaloAlto] = useState<'yes' | 'no' | ''>('');
  const [project, setProject] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNext = () => {
    if (step < 4) setStep((step + 1) as 1 | 2 | 3 | 4);
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as 1 | 2 | 3 | 4);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ inPaloAlto, project, name, phone });
    setStep(4);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-hero text-white py-14 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to shorten your outdoor to-do list?
          </h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-0 bg-surface relative">
        <div className="max-w-md mx-auto min-h-[300px] flex items-center">
          {/* Navigation Arrows */}
          {step < 4 && (
            <button
              onClick={handleBack}
              disabled={step === 1}
              aria-label="Previous"
              className="w-10 h-10 flex items-center justify-center rounded-full border text-xl text-[var(--color-text-primary)] disabled:opacity-20 mr-4"
            >
              &lt;
            </button>
          )}

          <div className="flex-1 space-y-8">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <p className="text-lg text-center" style={{ color: 'var(--color-text-primary)' }}>
                  Are you located in Palo Alto?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setInPaloAlto('yes')}
                    className={`px-6 py-3 font-medium border-2 ${inPaloAlto === 'yes' ? 'border-[var(--color-text-primary)]' : 'border-transparent'} rounded-[var(--radius)]`}
                  >Yes</button>
                  <button
                    onClick={() => setInPaloAlto('no')}
                    className={`px-6 py-3 font-medium border-2 ${inPaloAlto === 'no' ? 'border-[var(--color-text-primary)]' : 'border-transparent'} rounded-[var(--radius)]`}
                  >No</button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <label className="block font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  Briefly describe your project
                </label>
                <textarea
                  rows={4}
                  required
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full p-3 border rounded-[var(--radius)]"
                />
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border rounded-[var(--radius)]"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    Phone
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border rounded-[var(--radius)]"
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent-hover">
                  Submit
                </Button>
              </form>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Thanks, {name.split(' ')[0] || 'friend'}!
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Fynn or Cal will give you a quick call in <strong>12 business hours or less.</strong>
                </p>
                <Link href="/" className="underline hover:opacity-80">
                  Back to Home
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {step < 4 && (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !inPaloAlto) ||
                (step === 2 && !project.trim())
              }
              aria-label="Next"
              className="w-10 h-10 flex items-center justify-center rounded-full border text-xl text-[var(--color-text-primary)] disabled:opacity-20 ml-4"
            >
              &gt;
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
