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
    <div>
      <h1>Create Server</h1>

      {errors.server && <p>{errors.server}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Add A Picture URL
            <input
              type="text"
              value={profilePictureUrl}
              onChange={(e) => setProfilePictureUrl(e.target.value)}
              required
            />
          </label>
          {errors.profilePictureUrl && <p>{errors.profilePictureUrl}</p>}
        </div>

        <div>
          <label>
            Server Name
            <input
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              required
            />
          </label>
          {errors.name && <p>{errors.name}</p>}
        </div>

        <button type="submit">Create Server</button>
      </form>
    </div>
  );
}

export default ServerCreateModal;
