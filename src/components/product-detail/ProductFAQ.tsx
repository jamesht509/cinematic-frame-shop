import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductFAQ() {
  const faqs = [
    {
      question: "What software do I need to use these backgrounds?",
      answer: "Adobe Photoshop is recommended for best results, but these digital backdrops also work with other photo editing software that supports layers and masking, such as GIMP, Affinity Photo, or Photoshop Elements.",
    },
    {
      question: "What resolution are the files?",
      answer: "All backgrounds are provided in high resolution (minimum 4000px on the longest side) at 300 DPI, ensuring they're suitable for printing at large sizes without any loss of quality.",
    },
    {
      question: "Is my payment secure?",
      answer: "Absolutely! All transactions are 100% secure with SSL encryption. We use trusted payment providers like Stripe and PayPal to process your payments safely.",
    },
    {
      question: "How will I receive the files?",
      answer: "Immediately after purchase, you'll receive an email with download links. You'll have lifetime access to re-download your files whenever you need them.",
    },
    {
      question: "Can I use these for commercial photography?",
      answer: "Yes! Our license allows you to use these backgrounds for both personal and commercial projects. You can use them for client work, sell prints, and include them in your portfolio.",
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 7-day money-back guarantee. If you're not satisfied with your purchase, contact us within 7 days and we'll provide a full refund, no questions asked.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-background scroll-mt-24">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            Frequently <span className="text-gold italic">Asked</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
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
