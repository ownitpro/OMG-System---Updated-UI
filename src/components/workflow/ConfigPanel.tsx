"use client";

import { useState, useEffect } from "react";

interface ConfigPanelProps {
  moduleId: string;
  module: any;
  config: any;
  onSave: (config: any) => void;
  onClose: () => void;
}

export function ConfigPanel({ moduleId, module, config, onSave, onClose }: ConfigPanelProps) {
  const [formData, setFormData] = useState(config);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(config);
  }, [config]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation based on module type
    if (module?.type === 'spreadsheet') {
      if (!formData.spreadsheetUrl) {
        newErrors.spreadsheetUrl = 'Spreadsheet URL is required';
      } else if (!formData.spreadsheetUrl.includes('docs.google.com')) {
        newErrors.spreadsheetUrl = 'Please enter a valid Google Sheets URL';
      }
      
      if (!formData.sheetName) {
        newErrors.sheetName = 'Sheet name is required';
      }
    }
    
    if (module?.type === 'email') {
      if (!formData.emailTemplate) {
        newErrors.emailTemplate = 'Email template is required';
      }
      
      if (!formData.recipientEmail) {
        newErrors.recipientEmail = 'Recipient email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.recipientEmail)) {
        newErrors.recipientEmail = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const getModuleFields = () => {
    switch (module?.type) {
      case 'spreadsheet':
        return [
          {
            name: 'spreadsheetUrl',
            label: 'Spreadsheet URL',
            type: 'url',
            placeholder: 'https://docs.google.com/spreadsheets/d/...',
            required: true,
            helpText: 'Share your Google Sheet and copy the sharing URL here'
          },
          {
            name: 'sheetName',
            label: 'Sheet Name',
            type: 'text',
            placeholder: 'Leads',
            required: true,
            helpText: 'The name of the specific sheet tab to add data to'
          },
          {
            name: 'fieldMapping',
            label: 'Field Mapping',
            type: 'text',
            placeholder: 'name,email,phone,message',
            required: true,
            helpText: 'Comma-separated list of field names to map'
          }
        ];
      
      case 'email':
        return [
          {
            name: 'recipientEmail',
            label: 'Recipient Email',
            type: 'email',
            placeholder: 'notifications@yourcompany.com',
            required: true,
            helpText: 'Email address to send notifications to'
          },
          {
            name: 'emailTemplate',
            label: 'Email Template',
            type: 'textarea',
            placeholder: 'Subject: New Lead Notification\n\nA new lead has been submitted...',
            required: true,
            helpText: 'Customize the email subject and message'
          },
          {
            name: 'sendFrequency',
            label: 'Send Frequency',
            type: 'select',
            options: ['Immediately', 'Every 5 minutes', 'Every hour', 'Daily'],
            required: true,
            helpText: 'How often to send email notifications'
          }
        ];
      
      case 'webhook':
        return [
          {
            name: 'webhookUrl',
            label: 'Webhook URL',
            type: 'url',
            placeholder: 'https://your-system.com/webhook',
            required: true,
            helpText: 'URL to send data to when triggered'
          },
          {
            name: 'httpMethod',
            label: 'HTTP Method',
            type: 'select',
            options: ['POST', 'PUT', 'PATCH'],
            required: true,
            helpText: 'HTTP method to use when sending data'
          },
          {
            name: 'headers',
            label: 'Custom Headers',
            type: 'text',
            placeholder: 'Authorization: Bearer token',
            required: false,
            helpText: 'Optional custom headers (one per line)'
          }
        ];
      
      default:
        return [
          {
            name: 'name',
            label: 'Module Name',
            type: 'text',
            placeholder: 'My Module',
            required: true,
            helpText: 'Give this module a descriptive name'
          }
        ];
    }
  };

  const fields = getModuleFields();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Configure {module?.type?.charAt(0).toUpperCase()}{module?.type?.slice(1)} Module
              </h3>
              <p className="text-sm text-gray-600">Set up the module parameters</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all ${
                    errors[field.name] ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className={`w-full p-3 border rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all ${
                    errors[field.name] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full p-3 border rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all ${
                    errors[field.name] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              )}
              
              {field.helpText && (
                <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>
              )}
              
              {errors[field.name] && (
                <p className="text-xs text-red-600 mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
