import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateChannel } from "../../../redux/channel";
import { useModal } from "../../../context/Modal";

function ChannelCreateModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector(state => state.server?.currentServer) || {};
  const { closeModal } = useModal();
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("This is Server", server)
    const channelData = {
      description: description,
      serverId: server.id,
      name: channelName,
    };

    try {
      // Reset errors before making the request
      setErrors({});
      await dispatch(thunkCreateChannel(channelData));
      // Optionally, close the modal after successful channel creation
      closeModal();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Update errors based on the error received
      setErrors({
        channel: "Failed to create channel. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Create Channel</h1>

      {errors.channel && <p className="text-red-500">{errors.channel}</p>}

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-white">Channel Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-white">Add A Channel Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Create Channel
        </button>
      </form>
    </div>
  );
}

export default ChannelCreateModal;
