import "./login.css";
import Icon from "../../icon/icon.jsx";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";
import { useState } from "react";
import { toast } from "react-toastify";
import Msg from "../utilis/msg.jsx";
import GoogleLogin from "./google.jsx";

const Login = () => {
  const { login, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      toast(<Msg msg={"All feilds are required!"} />);

      return;
    }
    await login({email, password});
  };

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
          <p>Login to Notrious to continue to Notrious</p>

          <GoogleLogin/>

          <div className="au-seperator">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <label className="au-label">Email</label>
          <input
            required
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={e => {
              setEmail(e.target.value);
            }}
          />

          <div className="au-label-wrapper">
            <label className="au-label">Password</label>
            <Link to="/resetpassword">Forgot password?</Link>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            required
            onChange={e => {
              setPassword(e.target.value);
            }}
          />

          <button className="au-sendbtn" onClick={handleSubmit}>
            {loading ? <span className="spinner"></span> : <span>Log In</span>}
          </button>

          <div className="au-link">
            <span>Don&apos;t have an account?</span>
            <Link to="/signup">Sign Up</Link>
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

export default Login;
