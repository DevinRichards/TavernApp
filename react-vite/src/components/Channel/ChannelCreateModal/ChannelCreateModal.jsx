import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateChannel } from "../../../redux/channel";
import { useModal } from "../../../context/Modal";

function ChannelCreateModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector(state => state.server?.currentServer) || {};
  const { closeModal } = useModal();
  const [channelName, setchannelName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div>
      <h1>Create Channel</h1>

      {errors.channel && <p>{errors.channel}</p>}

      <form onSubmit={handleSubmit}>

        <div>
          <label>
            Channel Name
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
            />
          </label>
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>
            Add A Channel Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          {errors.description && <p>{errors.description}</p>}
        </div>

        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
}

export default ChannelCreateModal;
