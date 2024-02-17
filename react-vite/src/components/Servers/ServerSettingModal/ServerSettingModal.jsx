import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkUpdateServer, thunkDeleteServer, thunkFetchServers } from "../../../redux/server";
import { useModal } from "../../../context/Modal";

function ServerSettingModal({ server }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [serverName, setServerName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [errors, setErrors] = useState({});
  const serverID = server.id;
  const servers = useSelector(state => state.server?.servers)
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Server prop:", server); // Add debug statement
    setServerName(server?.name || "");
    setProfilePictureUrl(server?.profilePictureUrl || "");
  }, [server]);

  const handleUpdateServer = async (e) => {
    e.preventDefault();

    console.log("Updating server with data:", { serverID, serverName, profilePictureUrl });

    const updatedServerData = {
      serverId: serverID,
      serverData: {
        name: serverName,
        profilePictureUrl: profilePictureUrl,
      }
    };

    console.log("Sending update request with data:", updatedServerData);

    try {
      setErrors({});
      await dispatch(thunkUpdateServer(updatedServerData));
      console.log("Server update successful");
      closeModal();
    } catch (error) {
      console.error("Error in handleUpdateServer:", error);
      setErrors({
        server: "Failed to update server. Please try again.",
      });
    }
  };

  const handleDeleteServer = async () => {
    try {
      console.log("Deleting server with ID:", server.id);
      await dispatch(thunkDeleteServer(server.id));
      await dispatch(thunkFetchServers());
      console.log("Server deletion successful");
      navigate(`/servers/${servers[0].id}`)
      closeModal();
    } catch (error) {
      console.error("Error in handleDeleteServer:", error);
      setErrors({
        server: "Failed to delete server. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Server Settings</h1>

      {errors.server && <p className="text-red-500">{errors.server}</p>}

      <form onSubmit={handleUpdateServer}>
        <div className="mb-4">
          <label className="block text-white">Server Name</label>
          <input
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Server Picture</label>
          <input
            type="text"
            value={profilePictureUrl}
            onChange={(e) => setProfilePictureUrl(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-1/2"
          >
            Update Server
          </button>
          <button
            type="button"
            onClick={handleDeleteServer}
            className="bg-red-500 text-white p-2 rounded-md w-1/2 ml-2"
          >
            Delete Server
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServerSettingModal;
