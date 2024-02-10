export const SET_SERVERS = 'servers/setServers';
export const SET_CURRENT_SERVER = 'servers/setCurrentServer';
export const REMOVE_SERVER = 'servers/removeServer';

export const setServers = (servers) => ({
  type: SET_SERVERS,
  payload: servers
});

export const setCurrentServer = (server) => ({
  type: SET_CURRENT_SERVER,
  payload: server
});

export const removeServer = () => ({
  type: REMOVE_SERVER
});

export const thunkFetchServers = () => async (dispatch) => {
  const response = await fetch("/api/servers/");
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setServers(data.servers));
  }
};

export const thunkFetchServerById = (serverId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/servers/${serverId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setCurrentServer(data));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      throw new Error(JSON.stringify({ errors: errorMessages }));
    } else {
      throw new Error("Something went wrong. Please try again");
    }
  } catch (error) {
    return JSON.parse(error.message);
  }
};


export const thunkCreateServer = (serverData) => async (dispatch) => {
  try {
    const response = await fetch("/api/servers/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverData)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setCurrentServer(data));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      throw new Error(JSON.stringify({ errors: errorMessages }));
    } else {
      throw new Error("Something went wrong. Please try again");
    }
  } catch (error) {
    return JSON.parse(error.message);
  }
};

export const thunkUpdateServer = (serverId, serverData) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serverData)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setCurrentServer(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkDeleteServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}/delete`, {
    method: "DELETE"
  });

  if(response.ok) {
    dispatch(removeServer());
  } else if (response.status === 401) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

const initialState = { servers: [], currentServer: null };

function serversReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SERVERS:
      return { ...state, servers: action.payload };
    case SET_CURRENT_SERVER:
      return { ...state, currentServer: action.payload };
    case REMOVE_SERVER:
      return { ...state, currentServer: null };
    default:
      return state;
  }
}

export default serversReducer;
