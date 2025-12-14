"use client";

import { useState, useEffect, useRef } from "react";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface TourStep {
  target: string;
  title: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

interface DemoTourProps {
  steps: TourStep[];
  onClose: () => void;
  onComplete: () => void;
}

export function DemoTour({ steps, onClose, onComplete }: DemoTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({});
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentStep < steps.length) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      setTargetElement(element);
      
      if (element) {
        updateOverlayAndTooltip(element);
      }
    }
  }, [currentStep, steps]);

  const updateOverlayAndTooltip = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Create overlay that highlights the target element
    setOverlayStyle({
      position: 'absolute',
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      border: '2px solid #3b82f6',
      borderRadius: '8px',
      zIndex: 1000,
      pointerEvents: 'none',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
    });

    // Position tooltip based on placement
    const step = steps[currentStep];
    let tooltipTop = rect.top + scrollTop;
    let tooltipLeft = rect.left + scrollLeft;

    switch (step.placement) {
      case 'top':
        tooltipTop = rect.top + scrollTop - 200;
        tooltipLeft = rect.left + scrollLeft + rect.width / 2;
        break;
      case 'bottom':
        tooltipTop = rect.bottom + scrollTop + 10;
        tooltipLeft = rect.left + scrollLeft + rect.width / 2;
        break;
      case 'left':
        tooltipTop = rect.top + scrollTop + rect.height / 2;
        tooltipLeft = rect.left + scrollLeft - 300;
        break;
      case 'right':
        tooltipTop = rect.top + scrollTop + rect.height / 2;
        tooltipLeft = rect.right + scrollLeft + 10;
        break;
    }

    setTooltipStyle({
      position: 'absolute',
      top: tooltipTop,
      left: tooltipLeft,
      zIndex: 1001,
      transform: step.placement === 'top' || step.placement === 'bottom' ? 'translateX(-50%)' : 'none'
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipTour = () => {
    onClose();
  };

  if (currentStep >= steps.length || !targetElement) {
    return null;
  }

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        style={overlayStyle}
        className="demo-tour-overlay"
      />

      {/* Tooltip */}
      <div
        style={tooltipStyle}
        className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm"
      >
        {/* Arrow */}
        <div
          className={`absolute w-0 h-0 ${
            step.placement === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 border-t-4 border-t-white border-l-4 border-l-transparent border-r-4 border-r-transparent' :
            step.placement === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 border-b-4 border-b-white border-l-4 border-l-transparent border-r-4 border-r-transparent' :
            step.placement === 'left' ? 'left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent' :
            'right-full top-1/2 transform -translate-y-1/2 border-r-4 border-r-white border-t-4 border-t-transparent border-b-4 border-b-transparent'
          }`}
        />

        {/* Content */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-sm text-gray-600">{step.content}</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Back</span>
            </button>
            
            <button
              onClick={nextStep}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
              {currentStep < steps.length - 1 && <ChevronRightIcon className="h-4 w-4" />}
            </button>
          </div>

          <button
            onClick={skipTour}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip tour
          </button>
        </div>
      </div>
    </>
  );
}
