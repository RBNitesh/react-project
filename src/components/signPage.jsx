// src/components/SignPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";

const SignPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, signIn, signInWithProvider } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const result = await signUp(email, password, { name, age, gender });
        if (result?.error) {
          alert(result.error.message);
          setLoading(false);
          return;
        }
        setIsSignUp(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
      } else {
        const { data, error } = await signIn(email, password);
        if (error) {
          alert(error.message);
          setLoading(false);
          return;
        }
        if (data?.user) {
          window.location.href = "https://sahayta-hub.lovable.app/";
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  const handleSocial = async (provider) => {
    try {
      await signInWithProvider(provider);
    } catch (err) {
      console.error(err);
      alert("Social login failed.");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
    press: { scale: 0.995 },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3')",
      }}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="enter"
        whileTap="press"
        className="w-full max-w-md mt-7" // <-- moved 8px down
      >
        {/* Light-blue glass card */}
        <div className="bg-blue-100/70 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-200 px-8 py-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          {/* --- ADD: Social login buttons above the form --- */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 bg-white/50 border-blue-200 hover:bg-white"
              onClick={() => handleSocial("google")}
            >
              <FcGoogle className="w-5 h-5" />
              Google
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 bg-white/50 border-blue-200 hover:bg-white text-blue-700"
              onClick={() => handleSocial("facebook")}
            >
              <FaFacebook className="w-5 h-5" />
              Facebook
            </Button>
          </div>
          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-blue-200/50" />
            <div className="text-xs text-gray-700">or continue with</div>
            <div className="flex-1 h-px bg-blue-200/50" />
          </div>
          {/* --- END ADD --- */}
          {/* Original form stays completely intact */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <div className="flex items-center gap-3 border border-blue-200 rounded-lg px-3 py-2 bg-white/50">
                  <User className="w-5 h-5 text-gray-400" />
                  <input
                    className="flex-1 outline-none text-gray-800 bg-transparent"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center gap-3 border border-blue-200 rounded-lg px-3 py-2 bg-white/50">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  className="flex-1 outline-none text-gray-800 bg-transparent"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center gap-3 border border-blue-200 rounded-lg px-3 py-2 bg-white/50">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  className="flex-1 outline-none text-gray-800 bg-transparent"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="p-1 rounded"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min={16}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-white/50 outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-white/50 outline-none text-gray-800"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            <div className="pt-2">
              <Button
                className="w-full py-3 font-semibold"
                type="submit"
                disabled={loading}
              >
                {isSignUp
                  ? loading
                    ? "Creating account..."
                    : "Create account"
                  : loading
                  ? "Signing in..."
                  : "Sign in"}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-gray-700">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-700 font-semibold underline ml-1"
            >
              {isSignUp ? "Sign in" : "Create one"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignPage;
