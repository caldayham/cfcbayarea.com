import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-600">
            Last updated: January 2025
          </p>
        </div>

        {/* Terms Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Section 1: Agreement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              By engaging Cal Fynn Construction ("CFC", "we", "us", or "our") for construction services, 
              you ("client", "you", or "your") agree to be bound by these Terms of Service. 
              These terms apply to all construction projects, consultations, and related services.
            </p>
          </section>

          {/* Section 2: Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              2. Our Services
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              CFC provides custom construction services including but not limited to:
            </p>
            <ul className="list-disc list-inside text-slate-700 mb-4 space-y-2">
              <li>Custom fences and gates</li>
              <li>Chicken coops and animal enclosures</li>
              <li>Small to medium-sized custom construction projects</li>
              <li>Design consultation and project planning</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              All services are provided in the Palo Alto Bay Area and surrounding regions.
            </p>
          </section>

          {/* Section 3: Project Process */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              3. Project Process
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Consultation</h3>
                <p className="text-slate-700 leading-relaxed">
                  We provide free initial consultations to assess project scope and feasibility. 
                  This consultation does not constitute a commitment to proceed with the project.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Proposals and Contracts</h3>
                <p className="text-slate-700 leading-relaxed">
                  All projects require a signed contract before work begins. Project scope, 
                  timeline, and costs will be clearly outlined in the contract.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Payment Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              4. Payment Terms
            </h2>
            <div className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                <strong>Payment Schedule:</strong> Projects require 50% payment upfront before work begins 
                and 50% payment upon completion, plus any additional work approved during the project.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Additional Work:</strong> Any changes or additions to the original scope 
                must be approved in writing and will be billed separately.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Late Payments:</strong> Payments more than 30 days overdue may incur 
                a 1.5% monthly service charge.
              </p>
            </div>
          </section>

          {/* Section 5: Warranties */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              5. Warranties and Guarantees
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We stand behind our work and provide a one-year warranty on workmanship for structural elements. 
              This warranty covers defects in our construction but does not cover:
            </p>
            <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
              <li>Normal wear and tear</li>
              <li>Damage from weather events or acts of nature</li>
              <li>Damage from misuse or lack of maintenance</li>
              <li>Material defects (covered by manufacturer warranties)</li>
            </ul>
          </section>

          {/* Section 6: Limitations */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Our liability is limited to the total contract value of your project. 
              We are not responsible for indirect, consequential, or punitive damages. 
              All construction work is performed in compliance with local building codes and regulations.
            </p>
          </section>

          {/* Section 7: Permits */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              7. Permits and Compliance
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Client is responsible for obtaining any required permits unless otherwise specified 
              in the contract. We will assist in the permit process as needed and ensure all work 
              complies with local building codes.
            </p>
          </section>

          {/* Section 8: Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              8. Contact Information
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Questions about these terms should be directed to Cal Fynn Construction through 
              our website contact form or by calling during business hours.
            </p>
          </section>

        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-600 mb-4">
            These terms are effective as of January 2025 and may be updated as needed.
          </p>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}