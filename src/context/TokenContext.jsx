import { createContext, useState } from "react";

export const TokenContext = createContext()

export const TokenProvider = ({ children }) => {
  const lsToken = localStorage.getItem("token");
  const [token, setToken] = useState(lsToken);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}