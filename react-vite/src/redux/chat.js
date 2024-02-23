export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
export const LOAD_MESSAGES_REQUEST = 'LOAD_MESSAGES_REQUEST';
export const LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
export const LOAD_MESSAGES_FAILURE = 'LOAD_MESSAGES_FAILURE';

// Action creators for sending messages
export const sendMessageRequest = () => ({
  type: SEND_MESSAGE_REQUEST,
});

export const sendMessageSuccess = (message) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: message,
});

export const sendMessageFailure = (error) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error,
});

// Action creators for loading messages
export const loadMessagesRequest = () => ({
  type: LOAD_MESSAGES_REQUEST,
});

export const loadMessagesSuccess = (messages) => ({
  type: LOAD_MESSAGES_SUCCESS,
  payload: messages,
});

export const loadMessagesFailure = (error) => ({
  type: LOAD_MESSAGES_FAILURE,
  payload: error,
});

// Thunks
export const sendMessage = (messageData) => async (dispatch) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(messageData),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      const data = await response.json();
      dispatch(sendMessageSuccess(data));
    } catch (error) {
      dispatch(sendMessageFailure(error.message));
    }
};

export const loadMessages = (channelId) => async (dispatch) => {
  try {
    dispatch(loadMessagesRequest());
    const response = await fetch(`/api/messages?channelId=${channelId}`);
    if (!response.ok) {
      throw new Error('Failed to load messages');
    }
    const data = await response.json();
    dispatch(loadMessagesSuccess(data));
  } catch (error) {
    dispatch(loadMessagesFailure(error.message));
  }
};

// Reducer
const initialState = {
  messages: [],
  sendingMessage: false,
  sendMessageError: null,
  loadingMessages: false,
  loadMessagesError: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        sendingMessage: true,
        sendMessageError: null,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendingMessage: false,
        messages: [...state.messages, action.payload],
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sendingMessage: false,
        sendMessageError: action.payload,
      };
    case LOAD_MESSAGES_REQUEST:
      return {
        ...state,
        loadingMessages: true,
        loadMessagesError: null,
      };
    case LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        loadingMessages: false,
        messages: action.payload,
      };
    case LOAD_MESSAGES_FAILURE:
      return {
        ...state,
        loadingMessages: false,
        loadMessagesError: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
