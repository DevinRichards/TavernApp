import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkLogout } from "../../redux/session";

function UserSettingModal(props) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const server = useSelector(state => state.server?.currentServer);
  const [errors, setErrors] = useState({});

  const handleUpdateUser = async (e) => {

  };

  const handleDeleteUser = async () => {

  };

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    closeModal();
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">User Settings</h1>

      {errors.user && <p className="text-red-500">{errors.user}</p>}

      <form onSubmit={handleUpdateUser}>

        <div className="mb-4">
          <label className="block text-white">User Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setProfilePictureFile(e.target.files[0])}
            className="form-input mt-1 block w-full text-white bg-gray-700"
          />
        </div>

        <div className="flex justify-between items-center">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-1/2">
            Update User
          </button>
          <button type="button" onClick={handleDeleteUser} className="bg-red-500 text-white p-2 rounded-md w-1/2 ml-2">
            Delete User
          </button>
          <button className="p- bg-red-500 text-whiterounded-md w-1/2 ml-2" onClick={logout}>Logout</button>
        </div>
      </form>
    </div>
  );

}

export default UserSettingModal;
