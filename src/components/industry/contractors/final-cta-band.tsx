import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const FinalCTABand: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to smooth revenue and book more jobs?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            See the Contractor Growth Engine in action — launch in 1–3 weeks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
              <Link href="/book-demo">
                Book a Demo
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              <Link href="/contact">
                Talk to an Expert
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FinalCTABand;