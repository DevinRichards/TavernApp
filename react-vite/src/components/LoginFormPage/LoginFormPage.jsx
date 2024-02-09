<<<<<<< HEAD
import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
=======
import React, { useState } from "react";
import { thunkLogin, thunkLogout } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
>>>>>>> master
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

<<<<<<< HEAD
  return (
    <>
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <label>
          Email
=======
  const handleDemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    const demoEmail = "demo@aa.io";
    const demoPassword = "password";
    setEmail(demoEmail);
    setPassword(demoPassword);
    await dispatch(thunkLogin({ email: demoEmail, password: demoPassword }));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      {errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
>>>>>>> master
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
=======
            className="form-input mt-1 block w-full"
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
>>>>>>> master
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
=======
            className="form-input mt-1 block w-full"
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
            Log In
          </button>
        </div>
        <div className="mb-4">
          <button
            id="logindemobutton"
            onClick={handleDemoLogin}
            className="text-blue-500 w-full text-center"
          >
            Log in as Demo User
          </button>
        </div>
        <div className="text-center">
          <p>
            Need an Account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
>>>>>>> master
  );
}

export default LoginFormPage;
