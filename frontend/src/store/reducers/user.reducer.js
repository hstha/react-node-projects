import Authentication from "../../utils/Authentication.helper";
import { STORE_USER, RESET_USER_STORE } from "../actions/types";

const initialState = {
  name: '',
  email: '',
  role: '',
  isLoggedIn: false
}

const user = Authentication.getUser();
if (user) {
  initialState['name'] = user.name;
  initialState['email'] = user.email;
  initialState['role'] = user.role;
  initialState['isLoggedIn'] = Boolean(user);
}

const userReducer = function (state = initialState, action) {
  let tempStore = state;
  switch (action.type) {
    case STORE_USER:
      tempStore = { ...tempStore, ...action.payload };
      break;

    case RESET_USER_STORE:
      tempStore = {
        name: '',
        email: '',
        role: '',
        isLoggedIn: false
      };
      break;

    default:
      tempStore = state;
  }

  return tempStore;
}

export default userReducer;