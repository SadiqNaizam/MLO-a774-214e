import React, { useState } from 'react';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('LoginPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log('Login attempt:', { email, password, rememberMe });

    // Simulate API call
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password123') {
        console.log('Login successful');
        navigate('/dashboard'); // Navigate to dashboard on success
      } else {
        setError('Invalid email or password. Please try again.');
        console.error('Login failed');
      }
      setLoading(false);
    }, 1000);
  };

  const footerContent = (
    <div className="text-sm text-center w-full">
      <Link to="/forgot-password">
        <Button variant="link" className="px-0">Forgot Password?</Button>
      </Link>
      <p className="mt-2">
        Don't have an account?{' '}
        <Link to="/register">
          <Button variant="link" className="px-1">Sign Up</Button>
        </Link>
      </p>
    </div>
  );

  return (
    <AuthFormWrapper title="Sign In to Your Account" footerContent={footerContent}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              disabled={loading}
            />
            <Label htmlFor="remember-me" className="font-normal">Remember me</Label>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export default LoginPage;