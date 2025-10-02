import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2, Linkedin, Chrome } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';

interface SignUpScreenProps {
  onSignUpSuccess: () => void;
  onNavigateToLogin: () => void;
}

export function SignUpScreen({ onSignUpSuccess, onNavigateToLogin }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Contains uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'Contains number', test: (pwd: string) => /\d/.test(pwd) }
  ];

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.length < 2) return 'First name must be at least 2 characters';
        return '';
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.length < 2) return 'Last name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
        if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter';
        if (!/\d/.test(value)) return 'Password must contain a number';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleFieldBlur = (field: string) => {
    const error = validateField(field, formData[field as keyof typeof formData]);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });

    if (!agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if email already exists (demo logic)
      if (formData.email === 'demo@arkan.com') {
        setError('This email is already registered. Please sign in instead.');
        setIsLoading(false);
        return;
      }

      // Success - store user data
      localStorage.setItem('arkan_user_email', formData.email);
      localStorage.setItem('arkan_user_name', `${formData.firstName} ${formData.lastName}`);
      
      onSignUpSuccess();
    } catch (err) {
      setError('An error occurred during sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'linkedin') => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate social sign up
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('arkan_user_email', `${provider}@example.com`);
      localStorage.setItem('arkan_user_name', `${provider} User`);
      onSignUpSuccess();
    } catch (err) {
      setError(`Failed to sign up with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 glass-content overflow-y-auto">
      <div className="w-full max-w-md space-y-6 py-8">
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
          <h1 className="text-arkan-primary dark:text-white">Create Your Account</h1>
          <p className="text-muted-foreground">
            Join the accessible communication community
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="glass-card p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="glass">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    onBlur={() => handleFieldBlur('firstName')}
                    className={`pl-10 glass ${errors.firstName ? 'border-destructive' : ''}`}
                    disabled={isLoading}
                    autoComplete="given-name"
                    aria-invalid={!!errors.firstName}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-destructive">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                  onBlur={() => handleFieldBlur('lastName')}
                  className={`glass ${errors.lastName ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  className={`pl-10 glass ${errors.email ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  onBlur={() => handleFieldBlur('password')}
                  className={`pl-10 pr-10 glass ${errors.password ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="space-y-1 mt-2">
                  {passwordRequirements.map((req, index) => {
                    const isValid = req.test(formData.password);
                    return (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 
                          className={`h-3 w-3 ${isValid ? 'text-green-500' : 'text-muted-foreground'}`}
                        />
                        <span className={isValid ? 'text-green-500' : 'text-muted-foreground'}>
                          {req.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                  onBlur={() => handleFieldBlur('confirmPassword')}
                  className={`pl-10 pr-10 glass ${errors.confirmPassword ? 'border-destructive' : ''}`}
                  disabled={isLoading}
                  autoComplete="new-password"
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                disabled={isLoading}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                I agree to Arkan Infinity's{' '}
                <a href="#" className="text-arkan-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-arkan-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Info Note */}
            <div className="glass-card p-3 bg-blue-500/5">
              <p className="text-sm text-center text-muted-foreground">
                After creating your account, we'll help you set up your profile and accessibility preferences
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-arkan-primary hover:bg-arkan-secondary"
              disabled={isLoading || !agreeToTerms}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignUp('google')}
              disabled={isLoading}
              className="glass"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignUp('linkedin')}
              disabled={isLoading}
              className="glass"
            >
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </Button>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-arkan-primary hover:underline"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
