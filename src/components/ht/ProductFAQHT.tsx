import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ht } from '@/locales/ht/translations';

export function ProductFAQHT() {
  return (
    <section id="faq" className="py-16 bg-background scroll-mt-24">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            {ht.faq.title} <span className="text-gold italic">{ht.faq.titleHighlight}</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {ht.faq.questions.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-muted/30 border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-serif text-lg hover:text-gold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
