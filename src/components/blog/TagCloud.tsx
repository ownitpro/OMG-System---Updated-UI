"use client";

import { useState } from "react";

interface TagCloudProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
}

export default function TagCloud({ tags, onTagClick }: TagCloudProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  // Sort tags by frequency (mock implementation - in real app, you'd track actual usage)
  const sortedTags = [...tags].sort();

  return (
    <div className="bg-slate-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedTags.includes(tag)
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600 border border-slate-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
