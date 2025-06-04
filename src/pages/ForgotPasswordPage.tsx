import React, { useState } from 'react';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  console.log('ForgotPasswordPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    console.log('Forgot password attempt for email:', email);

    // Simulate API call
    setTimeout(() => {
      setMessage(`If an account exists for ${email}, a password reset link has been sent.`);
      setLoading(false);
    }, 1500);
  };

  const footerContent = (
    <div className="text-sm text-center w-full">
      <Link to="/login">
        <Button variant="link" className="px-0">Back to Sign In</Button>
      </Link>
    </div>
  );

  return (
    <AuthFormWrapper title="Reset Your Password" footerContent={footerContent}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <Alert variant="default" className="bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Check Your Email</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading || !!message} // Disable if message is shown
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading || !!message}>
          {loading ? 'Sending Link...' : 'Send Reset Link'}
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export default ForgotPasswordPage;