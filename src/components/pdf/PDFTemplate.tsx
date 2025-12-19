import { 
  Download, 
  PlayCircle, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Package,
  Mail,
  Instagram,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { PDFSection } from './PDFSection';

export interface PDFTemplateData {
  productName: string;
  purchaseDate: string;
  orderNumber: string;
  customerName: string;
  includedItems: string[];
  downloadLinks: { label: string; url: string }[];
  videoTutorials: { title: string; url: string }[];
  instructions: string[];
  proTips: string[];
  supportEmail: string;
  instagramHandle: string;
  websiteUrl: string;
  brandName: string;
  logoUrl?: string;
}

interface PDFTemplateProps {
  data: PDFTemplateData;
}

export function PDFTemplate({ data }: PDFTemplateProps) {
  return (
    <div className="pdf-template bg-cream-50 min-h-[297mm] w-full max-w-[210mm] mx-auto p-10 print:p-8 font-sans text-charcoal-800">
      {/* Header */}
      <header className="text-center mb-10 pb-8 border-b-2 border-gold">
        <div className="mb-4">
          {data.logoUrl ? (
            <img src={data.logoUrl} alt={data.brandName} className="h-16 mx-auto" />
          ) : (
            <h1 className="text-3xl font-serif font-bold text-primary tracking-wider">
              {data.brandName}
            </h1>
          )}
        </div>
        <div className="bg-gradient-to-r from-transparent via-gold/20 to-transparent py-6 px-4 rounded-sm">
          <p className="text-sm text-charcoal-600 uppercase tracking-widest mb-2">
            Thank You For Your Purchase
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-charcoal-900 mb-4">
            {data.productName}
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-charcoal-600">
            <span>
              <strong className="text-charcoal-800">Customer:</strong> {data.customerName}
            </span>
            <span>
              <strong className="text-charcoal-800">Order:</strong> #{data.orderNumber}
            </span>
            <span>
              <strong className="text-charcoal-800">Date:</strong> {data.purchaseDate}
            </span>
          </div>
        </div>
      </header>

      {/* What's Included */}
      <PDFSection title="What's Included" icon={<Package size={20} />}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {data.includedItems.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-charcoal-700">
              <CheckCircle2 size={16} className="text-gold mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </PDFSection>

      {/* Download Links */}
      <PDFSection title="Download Your Files" icon={<Download size={20} />}>
        <div className="space-y-3">
          {data.downloadLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-charcoal-900 text-cream-50 rounded-sm hover:bg-charcoal-800 transition-colors print:bg-white print:text-charcoal-900 print:border print:border-charcoal-300"
            >
              <Download size={18} className="text-gold" />
              <span className="font-medium">{link.label}</span>
              <span className="ml-auto text-xs text-charcoal-400 print:text-charcoal-600 break-all">
                {link.url}
              </span>
            </a>
          ))}
        </div>
      </PDFSection>

      {/* Video Tutorials */}
      <PDFSection title="Video Tutorials" icon={<PlayCircle size={20} />}>
        <div className="space-y-3">
          {data.videoTutorials.map((video, index) => (
            <a
              key={index}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 border border-gold/30 rounded-sm hover:border-gold hover:bg-gold/5 transition-all"
            >
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                <PlayCircle size={20} className="text-cream-50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-charcoal-800">{video.title}</p>
                <p className="text-xs text-charcoal-500 truncate">{video.url}</p>
              </div>
            </a>
          ))}
        </div>
      </PDFSection>

      {/* How to Use */}
      <PDFSection title="How to Use" icon={<BookOpen size={20} />}>
        <ol className="space-y-3">
          {data.instructions.map((instruction, index) => (
            <li key={index} className="flex gap-4">
              <span className="w-7 h-7 bg-gold text-charcoal-900 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-charcoal-700 pt-0.5">{instruction}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={`mailto:${data.supportEmail}`}
            className="flex items-center gap-3 p-3 bg-charcoal-100 rounded-sm hover:bg-charcoal-200 transition-colors"
          >
            <Mail size={18} className="text-primary" />
            <span className="text-sm text-charcoal-700">{data.supportEmail}</span>
          </a>
          <a
            href={`https://instagram.com/${data.instagramHandle.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-charcoal-100 rounded-sm hover:bg-charcoal-200 transition-colors"
          >
            <Instagram size={18} className="text-primary" />
            <span className="text-sm text-charcoal-700">{data.instagramHandle}</span>
          </a>
          <a
            href={data.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-charcoal-100 rounded-sm hover:bg-charcoal-200 transition-colors"
          >
            <Globe size={18} className="text-primary" />
            <span className="text-sm text-charcoal-700">{data.websiteUrl}</span>
          </a>
        </div>
      </PDFSection>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gold/30 text-center">
        <p className="text-charcoal-600 italic font-serif">
          "We can't wait to see what you create with these tools!"
        </p>
        <p className="mt-4 text-sm text-charcoal-500">
          © {new Date().getFullYear()} {data.brandName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
