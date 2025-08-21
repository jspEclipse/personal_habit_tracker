export default function Login(){
    function Login() {

    }



    return(
       <div className="w-85 h-100 rounded-xl border-2 border-white/10 mb-20 text-white p-5 bg-white/5 backdrop-blur-none flex flex-col justify-around">
        <div className>
          <div className="font-bold">Login to your account</div>
        </div>
        <form>
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
          <div className="w-full flex flex-col">
            <label className="pb-1">Password</label>
            <input 
                className="w-full h-5 rounded-xl border-2 border-white/10 text-white p-5 bg-white/5 backdrop-blur-none focus:ring-2 shadow-gray-300 focus:outline-hidden transition-shadow duration-200 ease-in-out"
                id="password" 
                type="password" 
                required />
          </div>
        </form>
        <div>
          <button className="cursor-pointer w-full h-5 rounded-xl border-2 mb-3 border-white/10 text-black p-5 hover:bg-white/85 bg-white transition-colors duration-200 backdrop-blur-none flex justify-center items-center">Login</button>
          <button className="cursor-pointer w-full h-5 rounded-xl border-2 border-white/10 text-white p-5 bg-white/5 backdrop-blur-none flex justify-center items-center hover:bg-white/10 transition-colors duration-200">Sign In</button>
        </div>
      </div>
    );
} 