import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import HookBanner from '@/components/HookBanner';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-primary">

      <HookBanner />

      {/* Who We Are */}
      <section className="py-16 px-4 md:px-8 bg-white border-t border-default">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Who We Are
          </h2>
          <div className="bg-gray p-6 sm:p-8 rounded-lg shadow-sm">
            <p className="text-secondary leading-relaxed mb-6">
              We're Cal and Fynn, two brothers who love design and construction and decided to turn it into a part-time summer job! Personal design, quality construction. 
            </p>
            <p className="text-secondary leading-relaxed">
              Cal brings landscape design expertise, while Fynn contributes his engineering background…
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4 md:px-8 bg-gray border-t border-default">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏗️', title: 'Custom Fences & Gates', desc: 'Unique designs tailored to your property and style preferences.' },
              { icon: '🐔', title: 'Chicken Coops', desc: 'Functional and beautiful homes for your backyard flock.' },
              { icon: '🔨', title: 'Custom Projects', desc: 'Small to medium builds that require a personal touch.' }
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 px-4 md:px-8 bg-white border-t border-default">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            How We Work
          </h2>
          <div className="space-y-10">
            {[
              ['Free Consultation', 'We visit your site to understand your vision and assess the project scope.'],
              ['Detailed Planning', 'We create comprehensive construction plans and provide transparent pricing.'],
              ['Quality Construction', 'We source materials and build your project with attention to every detail.']
            ].map(([title, desc], idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{title}</h3>
                  <p className="text-secondary text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-gray rounded-lg shadow-sm border border-default text-center">
            <p className="text-sm text-muted">
              <strong>Simple Payment:</strong> 50 % to start, 50 % at completion. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* CTA – still white, relies on imagery for pop */}
      <section className="py-20 px-4 md:px-8 bg-white border-t border-default">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-secondary">
            See our previous work and get inspired for your next project.
          </p>
          <Button asChild size="lg" className="text-white bg-accent hover:bg-accent-dark text-lg px-8 py-3 shadow-lg rounded">
            <Link href="/portfolio">View Our Portfolio</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
