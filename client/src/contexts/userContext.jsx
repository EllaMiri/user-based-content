import { createContext, useContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
  isLoggedIn: undefined,
  login: () => {},
  logout: () => {},
});

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const login = async (username, password) => {

    try {
      const res = await axios.post(
        "http://localhost:4000/user/login/",
        { username, password },
        {
          withCredentials: true,
        }
      );
   
      setIsLoggedIn(res.data);
   
      return true;
    } catch (err) {
      if (err.response.status === 401) {
        return false;
      }
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/user/logout/",
        {},
        {
          withCredentials: true,
        }
      );

      setIsLoggedIn(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ login, isLoggedIn, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
