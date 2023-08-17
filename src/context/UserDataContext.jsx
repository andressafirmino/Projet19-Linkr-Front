import { createContext, useState } from "react";

export const UserDataContext = createContext()

export const UserDataProvider = ({ children }) => {
  const lsToken = localStorage.getItem("token");
  const lsUserImage = localStorage.getItem("userImage");
  const lsUserId = localStorage.getItem("userId");
  const lsUsername = localStorage.getItem("username");

  const [token, setToken] = useState(lsToken);
  const [userImage, setUserImage] = useState(lsUserImage);
  const [userId, setUserId] = useState(lsUserId);
  const [username, setUsername] = useState(lsUsername);

  return (
    <UserDataContext.Provider value={{ token, setToken, userImage, setUserImage, userId, setUserId, username, setUsername }}>
      {children}
    </UserDataContext.Provider>
  )
}