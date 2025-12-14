"use client";

import { useState, useRef } from "react";

interface CanvasAreaProps {
  modules: any[];
  connections: any[];
  onModuleClick: (moduleId: string) => void;
  onConnectionCreate: (from: string, to: string) => void;
}

export function CanvasArea({ modules, connections, onModuleClick, onConnectionCreate }: CanvasAreaProps) {
  const [draggedModule, setDraggedModule] = useState<string | null>(null);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const moduleInfo = {
    trigger: { name: 'Trigger', icon: '⚡', color: 'bg-yellow-100 border-yellow-300' },
    spreadsheet: { name: 'Spreadsheet', icon: '📊', color: 'bg-green-100 border-green-300' },
    email: { name: 'Email', icon: '📧', color: 'bg-blue-100 border-blue-300' },
    sms: { name: 'SMS', icon: '📱', color: 'bg-purple-100 border-purple-300' },
    webhook: { name: 'Webhook', icon: '🔗', color: 'bg-gray-100 border-gray-300' },
    delay: { name: 'Delay', icon: '⏰', color: 'bg-orange-100 border-orange-300' },
    condition: { name: 'Condition', icon: '❓', color: 'bg-pink-100 border-pink-300' },
    notification: { name: 'Notification', icon: '🔔', color: 'bg-indigo-100 border-indigo-300' },
    database: { name: 'Database', icon: '🗄️', color: 'bg-teal-100 border-teal-300' },
    calendar: { name: 'Calendar', icon: '📅', color: 'bg-cyan-100 border-cyan-300' }
  };

  const handleModuleClick = (moduleId: string) => {
    onModuleClick(moduleId);
  };

  const handleModuleDragStart = (moduleId: string) => {
    setDraggedModule(moduleId);
  };

  const handleModuleDragEnd = () => {
    setDraggedModule(null);
  };

  const handleModuleHover = (moduleId: string | null) => {
    setHoveredModule(moduleId);
  };

  return (
    <div 
      ref={canvasRef}
      className="w-full h-full relative bg-gray-50 overflow-auto"
      style={{ minHeight: '500px' }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Modules */}
      {modules.map((module) => {
        const info = moduleInfo[module.type as keyof typeof moduleInfo];
        if (!info) return null;

        return (
          <div
            key={module.id}
            className={`absolute p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg ${
              info.color
            } ${
              hoveredModule === module.id ? 'ring-2 ring-lime-400' : ''
            }`}
            style={{
              left: module.x,
              top: module.y,
              width: '120px',
              height: '80px'
            }}
            onClick={() => handleModuleClick(module.id)}
            onMouseEnter={() => handleModuleHover(module.id)}
            onMouseLeave={() => handleModuleHover(null)}
            draggable
            onDragStart={() => handleModuleDragStart(module.id)}
            onDragEnd={handleModuleDragEnd}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{info.icon}</div>
              <div className="text-xs font-medium text-gray-700">{info.name}</div>
            </div>
          </div>
        );
      })}

      {/* Connections */}
      {connections.map((connection) => {
        const fromModule = modules.find(m => m.id === connection.from);
        const toModule = modules.find(m => m.id === connection.to);
        
        if (!fromModule || !toModule) return null;

        const fromX = fromModule.x + 60; // Center of module
        const fromY = fromModule.y + 40;
        const toX = toModule.x + 60;
        const toY = toModule.y + 40;

        return (
          <svg
            key={connection.id}
            className="absolute pointer-events-none"
            style={{ left: 0, top: 0, width: '100%', height: '100%' }}
          >
            <defs>
              <marker
                id={`arrowhead-${connection.id}`}
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#10b981"
                />
              </marker>
            </defs>
            <line
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="#10b981"
              strokeWidth="2"
              markerEnd={`url(#arrowhead-${connection.id})`}
            />
          </svg>
        );
      })}

      {/* Empty State */}
      {modules.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Canvas is Empty</h3>
            <p className="text-gray-600 mb-4">Drag modules from the palette to start building your workflow</p>
            <div className="text-sm text-gray-500">
              💡 <strong>Tip:</strong> Click on modules in the palette to add them to your canvas
            </div>
          </div>
        </div>
      )}

      {/* Connection Hints */}
      {draggedModule && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 bg-lime-100 border border-lime-300 rounded-lg p-3">
            <p className="text-sm text-lime-800">
              💡 <strong>Creating Connection:</strong> Drag to another module to connect them
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
