export default function NavigationTest() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-900">
              OMGsystems
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a href="/industries" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Industries
            </a>
            <a href="/apps" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Apps
            </a>
            <a href="/demos" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Demos
            </a>
            <a href="/solutions" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Solutions
            </a>
            <a href="/pricing" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Pricing
            </a>
            <a href="/case-snapshots" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Case Studies
            </a>
            <a href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Contact
            </a>
            <a href="/demo/crm" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
