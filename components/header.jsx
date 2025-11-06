import React from "react";
import { Button } from "./ui/button";
import { Heart, CarFront, Layout, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";

const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser();
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-white/20 shadow-lg">
      <nav className="mx-auto px-6 py-2 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"} className="flex">
          <Image
            src={"/logoo.png"}
            alt="CAR THULE.COM"
            width={200}
            height={60}
            className="h-16 w-auto object-contain"
          />
          {isAdminPage && (
            <span className="text-xs font-extralight">admin</span>
          )}
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <>
              <Link href="/">
                <button className="modern-button flex items-center gap-2">
                  <ArrowLeft size={18} />
                  <span>Back to App</span>
                </button>
              </Link>
            </>
          ) : (
            <SignedIn>
              {!isAdmin && (
                <Link
                  href="/reservations"
                  className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full px-6 py-2 transition-all duration-300 flex items-center gap-2">
                    <CarFront size={18} />
                    <span className="hidden md:inline">My Reservations</span>
                  </button>
                </Link>
              )}
              <a href="/saved-cars">
                <button className="modern-button flex items-center gap-2">
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </button>
              </a>
              {isAdmin && (
                <Link href="/admin">
                  <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full px-6 py-2 transition-all duration-300 flex items-center gap-2">
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            {!isAdminPage && (
              <SignInButton fallbackRedirectUrl="/">
                <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full px-8 py-2 border-2 border-gray-200 hover:border-[#ffc107] transition-all duration-300">
                  Login
                </button>
              </SignInButton>
            )}
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
