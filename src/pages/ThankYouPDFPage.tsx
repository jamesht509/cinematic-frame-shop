import { Printer, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThankYouPDFHT } from '@/components/pdf/ThankYouPDFHT';
import { Button } from '@/components/ui/button';

export default function ThankYouPDFPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-charcoal-100">
      {/* Toolbar - Hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-charcoal-900 text-cream-50 px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors">
              <ArrowLeft size={20} />
              <span>Retounen</span>
            </Link>
            <span className="text-charcoal-400">|</span>
            <h1 className="font-serif text-xl">PDF Thank You - Kreyòl</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handlePrint} className="bg-gold text-charcoal-900 hover:bg-gold/90">
              <Printer size={16} className="mr-2" />
              Print / Save PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions - Hidden when printing */}
      <div className="print:hidden max-w-[210mm] mx-auto px-6 py-4">
        <div className="bg-gold/20 border border-gold rounded-lg p-4 flex items-start gap-3">
          <Download className="text-gold flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-charcoal-800">Kijan pou Save PDF la:</p>
            <ol className="text-sm text-charcoal-600 mt-1 list-decimal list-inside space-y-1">
              <li>Klike sou bouton "Print / Save PDF" ki anwo a</li>
              <li>Nan opsyon "Destination", chwazi "Save as PDF"</li>
              <li>Klike "Save" epi chwazi kote w vle mete l</li>
            </ol>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="max-w-[210mm] mx-auto px-6 pb-8 print:p-0 print:max-w-none">
        <div className="bg-white shadow-2xl print:shadow-none">
          <ThankYouPDFHT />
        </div>
      </div>
    </div>
  );
}
