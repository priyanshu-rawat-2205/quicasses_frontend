'use client'

import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email:"",
        username:"",
        password:""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const response =  await fetch('http://127.0.0.1:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await response.json()

            if(!response.ok){
                throw new Error(result.msg || 'Registration Failed')
            }

            setSuccess('Registration Successful')
            setFormData({email:"", username:"", password:""})
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
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
                type="submit"
                className="w-full mt-4 bg-yellow-500 text-white font-semibold py-2 rounded-md shadow-md hover:bg-yellow-600"
                disabled={loading}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
}

export default RegisterPage