import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteChannel, thunkFetchChannels, thunkUpdateChannel } from "../../../redux/channel";
import { useModal } from "../../../context/Modal";

function ChannelSettingModal(props) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [channelName, setChannelName] = useState(props.channel?.name);
  const [description, setDescription] = useState(props.channel?.description);
  const server = useSelector(state => state.server?.currentServer)
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setChannelName(props.channel?.name || "");
    setDescription(props.channel?.description || "");
  }, [props.channel])

  const handleUpdateChannel = async (e) => {
    e.preventDefault();

    const updatedChannelData = {
      channelId: props.channel.id,
      channelData:{
        name: channelName,
        description: description,
      }
    };

    try {
      setErrors({});
      await dispatch(thunkUpdateChannel(updatedChannelData));
      await dispatch(thunkFetchChannels(server.id));
      closeModal();
    } catch (error) {
      console.error("Error in handleUpdateChannel:", error);
      setErrors({
        channel: "Failed to update channel. Please try again.",
      });
    }
  };

  const handleDeleteChannel = async () => {
    try {
      await dispatch(thunkDeleteChannel(props.channel.id));
      await dispatch(thunkFetchChannels(server.id));
      closeModal();
    } catch (error) {
      console.error("Error in handleDeleteChannel:", error);
      setErrors({
        channel: "Failed to delete channel. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Channel Settings</h1>

      {errors.channel && <p className="text-red-500">{errors.channel}</p>}

      <form onSubmit={handleUpdateChannel}>

        <div className="mb-4">
          <label className="block text-white">Channel Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="form-input mt-1 block w-full text-white bg-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Channel Description</label>
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
            Update Channel
          </button>
          <button type="button" onClick={handleDeleteChannel} className="bg-red-500 text-white p-2 rounded-md w-1/2 ml-2">
            Delete Channel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChannelSettingModal;
