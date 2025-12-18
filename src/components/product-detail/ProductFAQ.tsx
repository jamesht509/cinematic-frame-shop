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
      answer: "These digital backgrounds work best with Adobe Photoshop, but they can also be used with other photo editing software that supports layers and masking, such as GIMP, Affinity Photo, or Photoshop Elements.",
    },
    {
      question: "What resolution are the files?",
      answer: "All backgrounds are provided in high resolution (minimum 4000px on the longest side) at 300 DPI, ensuring they're suitable for printing at large sizes without any loss of quality.",
    },
    {
      question: "Can I use these for commercial photography?",
      answer: "Yes! Our license allows you to use these backgrounds for both personal and commercial projects. You can use them for client work, sell prints, and include them in your portfolio.",
    },
    {
      question: "How will I receive my files?",
      answer: "Immediately after purchase, you'll receive an email with a download link. You'll have lifetime access to re-download your files whenever you need them.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Due to the digital nature of our products, we cannot offer refunds once the files have been downloaded. However, if you experience any issues, please contact us and we'll do our best to help.",
    },
    {
      question: "Are tutorials included?",
      answer: "Yes! Each bundle includes a quick-start guide with tips and techniques for getting the best results. We also have free video tutorials available on our YouTube channel.",
    },
  ];

  return (
    <section className="py-16 bg-background">
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
