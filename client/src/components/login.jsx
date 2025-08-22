import axios from 'axios'
import { useState } from 'react'

export default function Login({ onLogin }){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      const formData = new FormData(e.target);

      try {
        const response = await axios.post('/auth/login', {
          email: formData.get('email'),
          password: formData.get('password')
        });

        localStorage.setItem('token', response.data.token);
        console.log('login successful');
        onLogin();
      } catch(err){
        setError('Login Failed');
      } finally {
        setLoading(false);
      }
    }

    const handleSignUp = async (e) => {
      e.preventDefault();
      setError('');

      const formData = new FormData(e.target);

      try {
        const response = await axios.post('/auth/register', {
          email: formData.get('email'),
          password: formData.get('password')
        });
        console.log('sign up successful')
      } catch(err) {
        setError('Login Failed');
      }
    }

  





    return(
       <div className="w-85 h-100 rounded-xl border-2 border-white/10 mb-20 text-white p-5 bg-white/5 backdrop-blur-none flex flex-col justify-around">
        <div className="flex justify-between">
          <div className="font-bold">Login to your account</div>
          {error && <div className="text-red-400">{error}</div>}
        </div>
        <form onSubmit={handleLogin}>
          <div className="w-full flex flex-col">
            <label className="pb-1">Email</label>
            <input
                className="w-full h-5 mb-3 rounded-xl border-2 border-white/10 text-white p-5 bg-white/5 backdrop-blur-none focus:ring-2 shadow-gray-300 focus:outline-hidden transition-shadow duration-200 ease-in-out"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
            />
          </div>
          <div className="w-full flex flex-col mb-6">
            <label className="pb-1">Password</label>
            <input 
                className="w-full h-5 rounded-xl border-2 border-white/10 text-white p-5 bg-white/5 backdrop-blur-none focus:ring-2 shadow-gray-300 focus:outline-hidden transition-shadow duration-200 ease-in-out"
                id="password" 
                type="password" 
                required
             />
          </div>
          <div>

            <button 
            type="submit" 
            className="cursor-pointer w-full h-5 rounded-xl border-2 mb-3 border-white/10 text-black p-5 hover:bg-white/85 bg-white transition-colors duration-200 backdrop-blur-none flex justify-center items-center"
            >
              Login
            </button>

            <button 
            type="button" 
            onClick={handleSignUp} 
            className="cursor-pointer w-full h-5 rounded-xl border-2 border-white/10 text-white p-5 bg-white/5 backdrop-blur-none flex justify-center items-center hover:bg-white/10 transition-colors duration-200"
            >
              Sign In
            </button>

          </div>
        </form>
        <div>

        </div>
      </div>
    );
} 