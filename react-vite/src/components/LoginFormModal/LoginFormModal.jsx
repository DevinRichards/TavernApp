import { useState } from "react";
import { thunkLogin, thunkLogout } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link } from 'react-router-dom';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
      closeModal();
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    closeModal()
    const email = "demo@aa.io";
    const password ="password";
    setEmail(email);
    setPassword(password);
    return await dispatch(thunkLogin(email, password));
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
        <button id="logindemobutton" onClick={handleDemoLogin}>
            <Link className="logindemobutton" to="/" >Log in as Demo User</Link>
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
