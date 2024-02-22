export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

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

export const sendMessage = (messageData) => async (dispatch) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(messageData),
      });
      console.log("--------------------this is response:", response)

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      const data = await response.json();
      console.log("--------------------this is data:", data)
      dispatch(sendMessageSuccess(data));
    } catch (error) {
      dispatch(sendMessageFailure(error.message));
    }
};

const initialState = {
  messages: [],
  sendingMessage: false,
  sendMessageError: null,
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
    default:
      return state;
  }
};

export default chatReducer;
