import {
  Download,
  PlayCircle,
  BookOpen,
  Sparkles,
  HelpCircle,
  Package,
  Instagram,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { PDFSection } from './PDFSection';
import logo from '@/assets/logo.png';

export function ThankYouPDFEN() {
  const data = {
    brandName: 'JM Presets',
    productName: 'Ultimate Backdrop Bundle',
    purchaseDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    includedItems: [
      '2000+ Premium Digital Backdrops',
      '1,900+ Overlay Collection (Bokeh, lights, smoke & more)',
      'Exclusive Photoshop Action - One-click background change!',
      'Premium Preset Collection for Lightroom & Camera Raw',
      'Complete Video Tutorial in English',
      'Lifetime Access - Access forever',
      '1 Year Free Updates - New backdrops added regularly'
    ],
    downloadLink: {
      label: '📥 Download All Files Here',
      url: 'https://drive.google.com/drive/folders/1DoxwMpBUXhpqIvDLAkCG8Jj7Aew9pBQ2?usp=sharing'
    },
    videoTutorial: {
      title: '🎬 English Tutorial - Learn how to use the backdrops',
      url: 'https://iframe.mediadelivery.net/play/574167/510843de-3227-4448-bcd1-ecacb786661b' // TODO: Update with actual English video URL
    },
    instructions: [
      'Download the .zip file from the link above',
      'Extract (unzip) the files to a folder on your computer',
      'Open Adobe Photoshop',
      'Load the Photoshop Action: Go to Window > Actions > Load',
      'Open your client photo in Photoshop',
      'Run the action - it will do everything for you!',
      'Choose the backdrop you want, and the action will apply it'
    ],
    proTips: [
      'The action works best with photos that have good natural lighting',
      'For best results, use photos with simple backgrounds',
      'Experiment with different backdrops to see what looks best for your client',
      'Watch the video tutorial to learn advanced techniques'
    ],
    instagramHandle: '@jmpresets',
    websiteUrl: 'www.jmpresets.com'
  };

  return (
    <div className="pdf-template bg-cream-50 h-[450mm] w-full max-w-[210mm] mx-auto p-8 print:p-6 font-sans text-charcoal-800">
      {/* Header */}
      <header className="text-center mb-10 pb-8 border-b-2 border-gold">
        <div className="mb-4">
          <img src={logo} alt={data.brandName} className="h-16 mx-auto" />
        </div>
        <div className="bg-gradient-to-r from-transparent via-gold/20 to-transparent py-6 px-4 rounded-sm">
          <p className="text-lg text-gold uppercase tracking-widest mb-2 font-semibold">
            🎉 Thank You For Your Purchase!
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-charcoal-900 mb-2">
            {data.productName}
          </h2>
          <p className="text-charcoal-600">
            You just made a great decision for your business! Here's everything you need to get started.
          </p>
        </div>
      </header>

      {/* What's Included */}
      <PDFSection title="What's Included" icon={<Package size={20} />}>
        <ul className="space-y-2">
          {data.includedItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-charcoal-700">
              <CheckCircle2 size={18} className="text-gold mt-0.5 flex-shrink-0" />
              <span className="text-base">{item}</span>
            </li>
          ))}
        </ul>
      </PDFSection>

      {/* Download Link - Main CTA */}
      <PDFSection title="Download Files" icon={<Download size={20} />}>
        <a
          href={data.downloadLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 p-6 bg-charcoal-900 text-cream-50 rounded-lg hover:bg-charcoal-800 transition-colors print:bg-charcoal-900 print:text-cream-50"
        >
          <Download size={28} className="text-gold flex-shrink-0" />
          <span className="font-bold text-xl uppercase tracking-wide">
            📥 Click Here to Download All Files
          </span>
        </a>
      </PDFSection>

      {/* Video Tutorial */}
      <PDFSection title="Video Tutorial" icon={<PlayCircle size={20} />}>
        <a
          href={data.videoTutorial.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 p-5 bg-red-deep text-cream-50 rounded-lg hover:bg-red-700 transition-all"
        >
          <PlayCircle size={28} className="flex-shrink-0" />
          <span className="font-bold text-lg uppercase tracking-wide">
            🎬 Click Here to Watch the Tutorial
          </span>
        </a>
        <p className="mt-3 text-sm text-charcoal-600 text-center">
          Watch this video before you start - it will show you everything step by step!
        </p>
      </PDFSection>

      {/* How to Use */}
      <PDFSection title="How to Use" icon={<BookOpen size={20} />}>
        <ol className="space-y-3">
          {data.instructions.map((instruction, index) => (
            <li key={index} className="flex gap-4">
              <span className="w-8 h-8 bg-gold text-charcoal-900 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-charcoal-700 pt-1">{instruction}</span>
            </li>
          ))}
        </ol>
      </PDFSection>

      {/* Pro Tips */}
      <PDFSection title="Pro Tips" icon={<Sparkles size={20} />}>
        <div className="bg-gold/10 border-l-4 border-gold p-4 rounded-r-sm">
          <ul className="space-y-2">
            {data.proTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-charcoal-700">
                <Sparkles size={14} className="text-gold mt-1 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </PDFSection>

      {/* Need Help */}
      <PDFSection title="Need Help?" icon={<HelpCircle size={20} />}>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <a
              href={`https://instagram.com/${data.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-charcoal-100 rounded-sm hover:bg-charcoal-200 transition-colors"
            >
              <Instagram size={20} className="text-charcoal-700" />
              <div>
                <span className="font-bold block text-charcoal-800">Instagram</span>
                <span className="text-sm text-charcoal-600">{data.instagramHandle}</span>
              </div>
            </a>
            <a
              href={`https://${data.websiteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-charcoal-100 rounded-sm hover:bg-charcoal-200 transition-colors"
            >
              <Globe size={20} className="text-charcoal-700" />
              <div>
                <span className="font-bold block text-charcoal-800">Website</span>
                <span className="text-sm text-charcoal-600">{data.websiteUrl}</span>
              </div>
            </a>
          </div>
        </div>
      </PDFSection>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t-2 border-gold text-center">
        <p className="text-charcoal-700 font-serif text-lg mb-2">
          "We can't wait to see what you create with these tools!"
        </p>
        <p className="text-charcoal-600 italic">
          Thank you for your trust. You're going to create beautiful things! 🙏
        </p>
        <p className="mt-4 text-sm text-charcoal-500">
          © {new Date().getFullYear()} {data.brandName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
