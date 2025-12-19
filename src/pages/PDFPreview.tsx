import { useState } from 'react';
import { Printer, ArrowLeft, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PDFTemplate, PDFTemplateData } from '@/components/pdf/PDFTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const defaultData: PDFTemplateData = {
  brandName: 'Kelvin Lopes Edits',
  productName: 'Warm & Moody Preset Pack',
  purchaseDate: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  orderNumber: '1001',
  customerName: 'John Doe',
  includedItems: [
    '25 Professional Lightroom Presets (.xmp)',
    '25 Lightroom Mobile Presets (.dng)',
    'Before & After Examples',
    'Installation Guide (PDF)',
    'Quick Start Video Tutorial',
  ],
  downloadLinks: [
    { label: 'Download Desktop Presets', url: 'https://drive.google.com/your-link' },
    { label: 'Download Mobile Presets', url: 'https://drive.google.com/your-link-mobile' },
    { label: 'Download Installation Guide', url: 'https://drive.google.com/your-guide' },
  ],
  videoTutorials: [
    { title: 'How to Install Presets in Lightroom Desktop', url: 'https://youtube.com/watch?v=xxx' },
    { title: 'How to Install Presets on Lightroom Mobile', url: 'https://youtube.com/watch?v=yyy' },
    { title: 'Getting the Best Results with These Presets', url: 'https://youtube.com/watch?v=zzz' },
  ],
  instructions: [
    'Download the .zip file from the link above',
    'Extract the files to a folder on your computer',
    'Open Adobe Lightroom and go to the Develop module',
    'Click on the Presets panel (+) > Import Presets',
    'Select all the .xmp files from the extracted folder',
    'Your presets are now ready to use!',
  ],
  proTips: [
    'These presets work best with well-exposed, natural light images',
    'After applying a preset, adjust the Exposure slider for perfect results',
    'Use the HSL panel to fine-tune skin tones if needed',
    'Create your own variations by saving modified presets',
  ],
  supportEmail: 'support@kelvinlopesedits.com',
  instagramHandle: '@kelvinlopesedits',
  websiteUrl: 'www.kelvinlopesedits.com',
};

export default function PDFPreview() {
  const [data, setData] = useState<PDFTemplateData>(defaultData);
  const [isEditing, setIsEditing] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const updateField = (field: keyof PDFTemplateData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: 'includedItems' | 'instructions' | 'proTips', value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value.split('\n').filter((line) => line.trim()),
    }));
  };

  const updateLinks = (value: string) => {
    const links = value.split('\n').filter((line) => line.trim());
    setData((prev) => ({
      ...prev,
      downloadLinks: links.map((line) => {
        const [label, url] = line.split('|').map((s) => s.trim());
        return { label: label || '', url: url || '' };
      }),
    }));
  };

  const updateVideos = (value: string) => {
    const videos = value.split('\n').filter((line) => line.trim());
    setData((prev) => ({
      ...prev,
      videoTutorials: videos.map((line) => {
        const [title, url] = line.split('|').map((s) => s.trim());
        return { title: title || '', url: url || '' };
      }),
    }));
  };

  return (
    <div className="min-h-screen bg-charcoal-100">
      {/* Toolbar - Hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-charcoal-900 text-cream-50 px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors">
              <ArrowLeft size={20} />
              <span>Back to Site</span>
            </Link>
            <span className="text-charcoal-400">|</span>
            <h1 className="font-serif text-xl">PDF Template Preview</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="border-gold/50 text-gold hover:bg-gold/10"
            >
              <Edit3 size={16} className="mr-2" />
              {isEditing ? 'Close Editor' : 'Edit Content'}
            </Button>
            <Button onClick={handlePrint} className="bg-gold text-charcoal-900 hover:bg-gold/90">
              <Printer size={16} className="mr-2" />
              Print as PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 print:p-0 print:max-w-none">
        <div className={`flex gap-8 ${isEditing ? 'flex-col lg:flex-row' : ''}`}>
          {/* Editor Panel */}
          {isEditing && (
            <div className="print:hidden lg:w-1/2 bg-white rounded-lg shadow-lg p-6 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h2 className="text-xl font-serif font-semibold text-charcoal-900 border-b pb-3">
                Edit Template Content
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Brand Name</Label>
                  <Input
                    value={data.brandName}
                    onChange={(e) => updateField('brandName', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={data.productName}
                    onChange={(e) => updateField('productName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Customer Name</Label>
                  <Input
                    value={data.customerName}
                    onChange={(e) => updateField('customerName', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Order Number</Label>
                  <Input
                    value={data.orderNumber}
                    onChange={(e) => updateField('orderNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Purchase Date</Label>
                  <Input
                    value={data.purchaseDate}
                    onChange={(e) => updateField('purchaseDate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>What's Included (one per line)</Label>
                <Textarea
                  rows={5}
                  value={data.includedItems.join('\n')}
                  onChange={(e) => updateArrayField('includedItems', e.target.value)}
                />
              </div>

              <div>
                <Label>Download Links (format: Label | URL, one per line)</Label>
                <Textarea
                  rows={4}
                  value={data.downloadLinks.map((l) => `${l.label} | ${l.url}`).join('\n')}
                  onChange={(e) => updateLinks(e.target.value)}
                />
              </div>

              <div>
                <Label>Video Tutorials (format: Title | URL, one per line)</Label>
                <Textarea
                  rows={4}
                  value={data.videoTutorials.map((v) => `${v.title} | ${v.url}`).join('\n')}
                  onChange={(e) => updateVideos(e.target.value)}
                />
              </div>

              <div>
                <Label>Instructions (one per line)</Label>
                <Textarea
                  rows={6}
                  value={data.instructions.join('\n')}
                  onChange={(e) => updateArrayField('instructions', e.target.value)}
                />
              </div>

              <div>
                <Label>Pro Tips (one per line)</Label>
                <Textarea
                  rows={4}
                  value={data.proTips.join('\n')}
                  onChange={(e) => updateArrayField('proTips', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Support Email</Label>
                  <Input
                    value={data.supportEmail}
                    onChange={(e) => updateField('supportEmail', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Instagram Handle</Label>
                  <Input
                    value={data.instagramHandle}
                    onChange={(e) => updateField('instagramHandle', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Website URL</Label>
                  <Input
                    value={data.websiteUrl}
                    onChange={(e) => updateField('websiteUrl', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* PDF Preview */}
          <div className={`${isEditing ? 'lg:w-1/2' : 'w-full'} print:w-full`}>
            <div className="bg-white shadow-2xl print:shadow-none">
              <PDFTemplate data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
