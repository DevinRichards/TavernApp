import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import { thunkFetchServers } from "../../redux/server";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const allServers = useSelector(state => state.server?.servers)
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sessionUser){
      console.log("a session user exits")
      dispatch(thunkFetchServers)
      if (allServers && allServers.length > 0) {
        const firstServerId = allServers[0].id;
        navigate(`/servers/${firstServerId}`);
      }
    }
  }, [sessionUser, allServers, dispatch, navigate]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setErrors({});
    }
  }, [email, username, password, confirmPassword]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateUsername = (username) => {
    return username.length >= 5;
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!validateEmail(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (!validateUsername(username)) {
      formErrors.username = "Username must be at least 5 characters long";
    }

    if (!validatePassword(password)) {
      formErrors.password = "Password must be at least 5 characters long";
    }

    if (password !== confirmPassword) {
      formErrors.confirmPassword =
        "Confirm Password field must be the same as the Password field";
    }

    if (Object.keys(formErrors).length > 0) {
      return setErrors(formErrors);
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      }),
    );

    if (serverResponse) {
      setErrors(serverResponse);
      await dispatch(thunkFetchServers),
      navigate(`/servers/1`)
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-white">Create An Account</h1>
      {errors.server && <p className="text-red-500">{errors.server}</p>}
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
          <label className="block text-white">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
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
          <label className="block text-white">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
            Sign Up
          </button>
        </div>
        <div className="text-white text-center">
          Or simply <a href="/login" className="text-blue-500">login</a>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
