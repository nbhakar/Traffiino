import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  authToken: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  authCheck: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const loginHandler = (token) => {
    localStorage.setItem("token", token._id);
    localStorage.setItem("user", JSON.stringify(token));
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const authCheckHandler = async () => {
    const authToken = localStorage.getItem("token");
    // console.log(authToken);
    try {
      const res = await axios.post("http://localhost:4000/getUserDetailById", {
        id: authToken,
      });
      if (res.data) {
        console.log("logged");
        setIsLoggedIn(true);
      } else setIsLoggedIn(false);
    } catch (error) {
      setIsLoggedIn(false);
      console.log(error);
    }
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    authCheck: authCheckHandler,
    setLoggedIn: setIsLoggedIn,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
