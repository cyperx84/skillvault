'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating_avg: number;
  review_count: number;
  downloads: number;
}

const categories = ['All', 'Sales', 'Research', 'Writing', 'Support', 'Development'];

export default function Marketplace() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/templates')
      .then((r) => r.json())
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      });
  }, []);

  const filtered = filter === 'All' ? templates : templates.filter((t) => t.category === filter);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">💎 SkillVault</Link>
          <span className="text-gray-400 text-sm">Premium Agent Templates</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-gray-500">Loading templates...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((template) => (
              <div key={template.id} className="bg-gray-900 rounded-lg border border-gray-800 p-5 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <span className="text-green-400 font-bold">${template.price}</span>
                </div>
                <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded w-fit mb-3">
                  {template.category}
                </span>
                <p className="text-gray-400 text-sm flex-1 mb-4">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>⭐ {template.rating_avg.toFixed(1)} ({template.review_count})</span>
                  <span>↓ {template.downloads}</span>
                </div>
                <form action="/api/checkout" method="POST" className="contents">
                  <input type="hidden" name="templateId" value={template.id} />
                  <input type="hidden" name="templateName" value={template.name} />
                  <input type="hidden" name="price" value={template.price} />
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-500 rounded text-sm font-medium transition-colors"
                  >
                    Buy Now
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
