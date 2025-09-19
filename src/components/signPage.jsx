import React, { useState } from "react";
import { Button } from "./ui/button";
import { User, Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SignPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Handle Sign Up
      const { error } = await signUp(email, password);
      if (error) return alert(error.message);

      alert("Account created! Please sign in.");
      setIsSignUp(false);
      setEmail("");
      setPassword("");
    } else {
      // Handle Sign In
      const { data, error } = await signIn(email, password);

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          return alert("⚠️ No account found. Please sign up first!");
        }
        return alert("⚠️ Sign-in error: " + error.message);
      }

      if (!data?.user) {
        return alert(
          "⚠️ Sign-in failed. User not found or email not confirmed."
        );
      }

      // ✅ redirect to external page after successful sign in
      window.location.href = "https://manasa-mitra.lovable.app/";
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="bg-card p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2 border rounded-lg px-3 py-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none flex-1 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center space-x-2 border rounded-lg px-3 py-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none flex-1 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Button className="w-full mt-2" type="submit">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignPage;
