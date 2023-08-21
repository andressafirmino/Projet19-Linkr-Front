import { createContext, useState } from "react";

export const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [open, setOpen] = useState("none")
  const [rotate, setRotate] = useState("rotate(0)")
  const [closedSearch, setClosedSearch] = useState('none')


  return (
    <MenuContext.Provider value={{ open, setOpen, rotate, setRotate, closedSearch, setClosedSearch }}>
      {children}
    </MenuContext.Provider>
  )
}