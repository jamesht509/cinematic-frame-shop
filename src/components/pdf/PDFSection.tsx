import { ReactNode } from 'react';

interface PDFSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function PDFSection({ title, icon, children }: PDFSectionProps) {
  return (
    <section className="mb-8 print:mb-6">
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gold/30">
        {icon && <span className="text-gold">{icon}</span>}
        <h2 className="text-xl font-serif font-semibold text-charcoal-900 tracking-wide uppercase">
          {title}
        </h2>
      </div>
      <div className="pl-0">{children}</div>
    </section>
  );
}
