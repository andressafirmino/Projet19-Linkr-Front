import React, { useContext, useState } from 'react'
import { styled } from 'styled-components'
import { TokenContext } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';


export default function Header() {

  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate()
  const [open, setOpen] = useState("none")

  return (
    <>
      <Head>
        <Conteiner>
          <p onClick={() => {
            navigate("/timeline")
          }}>linkr</p>
          <div>
            <ion-icon onClick={() => {
              if (open === "none") {
                setOpen("flex")
              } else {
                setOpen("none")
              }
            }} name="chevron-down-outline"></ion-icon>
            <img src="" alt="UserImg" />
          </div>
        </Conteiner>
        <Menu style={{ display: open }}>
          <p onClick={() => {
            setToken(null);
            localStorage.removeItem('token');
            setOpen("none")
            navigate("/");
          }}>Logout</p>
        </Menu >
      </Head>
      <Shadow />
    </>
  )
}
const Head = styled.div`
  position:fixed;
  top:0px;
  left:0px;
`
const Shadow = styled.div`
  height: 72px;
  width: 100vw;
`
const Conteiner = styled.div`
  width: 100vw;
  height: 72px;
  flex-shrink: 0;

  background: #151515;

  display:flex;
  justify-content:space-between;

  padding:10px;
  box-sizing:border-box;

  p{
    color: #FFF;
    font-family: Passion One;
    font-size: 49px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 2.45px;
  }

  div{
    display:flex;
    justify-content:center;
    align-items:center;

    ion-icon{
      color:#FFF;
      font-size:30px;
    }
    img{
      width: 53px;
      height: 53px;
      flex-shrink: 0;
      margin-left:6px;

      border-radius: 26.5px;
    }
  }
`
const Menu = styled.div`
  position:fixed;
  right:0px;

  width: 150px;
  height: 47px;
  flex-shrink: 0;

  border-radius: 0px 0px 0px 20px;
  background: #171717;

  
  align-items: center;
  justify-content: center;

  p{
    color: #FFF;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.85px;

    cursor:pointer;

  }
`;