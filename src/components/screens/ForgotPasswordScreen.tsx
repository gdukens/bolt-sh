import React, { useState } from 'react';
import { Mail, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

export function ForgotPasswordScreen({ onBackToLogin }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) validateEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Demo: Always successful
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 glass-content">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to login</span>
        </button>

        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <circle cx="100" cy="100" r="90" fill="#183543" />
              <path
                d="M70 130 L100 70 L130 130 M80 110 L120 110"
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-arkan-primary dark:text-white">Reset Password</h1>
          <p className="text-muted-foreground">
            {isSuccess
              ? "We've sent you reset instructions"
              : 'Enter your email to receive reset instructions'}
          </p>
        </div>

        {/* Form or Success Message */}
        <div className="glass-card p-6 space-y-4">
          {isSuccess ? (
            <>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-arkan-primary dark:text-white">Check Your Email</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent password reset instructions to{' '}
                    <strong className="text-foreground">{email}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please check your inbox and follow the link to reset your password.
                  </p>
                </div>
              </div>

              <div className="glass p-3 rounded-lg border border-border space-y-2">
                <p className="text-xs text-muted-foreground">
                  <strong>Didn't receive the email?</strong>
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                  <li>• Check your spam or junk folder</li>
                  <li>• Make sure you entered the correct email</li>
                  <li>• Wait a few minutes and try again</li>
                </ul>
              </div>

              <Button
                onClick={onBackToLogin}
                className="w-full bg-arkan-primary hover:bg-arkan-secondary"
              >
                Back to Login
              </Button>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                className="w-full text-sm text-arkan-primary hover:underline"
              >
                Try a different email
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="glass">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => validateEmail(email)}
                    className={`pl-10 glass ${emailError ? 'border-destructive' : ''}`}
                    disabled={isLoading}
                    autoComplete="email"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    autoFocus
                  />
                </div>
                {emailError && (
                  <p id="email-error" className="text-sm text-destructive">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Info Message */}
              <div className="glass p-3 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground">
                  We'll send you an email with instructions to reset your password. 
                  The link will be valid for 1 hour.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-arkan-primary hover:bg-arkan-secondary"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
