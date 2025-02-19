"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/_components/ui/accordion"
import { Button } from "@/_components/ui/button"

const faqs = [
  {
    question: "What does cellthium do and what does Cellthium offer?",
    answer: "Cellthium is a company that provides all in one battery solution.",
  },
  {
    question: "What are the benefits of using Cellthium",
    answer:
      "Cellthium focuses on sustainability and has many fields experience regarding battery management.",
  },
  {
    question: "What is the mission and vision of Cellthium?",
    answer: "Cellthium aims for battery solution that ...",
  },
]

export default function FAQ() {
  return (
    <section className="space-y-4 py-20">
      <h1 className="text-3xl font-bold">
        <span className="text-green-600">Frequently Asked</span> Questions
      </h1>

      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => {
          return (
            <AccordionItem
              value={`index-${index}`}
              key={`accordion-${faq.question}`}
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      <div className="flex justify-center">
        <Button variant={"secondary"} className="mt-4">
          See all questions
        </Button>
      </div>
    </section>
  )
}
