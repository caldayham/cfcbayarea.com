import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HookBanner from '@/components/About_Components/HookBanner';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-primary mb-10">

      <HookBanner />

      {/* Who We Are */}
      <section className="py-16 px-4 md:px-8 bg-white border-t border-default">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Who We Are
          </h2>
          <div className="bg-gray p-6 sm:p-8 rounded-lg shadow-sm">
            <p className="text-secondary leading-relaxed mb-6">
              CFC (Cal & Fynn Construction) is a small design-build company started by two Palo Alto brothers, Cal and Fynn.
            </p>
            <p className="text-secondary leading-relaxed mb-6">
              CFC specializes in those small to medium scale projects that require enough expertise, time, and labor to never make it off the todo list,
              but are not quite large enough for big companies to take your project seriously or at a fair price.
            </p>
            <p className="text-secondary leading-relaxed mb-6">
              Their discomfort is where CFC thrives! Having both grown up in their fathers workshop, Cal and Fynn have an intuitive understanding of how to economically create
              outdoor assemblies that last.
            </p>
            <p className="text-secondary leading-relaxed mb-6">
              This intuition, in combination with their clear communication, festidious planning, viewing problems simply as new data - not a personal offense,
              and a devotion to client satisfaction that will leave you thinking you got an epic deal, makes them the best choice tackle your
              small to medium custom outdoor projects.
            </p>
            <p className="text-secondary leading-relaxed mb-6">
              Additionally, Cal has profesional experience as a landscape designer at System Pavers, a nationally-scaled hardscaping company, and brings that design and industry experience to every consultation and job.
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
              { icon: '🏗️', title: 'Custom Garden Boxes', desc: 'Unique designs tailored to your property and style preferences.' },
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
              ['Quality Construction', 'We source materials and build your project with clear communication and flexibilty.']
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
