import { useState } from "react"
import hello from '../assets/hand_18407001.svg'
import { Link } from "react-router-dom"
import login from '../assets/login.webp'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("User Registered", { email, password})
    }
  return (
    <div className="flex">
        <div className="w-full md:w-1/2 flex  flex-col justify-center items-center p-8 md:p-12">
        <form className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-6">
                <h2 className="text-xl font-medium">
                    Urban Vogue
                </h2>
               
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">

            <h2 className="text-xl font-bold text-center">Hey there! </h2><img src={hello} alt="hello hand" className="max-w-10 p-0" />
            </div>
            <p className="text-center mb-6">Enter your username and password to Login.</p>
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter your email address" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter your password" />
            </div>
            <button type="submit" className="w-full bg-black text-white rounded-lg p-2 font-semibold hover:bg-gray-800 transition">Login</button>
            <p className="mt-6 text-center text-sm">Don't have an account? {" "} <Link to="/register" className="text-blue-500 text-sm">Register</Link></p>
          
        </form>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
            <img src={login} alt="Login Account" className="h-[750px] w-full object-cover" />
        </div>
        </div>
    </div>
  )
}

export default Login