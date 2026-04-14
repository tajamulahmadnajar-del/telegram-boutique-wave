import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { MessageCircle, Mail, Phone, ChevronRight, HelpCircle, ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help & Support — TG Market" }] }),
  component: HelpPage,
});

const faqs = [
  { icon: Truck, question: "How do I track my order?", answer: "Go to Orders page and tap on any order to see real-time tracking with timeline." },
  { icon: RotateCcw, question: "How to return a product?", answer: "Within 7 days of delivery, go to Orders → select order → Request Return." },
  { icon: CreditCard, question: "When will I get my refund?", answer: "Refunds are processed within 5-7 business days after return approval." },
  { icon: ShieldCheck, question: "Is my payment secure?", answer: "Yes, all payments are encrypted and processed through secure payment gateways." },
  { icon: HelpCircle, question: "How to become a seller?", answer: "Go to Profile → Seller Panel → Apply. Your application will be reviewed within 48 hours." },
];

function HelpPage() {
  return (
    <div className="pb-20">
      <AppHeader title="Help & Support" showBack showSearch={false} />

      <div className="p-4 space-y-4">
        {/* Contact options */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: MessageCircle, label: "Live Chat", color: "bg-blue-500/10 text-blue-500" },
            { icon: Mail, label: "Email Us", color: "bg-emerald-500/10 text-emerald-500" },
            { icon: Phone, label: "Call Us", color: "bg-orange-500/10 text-orange-500" },
          ].map((item) => (
            <button key={item.label} className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 transition-colors hover:bg-accent">
              <div className={`rounded-full p-2.5 ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div>
          <h2 className="mb-2 text-sm font-semibold">Frequently Asked Questions</h2>
          <div className="overflow-hidden rounded-xl border bg-card">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b last:border-0">
                <summary className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-accent">
                  <faq.icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="flex-1">{faq.question}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="px-4 pb-3 pl-11 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Support ticket */}
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-sm text-muted-foreground">Still need help?</p>
          <button className="mt-2 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">
            Submit a Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
