import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateServer,thunkDeleteServer } from "../../../redux/server";
import { useModal } from "../../../context/Modal";

function ServerSettingModal({ server }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [serverName, setServerName] = useState(server?.name);
  const [description, setDescription] = useState(server?.description);
  const [errors, setErrors] = useState({});

  const handleUpdateServer = async (e) => {
    e.preventDefault();

    const updatedServerData = {
      id: server.id,
      name: serverName,
      description: description,
    };

    try {
      setErrors({});
      await dispatch(thunkUpdateServer(updatedServerData));
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
      await dispatch(thunkDeleteServer(server.id));
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
          <label className="block text-white">Server Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-1/2">
            Update Server
          </button>
          <button type="button" onClick={handleDeleteServer} className="bg-red-500 text-white p-2 rounded-md w-1/2 ml-2">
            Delete Server
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServerSettingModal;
