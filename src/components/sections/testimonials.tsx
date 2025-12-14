import React from "react";
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Property Manager",
    company: "Metro Properties",
    image: "/api/placeholder/64/64",
    content: "OMGsystems has revolutionized how we manage our properties. The automation features have saved us 20 hours per week, and our tenant satisfaction has increased by 40%.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Real Estate Broker",
    company: "Premier Realty Group",
    image: "/api/placeholder/64/64",
    content: "The SecureVault Docs feature is a game-changer. We can now securely share documents with clients instantly, and the compliance tracking gives us peace of mind.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Accounting Director",
    company: "Financial Solutions Inc.",
    image: "/api/placeholder/64/64",
    content: "The integration capabilities are outstanding. We've connected all our systems seamlessly, and the real-time reporting has transformed our decision-making process.",
    rating: 5
  },
  {
    name: "David Thompson",
    role: "Operations Manager",
    company: "CleanPro Services",
    image: "/api/placeholder/64/64",
    content: "OMGsystems has streamlined our entire operation. From scheduling to invoicing, everything is automated and efficient. Our team productivity has increased by 60%.",
    rating: 5
  },
  {
    name: "Lisa Park",
    role: "Healthcare Administrator",
    company: "MedCenter Plus",
    image: "/api/placeholder/64/64",
    content: "The compliance features are exactly what we needed. HIPAA compliance is now automated, and we have complete visibility into all our processes.",
    rating: 5
  },
  {
    name: "Robert Wilson",
    role: "Contractor",
    company: "Wilson Construction",
    image: "/api/placeholder/64/64",
    content: "Project management has never been easier. The collaboration tools keep everyone on the same page, and our project completion time has improved by 35%.",
    rating: 5
  }
]

const stats = [
  { value: "98%", label: "Customer Satisfaction" },
  { value: "50%", label: "Average Time Savings" },
  { value: "10,000+", label: "Active Users" },
  { value: "99.9%", label: "Uptime Guarantee" }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses across different industries are transforming their operations 
            with OMGsystems intelligent automation platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gray-600 font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-blue-600">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry highlights */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Success Across Industries
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              OMGsystems delivers measurable results across diverse business sectors, 
              with industry-specific solutions that address unique challenges and opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Property Management</h4>
              <p className="text-sm text-gray-600">40% increase in tenant satisfaction</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real Estate</h4>
              <p className="text-sm text-gray-600">60% faster document processing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Accounting</h4>
              <p className="text-sm text-gray-600">50% reduction in manual work</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Contractors</h4>
              <p className="text-sm text-gray-600">35% faster project completion</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧹</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Cleaning Services</h4>
              <p className="text-sm text-gray-600">60% productivity improvement</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Healthcare</h4>
              <p className="text-sm text-gray-600">100% compliance automation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
