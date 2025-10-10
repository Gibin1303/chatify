import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedComponent from "../components/BorderAnimatedComponent";
import {  LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { LoaderIcon } from "react-hot-toast";
import {Link} from "react-router"

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSignInUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData)
  };
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl h-[650px] md-h:[800px]">
        <BorderAnimatedComponent>
          <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8  flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4"></MessageCircleIcon>
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for new account</p>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* fullName */}

                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="john doe"
                      />
                    </div>
                  </div>

                  {/* email */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* password */}

                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                  <button className="auth-btn" type="submit" disabled={isSignInUp}>{isSignInUp?<LoaderIcon className="w-5 h-5 animate-spin mx-auto"/>: "Sign Up"}</button>
                </form>
                <div className="mt-6 text-center">
                <Link to="/login" className="auth-link">Already have an account? Sign In</Link>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="hidden md:w-1/2  md:flex items-center justify-center p-6 bg-gradiant-to-bl from-slate-800/20 to-transparent">
                <div>
                  <img src="/signUp.jpg" alt="signup image" className="w-full h-auto object-contain" />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>
                    <div className="mt-4 flex justify-center gap-4">
                      <span className="auth-badge">Free</span>
                      <span className="auth-badge">Easy Setup</span>
                      <span className="auth-badge">Private</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </BorderAnimatedComponent>
      </div>
    </div>
  );
};

export default SignUp;
