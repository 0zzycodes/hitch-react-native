import { ActionTypes } from "./types";

export const setCurrentChannel = (channel) => ({
  type: ActionTypes.SET_CHANNEL,
  payload: channel,
});
