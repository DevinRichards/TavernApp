export const SET_CHANNELS = 'channels/setChannels';
export const SET_CURRENT_CHANNEL = 'channels/setCurrentChannel';
export const REMOVE_CHANNEL = 'channels/removeChannel';

// Action creators
export const setChannels = (channels) => ({
  type: SET_CHANNELS,
  payload: channels
});

export const setCurrentChannel = (channel) => ({
  type: SET_CURRENT_CHANNEL,
  payload: channel
});

export const removeChannel = () => ({
  type: REMOVE_CHANNEL
});

// Thunks
export const thunkFetchChannels = (serverId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/servers/${serverId}/channels`);
    if (!response.ok) {
      throw new Error(`Failed to fetch channels. Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setChannels(data.channels));
  } catch (error) {
    return error;
  }
};

export const thunkFetchChannelById = (serverId, channelId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/${serverId}/${channelId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch channel. Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setCurrentChannel(data.channel[0]));
  } catch (error) {
    console.error("Error fetching channel:", error);
  }
};


export const thunkCreateChannel = (channelData) => async (dispatch) => {
  console.log("This is channelData", channelData)
  const { serverId } = channelData;
  console.log("This is serverID", serverId)
  console.log("This is channelData after deconstruct", channelData)
  try {
    const response = await fetch(`/api/servers/${serverId}/channels/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(channelData)
    });
    if (!response.ok) {
      throw new Error(`Failed to create channel. Status: ${response.status}`);
    }
    const data = await response.json();
    dispatch(setCurrentChannel(data));
  } catch (error) {
    console.error("Error creating channel:", error);
  }
};

export const thunkUpdateChannel = (channelUpdateData) => async (dispatch) => {
  console.log("This is channelUpdateData", channelUpdateData)
  const { channelId, channelData } = channelUpdateData;
  console.log("This is channelID", channelId)
  console.log("This is channelData", channelData)
  try {
    const response = await fetch(`/api/channels/${channelId}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(channelData)
    });
    if (!response.ok) {
      throw new Error(`Failed to update channel. Status: ${response.status}`);
    }
    const data = await response.json();
    dispatch(setCurrentChannel(data));
  } catch (error) {
    console.error("Error updating channel:", error);
  }
};

export const thunkDeleteChannel = (channelId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/channels/${channelId}/delete`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Failed to delete channel. Status: ${response.status}`);
    }
    dispatch(removeChannel());
  } catch (error) {
    console.error("Error deleting channel:", error);
  }
};

// Reducer
const initialState = { channels: [], currentChannel: null };

function channelsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHANNELS:
      return { ...state, channels: action.payload };
    case SET_CURRENT_CHANNEL:
      return { ...state, currentChannel: action.payload };
    case REMOVE_CHANNEL:
      return { ...state, currentChannel: null };
    default:
      return state;
  }
}

export default channelsReducer;
