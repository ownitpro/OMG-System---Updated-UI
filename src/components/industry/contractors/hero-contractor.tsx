import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface HeroContractorProps {
  headline?: string;
  subheadline?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

const HeroContractor: React.FC<HeroContractorProps> = ({
  headline = "Grow Your Contracting Business. Let Automation Handle The Admin.",
  subheadline = "Your all-in-one Growth & Project system: leads, quoting, payments, client communication, content — built for contractors.",
  primaryCTA = { text: "Book a Demo", href: "/book-demo" },
  secondaryCTA = { text: "See How It Works", href: "#how-it-works" },
}) => {
  return (
    <section className="bg-neutral-100 py-16 lg:py-24 text-center">
      <Container>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-primary text-surface hover:bg-primary-dark text-lg px-8 py-4 rounded-md transition-colors duration-medium">
            <Link href={primaryCTA.href}>
              {primaryCTA.text}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary-light hover:text-surface text-lg px-8 py-4 rounded-md transition-colors duration-medium">
            <Link href={secondaryCTA.href}>
              {secondaryCTA.text}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroContractor;