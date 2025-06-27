import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600">
            Last updated: January 2025
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Section 1: Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              1. Overview
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Cal Fynn Construction ("CFC", "we", "us", or "our") respects your privacy and is 
              committed to protecting your personal information. This Privacy Policy explains how 
              we collect, use, and safeguard your information when you use our website or engage 
              our construction services.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              2. Information We Collect
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Contact Information</h3>
                <p className="text-slate-700 leading-relaxed mb-2">
                  When you contact us through our website or request a consultation, we collect:
                </p>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>Your name</li>
                  <li>Phone number</li>
                  <li>Email address (if provided)</li>
                  <li>Project location and description</li>
                  <li>Preferred contact times</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Project Information</h3>
                <p className="text-slate-700 leading-relaxed">
                  During consultations and project development, we may collect additional information 
                  about your property, project requirements, budget, and timeline preferences.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Website Usage</h3>
                <p className="text-slate-700 leading-relaxed">
                  Our website may collect basic usage information such as pages visited and time spent 
                  on the site to help us improve our services.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use your information solely for business purposes:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>To contact you about your construction project inquiry</li>
              <li>To schedule and conduct consultations</li>
              <li>To prepare project proposals and contracts</li>
              <li>To communicate about ongoing projects</li>
              <li>To provide customer service and support</li>
              <li>To improve our website and services</li>
            </ul>
          </section>

          {/* Section 4: Information Storage */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              4. Information Storage and Security
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Data Storage</h3>
                <p className="text-slate-700 leading-relaxed">
                  Contact form submissions are securely stored in our MongoDB database. 
                  We maintain this information to provide ongoing customer service and 
                  to comply with business record-keeping requirements.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Security Measures</h3>
                <p className="text-slate-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction. However, 
                  no method of transmission over the internet is 100% secure.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Information Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              5. Information Sharing
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties, 
              except in the following limited circumstances:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>With subcontractors or suppliers when necessary for your project</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          {/* Section 6: Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              6. Data Retention
            </h2>
            <p className="text-slate-700 leading-relaxed">
              We retain your information for as long as necessary to provide our services 
              and comply with legal obligations. Contact information from inquiries that 
              do not result in projects may be deleted after two years. Project-related 
              information is retained for business and warranty purposes.
            </p>
          </section>

          {/* Section 7: Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              7. Your Rights
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to business and legal requirements)</li>
              <li>Opt out of future communications</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              To exercise these rights, please contact us through our website contact form.
            </p>
          </section>

          {/* Section 8: Cookies and Tracking */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              8. Cookies and Tracking
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Our website may use essential cookies to ensure proper functionality. 
              We do not use tracking cookies for advertising purposes. You can disable 
              cookies in your browser settings, though this may affect website functionality.
            </p>
          </section>

          {/* Section 9: Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              9. Children's Privacy
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Our services are intended for adults. We do not knowingly collect personal 
              information from children under 13. If we become aware that we have collected 
              such information, we will delete it promptly.
            </p>
          </section>

          {/* Section 10: Policy Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              10. Policy Updates
            </h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted on this page 
              with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Section 11: Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              11. Contact Us
            </h2>
            <p className="text-slate-700 leading-relaxed">
              If you have questions about this Privacy Policy or how we handle your information, 
              please contact us through our website contact form or during business hours.
            </p>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-600 mb-4">
            This policy is effective as of January 2025 and may be updated as needed.
          </p>
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </a>
        </div>

      </div>
    </div>
  );
}