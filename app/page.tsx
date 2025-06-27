import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline - emphasizes custom quality work */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Custom Construction.<br />
            Built Right.
          </h1>
          
          {/* Subheading - highlights local service and specialization */}
          <p className="text-xl md:text-2xl mb-8 text-slate-200">
            Local Palo Alto builders specializing in fences, gates, chicken coops, 
            and custom projects that big companies won&apos;t touch.
          </p>
          
          {/* Call to action button - drives to portfolio */}
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
            <Link href="/portfolio">
              See Our Work
            </Link>
          </Button>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            Who We Are
          </h2>
          
          {/* Story about the brothers and their background */}
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-slate-700 leading-relaxed mb-6">
              We&apos;re Cal and Fynn, brothers who&apos;ve been building things since we could walk. 
              Growing up in our father&apos;s workshop here in Palo Alto, we developed an intuitive 
              understanding of how things come together.
            </p>
            
            <p className="text-slate-700 leading-relaxed">
              Cal brings landscape design expertise, while Fynn contributes his engineering background. 
              Together, we focus on quality craftsmanship over maximum profit – because we&apos;d rather 
              build something right than build it fast.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            What We Do
          </h2>
          
          {/* Grid of specializations */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Fences & Gates</h3>
              <p className="text-slate-600">
                Unique designs tailored to your property and style preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐔</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chicken Coops</h3>
              <p className="text-slate-600">
                Functional and beautiful homes for your backyard flock.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Projects</h3>
              <p className="text-slate-600">
                Small to medium builds that require a personal touch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Do It Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            How We Work
          </h2>
          
          {/* Process steps */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Free Consultation</h3>
                <p className="text-slate-700">
                  We visit your site to understand your vision and assess the project scope.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Detailed Planning</h3>
                <p className="text-slate-700">
                  We create comprehensive construction plans and provide transparent pricing.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality Construction</h3>
                <p className="text-slate-700">
                  We source materials and build your project with attention to every detail.
                </p>
              </div>
            </div>
          </div>
          
          {/* Payment structure note */}
          <div className="mt-8 p-6 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 text-center">
              <strong>Simple Payment:</strong> 50% to start, 50% at completion. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          
          <p className="text-xl mb-8 text-slate-200">
            See our previous work and get inspired for your next project.
          </p>
          
          {/* Portfolio CTA button */}
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
            <Link href="/portfolio">
              View Our Portfolio
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}