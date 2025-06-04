import React, { useState } from 'react';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle } from 'lucide-react';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('RegistrationPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);
    setLoading(true);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      setLoading(false);
      return;
    }

    console.log('Registration attempt:', { email });
    // Simulate API call
    setTimeout(() => {
      // Assume registration is successful
      setMessage('Registration successful! You can now sign in.');
      setIsError(false);
      setLoading(false);
      // navigate('/login'); // Optionally navigate to login after a delay
    }, 1500);
  };

  const footerContent = (
    <div className="text-sm text-center w-full">
      <p>
        Already have an account?{' '}
        <Link to="/login">
          <Button variant="link" className="px-1">Sign In</Button>
        </Link>
      </p>
    </div>
  );

  return (
    <AuthFormWrapper title="Create an Account" footerContent={footerContent}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <Alert variant={isError ? "destructive" : "default"} className={isError ? "" : "bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400"}>
            {isError ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertTitle>{isError ? 'Registration Failed' : 'Success'}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export default RegistrationPage;