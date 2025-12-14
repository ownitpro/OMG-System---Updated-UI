import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CogIcon,
  KeyIcon,
  ShieldCheckIcon,
  BellIcon,
  CloudIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

// Mock data - in real app, fetch from API
const systemSettings = {
  paymentProvider: {
    stripePublishableKey: "pk_test_...",
    stripeSecretKey: "sk_test_...",
    webhookSecret: "whsec_...",
    lastRotated: "2024-01-15",
  },
  webhookSettings: {
    secret: "webhook_secret_123",
    lastRotated: "2024-01-10",
    rotationInterval: 30, // days
  },
  retentionPolicies: {
    auditLogs: 365, // days
    usageEvents: 90, // days
    userSessions: 30, // days
    backupRetention: 2555, // days (7 years)
  },
  defaultPricing: {
    starterPlan: 99,
    professionalPlan: 299,
    enterprisePlan: 999,
    setupFee: 0,
  },
  securitySettings: {
    mfaRequired: true,
    sessionTimeout: 8, // hours
    maxLoginAttempts: 5,
    lockoutDuration: 15, // minutes
  },
  notificationSettings: {
    emailNotifications: true,
    slackWebhook: "https://hooks.slack.com/...",
    alertThresholds: {
      highUsage: 80,
      systemErrors: 5,
      failedLogins: 10,
    },
  },
};

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">
          Configure system-wide settings and security policies
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CogIcon className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" defaultValue="OMGsystems" />
                </div>
                <div>
                  <Label htmlFor="app-version">Version</Label>
                  <Input id="app-version" defaultValue="1.0.0" disabled />
                </div>
                <div>
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <span className="text-sm text-gray-600">Enable maintenance mode</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <span className="text-sm text-gray-600">Enable debug logging</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheckIcon className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Multi-Factor Authentication</div>
                    <div className="text-sm text-gray-600">Require MFA for all admin users</div>
                  </div>
                  <Switch defaultChecked={systemSettings.securitySettings.mfaRequired} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-sm text-gray-600">Automatically log out inactive users</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      defaultValue={systemSettings.securitySettings.sessionTimeout}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-600">hours</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Max Login Attempts</div>
                    <div className="text-sm text-gray-600">Lock account after failed attempts</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      defaultValue={systemSettings.securitySettings.maxLoginAttempts}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-600">attempts</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Lockout Duration</div>
                    <div className="text-sm text-gray-600">How long to lock account</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      defaultValue={systemSettings.securitySettings.lockoutDuration}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-600">minutes</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <KeyIcon className="mr-2 h-5 w-5" />
                API Keys & Secrets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stripe-publishable-key">Stripe Publishable Key</Label>
                  <Input
                    id="stripe-publishable-key"
                    defaultValue={systemSettings.paymentProvider.stripePublishableKey}
                    type="password"
                  />
                </div>
                <div>
                  <Label htmlFor="stripe-secret-key">Stripe Secret Key</Label>
                  <Input
                    id="stripe-secret-key"
                    defaultValue={systemSettings.paymentProvider.stripeSecretKey}
                    type="password"
                  />
                </div>
                <div>
                  <Label htmlFor="webhook-secret">Webhook Secret</Label>
                  <Input
                    id="webhook-secret"
                    defaultValue={systemSettings.webhookSettings.secret}
                    type="password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Last Rotated</div>
                    <div className="text-sm text-gray-600">{systemSettings.webhookSettings.lastRotated}</div>
                  </div>
                  <Button variant="outline">
                    <ArrowPathIcon className="mr-2 h-4 w-4" />
                    Rotate Keys
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CogIcon className="mr-2 h-5 w-5" />
                Billing Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <Label htmlFor="starter-plan">Starter Plan Price</Label>
                  <Input
                    id="starter-plan"
                    type="number"
                    defaultValue={systemSettings.defaultPricing.starterPlan}
                  />
                </div>
                <div>
                  <Label htmlFor="professional-plan">Professional Plan Price</Label>
                  <Input
                    id="professional-plan"
                    type="number"
                    defaultValue={systemSettings.defaultPricing.professionalPlan}
                  />
                </div>
                <div>
                  <Label htmlFor="enterprise-plan">Enterprise Plan Price</Label>
                  <Input
                    id="enterprise-plan"
                    type="number"
                    defaultValue={systemSettings.defaultPricing.enterprisePlan}
                  />
                </div>
                <div>
                  <Label htmlFor="setup-fee">Setup Fee</Label>
                  <Input
                    id="setup-fee"
                    type="number"
                    defaultValue={systemSettings.defaultPricing.setupFee}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Pricing</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellIcon className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-600">Send system alerts via email</div>
                  </div>
                  <Switch defaultChecked={systemSettings.notificationSettings.emailNotifications} />
                </div>
                <div>
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    defaultValue={systemSettings.notificationSettings.slackWebhook}
                    placeholder="https://hooks.slack.com/..."
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div>
                    <Label htmlFor="high-usage-threshold">High Usage Threshold</Label>
                    <Input
                      id="high-usage-threshold"
                      type="number"
                      defaultValue={systemSettings.notificationSettings.alertThresholds.highUsage}
                    />
                  </div>
                  <div>
                    <Label htmlFor="system-errors-threshold">System Errors Threshold</Label>
                    <Input
                      id="system-errors-threshold"
                      type="number"
                      defaultValue={systemSettings.notificationSettings.alertThresholds.systemErrors}
                    />
                  </div>
                  <div>
                    <Label htmlFor="failed-logins-threshold">Failed Logins Threshold</Label>
                    <Input
                      id="failed-logins-threshold"
                      type="number"
                      defaultValue={systemSettings.notificationSettings.alertThresholds.failedLogins}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudIcon className="mr-2 h-5 w-5" />
                Data Retention & Backup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <Label htmlFor="audit-logs-retention">Audit Logs Retention (days)</Label>
                  <Input
                    id="audit-logs-retention"
                    type="number"
                    defaultValue={systemSettings.retentionPolicies.auditLogs}
                  />
                </div>
                <div>
                  <Label htmlFor="usage-events-retention">Usage Events Retention (days)</Label>
                  <Input
                    id="usage-events-retention"
                    type="number"
                    defaultValue={systemSettings.retentionPolicies.usageEvents}
                  />
                </div>
                <div>
                  <Label htmlFor="user-sessions-retention">User Sessions Retention (days)</Label>
                  <Input
                    id="user-sessions-retention"
                    type="number"
                    defaultValue={systemSettings.retentionPolicies.userSessions}
                  />
                </div>
                <div>
                  <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                  <Input
                    id="backup-retention"
                    type="number"
                    defaultValue={systemSettings.retentionPolicies.backupRetention}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <CloudIcon className="mr-2 h-4 w-4" />
                  Create Backup
                </Button>
                <Button>
                  <CloudIcon className="mr-2 h-4 w-4" />
                  Save Retention Policies
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
