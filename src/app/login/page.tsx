'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthGuard } from "@/hooks/useAuth";

const LoginPage = () => {
    useAuthGuard(false)
    const [formData, setFormData] = useState({
        email:"",
        password:""
      })
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const response =  await fetch('http://127.0.0.1:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()
            
            if(!response.ok){
              throw new Error(result.msg || 'Login Failed')
            }

            const token = result.access_token
            localStorage.setItem('token', token)

            setSuccess('Login Successful')
            setFormData({email:"", password:""})
            router.push('/dashboard/admin')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        {/* Logo */}

        <Link href={"/"}>
          <h1 className="absolute top-6 left-8 text-4xl font-bold">
            Quicassess
          </h1>
        </Link>

        {/* Registration Form */}
        <div className="bg-gray-100 rounded-lg p-8 shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-yellow-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-yellow-600"
              disabled={loading}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
}

export default LoginPage