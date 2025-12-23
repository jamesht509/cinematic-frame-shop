import {
  Download,
  PlayCircle,
  BookOpen,
  Sparkles,
  HelpCircle,
  Package,
  MessageCircle,
  Users,
  Instagram,
  Globe,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { PDFSection } from './PDFSection';
import logo from '@/assets/logo.png';

export function ThankYouPDFHT() {
  const data = {
    brandName: 'JM Presets',
    productName: 'Ultimate Backdrop Bundle',
    purchaseDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    includedItems: [
      '2000+ Premium Digital Backdrop yo',
      '1,900+ Overlay Collection (Bokeh, limyè, smoke & plis)',
      'Exclusive Photoshop Action - Yon klik pou chanje background!',
      'Premium Preset Collection pou Lightroom & Camera Raw',
      'Video Tutorial konplè an Kreyòl',
      'Lifetime Access - Aksè pou tout tan',
      '1 Lane Free Update - Nouvo backdrop ajoute regilyèman'
    ],
    downloadLink: {
      label: '📥 Download Tout File yo Isit',
      url: 'https://drive.google.com/drive/folders/1DoxwMpBUXhpqIvDLAkCG8Jj7Aew9pBQ2?usp=sharing'
    },
    videoTutorial: {
      title: '🎬 Tutorial an Kreyòl - Aprann kijan pou itilize backdrop yo',
      url: 'https://youtu.be/HrC0-ubPMaI'
    },
    instructions: [
      'Download file .zip la nan link ki anwo a',
      'Extract (unzip) file yo nan yon folder sou computer w',
      'Ouvri Adobe Photoshop',
      'Load Photoshop Action an: Ale nan Window > Actions > Load',
      'Ouvri foto client ou an nan Photoshop',
      'Run action an - li ap fè tout bagay pou ou!',
      'Chwazi backdrop ou vle a, epi action an ap mete l pou ou'
    ],
    proTips: [
      'Action an pi bon ak foto ki gen bon lighting natirèl',
      'Pou pi bon rezilta, sèvi ak foto ki gen background senpleman',
      'Eksperyante ak diferan backdrop pou wè sa ki pi bèl pou client ou',
      'Gade video tutorial an pou aprann teknik avanse yo',
      'Vin nan group WhatsApp la pou jwenn èd ak lòt fotografè'
    ],
    whatsappNumber: '+1 (774) 384-6150',
    whatsappGroup: 'https://chat.whatsapp.com/BNqLzQ5ygBnFTVrBTt5kx0',
    instagramHandle: '@jmpresets',
    websiteUrl: 'www.jmpresets.com'
  };

  return (
    <div className="pdf-template bg-cream-50 min-h-[297mm] w-full max-w-[210mm] mx-auto p-10 print:p-8 font-sans text-charcoal-800">
      {/* Header */}
      <header className="text-center mb-10 pb-8 border-b-2 border-gold">
        <div className="mb-4">
          <img src={logo} alt={data.brandName} className="h-16 mx-auto" />
        </div>
        <div className="bg-gradient-to-r from-transparent via-gold/20 to-transparent py-6 px-4 rounded-sm">
          <p className="text-lg text-gold uppercase tracking-widest mb-2 font-semibold">
            🎉 Mèsi Anpil pou Achte w!
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-charcoal-900 mb-2">
            {data.productName}
          </h2>
          <p className="text-charcoal-600">
            Ou fèk pran yon gwo desizyon pou biznis ou! Men tout sa w bezwen pou kòmanse.
          </p>
        </div>
      </header>

      {/* What's Included */}
      <PDFSection title="Kisa ki Ladan l" icon={<Package size={20} />}>
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
      <PDFSection title="Download File yo" icon={<Download size={20} />}>
        <a
          href={data.downloadLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 p-6 bg-charcoal-900 text-cream-50 rounded-lg hover:bg-charcoal-800 transition-colors print:bg-charcoal-900 print:text-cream-50"
        >
          <Download size={28} className="text-gold flex-shrink-0" />
          <span className="font-bold text-xl uppercase tracking-wide">
            📥 Klike Isit pou Download Tout File yo
          </span>
        </a>
      </PDFSection>

      {/* Video Tutorial */}
      <PDFSection title="Video Tutorial an Kreyòl" icon={<PlayCircle size={20} />}>
        <a
          href={data.videoTutorial.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 p-5 bg-red-deep text-cream-50 rounded-lg hover:bg-red-700 transition-all"
        >
          <PlayCircle size={28} className="flex-shrink-0" />
          <span className="font-bold text-lg uppercase tracking-wide">
            🎬 Klike Isit pou Gade Tutorial la
          </span>
        </a>
        <p className="mt-3 text-sm text-charcoal-600 text-center">
          Gade video sa a anvan w kòmanse - lap montre w tout bagay etap pa etap!
        </p>
      </PDFSection>

      {/* WhatsApp Group - Special Section */}
      <section className="mb-8 print:mb-6 bg-gradient-to-r from-green-500/10 to-green-600/10 border-2 border-green-500 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-charcoal-900">
              🆓 Antre nan Group WhatsApp GRATIS!
            </h3>
            <p className="text-charcoal-600 text-sm">
              Aprann plis, poze kesyon, epi konekte ak lòt fotografè
            </p>
          </div>
        </div>
        <a
          href={data.whatsappGroup}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-center justify-center text-lg uppercase tracking-wide"
        >
          <MessageCircle size={24} />
          <span>👆 Klike Isit pou Antre nan Group la GRATIS!</span>
        </a>
      </section>

      {/* How to Use */}
      <PDFSection title="Kijan pou Itilize" icon={<BookOpen size={20} />}>
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
      <PDFSection title="Tip Enpòtan" icon={<Sparkles size={20} />}>
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
      <PDFSection title="Bezwen Èd?" icon={<HelpCircle size={20} />}>
        <div className="grid grid-cols-1 gap-4">
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/17743846150`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-green-500 text-white rounded-sm hover:bg-green-600 transition-colors"
          >
            <Phone size={20} />
            <div>
              <span className="font-bold block">WhatsApp Dirèk</span>
              <span className="text-sm opacity-90">{data.whatsappNumber}</span>
            </div>
          </a>
          
          {/* Other contacts */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={`https://instagram.com/${data.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-charcoal-100 rounded-sm hover:bg-charcoal-200 transition-colors"
            >
              <Instagram size={18} className="text-charcoal-700" />
              <span className="text-sm text-charcoal-700">{data.instagramHandle}</span>
            </a>
            <a
              href={`https://${data.websiteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-charcoal-100 rounded-sm hover:bg-charcoal-200 transition-colors"
            >
              <Globe size={18} className="text-charcoal-700" />
              <span className="text-sm text-charcoal-700">{data.websiteUrl}</span>
            </a>
          </div>
        </div>
      </PDFSection>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t-2 border-gold text-center">
        <p className="text-charcoal-700 font-serif text-lg mb-2">
          "Nou pa ka tann pou wè sa wap kreye ak tool sa yo!"
        </p>
        <p className="text-charcoal-600 italic">
          Mèsi pou konfyans ou. Wap fè bagay bèl! 🙏
        </p>
        <p className="mt-4 text-sm text-charcoal-500">
          © {new Date().getFullYear()} {data.brandName}. Tout dwa rezève.
        </p>
      </footer>
    </div>
  );
}
