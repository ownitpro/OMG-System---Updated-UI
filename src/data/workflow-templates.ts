export interface WorkflowNode {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  position: { x: number; y: number };
  config: any;
  inputs: string[];
  outputs: string[];
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  setupCost: number;
  monthlyCost: number;
  setupTime: string;
  nodes: WorkflowNode[];
  connections: Array<{ from: string; to: string; type: string }>;
  requiredConfig: string[];
}

export interface NodeType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  configSchema: any;
  inputs: number;
  outputs: number;
  canConnect: string[];
}

export const nodeTypes: NodeType[] = [
  {
    id: "trigger",
    name: "Trigger",
    description: "Start of workflow - what initiates this automation",
    icon: "⚡",
    color: "bg-green-100 text-green-600",
    category: "Trigger",
    configSchema: {
      type: "object",
      properties: {
        triggerType: { type: "string", enum: ["form", "webhook", "schedule", "event"] },
        conditions: { type: "array" }
      }
    },
    inputs: 0,
    outputs: 1,
    canConnect: ["action", "condition", "delay"]
  },
  {
    id: "action",
    name: "Action",
    description: "Perform an action like sync, send, or update",
    icon: "⚙️",
    color: "bg-blue-100 text-blue-600",
    category: "Action",
    configSchema: {
      type: "object",
      properties: {
        actionType: { type: "string", enum: ["sync", "send", "update", "create"] },
        target: { type: "string" },
        mapping: { type: "object" }
      }
    },
    inputs: 1,
    outputs: 1,
    canConnect: ["action", "condition", "delay", "end"]
  },
  {
    id: "condition",
    name: "Condition",
    description: "Check if conditions are met before proceeding",
    icon: "❓",
    color: "bg-yellow-100 text-yellow-600",
    category: "Logic",
    configSchema: {
      type: "object",
      properties: {
        field: { type: "string" },
        operator: { type: "string", enum: ["equals", "contains", "greater", "less"] },
        value: { type: "string" }
      }
    },
    inputs: 1,
    outputs: 2,
    canConnect: ["action", "delay", "end"]
  },
  {
    id: "delay",
    name: "Delay",
    description: "Wait for a specified time before continuing",
    icon: "⏱️",
    color: "bg-purple-100 text-purple-600",
    category: "Timing",
    configSchema: {
      type: "object",
      properties: {
        duration: { type: "number" },
        unit: { type: "string", enum: ["minutes", "hours", "days"] }
      }
    },
    inputs: 1,
    outputs: 1,
    canConnect: ["action", "condition", "end"]
  },
  {
    id: "notification",
    name: "Notification",
    description: "Send email, SMS, or Slack notification",
    icon: "📧",
    color: "bg-red-100 text-red-600",
    category: "Communication",
    configSchema: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["email", "sms", "slack"] },
        template: { type: "string" },
        recipients: { type: "array" }
      }
    },
    inputs: 1,
    outputs: 1,
    canConnect: ["action", "end"]
  },
  {
    id: "end",
    name: "End",
    description: "End of workflow",
    icon: "🏁",
    color: "bg-gray-100 text-gray-600",
    category: "Terminal",
    configSchema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["success", "error", "completed"] }
      }
    },
    inputs: 1,
    outputs: 0,
    canConnect: []
  }
];

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: "spreadsheet-sync-lead-capture",
    name: "Spreadsheet Sync Lead Capture",
    description: "Automatically sync leads from forms to spreadsheets and CRM",
    category: "Data Management",
    icon: "📊",
    setupCost: 1000,
    monthlyCost: 75,
    setupTime: "2 weeks",
    nodes: [
      {
        id: "start-1",
        type: "trigger",
        title: "Form Submission",
        description: "New lead form submitted",
        icon: "⚡",
        color: "bg-green-100 text-green-600",
        position: { x: 100, y: 100 },
        config: { triggerType: "form", conditions: [] },
        inputs: [],
        outputs: ["output-1"]
      },
      {
        id: "sync-1",
        type: "action",
        title: "Sync to Spreadsheet",
        description: "Add row to Google Sheets",
        icon: "⚙️",
        color: "bg-blue-100 text-blue-600",
        position: { x: 300, y: 100 },
        config: { actionType: "sync", target: "spreadsheet", mapping: {} },
        inputs: ["input-1"],
        outputs: ["output-2"]
      },
      {
        id: "crm-1",
        type: "action",
        title: "CRM Upsert",
        description: "Create or update contact in CRM",
        icon: "⚙️",
        color: "bg-blue-100 text-blue-600",
        position: { x: 500, y: 100 },
        config: { actionType: "sync", target: "crm", mapping: {} },
        inputs: ["input-2"],
        outputs: ["output-3"]
      },
      {
        id: "end-1",
        type: "end",
        title: "Complete",
        description: "Workflow completed",
        icon: "🏁",
        color: "bg-gray-100 text-gray-600",
        position: { x: 700, y: 100 },
        config: { status: "success" },
        inputs: ["input-3"],
        outputs: []
      }
    ],
    connections: [
      { from: "start-1", to: "sync-1", type: "success" },
      { from: "sync-1", to: "crm-1", type: "success" },
      { from: "crm-1", to: "end-1", type: "success" }
    ],
    requiredConfig: ["spreadsheet", "crm", "mapping"]
  },
  {
    id: "overdue-invoice-notification",
    name: "Overdue Invoice Notification",
    description: "Send automatic reminders for overdue invoices",
    category: "Finance",
    icon: "💰",
    setupCost: 800,
    monthlyCost: 60,
    setupTime: "2-3 weeks",
    nodes: [
      {
        id: "start-2",
        type: "trigger",
        title: "Invoice Due",
        description: "Invoice due date passed",
        icon: "⚡",
        color: "bg-green-100 text-green-600",
        position: { x: 100, y: 100 },
        config: { triggerType: "schedule", conditions: [] },
        inputs: [],
        outputs: ["output-1"]
      },
      {
        id: "check-1",
        type: "condition",
        title: "Check Status",
        description: "Is invoice still unpaid?",
        icon: "❓",
        color: "bg-yellow-100 text-yellow-600",
        position: { x: 300, y: 100 },
        config: { field: "status", operator: "equals", value: "unpaid" },
        inputs: ["input-1"],
        outputs: ["output-2", "output-3"]
      },
      {
        id: "notify-1",
        type: "notification",
        title: "Send Reminder",
        description: "Email reminder to client",
        icon: "📧",
        color: "bg-red-100 text-red-600",
        position: { x: 500, y: 50 },
        config: { type: "email", template: "overdue-reminder", recipients: ["client"] },
        inputs: ["input-2"],
        outputs: ["output-4"]
      },
      {
        id: "end-2",
        type: "end",
        title: "Complete",
        description: "Reminder sent",
        icon: "🏁",
        color: "bg-gray-100 text-gray-600",
        position: { x: 700, y: 50 },
        config: { status: "success" },
        inputs: ["input-4"],
        outputs: []
      }
    ],
    connections: [
      { from: "start-2", to: "check-1", type: "success" },
      { from: "check-1", to: "notify-1", type: "true" },
      { from: "notify-1", to: "end-2", type: "success" }
    ],
    requiredConfig: ["billing_system", "email_template", "client_mapping"]
  },
  {
    id: "meeting-followup-summary",
    name: "Meeting Follow-Up Summary",
    description: "Automatically generate and send meeting summaries",
    category: "Communication",
    icon: "📝",
    setupCost: 1200,
    monthlyCost: 90,
    setupTime: "3 weeks",
    nodes: [
      {
        id: "start-3",
        type: "trigger",
        title: "Meeting End",
        description: "Meeting completed",
        icon: "⚡",
        color: "bg-green-100 text-green-600",
        position: { x: 100, y: 100 },
        config: { triggerType: "event", conditions: [] },
        inputs: [],
        outputs: ["output-1"]
      },
      {
        id: "delay-1",
        type: "delay",
        title: "Wait 5 Minutes",
        description: "Allow time for notes to be added",
        icon: "⏱️",
        color: "bg-purple-100 text-purple-600",
        position: { x: 300, y: 100 },
        config: { duration: 5, unit: "minutes" },
        inputs: ["input-1"],
        outputs: ["output-2"]
      },
      {
        id: "action-1",
        type: "action",
        title: "Generate Summary",
        description: "Create meeting summary",
        icon: "⚙️",
        color: "bg-blue-100 text-blue-600",
        position: { x: 500, y: 100 },
        config: { actionType: "create", target: "summary", mapping: {} },
        inputs: ["input-2"],
        outputs: ["output-3"]
      },
      {
        id: "notify-2",
        type: "notification",
        title: "Send Summary",
        description: "Email summary to attendees",
        icon: "📧",
        color: "bg-red-100 text-red-600",
        position: { x: 700, y: 100 },
        config: { type: "email", template: "meeting-summary", recipients: ["attendees"] },
        inputs: ["input-3"],
        outputs: ["output-4"]
      },
      {
        id: "end-3",
        type: "end",
        title: "Complete",
        description: "Summary sent",
        icon: "🏁",
        color: "bg-gray-100 text-gray-600",
        position: { x: 900, y: 100 },
        config: { status: "success" },
        inputs: ["input-4"],
        outputs: []
      }
    ],
    connections: [
      { from: "start-3", to: "delay-1", type: "success" },
      { from: "delay-1", to: "action-1", type: "success" },
      { from: "action-1", to: "notify-2", type: "success" },
      { from: "notify-2", to: "end-3", type: "success" }
    ],
    requiredConfig: ["calendar_integration", "ai_service", "email_template"]
  },
  {
    id: "contract-expiry-alert",
    name: "Contract Expiry Alert",
    description: "Alert team when contracts are nearing expiration",
    category: "Contract Management",
    icon: "📋",
    setupCost: 600,
    monthlyCost: 54,
    setupTime: "2 weeks",
    nodes: [
      {
        id: "start-4",
        type: "trigger",
        title: "30 Days Before",
        description: "Contract expires in 30 days",
        icon: "⚡",
        color: "bg-green-100 text-green-600",
        position: { x: 100, y: 100 },
        config: { triggerType: "schedule", conditions: [] },
        inputs: [],
        outputs: ["output-1"]
      },
      {
        id: "check-2",
        type: "condition",
        title: "Check Renewal",
        description: "Is contract already renewed?",
        icon: "❓",
        color: "bg-yellow-100 text-yellow-600",
        position: { x: 300, y: 100 },
        config: { field: "renewed", operator: "equals", value: "false" },
        inputs: ["input-1"],
        outputs: ["output-2", "output-3"]
      },
      {
        id: "notify-3",
        type: "notification",
        title: "Send Alert",
        description: "Alert team about expiring contract",
        icon: "📧",
        color: "bg-red-100 text-red-600",
        position: { x: 500, y: 50 },
        config: { type: "slack", template: "contract-expiry", recipients: ["team"] },
        inputs: ["input-2"],
        outputs: ["output-4"]
      },
      {
        id: "end-4",
        type: "end",
        title: "Complete",
        description: "Alert sent",
        icon: "🏁",
        color: "bg-gray-100 text-gray-600",
        position: { x: 700, y: 50 },
        config: { status: "success" },
        inputs: ["input-4"],
        outputs: []
      }
    ],
    connections: [
      { from: "start-4", to: "check-2", type: "success" },
      { from: "check-2", to: "notify-3", type: "true" },
      { from: "notify-3", to: "end-4", type: "success" }
    ],
    requiredConfig: ["contract_system", "slack_integration", "team_mapping"]
  },
  {
    id: "customer-feedback-request",
    name: "Customer Feedback Request",
    description: "Automatically request feedback after job completion",
    category: "Customer Experience",
    icon: "⭐",
    setupCost: 500,
    monthlyCost: 45,
    setupTime: "2 weeks",
    nodes: [
      {
        id: "start-5",
        type: "trigger",
        title: "Job Complete",
        description: "Service job completed",
        icon: "⚡",
        color: "bg-green-100 text-green-600",
        position: { x: 100, y: 100 },
        config: { triggerType: "event", conditions: [] },
        inputs: [],
        outputs: ["output-1"]
      },
      {
        id: "delay-2",
        type: "delay",
        title: "Wait 3 Days",
        description: "Allow time for service to settle",
        icon: "⏱️",
        color: "bg-purple-100 text-purple-600",
        position: { x: 300, y: 100 },
        config: { duration: 3, unit: "days" },
        inputs: ["input-1"],
        outputs: ["output-2"]
      },
      {
        id: "notify-4",
        type: "notification",
        title: "Send Survey",
        description: "Email feedback survey to customer",
        icon: "📧",
        color: "bg-red-100 text-red-600",
        position: { x: 500, y: 100 },
        config: { type: "email", template: "feedback-survey", recipients: ["customer"] },
        inputs: ["input-2"],
        outputs: ["output-3"]
      },
      {
        id: "end-5",
        type: "end",
        title: "Complete",
        description: "Survey sent",
        icon: "🏁",
        color: "bg-gray-100 text-gray-600",
        position: { x: 700, y: 100 },
        config: { status: "success" },
        inputs: ["input-3"],
        outputs: []
      }
    ],
    connections: [
      { from: "start-5", to: "delay-2", type: "success" },
      { from: "delay-2", to: "notify-4", type: "success" },
      { from: "notify-4", to: "end-5", type: "success" }
    ],
    requiredConfig: ["job_system", "survey_platform", "customer_mapping"]
  }
];

export const categories = [
  "All",
  "Data Management",
  "Finance", 
  "Communication",
  "Contract Management",
  "Customer Experience",
  "Team Communication",
  "Document Management"
];
