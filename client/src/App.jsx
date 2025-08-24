import Login from "./components/login"
import { useState, useEffect } from "react"



function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkAuthStatus();
  }, [])

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
  }

  return (
    <div className="flex justify-center items-center min-w-full h-full">
      <Login />
    </div>
  )
}

export default App
