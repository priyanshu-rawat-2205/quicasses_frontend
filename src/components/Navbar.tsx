import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 md:px-16 lg:px-24 py-4">
        <Link href={'/'}>
            <h2 className="text-4xl font-bold">Quicassess</h2>
        </Link>
        <div>
            <Link href={"/login"}>
            <button className="px-4 py-2 text-blue-600 font-semibold hover:underline">
                Log in
            </button>
            </Link>

            <Link href={'/sign-up'}>
            <button className="ml-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Sign up
            </button>
            </Link>
        </div>
    </nav>
  );
}
