"use client";

import React from "react";
import { useState } from "react";
import { CalculatorIcon, ChartBarIcon } from "@heroicons/react/24/outline";

interface ROICalculatorProps {
  industry: string;
  industryName: string;
}

interface CalculatorInputs {
  teamSize: number;
  monthlyVolume: number;
  avgHourlyRate: number;
  timeSavedPerTask: number;
  tasksPerMonth: number;
}

interface CalculatorResults {
  monthlyTimeSaved: number;
  monthlyCostSavings: number;
  annualSavings: number;
  roiPercentage: number;
  paybackPeriod: number;
}

export function ROICalculator({ industry, industryName }: ROICalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    teamSize: 5,
    monthlyVolume: 100,
    avgHourlyRate: 25,
    timeSavedPerTask: 0.5,
    tasksPerMonth: 50
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateROI = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const monthlyTimeSaved = inputs.tasksPerMonth * inputs.timeSavedPerTask;
      const monthlyCostSavings = monthlyTimeSaved * inputs.avgHourlyRate * inputs.teamSize;
      const annualSavings = monthlyCostSavings * 12;
      
      // Assume platform cost of $500/month for small teams, scaling up
      const monthlyPlatformCost = Math.max(500, inputs.teamSize * 100);
      const annualPlatformCost = monthlyPlatformCost * 12;
      
      const roiPercentage = ((annualSavings - annualPlatformCost) / annualPlatformCost) * 100;
      const paybackPeriod = annualPlatformCost / annualSavings * 12;

      setResults({
        monthlyTimeSaved,
        monthlyCostSavings,
        annualSavings,
        roiPercentage,
        paybackPeriod
      });
      
      setIsCalculating(false);
    }, 1000);
  };

  const getIndustryDefaults = () => {
    const defaults: Record<string, Partial<CalculatorInputs>> = {
      'property-management': {
        avgHourlyRate: 30,
        timeSavedPerTask: 0.75,
        tasksPerMonth: 80
      },
      'real-estate': {
        avgHourlyRate: 35,
        timeSavedPerTask: 1.0,
        tasksPerMonth: 60
      },
      'contractors': {
        avgHourlyRate: 40,
        timeSavedPerTask: 0.5,
        tasksPerMonth: 100
      },
      'healthcare': {
        avgHourlyRate: 45,
        timeSavedPerTask: 0.25,
        tasksPerMonth: 200
      },
      'accounting': {
        avgHourlyRate: 50,
        timeSavedPerTask: 0.5,
        tasksPerMonth: 120
      },
      'cleaning': {
        avgHourlyRate: 20,
        timeSavedPerTask: 0.5,
        tasksPerMonth: 80
      }
    };
    
    return defaults[industry] || {};
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResults(null); // Clear results when inputs change
  };

  const handleSaveResults = async () => {
    if (!results) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: '', // Will be filled by user
          name: '',
          industry: industry,
          budgetBand: 'calculating',
          source: 'roi-calculator',
          context: {
            page_path: window.location.pathname,
            section: 'roi-calculator',
            timestamp: new Date().toISOString(),
            calculatorResults: results,
            calculatorInputs: inputs
          }
        }),
      });

      if (response.ok) {
        alert('Results saved! We\'ll email you a detailed breakdown.');
      }
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <CalculatorIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {industryName} ROI Calculator
          </h3>
          <p className="text-sm text-gray-600">
            See how much time and money you could save with automation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Your Current Setup</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Size
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={inputs.teamSize}
              onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Volume (clients/projects)
            </label>
            <input
              type="number"
              min="1"
              value={inputs.monthlyVolume}
              onChange={(e) => handleInputChange('monthlyVolume', parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Average Hourly Rate (CAD)
            </label>
            <input
              type="number"
              min="15"
              max="200"
              value={inputs.avgHourlyRate}
              onChange={(e) => handleInputChange('avgHourlyRate', parseInt(e.target.value) || 15)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Saved Per Task (hours)
            </label>
            <input
              type="number"
              min="0.1"
              max="5"
              step="0.1"
              value={inputs.timeSavedPerTask}
              onChange={(e) => handleInputChange('timeSavedPerTask', parseFloat(e.target.value) || 0.1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tasks Per Month
            </label>
            <input
              type="number"
              min="1"
              value={inputs.tasksPerMonth}
              onChange={(e) => handleInputChange('tasksPerMonth', parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={calculateROI}
            disabled={isCalculating}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <ChartBarIcon className="h-4 w-4" />
                <span>Calculate ROI</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Your Potential Savings</h4>
          
          {results ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-800">Monthly Time Saved</span>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  {results.monthlyTimeSaved.toFixed(1)} hours
                </p>
                <p className="text-sm text-green-700">
                  Per month across your team
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-blue-800">Monthly Cost Savings</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  ${results.monthlyCostSavings.toLocaleString()}
                </p>
                <p className="text-sm text-blue-700">
                  CAD per month
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="font-medium text-purple-800">Annual Savings</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">
                  ${results.annualSavings.toLocaleString()}
                </p>
                <p className="text-sm text-purple-700">
                  CAD per year
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="font-medium text-orange-800">ROI</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">
                  {results.roiPercentage > 0 ? '+' : ''}{results.roiPercentage.toFixed(0)}%
                </p>
                <p className="text-sm text-orange-700">
                  Return on investment
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium text-gray-800">Payback Period</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {results.paybackPeriod.toFixed(1)} months
                </p>
                <p className="text-sm text-gray-700">
                  To break even
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-3">
                  * Assumptions: Based on industry averages and typical automation savings. 
                  Actual results may vary based on your specific processes and implementation.
                </p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveResults}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Save Results & Get Proposal
                  </button>
                  <button
                    onClick={() => window.open('/campaign/leadflow', '_blank')}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm"
                  >
                    Book a Demo
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Enter your details and click "Calculate ROI" to see your potential savings
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
