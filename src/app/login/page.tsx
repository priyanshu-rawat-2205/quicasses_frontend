import Link from "next/link";

const LoginPage = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        {/* Logo */}

        <Link href={'/'} >
          <h1 className="absolute top-6 left-8 text-4xl font-bold">
            Quicassess
          </h1>
        </Link>

        {/* Registration Form */}
        <div className="bg-gray-100 rounded-lg p-8 shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-yellow-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-yellow-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
}

export default LoginPage