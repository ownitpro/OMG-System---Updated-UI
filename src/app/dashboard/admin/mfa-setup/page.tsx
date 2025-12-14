"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ShieldCheckIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function MFASetupPage() {
  const { data: session } = useSession();
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const [mfaCode, setMfaCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  // Mock MFA setup data - in real app, fetch from API
  const mfaSetup = {
    secret: 'JBSWY3DPEHPK3PXP',
    qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    backupCodes: [
      'ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345',
      'PQR678', 'STU901', 'VWX234', 'YZA567', 'BCD890'
    ]
  };

  const handleSetupMFA = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // In real app, call API to setup MFA
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBackupCodes(mfaSetup.backupCodes);
      setStep('verify');
    } catch (error) {
      setError('Failed to setup MFA. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyMFA = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // In real app, verify MFA code with backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('complete');
    } catch (error) {
      setError('Invalid MFA code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mfa-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (step === 'setup') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Setup Multi-Factor Authentication</h1>
          <p className="mt-2 text-gray-600">
            Add an extra layer of security to your admin account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step 1: Install Authenticator App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Download and install an authenticator app on your mobile device:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">G</span>
                </div>
                <div>
                  <div className="font-medium">Google Authenticator</div>
                  <div className="text-sm text-gray-600">iOS & Android</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">A</span>
                </div>
                <div>
                  <div className="font-medium">Authy</div>
                  <div className="text-sm text-gray-600">iOS & Android</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Scan QR Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                <img 
                  src={mfaSetup.qrCodeUrl} 
                  alt="MFA QR Code" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Scan this QR code with your authenticator app
              </p>
            </div>
            <div className="text-center">
              <Button onClick={handleSetupMFA} disabled={isLoading}>
                {isLoading ? 'Setting up...' : 'Continue to Verification'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Verify MFA Setup</h1>
          <p className="mt-2 text-gray-600">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step 3: Verify Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyMFA} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div>
                <Label htmlFor="mfa-code">MFA Code</Label>
                <Input
                  id="mfa-code"
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify & Complete Setup'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup Codes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Save these backup codes in a secure location. 
                You can use them to access your account if you lose your authenticator device.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, index) => (
                <div key={index} className="p-2 bg-gray-100 rounded text-center font-mono text-sm">
                  {code}
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleDownloadBackupCodes}>
                Download Codes
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                Print Codes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">MFA Setup Complete!</h1>
          <p className="mt-2 text-gray-600">
            Your account is now protected with multi-factor authentication
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircleIcon className="mr-1 h-3 w-3" />
                MFA Enabled
              </Badge>
              <p className="text-sm text-gray-600">
                You'll now be required to enter a code from your authenticator app 
                when signing in to your admin account.
              </p>
              <Button asChild>
                <a href="/dashboard/admin">Go to Admin Dashboard</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
