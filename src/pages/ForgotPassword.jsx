import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '../assets/svg/ArrowRightIcon';
import { notify, warn } from '../utils/alerts';
import { sendPasswordResetEmail } from 'firebase/auth/web-extension';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      notify('Password Reset Email Sent');
    } catch (error) {
      console.log(error);
      warn('Could Not Send Reset Email');
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <input
            className="emailInput"
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleChange}
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
