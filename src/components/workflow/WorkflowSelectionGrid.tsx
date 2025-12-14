"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { workflowDefinitions, workflowCategories, WorkflowDefinition } from "@/data/workflow-definitions";
import Link from "next/link";

export function WorkflowSelectionGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkflows = workflowDefinitions.filter(workflow => {
    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Section className="py-16">
      <Container>
        {/* Search and Filter */}
        <div className="mb-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Search workflows..."
              className="p-3 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-3 border border-gray-300 rounded-lg focus:ring-lime-500 focus:border-lime-500 transition-all"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {workflowCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
          {(searchTerm !== '' || selectedCategory !== 'all') && (
            <div className="mt-4 text-right">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkflows.map((workflow) => (
            <WorkflowSelectionCard key={workflow.id} workflow={workflow} />
          ))}
        </div>

        {filteredWorkflows.length === 0 && (
          <div className="text-center py-10 text-gray-600 text-lg">
            No workflows found matching your criteria. Please try adjusting your filters.
          </div>
        )}
      </Container>
    </Section>
  );
}

interface WorkflowSelectionCardProps {
  workflow: WorkflowDefinition;
}

function WorkflowSelectionCard({ workflow }: WorkflowSelectionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-4">{workflow.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{workflow.name}</h3>
            <p className="text-sm text-gray-500">{workflow.estimatedTime} setup</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">{workflow.description}</p>

        {/* Pain & Benefit */}
        <div className="mb-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-3">
            <p className="text-sm text-red-800">
              <strong>Pain:</strong> {workflow.pain}
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-3">
            <p className="text-sm text-green-800">
              <strong>Solution:</strong> {workflow.benefit}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {workflow.defaultModules.map((module, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {module.charAt(0).toUpperCase() + module.slice(1).replace('_', ' ')} Module
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Setup Cost</span>
            <span className="text-lg font-bold text-gray-900">${workflow.setupCost}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Monthly</span>
            <span className="text-lg font-bold text-gray-900">${workflow.monthlyCost}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/workflow-builder?type=${workflow.id}&mode=wizard`}
            className="flex-1 bg-lime-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-lime-700 transition-colors text-center"
          >
            🧙‍♂️ Start Building
          </Link>
          <Link
            href={`/workflow-builder?type=${workflow.id}&mode=canvas`}
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
          >
            🎨 Visual Canvas
          </Link>
        </div>
      </div>
    </div>
  );
}
