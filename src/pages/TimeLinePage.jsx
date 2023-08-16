import React, { useContext } from 'react'
import Header from '../components/Header'
import { MenuContext } from '../context/MenuContext';
import { styled } from 'styled-components';

export default function TimeLinePage() {

  const { setOpen, setRotate } = useContext(MenuContext)

  return (
    <>
      <Header />
      <Windown onClick={() => {
        setOpen("none")
        setRotate("rotate(0)")
      }}>
        <p>TimeLine</p>
      </Windown>
    </>
  )
}
const Windown = styled.div`
  width:100vw;
  height:100vh;
`
