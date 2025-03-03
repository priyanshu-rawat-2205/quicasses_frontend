import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 md:px-16 lg:px-24 py-4 bg-white shadow-sm sticky top-0 z-50">
      <Link href="/">
        <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          Quicassess
        </h2>
      </Link>
      <div className="flex gap-4">
        <Link href="/login">
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            Log in
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Sign up
          </Button>
        </Link>
      </div>
    </nav>
  );
}
