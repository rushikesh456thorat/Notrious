import { Link } from "react-router-dom";
import Icon from "../../icon/icon";
import "./login.css";
const ResetPassword = () => {
  return (
    <>
      <div className="au-wrapper reset-pass">
        <div className="au-reset-password">
          <Link to='/login' className="au-back-btn">
            <Icon  icon='arrowleft'/>
          </Link>
          <div className="au-title">
            <img
              src="/notrious.jpg"
              className="au-logo"
              alt="Notrious Logo"
            />
            <span className="au-des">Notrious</span>
          </div>
          <div className="au-main">
            <h3>Forgot Your Password?</h3>
            <p>
              Fill out your email address below and we&apos;ll email you a
              password reset link if the email is in our system.
            </p>
            <label className="au-label">Email</label>
            <input type="email" placeholder="Enter your email" name="email" />
            <button className="au-sendbtn">Send Reset Link</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
