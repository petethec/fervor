import React from 'react';
import { Tag } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterSelectProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilterSelect({ categories, value, onChange }: CategoryFilterSelectProps) {
  return (
    <div className="flex items-center space-x-2">
      <Tag className="h-5 w-5 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        aria-label="Category filter"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}