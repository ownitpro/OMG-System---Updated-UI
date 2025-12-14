"use client";

import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface ROICalculatorInputsProps {
  industry: string;
  inputs: any;
  onInputChange: (field: string, value: any) => void;
}

export function ROICalculatorInputs({ industry, inputs, onInputChange }: ROICalculatorInputsProps) {
  const getIndustryInputs = () => {
    switch (industry) {
      case 'property-management':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Properties under management
              </label>
              <input
                type="number"
                min="0"
                value={inputs.properties || ''}
                onChange={(e) => onInputChange('properties', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="120"
              />
              <p className="text-xs text-gray-500 mt-1">GTA volumes vary; defaults reflect a mid-size PM in Peel/York</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly maintenance requests
              </label>
              <input
                type="number"
                min="0"
                value={inputs.maintenanceRequests || ''}
                onChange={(e) => onInputChange('maintenanceRequests', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="90"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avg admin minutes per request today
              </label>
              <input
                type="number"
                min="0"
                value={inputs.minutesPerRequest || ''}
                onChange={(e) => onInputChange('minutesPerRequest', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                % automated with OMG
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.automationPercent || ''}
                onChange={(e) => onInputChange('automationPercent', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team admin hourly cost (CAD)
                <InformationCircleIcon className="h-4 w-4 inline ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                min="0"
                value={inputs.hourlyCost || ''}
                onChange={(e) => onInputChange('hourlyCost', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30"
              />
              <p className="text-xs text-gray-500 mt-1">Typical admin wage (Ontario SMB): $22–$35/h; adjust to your team</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly owner statements volume
              </label>
              <input
                type="number"
                min="0"
                value={inputs.ownerStatements || ''}
                onChange={(e) => onInputChange('ownerStatements', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin minutes per statement today
              </label>
              <input
                type="number"
                min="0"
                value={inputs.minutesPerStatement || ''}
                onChange={(e) => onInputChange('minutesPerStatement', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                % automated for statements
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.statementAutomationPercent || ''}
                onChange={(e) => onInputChange('statementAutomationPercent', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="80"
              />
            </div>
          </div>
        );

      case 'real-estate':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New inquiries per month
              </label>
              <input
                type="number"
                min="0"
                value={inputs.inquiries || ''}
                onChange={(e) => onInputChange('inquiries', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="60"
              />
              <p className="text-xs text-gray-500 mt-1">Use typical TREB deals and commissions; editable</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                % currently contacted within 15 minutes
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.currentContactRate || ''}
                onChange={(e) => onInputChange('currentContactRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="35"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target contacted within 15 minutes with OMG
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.targetContactRate || ''}
                onChange={(e) => onInputChange('targetContactRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="90"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conversion rate from contacted lead to client
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.conversionRate || ''}
                onChange={(e) => onInputChange('conversionRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avg commission per transaction (CAD)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.avgCommission || ''}
                onChange={(e) => onInputChange('avgCommission', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="7500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin hourly cost (CAD)
                <InformationCircleIcon className="h-4 w-4 inline ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                min="0"
                value={inputs.hourlyCost || ''}
                onChange={(e) => onInputChange('hourlyCost', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="28"
              />
              <p className="text-xs text-gray-500 mt-1">Typical admin wage (Ontario SMB): $22–$35/h; adjust to your team</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin minutes saved per deal (docs/e-sign/coordination)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.minutesSavedPerDeal || ''}
                onChange={(e) => onInputChange('minutesSavedPerDeal', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="90"
              />
            </div>
          </div>
        );

      case 'contractors':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualified leads per month
              </label>
              <input
                type="number"
                min="0"
                value={inputs.leads || ''}
                onChange={(e) => onInputChange('leads', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="45"
              />
              <p className="text-xs text-gray-500 mt-1">Durham/Peel residential contractor averages</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Win rate today (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.currentWinRate || ''}
                onChange={(e) => onInputChange('currentWinRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="18"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Win rate with fast quoting (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.targetWinRate || ''}
                onChange={(e) => onInputChange('targetWinRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avg job value (CAD)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.avgJobValue || ''}
                onChange={(e) => onInputChange('avgJobValue', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="6500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin hourly cost (CAD)
                <InformationCircleIcon className="h-4 w-4 inline ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                min="0"
                value={inputs.hourlyCost || ''}
                onChange={(e) => onInputChange('hourlyCost', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="26"
              />
              <p className="text-xs text-gray-500 mt-1">Typical admin wage (Ontario SMB): $22–$35/h; adjust to your team</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minutes saved per quote using templates
              </label>
              <input
                type="number"
                min="0"
                value={inputs.minutesSavedPerQuote || ''}
                onChange={(e) => onInputChange('minutesSavedPerQuote', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jobs per month
              </label>
              <input
                type="number"
                min="0"
                value={inputs.jobsPerMonth || ''}
                onChange={(e) => onInputChange('jobsPerMonth', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
              />
            </div>
          </div>
        );

      case 'accounting':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Active clients / month
              </label>
              <input
                type="number"
                min="0"
                value={inputs.activeClients || ''}
                onChange={(e) => onInputChange('activeClients', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="180"
              />
              <p className="text-xs text-gray-500 mt-1">CRA seasonality; defaults modest</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Missing-doc reminders per client today
              </label>
              <input
                type="number"
                min="0"
                value={inputs.remindersPerClient || ''}
                onChange={(e) => onInputChange('remindersPerClient', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minutes per reminder
              </label>
              <input
                type="number"
                min="0"
                value={inputs.minutesPerReminder || ''}
                onChange={(e) => onInputChange('minutesPerReminder', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                % automated reminders with OMG
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.automationPercent || ''}
                onChange={(e) => onInputChange('automationPercent', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minutes saved per engagement (KYC/e-sign/packetize)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.minutesSavedPerEngagement || ''}
                onChange={(e) => onInputChange('minutesSavedPerEngagement', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin hourly cost (CAD)
                <InformationCircleIcon className="h-4 w-4 inline ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                min="0"
                value={inputs.hourlyCost || ''}
                onChange={(e) => onInputChange('hourlyCost', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="32"
              />
              <p className="text-xs text-gray-500 mt-1">Typical admin wage (Ontario SMB): $22–$35/h; adjust to your team</p>
            </div>
          </div>
        );

      case 'cleaning':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jobs per month
              </label>
              <input
                type="number"
                min="0"
                value={inputs.jobsPerMonth || ''}
                onChange={(e) => onInputChange('jobsPerMonth', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="420"
              />
              <p className="text-xs text-gray-500 mt-1">Dense routes (GTA) improve scheduling efficiency</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minutes saved per job (checklists/scheduling/route)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.minutesSavedPerJob || ''}
                onChange={(e) => onInputChange('minutesSavedPerJob', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin/dispatcher hourly cost (CAD)
                <InformationCircleIcon className="h-4 w-4 inline ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                min="0"
                value={inputs.hourlyCost || ''}
                onChange={(e) => onInputChange('hourlyCost', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="24"
              />
              <p className="text-xs text-gray-500 mt-1">Typical admin wage (Ontario SMB): $22–$35/h; adjust to your team</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No-show rate today (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.currentNoShowRate || ''}
                onChange={(e) => onInputChange('currentNoShowRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No-show rate with reminders (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.targetNoShowRate || ''}
                onChange={(e) => onInputChange('targetNoShowRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avg job value (CAD)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.avgJobValue || ''}
                onChange={(e) => onInputChange('avgJobValue', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="180"
              />
            </div>
          </div>
        );

      case 'healthcare':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointments per month
              </label>
              <input
                type="number"
                min="0"
                value={inputs.appointmentsPerMonth || ''}
                onChange={(e) => onInputChange('appointmentsPerMonth', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2400"
              />
              <p className="text-xs text-gray-500 mt-1">PHIPA awareness; emphasize patient flow and reminders</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No-show rate today (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.currentNoShowRate || ''}
                onChange={(e) => onInputChange('currentNoShowRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="9"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No-show rate with reminders (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.targetNoShowRate || ''}
                onChange={(e) => onInputChange('targetNoShowRate', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin hourly cost (CAD)
                <InformationCircleIcon className="h-4 w-4 inline ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                min="0"
                value={inputs.hourlyCost || ''}
                onChange={(e) => onInputChange('hourlyCost', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30"
              />
              <p className="text-xs text-gray-500 mt-1">Typical admin wage (Ontario SMB): $22–$35/h; adjust to your team</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minutes saved per intake (digital forms/OCR)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.minutesSavedPerIntake || ''}
                onChange={(e) => onInputChange('minutesSavedPerIntake', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minutes saved per claim (prep/validation)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.minutesSavedPerClaim || ''}
                onChange={(e) => onInputChange('minutesSavedPerClaim', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Claims per month
              </label>
              <input
                type="number"
                min="0"
                value={inputs.claimsPerMonth || ''}
                onChange={(e) => onInputChange('claimsPerMonth', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incremental revenue per completed visit (CAD)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.revenuePerVisit || ''}
                onChange={(e) => onInputChange('revenuePerVisit', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="60"
              />
              <p className="text-xs text-gray-500 mt-1">Show as user input with default $60 to respect clinic variability</p>
            </div>
          </div>
        );

      default:
        return <div>Industry not found</div>;
    }
  };

  return (
    <div>
      {getIndustryInputs()}
    </div>
  );
}
