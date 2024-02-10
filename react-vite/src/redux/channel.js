export const SET_CHANNELS = 'channels/setChannels';
export const SET_CURRENT_CHANNEL = 'channels/setCurrentChannel';
export const REMOVE_CHANNEL = 'channels/removeChannel';

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

export const thunkFetchChannels = (serverId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/servers/${serverId}/channels`);
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }

      dispatch(setChannels(data.channels));
    } else {
      console.error("Error response:", response);
      const errorMessage = await response.text(); // Get the error message
      console.error("Error message:", errorMessage);
    }
  } catch (error) {
    console.error("Error fetching channels:", error);
  }
};


export const thunkCreateChannel = (serverId, channelData) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/channels/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(channelData)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setCurrentChannel(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { channel: "Something went wrong. Please try again" };
  }
};

export const thunkUpdateChannel = (channelId, channelData) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(channelData)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setCurrentChannel(data));
  } else if (response.status === 401) {
    const errorMessages = await response.json();
    return errorMessages;
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { channel: "Something went wrong. Please try again" };
  }
};

export const thunkDeleteChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}/delete`, {
    method: "DELETE"
  });

  if(response.ok) {
    dispatch(removeChannel());
  } else if (response.status === 401) {
    const errorMessages = await response.json();
    return errorMessages;
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { channel: "Something went wrong. Please try again" };
  }
};

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
