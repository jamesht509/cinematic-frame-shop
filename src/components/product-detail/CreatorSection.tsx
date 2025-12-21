import jemsonPhoto from '@/assets/jemson-creator.jpg';

export function CreatorSection() {
  return (
    <section className="py-16 bg-charcoal text-white">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div className="bg-charcoal-light rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gold overflow-hidden">
                  <img 
                    src={jemsonPhoto} 
                    alt="Jemson - Creator" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <span className="text-gold uppercase tracking-widest text-sm font-medium">
                  Meet The Creator
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mt-3 mb-4">
                  Hi, I'm Jemson
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  A working photographer who knows how valuable your time is. This backdrop pack 
                  was built from real shoots and real deadlines — not theory. Every backdrop is 
                  designed to look natural, premium, and consistent, helping you create high-end 
                  images faster and with confidence.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  These are the same tools I use to elevate my own work and deliver professional 
                  results without wasting hours in post-production.
                </p>
                <p className="text-gold font-serif italic text-lg">
                  Not just backdrops. A smarter way to create premium images.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
