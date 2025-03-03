"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthGuard } from "@/hooks/useAuth";

export default function Home() {
  useAuthGuard(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-20 gap-10">
        {/* Left Content */}
        <Card className="max-w-xl p-6 shadow-lg">
          <CardContent>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Create. Assess. Improve.
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              The Fastest Way to Test & Learn!
            </p>
            <Link href="/sign-up">
              <Button className="mt-6 w-full md:w-auto px-6 py-3 text-lg">
                Sign Up
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Right Illustration */}
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          <Image
            src="/hero-img.png"
            alt="Illustration"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}
