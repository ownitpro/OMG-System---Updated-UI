"use client";

interface Node {
  id: string;
  type: string;
  data: {
    label: string;
    description: string;
    icon: string;
    price: number;
    type: string;
  };
  position: { x: number; y: number };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface WorkflowSummaryProps {
  nodes: Node[];
  edges: Edge[];
  totalPrice: number;
  complexity: string;
  onClearWorkflow: () => void;
  onSubmitWorkflow: () => void;
}

export function WorkflowSummary({
  nodes,
  edges,
  totalPrice,
  complexity,
  onClearWorkflow,
  onSubmitWorkflow,
}: WorkflowSummaryProps) {
  const nodeCount = nodes.length;
  const edgeCount = edges.length;

  // Calculate estimated setup time based on complexity
  const getEstimatedSetupTime = () => {
    switch (complexity) {
      case 'Simple': return '1-2 weeks';
      case 'Medium': return '2-3 weeks';
      case 'Complex': return '3-4 weeks';
      default: return '1-2 weeks';
    }
  };

  // Get complexity color
  const getComplexityColor = () => {
    switch (complexity) {
      case 'Simple': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Complex': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Group nodes by type for summary
  const nodesByType = nodes.reduce((acc, node) => {
    const type = node.data.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(node);
    return acc;
  }, {} as Record<string, Node[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Workflow Summary</h2>
        <p className="text-sm text-gray-600">
          Review your workflow before processing
        </p>
      </div>

      {/* Overview Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Overview</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Nodes:</span>
            <span className="ml-2 font-medium">{nodeCount}</span>
          </div>
          <div>
            <span className="text-gray-600">Connections:</span>
            <span className="ml-2 font-medium">{edgeCount}</span>
          </div>
          <div>
            <span className="text-gray-600">Complexity:</span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor()}`}>
              {complexity}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Setup Time:</span>
            <span className="ml-2 font-medium">{getEstimatedSetupTime()}</span>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Breakdown</h3>
        <div className="space-y-2">
          {Object.entries(nodesByType).map(([type, typeNodes]) => (
            <div key={type} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 capitalize">{type}s ({typeNodes.length}):</span>
              <span className="font-medium">
                ${typeNodes.reduce((sum, node) => sum + node.data.price, 0)}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-2 flex justify-between items-center font-semibold">
            <span>Total:</span>
            <span className="text-green-600">${totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Node Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Workflow Steps</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {nodes.map((node, index) => (
            <div key={node.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
              <div className="flex items-center">
                <span className="text-lg mr-2">{node.data.icon}</span>
                <span className="font-medium">{node.data.label}</span>
              </div>
              <span className="text-green-600 font-medium">${node.data.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">What's Included</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Custom workflow setup
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Integration configuration
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Testing & optimization
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Training & documentation
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            30-day support
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onClearWorkflow}
          className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Start Over
        </button>
        <button
          onClick={onSubmitWorkflow}
          disabled={nodeCount <= 1}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          Process & Pay ${totalPrice}
        </button>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Next Steps</h3>
        <ol className="text-xs text-blue-800 space-y-1">
          <li>1. Review your workflow</li>
          <li>2. Complete payment</li>
          <li>3. Schedule kickoff call</li>
          <li>4. We build & test</li>
          <li>5. Launch & train</li>
        </ol>
      </div>
    </div>
  );
}
