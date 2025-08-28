import React, { useState } from 'react';
import { Play, Calendar, Award, ChevronRight, Clock, BookOpen, Star, ArrowRight, Search, GraduationCap, User, Users, Filter, CheckCircle, Video, ExternalLink } from 'lucide-react';
export const LearningCenter = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = [{
    id: 'all',
    name: 'All Categories'
  }, {
    id: 'getting-started',
    name: 'Getting Started'
  }, {
    id: 'deal-finder',
    name: 'Deal Finding'
  }, {
    id: 'marketing',
    name: 'Marketing & Campaigns'
  }, {
    id: 'negotiations',
    name: 'Offers & Negotiations'
  }, {
    id: 'analytics',
    name: 'Analytics & Reporting'
  }, {
    id: 'advanced',
    name: 'Advanced Strategies'
  }];
  const courses = [{
    id: 1,
    title: 'AcquireFlow.AI Fundamentals',
    description: 'Master the basics of the platform and learn how to navigate the dashboard, set up your account, and use core features.',
    level: 'Beginner',
    duration: '2 hours',
    modules: 5,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    instructor: 'Sarah Johnson',
    category: 'Getting Started',
    progress: 100,
    completed: true
  }, {
    id: 2,
    title: 'Advanced Deal Finding Strategies',
    description: 'Learn how to use filters, saved searches, and automated alerts to find the best investment opportunities.',
    level: 'Intermediate',
    duration: '3 hours',
    modules: 8,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    instructor: 'Michael Chen',
    category: 'Deal Finding',
    progress: 65,
    completed: false
  }, {
    id: 3,
    title: 'Marketing Campaign Mastery',
    description: 'Create, optimize, and analyze marketing campaigns to generate more leads and close more deals.',
    level: 'Intermediate',
    duration: '4 hours',
    modules: 10,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    instructor: 'Jessica Williams',
    category: 'Marketing & Campaigns',
    progress: 0,
    completed: false
  }, {
    id: 4,
    title: 'Negotiation & Offer Strategies',
    description: 'Learn proven techniques for creating compelling offers and negotiating better deals.',
    level: 'Advanced',
    duration: '3.5 hours',
    modules: 7,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    instructor: 'David Wilson',
    category: 'Offers & Negotiations',
    progress: 0,
    completed: false
  }];
  const webinars = [{
    id: 1,
    title: 'Market Trends Q4 2023',
    description: 'Explore the latest real estate market trends and how to position your investment strategy for success.',
    date: 'October 25, 2023',
    time: '2:00 PM ET',
    host: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    category: 'Market Analysis',
    registration: true
  }, {
    id: 2,
    title: 'New Feature Walkthrough: AI Deal Analyzer',
    description: 'Learn how to use our new AI-powered deal analysis tool to evaluate properties faster and more accurately.',
    date: 'November 3, 2023',
    time: '1:00 PM ET',
    host: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    category: 'Product Updates',
    registration: true
  }, {
    id: 3,
    title: 'Advanced LOI Strategies for Commercial Properties',
    description: 'Discover advanced techniques for creating compelling offers for commercial real estate investments.',
    date: 'November 10, 2023',
    time: '11:00 AM ET',
    host: 'David Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    category: 'Offers & Negotiations',
    registration: false
  }];
  const certifications = [{
    id: 1,
    title: 'AcquireFlow.AI Certified User',
    description: 'Demonstrate your proficiency in using the core features of the platform.',
    level: 'Beginner',
    modules: 3,
    exams: 1,
    duration: '2-3 weeks',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }, {
    id: 2,
    title: 'AcquireFlow.AI Deal Finder Specialist',
    description: 'Become an expert in finding and analyzing investment opportunities using the platform.',
    level: 'Intermediate',
    modules: 5,
    exams: 2,
    duration: '4-6 weeks',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }, {
    id: 3,
    title: 'AcquireFlow.AI Marketing Strategist',
    description: 'Master the art of creating and optimizing marketing campaigns to generate leads.',
    level: 'Intermediate',
    modules: 4,
    exams: 2,
    duration: '3-5 weeks',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }, {
    id: 4,
    title: 'AcquireFlow.AI Investment Pro',
    description: 'The highest level of certification, demonstrating expertise across all platform features.',
    level: 'Advanced',
    modules: 8,
    exams: 3,
    duration: '8-10 weeks',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }];
  const successStories = [{
    id: 1,
    title: 'How I Closed 12 Deals in 6 Months Using AcquireFlow.AI',
    company: 'Johnson Real Estate Investments',
    author: 'Robert Johnson',
    location: 'Miami, FL',
    quote: "AcquireFlow.AI transformed our business by streamlining our deal finding and acquisition process. We've seen a 3x increase in our deal flow.",
    results: ['300% increase in deal flow', '45% reduction in acquisition costs', 'Expanded to 3 new markets'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }, {
    id: 2,
    title: 'Scaling Our Business with Automated Marketing Campaigns',
    company: 'Premier Property Group',
    author: 'Sarah Williams',
    location: 'Austin, TX',
    quote: 'The marketing automation tools helped us scale our outreach while maintaining a personal touch. Our response rates increased by 40%.',
    results: ['40% higher response rates', 'Scaled from 50 to 500 contacts per week', 'Reduced marketing costs by 25%'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  }];
  // Filter courses based on selected category
  const filteredCourses = courses.filter(course => selectedCategory === 'all' || course.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory);
  return <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-dark">Learning Center</h1>
              <p className="text-gray-500 mt-1">
                Courses, webinars, and resources to help you master
                AcquireFlow.AI
              </p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
              <GraduationCap size={16} className="mr-2" />
              My Learning Dashboard
            </button>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex overflow-x-auto hide-scrollbar">
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'courses' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('courses')}>
                <BookOpen size={18} className="mr-2" />
                <span>Video Courses</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'webinars' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('webinars')}>
                <Video size={18} className="mr-2" />
                <span>Webinars</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'certifications' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('certifications')}>
                <Award size={18} className="mr-2" />
                <span>Certification Programs</span>
              </button>
              <button className={`flex items-center py-3 px-4 whitespace-nowrap border-b-2 ${activeTab === 'success' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('success')}>
                <Star size={18} className="mr-2" />
                <span>Success Stories</span>
              </button>
            </div>
          </div>
          {/* Video Courses Tab */}
          {activeTab === 'courses' && <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full md:w-64">
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  <input type="text" placeholder="Search courses..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <select className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    {categories.map(category => <option key={category.id} value={category.id}>
                        {category.name}
                      </option>)}
                  </select>
                  <button className="px-3 py-2 border border-gray-200 rounded-lg flex items-center bg-white">
                    <Filter size={16} className="mr-2 text-gray-500" />
                    Filters
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button className="w-12 h-12 rounded-full bg-primary bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 transition-colors">
                          <Play size={20} className="text-white ml-1" />
                        </button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.level === 'Beginner' ? 'bg-green-100 text-green-800' : course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {course.level}
                        </span>
                      </div>
                      {course.completed && <div className="absolute bottom-2 left-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center">
                            <CheckCircle size={12} className="mr-1" />
                            Completed
                          </span>
                        </div>}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-dark">
                          {course.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen size={14} className="mr-1" />
                          <span>{course.modules} modules</span>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 mr-2 overflow-hidden">
                          <User size={16} className="w-full h-full text-gray-500" />
                        </div>
                        <span className="text-xs">{course.instructor}</span>
                      </div>
                      {course.progress > 0 && !course.completed && <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full">
                            <div className="h-full bg-primary rounded-full" style={{
                      width: `${course.progress}%`
                    }}></div>
                          </div>
                        </div>}
                      <button className="w-full py-2 mt-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                        {course.progress > 0 && !course.completed ? 'Continue Course' : course.completed ? 'Review Course' : 'Start Course'}
                      </button>
                    </div>
                  </div>)}
              </div>
              {filteredCourses.length === 0 && <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    We couldn't find any courses matching your current filters.
                  </p>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm" onClick={() => setSelectedCategory('all')}>
                    View All Courses
                  </button>
                </div>}
              <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-medium">Learning Paths</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                          <BookOpen size={18} className="text-primary" />
                        </div>
                        <h3 className="font-medium">New User Path</h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">
                        Start here if you're new to AcquireFlow.AI. Learn the
                        basics and get up to speed quickly.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                        <span>3 courses</span>
                        <span>5 hours total</span>
                      </div>
                      <button className="w-full py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                        Start Path
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-tertiary bg-opacity-10 rounded-lg mr-3">
                          <BookOpen size={18} className="text-tertiary" />
                        </div>
                        <h3 className="font-medium">Deal Finder Pro</h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">
                        Master the art of finding and analyzing investment
                        opportunities using advanced tools.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                        <span>5 courses</span>
                        <span>8 hours total</span>
                      </div>
                      <button className="w-full py-2 border border-tertiary text-tertiary rounded-lg text-sm hover:bg-tertiary hover:text-white transition-colors">
                        Start Path
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-secondary bg-opacity-10 rounded-lg mr-3">
                          <BookOpen size={18} className="text-secondary" />
                        </div>
                        <h3 className="font-medium">Marketing Master</h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">
                        Learn how to create and optimize marketing campaigns to
                        generate more leads.
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                        <span>4 courses</span>
                        <span>7 hours total</span>
                      </div>
                      <button className="w-full py-2 border border-secondary text-secondary rounded-lg text-sm hover:bg-secondary hover:text-white transition-colors">
                        Start Path
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Webinars Tab */}
          {activeTab === 'webinars' && <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-medium">Upcoming Webinars</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {webinars.map(webinar => <div key={webinar.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <div className="relative rounded-lg overflow-hidden">
                            <img src={webinar.thumbnail} alt={webinar.title} className="w-full h-40 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <div className="px-3 py-1.5 bg-tertiary text-dark rounded-lg text-sm font-medium">
                                Upcoming
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-2/3">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {webinar.category}
                            </span>
                          </div>
                          <h3 className="font-medium text-dark mb-2">
                            {webinar.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-4">
                            {webinar.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-1.5" />
                              <span>{webinar.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1.5" />
                              <span>{webinar.time}</span>
                            </div>
                            <div className="flex items-center">
                              <User size={16} className="mr-1.5" />
                              <span>Host: {webinar.host}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button className={`px-4 py-2 rounded-lg text-sm flex items-center ${webinar.registration ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-100 text-gray-500'}`}>
                              {webinar.registration ? 'Register Now' : 'Registration Closed'}
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm flex items-center">
                              Add to Calendar
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm flex items-center">
                              Set Reminder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-medium">On-Demand Webinars</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" alt="Webinar thumbnail" className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button className="w-12 h-12 rounded-full bg-primary bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 transition-colors">
                            <Play size={20} className="text-white ml-1" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <span className="px-2 py-1 bg-gray-900 bg-opacity-75 text-white rounded text-xs">
                            45:12
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          Deal Analysis
                        </span>
                        <h3 className="font-medium text-dark mt-2">
                          Finding Hidden Value in Multi-Family Properties
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-2">
                          Learn how to identify value-add opportunities in
                          multi-family properties that others miss.
                        </p>
                        <button className="w-full py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                          Watch Now
                        </button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" alt="Webinar thumbnail" className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button className="w-12 h-12 rounded-full bg-primary bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 transition-colors">
                            <Play size={20} className="text-white ml-1" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <span className="px-2 py-1 bg-gray-900 bg-opacity-75 text-white rounded text-xs">
                            38:45
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          Marketing
                        </span>
                        <h3 className="font-medium text-dark mt-2">
                          Direct Mail Campaigns That Convert
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-2">
                          Discover proven strategies for creating direct mail
                          campaigns that generate high-quality leads.
                        </p>
                        <button className="w-full py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                          Watch Now
                        </button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" alt="Webinar thumbnail" className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button className="w-12 h-12 rounded-full bg-primary bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 transition-colors">
                            <Play size={20} className="text-white ml-1" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <span className="px-2 py-1 bg-gray-900 bg-opacity-75 text-white rounded text-xs">
                            52:18
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          Negotiation
                        </span>
                        <h3 className="font-medium text-dark mt-2">
                          Negotiation Tactics for Distressed Properties
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-2">
                          Learn effective negotiation strategies for acquiring
                          distressed properties at favorable prices.
                        </p>
                        <button className="w-full py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                      Browse All Webinars
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-tertiary to-tertiary-dark rounded-lg overflow-hidden">
                <div className="p-6 text-dark">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-2">
                        Host Your Own Webinar
                      </h2>
                      <p className="mb-4">
                        Are you an expert user with valuable insights to share?
                        Apply to become a community webinar host.
                      </p>
                      <button className="px-4 py-2 bg-dark text-white rounded-lg text-sm">
                        Apply Now
                      </button>
                    </div>
                    <img src="https://illustrations.popsy.co/amber/presenting-idea.svg" alt="Host a webinar" className="w-48 h-48" />
                  </div>
                </div>
              </div>
            </div>}
          {/* Certifications Tab */}
          {activeTab === 'certifications' && <div className="space-y-8">
              <div className="bg-gradient-to-r from-primary-dark to-primary rounded-lg overflow-hidden text-white">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-2/3">
                      <h2 className="text-xl font-bold mb-2">
                        AcquireFlow.AI Certification Program
                      </h2>
                      <p className="mb-4">
                        Demonstrate your expertise and advance your career with
                        our official certification programs. Each certification
                        validates your skills and knowledge in specific areas of
                        the platform.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-white text-primary rounded-lg text-sm font-medium">
                          View My Certifications
                        </button>
                        <button className="px-4 py-2 bg-primary-dark text-white rounded-lg text-sm font-medium border border-white border-opacity-30">
                          Learn More
                        </button>
                      </div>
                    </div>
                    <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
                      <div className="relative">
                        <div className="w-32 h-32 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                          <Award size={64} className="text-white" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-tertiary rounded-full flex items-center justify-center">
                          <CheckCircle size={24} className="text-dark" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map(cert => <div key={cert.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img src={cert.thumbnail} alt={cert.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${cert.level === 'Beginner' ? 'bg-green-100 text-green-800' : cert.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {cert.level}
                          </span>
                        </div>
                        <h3 className="font-medium text-dark mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-3">
                          {cert.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
                          <div className="flex items-center">
                            <BookOpen size={14} className="mr-1.5" />
                            <span>{cert.modules} Modules</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle size={14} className="mr-1.5" />
                            <span>
                              {cert.exams} {cert.exams === 1 ? 'Exam' : 'Exams'}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1.5" />
                            <span>{cert.duration}</span>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-medium">Certification Benefits</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-primary bg-opacity-10 rounded-lg mr-3">
                          <Award size={18} className="text-primary" />
                        </div>
                        <h3 className="font-medium">
                          Professional Recognition
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Showcase your expertise with digital badges and
                        certificates that you can add to your resume and
                        LinkedIn profile.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-tertiary bg-opacity-10 rounded-lg mr-3">
                          <Users size={18} className="text-tertiary" />
                        </div>
                        <h3 className="font-medium">Exclusive Community</h3>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Join a private community of certified professionals to
                        network, share insights, and collaborate.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-secondary bg-opacity-10 rounded-lg mr-3">
                          <Star size={18} className="text-secondary" />
                        </div>
                        <h3 className="font-medium">Priority Support</h3>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Get access to dedicated support channels and priority
                        assistance for your questions and issues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Success Stories Tab */}
          {activeTab === 'success' && <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {successStories.map(story => <div key={story.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img src={story.thumbnail} alt={story.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-medium">
                          {story.title}
                        </h3>
                        <div className="flex items-center text-white text-opacity-90 text-sm mt-1">
                          <span>{story.company}</span>
                          <span className="mx-2">•</span>
                          <span>{story.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="text-xl font-serif text-gray-600 italic mb-3">
                          "{story.quote}"
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mr-2 overflow-hidden">
                            <User size={16} className="w-full h-full text-gray-500" />
                          </div>
                          <span className="text-sm font-medium">
                            {story.author}
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium mb-2">
                          Key Results:
                        </h4>
                        <ul className="space-y-1">
                          {story.results.map((result, index) => <li key={index} className="flex items-center text-sm">
                              <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                              {result}
                            </li>)}
                        </ul>
                      </div>
                      <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                        Read Full Story
                      </button>
                    </div>
                  </div>)}
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-medium">Industry Insights</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" alt="Real Estate Trends" className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-medium text-dark mb-2">
                          2023 Real Estate Investment Trends
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                          Explore the latest trends shaping the real estate
                          investment landscape in 2023.
                        </p>
                        <button className="text-primary text-sm flex items-center hover:underline">
                          Read Article{' '}
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" alt="Market Analysis" className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-medium text-dark mb-2">
                          Market Analysis: Emerging Opportunities
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                          Discover emerging markets and investment opportunities
                          across the country.
                        </p>
                        <button className="text-primary text-sm flex items-center hover:underline">
                          Read Article{' '}
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" alt="Technology Impact" className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-medium text-dark mb-2">
                          The Impact of Technology on Real Estate
                        </h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                          How technology is transforming the real estate
                          investment industry.
                        </p>
                        <button className="text-primary text-sm flex items-center hover:underline">
                          Read Article{' '}
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                      View All Insights
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg overflow-hidden text-white">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-2/3">
                      <h2 className="text-xl font-bold mb-2">
                        Share Your Success Story
                      </h2>
                      <p className="mb-4">
                        Have you achieved impressive results using
                        AcquireFlow.AI? Share your story with our community and
                        get featured on our platform.
                      </p>
                      <button className="px-4 py-2 bg-white text-gray-800 rounded-lg text-sm font-medium">
                        Submit Your Story
                      </button>
                    </div>
                    <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
                      <img src="https://illustrations.popsy.co/white/success.svg" alt="Share your success" className="w-48 h-48" />
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};