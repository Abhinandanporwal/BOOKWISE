import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button'; // Make sure this is your actual Button component path

const Header = () => {
  return (
    <div className="bg-gray-950">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="Bookwise logo" width={100} height={75} />
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton forceRedirectUrl="/chat">
              <Button variant="outline">Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="default">Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: { avatarBox: 'w-10 h-10' },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;
