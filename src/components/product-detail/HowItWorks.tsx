import { ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Download Your Files',
      description: 'After purchase, you will receive instant access to download all files.',
    },
    {
      number: '02',
      title: 'Open in Photoshop',
      description: 'Open your client photo and the digital background in Photoshop.',
    },
    {
      number: '03',
      title: 'Composite & Blend',
      description: 'Use simple masking techniques to blend your subject into the scene.',
    },
    {
      number: '04',
      title: 'Deliver Magic',
      description: 'Export your final image and amaze your clients with the results.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-charcoal text-white scroll-mt-24">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="text-gold uppercase tracking-widest text-sm font-medium">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4 mb-4">
            See how it <span className="text-gold italic">works</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Creating stunning composites has never been easier. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-charcoal-light p-6 rounded-lg border border-white/10 h-full">
                <span className="text-gold font-serif text-4xl font-bold opacity-30">
                  {step.number}
                </span>
                <h3 className="font-serif text-xl font-medium mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gold/50 h-6 w-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
