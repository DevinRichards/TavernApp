import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
<<<<<<< HEAD
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
=======
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create An Account</h1>
      {errors.server && <p className="text-red-500">{errors.server}</p>}
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
          Username
=======
            className="form-input mt-1 block w-full"
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
>>>>>>> master
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
<<<<<<< HEAD
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
=======
            className="form-input mt-1 block w-full"
            required
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
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
        <label>
          Confirm Password
=======
            className="form-input mt-1 block w-full"
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
>>>>>>> master
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
<<<<<<< HEAD
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
=======
            className="form-input mt-1 block w-full"
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
      </form>
    </div>
>>>>>>> master
  );
}

export default SignupFormPage;
