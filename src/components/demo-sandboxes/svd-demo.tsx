"use client";

import React from "react";
import { useState, useEffect } from "react";
import { PlayIcon, ArrowPathIcon, DocumentIcon, FolderIcon, LockClosedIcon, ShareIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { DemoTour } from "./demo-tour";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  folder: string;
  status: 'processing' | 'ready' | 'locked';
}

interface DemoData {
  documents: Document[];
  mode: 'personal' | 'business';
  usage: {
    storage: number;
    transfer: number;
    ocr: number;
  };
}

export function SVDDemo() {
  const [demoData, setDemoData] = useState<DemoData>({
    documents: [],
    mode: 'personal',
    usage: {
      storage: 45,
      transfer: 23,
      ocr: 67
    }
  });
  const [isTourActive, setIsTourActive] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const personalDocuments = [
    { id: '1', name: 'Driver License - John Smith.pdf', type: 'PDF', size: '2.3 MB', uploadedAt: '2 hours ago', folder: 'Identity Documents', status: 'ready' },
    { id: '2', name: 'Tax Return 2023.pdf', type: 'PDF', size: '1.8 MB', uploadedAt: '1 day ago', folder: 'Tax Documents', status: 'ready' },
    { id: '3', name: 'Insurance Card.jpg', type: 'Image', size: '856 KB', uploadedAt: '3 days ago', folder: 'Insurance', status: 'ready' },
    { id: '4', name: 'Bank Statement.pdf', type: 'PDF', size: '3.1 MB', uploadedAt: '1 week ago', folder: 'Financial', status: 'locked' }
  ];

  const businessDocuments = [
    { id: '1', name: 'Client Contract - ABC Corp.pdf', type: 'PDF', size: '4.2 MB', uploadedAt: '1 hour ago', folder: 'Client Contracts', status: 'ready' },
    { id: '2', name: 'Invoice Template.docx', type: 'Document', size: '1.2 MB', uploadedAt: '2 hours ago', folder: 'Templates', status: 'ready' },
    { id: '3', name: 'Meeting Notes - Q4 Planning.pdf', type: 'PDF', size: '2.8 MB', uploadedAt: '1 day ago', folder: 'Meeting Notes', status: 'ready' },
    { id: '4', name: 'Financial Report Q3.pdf', type: 'PDF', size: '5.1 MB', uploadedAt: '2 days ago', folder: 'Financial Reports', status: 'locked' }
  ];

  useEffect(() => {
    // Load documents based on mode
    setDemoData(prev => ({
      ...prev,
      documents: prev.mode === 'personal' ? personalDocuments : businessDocuments
    }));
  }, [demoData.mode]);

  const toggleMode = () => {
    setDemoData(prev => ({
      ...prev,
      mode: prev.mode === 'personal' ? 'business' : 'personal'
    }));
  };

  const resetDemoData = () => {
    setDemoData(prev => ({
      ...prev,
      documents: prev.mode === 'personal' ? personalDocuments : businessDocuments,
      usage: {
        storage: 45,
        transfer: 23,
        ocr: 67
      }
    }));
  };

  const simulateUpload = () => {
    setUploadingFile(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      const newDoc = {
        id: Date.now().toString(),
        name: 'Auto-named Document.pdf',
        type: 'PDF',
        size: '2.1 MB',
        uploadedAt: 'Just now',
        folder: demoData.mode === 'personal' ? 'Auto-filed' : 'Client Documents',
        status: 'ready' as const
      };
      
      setDemoData(prev => ({
        ...prev,
        documents: [newDoc, ...prev.documents],
        usage: {
          ...prev.usage,
          storage: Math.min(100, prev.usage.storage + 5),
          ocr: Math.min(100, prev.usage.ocr + 10)
        }
      }));
      
      setUploadingFile(false);
    }, 2000);
  };

  const createPacket = (docId: string) => {
    setDemoData(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === docId ? { ...doc, status: 'locked' as const } : doc
      )
    }));
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'processing': 'bg-yellow-100 text-yellow-800',
      'ready': 'bg-green-100 text-green-800',
      'locked': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const tourSteps = [
    {
      target: '.mode-toggle',
      title: 'Pick Your Mode',
      content: 'Switch between Personal (IDs, taxes, receipts) and Business (clients, cases, transactions).',
      placement: 'bottom'
    },
    {
      target: '.request-checklist',
      title: 'Request the Right Documents',
      content: 'Share a checklist. We\'ll nudge people until every item is in—no chasing.',
      placement: 'right'
    },
    {
      target: '.upload-area',
      title: 'Upload & Auto-File (Simulated)',
      content: 'Drop a file to see how OCR names and files it automatically.',
      placement: 'top'
    },
    {
      target: '.packetize-control',
      title: 'Immutable Packets',
      content: 'One click to lock closing files—great for compliance and audits.',
      placement: 'top'
    },
    {
      target: '.share-link',
      title: 'Secure Sharing',
      content: 'Short-lived, signed links. Add watermark/redaction on higher tiers.',
      placement: 'top'
    },
    {
      target: '.usage-meters',
      title: 'Control Costs Predictably',
      content: 'Live usage meters with nudges at 70/80/90/95% and a hard stop at 100%—no surprises.',
      placement: 'top'
    },
    {
      target: '.demo-cta',
      title: 'See It Live',
      content: 'Want a real walk-through? We\'ll tailor a demo to your industry.',
      placement: 'top'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="bg-green-500 px-2 py-1 rounded text-xs font-medium">
                SecureVault Docs Demo
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTourActive(true)}
              className="flex items-center space-x-1 px-3 py-1 bg-green-500 hover:bg-green-400 rounded text-sm transition-colors"
            >
              <PlayIcon className="h-4 w-4" />
              <span>Start guided tour</span>
            </button>
            <button
              onClick={resetDemoData}
              className="flex items-center space-x-1 px-3 py-1 bg-green-500 hover:bg-green-400 rounded text-sm transition-colors"
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span>Reset demo data</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Mode Toggle */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm font-medium text-gray-700">Mode:</span>
              <button
                onClick={toggleMode}
                className="mode-toggle flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <span className="text-sm font-medium">
                  {demoData.mode === 'personal' ? 'Personal' : 'Business'}
                </span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </button>
            </div>

            {/* Request Checklist */}
            <div className="request-checklist">
              <h3 className="font-semibold text-gray-900 mb-2">Request Checklist</h3>
              <div className="space-y-2">
                {demoData.mode === 'personal' ? (
                  <>
                    <div className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Driver License</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Insurance Card</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Tax Documents</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Client Contract</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Financial Reports</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>Meeting Notes</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Usage Meters */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Usage Meters</h3>
            <div className="space-y-3 usage-meters">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage</span>
                  <span>{demoData.usage.storage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getUsageColor(demoData.usage.storage)}`}
                    style={{ width: `${demoData.usage.storage}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Transfer</span>
                  <span>{demoData.usage.transfer}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getUsageColor(demoData.usage.transfer)}`}
                    style={{ width: `${demoData.usage.transfer}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>OCR</span>
                  <span>{demoData.usage.ocr}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getUsageColor(demoData.usage.ocr)}`}
                    style={{ width: `${demoData.usage.ocr}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div className="flex-1 p-4">
            <div className="upload-area border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <DocumentIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Drop files here or click to upload</p>
              <button
                onClick={simulateUpload}
                disabled={uploadingFile}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {uploadingFile ? 'Processing...' : 'Upload Sample'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Documents List */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Documents</h3>
            <p className="text-sm text-gray-600">{demoData.documents.length} documents</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {demoData.documents.map((doc) => (
              <div key={doc.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DocumentIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600">
                        {doc.folder} • {doc.size} • {doc.uploadedAt}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    
                    {doc.status === 'ready' && (
                      <button
                        onClick={() => createPacket(doc.id)}
                        className="packetize-control flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 transition-colors"
                      >
                        <LockClosedIcon className="h-3 w-3" />
                        <span>Lock</span>
                      </button>
                    )}
                    
                    <button className="share-link flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors">
                      <ShareIcon className="h-3 w-3" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo CTA */}
      <div className="demo-cta p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Ready to see it with your data?</h4>
            <p className="text-sm text-gray-600">Book a personalized demo for your industry</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.open('/campaign/leadflow', '_blank')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Book a demo
            </button>
            <button
              onClick={() => {/* Email demo pack */}}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Email me this demo pack
            </button>
          </div>
        </div>
      </div>

      {/* Demo Tour */}
      {isTourActive && (
        <DemoTour
          steps={tourSteps}
          onClose={() => setIsTourActive(false)}
          onComplete={() => setIsTourActive(false)}
        />
      )}
    </div>
  );
}
