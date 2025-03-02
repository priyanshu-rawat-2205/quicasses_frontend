'use client'

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/useAuth";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function Home() {
  useAuthGuard(false);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-16">
        {/* Left Content */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Create. Assess. Improve.
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            The Fastest Way to Test & Learn!
          </p>
          <Link href={'/sign-up'}>
            <div className="mt-6">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                Sign up
              </button>
            </div>
          </Link>
        </div>

        {/* Right Illustration */}
        <div className="mt-10 md:mt-0">
          <Image
            src="/hero-img.png"
            alt="Illustration"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
