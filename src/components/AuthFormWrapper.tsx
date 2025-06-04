import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface AuthFormWrapperProps {
  title: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode; // For links like "Forgot password?", "Sign up"
  className?: string;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  title,
  children,
  footerContent,
  className = "w-full max-w-md", // Default width, can be overridden
}) => {
  console.log("Rendering AuthFormWrapper with title:", title);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
        {footerContent && (
          <CardFooter className="flex flex-col items-center space-y-2 pt-4">
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthFormWrapper;