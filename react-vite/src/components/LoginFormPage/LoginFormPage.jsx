import React, { useState, useEffect } from "react";
import { thunkLogin, thunkLogout } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { thunkFetchServers } from "../../redux/server";

function LoginFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const allServers = useSelector(state => state.server?.servers)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser){
    dispatch(thunkFetchServers)
    if (allServers && allServers.length > 0) {
      const firstServerId = allServers[0].id;
      navigate(`/servers/${firstServerId}`);
    }
  }

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
    }
  };

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
    <div>
      <h1 className="text-2xl font-bold mb-4 text-white">Log In</h1>
      {errors.length > 0 && errors.map((message, index) => <p key={index} className="text-red-500">{message}</p>)}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
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
          <p className="text-white">
            Need an Account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
