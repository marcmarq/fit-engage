import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData, isLoggedin } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If the user is already logged in, redirect to dashboard
  React.useEffect(() => {
    if (isLoggedin) {
      navigate("/dashboard");
    }
  }, [isLoggedin, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true } // Ensures cookies are sent with the request
      );

      if (data.success) {
        setIsLoggedin(true);
        await getUserData(); // Get user data after successful login
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-white to-red-400">
      <img
        onClick={() => navigate("/")}
        src={assets.kiloKulture_Logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-[#D2122E] p-10 rounded-lg shadow-lg w-full sm:w-96 text-white text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">Login</h2>
        <p className="text-center text-sm mb-6">Login to your account!</p>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#fd5c63]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#fd5c63]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-[#FBCEB1] cursor-pointer"
          >
            Forgot password?
          </p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-red-300 to bg-red-600 text-white font-medium">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

