"use client";

interface ModulePaletteProps {
  modules: string[];
  onModuleAdd: (module: string) => void;
}

export function ModulePalette({ modules, onModuleAdd }: ModulePaletteProps) {
  const moduleInfo = {
    trigger: { name: 'Trigger', icon: '⚡', description: 'Start your automation' },
    spreadsheet: { name: 'Spreadsheet', icon: '📊', description: 'Google Sheets integration' },
    email: { name: 'Email', icon: '📧', description: 'Send email notifications' },
    sms: { name: 'SMS', icon: '📱', description: 'Send text messages' },
    webhook: { name: 'Webhook', icon: '🔗', description: 'Send data to external systems' },
    delay: { name: 'Delay', icon: '⏰', description: 'Wait before next action' },
    condition: { name: 'Condition', icon: '❓', description: 'Make decisions based on data' },
    notification: { name: 'Notification', icon: '🔔', description: 'Send alerts and updates' },
    database: { name: 'Database', icon: '🗄️', description: 'Read or write to database' },
    calendar: { name: 'Calendar', icon: '📅', description: 'Calendar integration' }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Modules</h3>
      <div className="grid grid-cols-2 gap-3">
        {modules.map((module) => {
          const info = moduleInfo[module as keyof typeof moduleInfo];
          if (!info) return null;

          return (
            <button
              key={module}
              onClick={() => onModuleAdd(module)}
              className="p-3 border border-gray-200 rounded-lg hover:border-lime-300 hover:bg-lime-50 transition-all text-left group"
            >
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">{info.icon}</span>
                <span className="font-medium text-gray-900 text-sm">{info.name}</span>
              </div>
              <p className="text-xs text-gray-600">{info.description}</p>
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Drag modules to the canvas to add them to your workflow
        </p>
      </div>
    </div>
  );
}
