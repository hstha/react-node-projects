import { RESET_USER_STORE, STORE_USER } from "./types";

export const setUser = (user) => (dispatch) => {
  dispatch({
    type: STORE_USER,
    payload: user
  });
}

export const resetUserStore = () => (dispatch) => {
  dispatch({
    type: RESET_USER_STORE
  })
} 