import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowRightIcon from '../assets/svg/ArrowRightIcon';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { signInUser } from '../services/user-service';
import { toast } from 'react-toastify';
import { warn, notify } from '../utils/alerts';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const userCredential = await signInUser(formData);
      const user = userCredential.user;

      if (user) {
        notify('Your are Logged In!');
        navigate('/');
      }
    } catch (error) {
      warn('Bad Credentials!');
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            className="emailInput"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="passwordInput"
              placeholder="Password"
              value={formData.password}
              onChange={onChange}
            />
            <img
              onClick={() => setShowPassword(!showPassword)}
              className="showPassword"
              src={visibilityIcon}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon />
            </button>
          </div>
        </form>
        {/* Google oAuth */}
        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
};

export default SignIn;
