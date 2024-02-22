export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  payload: message,
});

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
});

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export default chatReducer;
