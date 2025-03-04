// 'use client'

// import Link from "next/link";
// import { useState } from "react";
// import { useAuthGuard } from "@/hooks/useAuth"

// const RegisterPage = () => {
//     useAuthGuard(false)
//     const [formData, setFormData] = useState({
//       email:"",
//       username:"",
//       password:""
//     })

//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')
//     const [success, setSuccess] = useState('')

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({...formData, [e.target.name]: e.target.value})
//     }

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         setLoading(true)
//         setError('')
//         setSuccess('')

//         try {
//             const response =  await fetch('http://127.0.0.1:5000/api/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             })

//             const result = await response.json()

//             if(response.status != 201){
//                 throw new Error(result.msg || 'Registration Failed')
//             }

//             setSuccess('Registration Successful')
//             setFormData({email:"", username:"", password:""})
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (err: any) {
//             setError(err.message)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         {/* Logo */}
//         <Link href={"/"}>
//           <h1 className="absolute top-6 left-8 text-4xl font-bold">
//             Quicassess
//           </h1>
//         </Link>

//         {/* Registration Form */}
//         <div className="bg-gray-100 rounded-lg p-8 shadow-lg w-96">
//           <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {success && <p className="text-green-500 text-center">{success}</p>}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
//                 placeholder="Choose a username"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <button
//                 type="submit"
//                 className="w-full mt-4 bg-yellow-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-yellow-600"
//                 disabled={loading}
//             >
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     );
// }

// export default RegisterPage



"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthGuard } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { API_URL } from "@/shared/api";

const RegisterPage = () => {
  useAuthGuard(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status !== 201) {
        throw new Error(result.msg || "Registration Failed");
      }

      setSuccess("Registration Successful");
      setFormData({ email: "", username: "", password: "" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link href="/">
        <h1 className="absolute top-6 left-8 text-4xl font-bold text-primary">
          Quicassess
        </h1>
      </Link>
      <Card className="w-[400px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
