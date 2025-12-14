"use client";

import React from "react";
import { useState } from "react";
import { ChartBarIcon, ClockIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface ROICalculatorResultsProps {
  results: any;
  isCalculating: boolean;
  industry: string;
  inputs: any;
}

export function ROICalculatorResults({ results, isCalculating, industry, inputs }: ROICalculatorResultsProps) {
  const [showCalculations, setShowCalculations] = useState(false);

  if (isCalculating) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your savings...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Enter your details to see potential savings</p>
        </div>
      </div>
    );
  }

  const getCalculationDetails = () => {
    switch (industry) {
      case 'property-management':
        return {
          equations: [
            "Time saved (requests) = requests × (minutes_today × automation%) ÷ 60",
            "Time saved (statements) = statements × (minutes_today × automation%) ÷ 60",
            "Admin hours saved = sum above",
            "Admin cost saved = hours_saved × hourly_cost",
            "Revenue lift = properties × $3/month (owner stickiness & cross-sell)",
            "Total impact = cost_saved + revenue_lift"
          ],
          assumptions: [
            "Conservative automation percentages based on typical PM workflows",
            "Owner statement automation includes template generation and distribution",
            "Maintenance request automation includes routing and status updates",
            "Revenue lift assumes improved owner satisfaction and retention"
          ]
        };

      case 'real-estate':
        return {
          equations: [
            "Additional contacted = inquiries × (target - current)",
            "Additional clients = additional_contacted × conversion",
            "Revenue lift = additional_clients × avg_commission",
            "Admin hours saved = (deals_per_month × minutes_saved) ÷ 60",
            "Admin cost saved = hours_saved × hourly_cost",
            "Total impact = revenue_lift + cost_saved"
          ],
          assumptions: [
            "Conversion rates based on typical Ontario real estate market data",
            "Commission amounts reflect average TREB transaction values",
            "Admin time savings include document preparation and coordination",
            "Faster response times improve conversion rates significantly"
          ]
        };

      case 'contractors':
        return {
          equations: [
            "Extra wins = leads × (win_with - win_today)",
            "Revenue lift = extra_wins × avg_job_value",
            "Admin hours saved = (jobs_per_month × minutes_saved) ÷ 60",
            "Admin cost saved = hours_saved × hourly_cost",
            "Total impact = revenue_lift + cost_saved"
          ],
          assumptions: [
            "Win rate improvements from faster quoting and better follow-up",
            "Job values based on typical Ontario residential contractor projects",
            "Template usage reduces quote preparation time significantly",
            "Improved response times increase win rates"
          ]
        };

      case 'accounting':
        return {
          equations: [
            "Reminder minutes saved = clients × reminders × minutes × automation%",
            "Engagement minutes saved = clients × minutes_saved",
            "Admin hours saved = (sum_minutes) ÷ 60",
            "Admin cost saved = hours_saved × hourly_cost",
            "Revenue lift = clients × $2 (upsell enablement)",
            "Total impact = cost_saved + revenue_lift"
          ],
          assumptions: [
            "Automation reduces manual reminder tracking and follow-up",
            "Digital engagement workflows streamline client onboarding",
            "Upsell opportunities increase with better client experience",
            "CRA seasonality affects monthly client volumes"
          ]
        };

      case 'cleaning':
        return {
          equations: [
            "Admin hours saved = (jobs × minutes_saved) ÷ 60",
            "Admin cost saved = hours_saved × hourly_cost",
            "Recovered jobs = jobs × (no_show_today - no_show_with)",
            "Revenue lift = recovered_jobs × avg_job_value",
            "Total impact = cost_saved + revenue_lift"
          ],
          assumptions: [
            "Route optimization reduces scheduling and dispatch time",
            "Automated reminders significantly reduce no-show rates",
            "Checklist automation improves job completion efficiency",
            "GTA route density improves scheduling optimization"
          ]
        };

      case 'healthcare':
        return {
          equations: [
            "Admin hours saved = ((appts × minutes_intake) + (claims × minutes_claim)) ÷ 60",
            "Admin cost saved = hours_saved × hourly_cost",
            "Completed visits gained = appts × (no_show_today - no_show_with)",
            "Incremental revenue = completed_visits_gained × revenue_per_visit",
            "Total impact = cost_saved + incremental_revenue"
          ],
          assumptions: [
            "Digital intake forms reduce manual data entry time",
            "Automated reminders improve appointment attendance",
            "Claims processing automation reduces manual validation",
            "PHIPA compliance maintained throughout automation"
          ]
        };

      default:
        return { equations: [], assumptions: [] };
    }
  };

  const calculationDetails = getCalculationDetails();

  return (
    <div className="space-y-6">
      {/* Results Cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ClockIcon className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Admin time saved per month</span>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {results.timeSavedHours?.toFixed(1) || 0} hours
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Admin cost saved per month</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">
            ${results.costSaved?.toLocaleString() || 0} CAD
          </p>
        </div>

        {results.revenueLift > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <ArrowTrendingUpIcon className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-800">Incremental revenue</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">
              ${results.revenueLift?.toLocaleString() || 0} CAD
            </p>
          </div>
        )}

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ChartBarIcon className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-800">Total monthly impact</span>
          </div>
          <p className="text-2xl font-bold text-orange-900">
            ${results.totalImpact?.toLocaleString() || 0} CAD
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ClockIcon className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-800">Payback window</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ~{results.paybackWeeks?.toFixed(0) || 0} weeks
          </p>
        </div>
      </div>

      {/* How we calculate this */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setShowCalculations(!showCalculations)}
          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-900">How we calculate this</span>
          {showCalculations ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {showCalculations && (
          <div className="px-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Equations:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {calculationDetails.equations.map((equation, index) => (
                    <li key={index} className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {equation}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Assumptions:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {calculationDetails.assumptions.map((assumption, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {assumption}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded">
                <strong>Note:</strong> These are conservative estimates based on typical Ontario business data. 
                Actual results may vary based on your specific processes and implementation.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
