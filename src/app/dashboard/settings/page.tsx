import { Metadata } from 'next';
import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserIcon, BellIcon, ShieldCheckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Settings | Client Dashboard | OMGsystems",
  description: "Manage your account settings and preferences.",
};

export default async function DashboardSettingsPage() {
  const session = await auth();
  const user = session?.user;
  const activeOrgId = (session?.user as any)?.activeOrgId;

  // Placeholder data - in a real app, this would come from API calls
  const profileData = {
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 987-6543',
    company: 'Acme Corp',
    role: 'Admin',
    timezone: 'America/Toronto',
    language: 'English'
  };

  const notificationSettings = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    billingAlerts: true,
    systemUpdates: true,
    weeklyDigest: true
  };

  const securitySettings = {
    twoFactorEnabled: false,
    sessionTimeout: '24 hours',
    loginNotifications: true,
    passwordLastChanged: '2024-09-15',
    activeSessions: 2
  };

  const billingSettings = {
    paymentMethod: 'Visa ending in 4242',
    billingAddress: {
      street: '123 Main St',
      city: 'Toronto',
      province: 'ON',
      postalCode: 'M5V 3A8',
      country: 'Canada'
    },
    taxId: '123456789',
    invoiceDelivery: 'email'
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <BellIcon className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <ShieldCheckIcon className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCardIcon className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={profileData.name} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={profileData.email} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={profileData.phone} />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue={profileData.company} />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue={profileData.role} disabled />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue={profileData.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Toronto">Eastern Time (Toronto)</SelectItem>
                      <SelectItem value="America/Vancouver">Pacific Time (Vancouver)</SelectItem>
                      <SelectItem value="America/Edmonton">Mountain Time (Edmonton)</SelectItem>
                      <SelectItem value="America/Winnipeg">Central Time (Winnipeg)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked={notificationSettings.emailNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <Switch id="sms-notifications" defaultChecked={notificationSettings.smsNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                  </div>
                  <Switch id="push-notifications" defaultChecked={notificationSettings.pushNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-gray-600">Receive product updates and marketing content</p>
                  </div>
                  <Switch id="marketing-emails" defaultChecked={notificationSettings.marketingEmails} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                    <p className="text-sm text-gray-600">Receive alerts for security-related events</p>
                  </div>
                  <Switch id="security-alerts" defaultChecked={notificationSettings.securityAlerts} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="billing-alerts">Billing Alerts</Label>
                    <p className="text-sm text-gray-600">Receive alerts for billing and payment issues</p>
                  </div>
                  <Switch id="billing-alerts" defaultChecked={notificationSettings.billingAlerts} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-updates">System Updates</Label>
                    <p className="text-sm text-gray-600">Receive notifications about system updates</p>
                  </div>
                  <Switch id="system-updates" defaultChecked={notificationSettings.systemUpdates} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-digest">Weekly Digest</Label>
                    <p className="text-sm text-gray-600">Receive a weekly summary of your account activity</p>
                  </div>
                  <Switch id="weekly-digest" defaultChecked={notificationSettings.weeklyDigest} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="two-factor" defaultChecked={securitySettings.twoFactorEnabled} />
                    <Button variant="outline" size="sm">
                      {securitySettings.twoFactorEnabled ? 'Manage' : 'Enable'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="login-notifications">Login Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                  </div>
                  <Switch id="login-notifications" defaultChecked={securitySettings.loginNotifications} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select defaultValue={securitySettings.sessionTimeout}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 hour">1 Hour</SelectItem>
                        <SelectItem value="8 hours">8 Hours</SelectItem>
                        <SelectItem value="24 hours">24 Hours</SelectItem>
                        <SelectItem value="7 days">7 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="password-last-changed">Password Last Changed</Label>
                    <Input id="password-last-changed" value={securitySettings.passwordLastChanged} disabled />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Active Sessions</Label>
                    <p className="text-sm text-gray-600">{securitySettings.activeSessions} active sessions</p>
                  </div>
                  <Button variant="outline">Manage Sessions</Button>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Change Password</Button>
                <Button>Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span>{billingSettings.paymentMethod}</span>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input id="street" defaultValue={billingSettings.billingAddress.street} />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue={billingSettings.billingAddress.city} />
                  </div>
                  <div>
                    <Label htmlFor="province">Province</Label>
                    <Input id="province" defaultValue={billingSettings.billingAddress.province} />
                  </div>
                  <div>
                    <Label htmlFor="postal-code">Postal Code</Label>
                    <Input id="postal-code" defaultValue={billingSettings.billingAddress.postalCode} />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="tax-id">Tax ID</Label>
                  <Input id="tax-id" defaultValue={billingSettings.taxId} />
                </div>
                
                <div>
                  <Label htmlFor="invoice-delivery">Invoice Delivery</Label>
                  <Select defaultValue={billingSettings.invoiceDelivery}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="mail">Physical Mail</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Billing Information</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}