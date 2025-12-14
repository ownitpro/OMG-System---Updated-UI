import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demos - OMGsystems',
  description: 'Experience OMGsystems in action with our interactive demos. See how our platform can transform your business.',
};

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Demos
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience OMGsystems in action with our interactive demos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Demo</h3>
              <p className="text-gray-600 mb-4">Interactive platform tour with real data</p>
              <a href="/demos/live" className="text-blue-600 hover:text-blue-700 font-medium">
                Try Live Demo →
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">CRM Demo</h3>
              <p className="text-gray-600 mb-4">See how our CRM transforms lead management</p>
              <a href="/apps/crm" className="text-blue-600 hover:text-blue-700 font-medium">
                Try CRM Demo →
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SecureVault Demo</h3>
              <p className="text-gray-600 mb-4">Experience secure document management</p>
              <a href="/apps/securevault-docs" className="text-blue-600 hover:text-blue-700 font-medium">
                Try SecureVault Demo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
