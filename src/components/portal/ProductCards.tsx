"use client";

import React from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  DocumentTextIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  SparklesIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

interface ProductData {
  title: string;
  description: string;
  status: "available" | "coming-soon";
  launchUrl?: string;
  iconName: string;
}

interface ProductCardsProps {
  products: ProductData[];
}

// Map icon names to actual icon components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  SparklesIcon,
  ChartBarIcon,
};

export function ProductCards({ products }: ProductCardsProps) {
  return (
    <>
      {products.map((product) => {
        const IconComponent = iconMap[product.iconName];
        return (
          <ProductCard
            key={product.title}
            title={product.title}
            description={product.description}
            status={product.status}
            launchUrl={product.launchUrl}
            icon={IconComponent}
          />
        );
      })}
    </>
  );
}

