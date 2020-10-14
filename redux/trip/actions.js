import { ActionTypes } from "./types";

export const setTrips = (trips) => ({
  type: ActionTypes.SET_TRIPS,
  payload: trips,
});
export const setSingleTrip = (trip) => ({
  type: ActionTypes.SET_SINGLE_TRIPS,
  payload: trip,
});
export const setFoundTrip = (trip) => ({
  type: ActionTypes.SET_FOUND_TRIP,
  payload: trip,
});
export const editTrip = (trip) => ({
  type: ActionTypes.EDIT_TRIP,
  payload: trip,
});
