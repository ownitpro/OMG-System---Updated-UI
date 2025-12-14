"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log('[LOGIN] SignIn result:', result);

      if (result?.error) {
        console.log('[LOGIN] Error:', result.error);
        if (result.error === "MFA_REQUIRED") {
          setShowMfa(true);
        } else {
          setError(result.error === "CredentialsSignin" ? "Invalid email or password" : result.error);
        }
      } else if (result?.ok) {
        console.log('[LOGIN] SignIn successful, getting session...');
        // Get session to determine redirect
        const session = await getSession();
        console.log('[LOGIN] Session:', session);
        if (session?.user) {
          const userRole = (session.user as any).role;
          console.log('[LOGIN] User role:', userRole);
          if (userRole === "ADMIN" || userRole === "STAFF") {
            router.push("/dashboard/admin");
          } else {
            router.push("/dashboard/client");
          }
        } else {
          console.log('[LOGIN] No session found');
          setError("Session not created. Please try again.");
        }
      } else {
        console.log('[LOGIN] Unexpected result:', result);
        setError("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error('[LOGIN] Exception:', error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        mfaCode,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid MFA code");
      } else if (result?.ok) {
        // Get session to determine redirect
        const session = await getSession();
        if (session?.user) {
          const userRole = (session.user as any).role;
          if (userRole === "ADMIN" || userRole === "STAFF") {
            router.push("/dashboard/admin");
          } else {
            router.push("/dashboard/client");
          }
        } else {
          setError("Session not created. Please try again.");
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your dashboard and manage your automations
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {showMfa ? "Enter MFA Code" : "Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {showMfa ? (
              <form onSubmit={handleMfaSubmit} className="space-y-4">
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
                  {isLoading ? "Verifying..." : "Verify MFA Code"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowMfa(false)}
                >
                  Back to Login
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}