import React from 'react';
import { FileText, Star, ArrowRight, ChevronRight, Clock } from 'lucide-react';
export const PopularArticles = () => {
  const popularArticles = [{
    id: 1,
    title: 'Getting Started with AcquireFlow.AI',
    excerpt: 'Learn the basics of setting up your account, creating your first campaign, and navigating the dashboard.',
    category: 'Getting Started',
    readTime: '5 min read',
    views: 2489,
    rating: 4.8
  }, {
    id: 2,
    title: 'How to Create and Send LOIs in Bulk',
    excerpt: 'Step-by-step guide to creating, customizing, and sending Letters of Intent to multiple property owners.',
    category: 'LOI Generator',
    readTime: '7 min read',
    views: 1876,
    rating: 4.9
  }, {
    id: 3,
    title: 'Setting Up MLS Integration',
    excerpt: 'Connect your MLS accounts to automatically import property listings into your deal finder.',
    category: 'Integrations',
    readTime: '6 min read',
    views: 1543,
    rating: 4.7
  }, {
    id: 4,
    title: 'Managing Team Permissions and Roles',
    excerpt: 'Learn how to add team members, set permissions, and manage roles for optimal collaboration.',
    category: 'Account Settings',
    readTime: '8 min read',
    views: 1298,
    rating: 4.6
  }, {
    id: 5,
    title: 'Troubleshooting Common Campaign Issues',
    excerpt: 'Solutions to the most frequent problems encountered when running marketing campaigns.',
    category: 'Troubleshooting',
    readTime: '10 min read',
    views: 1122,
    rating: 4.5
  }];
  const faqs = [{
    id: 1,
    question: 'How do I reset my password?',
    category: 'Account'
  }, {
    id: 2,
    question: 'Can I export my contacts to CSV?',
    category: 'Data Management'
  }, {
    id: 3,
    question: 'How do I connect my email account?',
    category: 'Integrations'
  }, {
    id: 4,
    question: 'What payment methods do you accept?',
    category: 'Billing'
  }, {
    id: 5,
    question: 'How can I upgrade my subscription?',
    category: 'Billing'
  }];
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Popular articles column (2/3 width) */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-medium">Most Popular Articles</h3>
          <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">
            Updated Daily
          </span>
        </div>
        <div className="divide-y divide-gray-200">
          {popularArticles.map(article => <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-4 mt-1">
                  <FileText size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400" />
                      <span className="text-xs text-gray-500 ml-1">
                        {article.rating}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-medium mt-2 text-dark">
                    {article.title}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                    <button className="text-primary text-sm flex items-center hover:underline">
                      Read Article <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button className="text-primary text-sm flex items-center hover:underline mx-auto">
            View All Articles <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
      {/* FAQs column (1/3 width) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-medium">Frequently Asked Questions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {faqs.map(faq => <div key={faq.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {faq.category}
                </span>
              </div>
              <h4 className="font-medium mt-2 text-dark">{faq.question}</h4>
              <button className="text-primary text-sm flex items-center hover:underline mt-2">
                View Answer <ChevronRight size={16} className="ml-1" />
              </button>
            </div>)}
        </div>
        <div className="p-6 border-t border-gray-200">
          <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
            Browse All FAQs
          </button>
        </div>
      </div>
    </div>;
};