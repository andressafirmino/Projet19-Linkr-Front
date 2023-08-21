import React, { useContext, useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataContext';
import { MenuContext } from '../context/MenuContext';
import { usePosts } from "../context/PostsContext";
import SearchUser from "../components/Search";


export default function Header() {

  const { setToken, userImage, setUserImage, setUserId, setUsername } = useContext(UserDataContext);
  const { open, setOpen, rotate, setRotate } = useContext(MenuContext)
  const navigate = useNavigate()
  const { fetchPosts } = usePosts();


  return (
    <>
      <Head>
        <Conteiner>
          <p onClick={() => {
            navigate("/timeline")
          }}>linkr</p>
          <div>
            <SearchUser />

            <div onMouseUp={() => {
              if (open === "none") {
                setOpen("flex")
                setRotate("rotate(180deg)")
              } else {
                setOpen("none")
                setRotate("rotate(0)")
              }
            }}>
              <ion-icon style={{ transform: rotate }} name="chevron-down-outline"></ion-icon>
              <img data-test="avatar" src={userImage} alt="UserImg" />
            </div>
          </div>
        </Conteiner>
        <Menu data-test="menu" style={{ display: open }}>
          <p data-test="logout" onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userImage');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            setToken(null);
            setUserImage(null);
            setUserId(null);
            setUsername(null);
            fetchPosts()
            setOpen("none")
            setRotate("rotate(0)")
            navigate("/")
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
  z-index:2;
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
  z-index: 2;

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