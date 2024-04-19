import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowRightIcon from '../assets/svg/ArrowRightIcon';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { registerUser } from '../services/user-service';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
     registerUser(formData);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up</p>
        </header>
        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="name"
            className="nameInput"
            placeholder="Name"
            value={formData.name}
            onChange={onChange}
          />

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
            <p className="signInText">Sign Up</p>
            <button className="signInButton">
              <ArrowRightIcon />
            </button>
          </div>
        </form>
        {/* Google oAuth */}
        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
};

export default SignUp;
