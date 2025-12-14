"use client";

import React from 'react';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown-like rendering for our blog posts
  const renderContent = (text: string) => {
    // Split content into sections
    const sections = text.split(/\n\n+/);
    
    return sections.map((section, index) => {
      const trimmedSection = section.trim();
      
      if (!trimmedSection) return null;
      
      // Handle headers
      if (trimmedSection.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8">
            {trimmedSection.substring(2)}
          </h1>
        );
      }
      
      if (trimmedSection.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-6">
            {trimmedSection.substring(3)}
          </h2>
        );
      }
      
      if (trimmedSection.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-900 mb-3 mt-5">
            {trimmedSection.substring(4)}
          </h3>
        );
      }
      
      // Handle numbered sections (like "1️⃣ The Ontario Paperwork Problem")
      if (trimmedSection.match(/^\d+️⃣/)) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-6 flex items-center">
            <span className="mr-3">{trimmedSection.match(/^\d+️⃣/)?.[0]}</span>
            {trimmedSection.replace(/^\d+️⃣\s*/, '')}
          </h2>
        );
      }
      
      // Handle bold text
      if (trimmedSection.startsWith('**') && trimmedSection.endsWith('**')) {
        return (
          <p key={index} className="text-lg font-semibold text-gray-900 mb-4">
            {trimmedSection.substring(2, trimmedSection.length - 2)}
          </p>
        );
      }
      
      // Handle italic text
      if (trimmedSection.startsWith('*') && trimmedSection.endsWith('*')) {
        return (
          <p key={index} className="text-lg italic text-gray-700 mb-4">
            {trimmedSection.substring(1, trimmedSection.length - 1)}
          </p>
        );
      }
      
      // Handle blockquotes
      if (trimmedSection.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50">
            <p className="text-gray-700 italic">
              {trimmedSection.substring(2)}
            </p>
          </blockquote>
        );
      }
      
      // Handle tables
      if (trimmedSection.includes('|') && trimmedSection.includes('---')) {
        const lines = trimmedSection.split('\n');
        const headerLine = lines[0];
        const separatorLine = lines[1];
        const dataLines = lines.slice(2);
        
        if (headerLine && separatorLine && dataLines.length > 0) {
          const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
          const data = dataLines.map(line => 
            line.split('|').map(cell => cell.trim()).filter(cell => cell)
          );
          
          return (
            <div key={index} className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }
      
      // Handle links
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const processedText = trimmedSection.replace(linkRegex, (match, text, url) => {
        return `<a href="${url}" class="text-blue-600 hover:text-blue-800 underline">${text}</a>`;
      });
      
      // Handle bold text within paragraphs
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const finalText = processedText.replace(boldRegex, '<strong class="font-semibold">$1</strong>');
      
      // Handle italic text within paragraphs
      const italicRegex = /\*([^*]+)\*/g;
      const finalTextItalic = finalText.replace(italicRegex, '<em class="italic">$1</em>');
      
      // Regular paragraph
      return (
        <p
          key={index}
          className="text-gray-700 mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: finalTextItalic }}
        />
      );
    });
  };
  
  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  );
}
