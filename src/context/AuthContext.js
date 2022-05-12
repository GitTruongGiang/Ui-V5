import { createContext, useReducer } from "react";
const initialValue = {
  isAuthenticated: false,
  user: null,
};
const LOGIN_SUCCESS = "LOGIN_SUCCSESS";
const LOGOUT = "LOGOUT";
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};
const AuthContext = createContext({ ...initialValue });
function AuthProvider({ children }) {
  const [state, disptach] = useReducer(reducer, initialValue);
  const login = async (username) => {
    disptach({ type: LOGIN_SUCCESS, payload: { user: { username } } });
  };
  const logout = async () => {
    disptach({ type: LOGOUT });
  };
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
