import { SET_MESSAGE, CLEAR_MESSAGE, STATUS_MESSAGE } from "../actions/types";

const initialState = {} ;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:

      return { 
        message: payload.message,
        status: !!STATUS_MESSAGE.includes(payload.status) ? payload.status : "success",
       };

    case CLEAR_MESSAGE:
      return {  };

    default:
      return state;
  }
}
