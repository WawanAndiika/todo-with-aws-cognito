'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Loader, ArrowRight } from 'react-feather';

import { Button } from '../ui/button';
import { errorHandler } from '@/lib/error';

const SignButton = () => {
  const callbackUrl = process.env.NEXT_PUBLIC_SIGN_CALLBACK_URL;

  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('cognito', {
        callbackUrl: "/dashboard"
      });
    } catch (error) {
      errorHandler("Sign-in failed", error);
      setIsLoading(false);
    }
  };

  const handleDashboardRedirect = () => {
    window.location.href = '/dashboard';
  };

  return (
    <Button onClick={session ? handleDashboardRedirect : handleSignIn} disabled={isLoading || status === "loading"}>
      {(isLoading || status === "loading") && <Loader className="animate-spin mr-2" />}
      {session ? (
        <>
          Hi {session.user?.email}, Go to dashboard <ArrowRight/>
        </>
      ) : (
        'Sign in with Cognito'
      )}
    </Button>
  );
};

export default SignButton;
