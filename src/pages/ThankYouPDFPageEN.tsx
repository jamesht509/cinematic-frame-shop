import { ThankYouPDFEN } from '@/components/pdf/ThankYouPDFEN';
import { Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThankYouPDFPageEN() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-charcoal-100">
      {/* Toolbar - Hidden in print */}
      <div className="print:hidden sticky top-0 z-50 bg-charcoal-900 text-cream-50 py-3 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-cream-50/80 hover:text-cream-50 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gold text-charcoal-900 px-4 py-2 rounded-md font-bold hover:bg-gold/90 transition-colors"
          >
            <Printer size={18} />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Instructions - Hidden in print */}
      <div className="print:hidden bg-cream-50 border-b border-charcoal-200 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-charcoal-800 mb-2">💡 How to save as PDF:</h2>
          <ol className="text-sm text-charcoal-600 space-y-1 list-decimal list-inside">
            <li>Click the "Print / Save as PDF" button above</li>
            <li>In the print dialog, select "Save as PDF" as the destination</li>
            <li>Click "Save" and choose where to save</li>
          </ol>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="py-8 print:py-0">
        <ThankYouPDFEN />
      </div>
    </div>
  );
}
