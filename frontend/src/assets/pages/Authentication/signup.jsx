import "./login.css";
import Icon from "../../icon/icon.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useSignUp from "../../hooks/useSignUp.js";
import { useState } from "react";
import GoogleLogin from "./google.jsx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {signup,loading} = useSignUp();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    await signup({email,password,confirmPassword})
  }

  return (
    <div className="au-wrapper">
      <div className="au-left">
        <div className="au-title">
          <img
            src="/notrious.jpg"
            className="au-logo"
            alt="Notrious Logo"
          />
          <span className="au-des">Notrious</span>
        </div>

        <div className="au-main">
          <h3>Welcome!</h3>
          <p>Sign up to Notrious and access unlimited templets</p>

          <GoogleLogin/>

          <div className="au-seperator">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <label className="au-label">Email</label>
          <input type="email" placeholder="Enter your email" name="email"  onChange={(e)=>setEmail(e.target.value)}/>


          <div className="au-label-wrapper">
            <label className="au-label">Password</label>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}

          />
          <div className="au-label-wrapper">
            <label className="au-label">Confirm Password</label>
          </div>
          <input
            type="password"
            placeholder="Enter password to confirm"
            name="password"
            onChange={(e)=>setConfirmPassword(e.target.value)}

          />
           <button className="au-sendbtn" onClick={handleSubmit}>
            {loading ? <span className="spinner"></span> : <span>Sign Up</span>}
          </button>

          

          <div className="au-link">
            <span>Already have an account?</span>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>

      <div className="au-right">
        <p className="gradient-text">
          40K+ Store Owners Use Our AI.
          <br />
          Powering Millions of Beautiful, AI-Built Pages.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
