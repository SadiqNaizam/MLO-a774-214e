import React, { useState } from 'react';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useNavigate } from 'react-router-dom'; // useParams can be used later for token
import { AlertCircle, CheckCircle } from 'lucide-react';

const PasswordResetConfirmPage = () => {
  // In a real app, you'd get a token from URL params: const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('PasswordResetConfirmPage loaded');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);
    setLoading(true);

    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match.');
      setIsError(true);
      setLoading(false);
      return;
    }
    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      setIsError(true);
      setLoading(false);
      return;
    }

    console.log('Password reset confirmation attempt');
    // Simulate API call with token and new password
    setTimeout(() => {
      setMessage('Your password has been successfully reset. You can now sign in with your new password.');
      setIsError(false);
      setLoading(false);
      // Optionally redirect after a delay:
      // setTimeout(() => navigate('/login'), 3000);
    }, 1500);
  };
  
  const footerContent = (
    <div className="text-sm text-center w-full">
      {message && !isError && (
         <Link to="/login">
            <Button variant="link" className="px-0">Proceed to Sign In</Button>
         </Link>
      )}
    </div>
  );


  return (
    <AuthFormWrapper title="Set New Password" footerContent={footerContent}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <Alert variant={isError ? "destructive" : "default"} className={isError ? "" : "bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400"}>
            {isError ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertTitle>{isError ? 'Error' : 'Success'}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={loading || (!!message && !isError)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-new-password">Confirm New Password</Label>
          <Input
            id="confirm-new-password"
            type="password"
            placeholder="Confirm your new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            disabled={loading || (!!message && !isError)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading || (!!message && !isError)}>
          {loading ? 'Updating Password...' : 'Update Password'}
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export default PasswordResetConfirmPage;