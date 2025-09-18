// logOut.js
import { logout } from "../modules/auth/authSlice";

export const logOut = (navigate) => (dispatch) => {
  dispatch(logout());
  navigate("/login"); 
};
