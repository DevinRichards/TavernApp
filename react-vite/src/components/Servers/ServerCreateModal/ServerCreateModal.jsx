import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateServer } from "../../../redux/server";
import { useModal } from "../../../context/Modal";

function ServerCreateModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const [serverName, setServerName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverData = {
      profilePictureUrl: profilePictureUrl,
      ownerId: sessionUser,
      name: serverName,
    };

    try {
      // Reset errors before making the request
      setErrors({});
      await dispatch(thunkCreateServer(serverData));
      // Optionally, close the modal after successful server creation
      closeModal();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Update errors based on the error received
      setErrors({
        server: "Failed to create server. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Create Server</h1>

      {errors.server && <p className="text-red-500">{errors.server}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white">Add A Picture URL</label>
          <input
            type="text"
            value={profilePictureUrl}
            onChange={(e) => setProfilePictureUrl(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
          {errors.profilePictureUrl && <p className="text-red-500">{errors.profilePictureUrl}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-white">Server Name</label>
          <input
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Create Server
        </button>
      </form>
    </div>
  );
}

export default ServerCreateModal;
