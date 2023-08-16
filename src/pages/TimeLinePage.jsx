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
        <Title>
          <p>timeline</p>
        </Title>
        <BoxPost>
          <p className='question'>What are you going to share today?</p>
          <input className='link' placeholder="http://..."/>
          <input className='description' placeholder='Awesome article about #javascript'/>
          <BoxButton>
            <button>Publish</button>
          </BoxButton>
        </BoxPost>
        <BoxPublication>
          <Sider>
            <img/>
            <div className='icon'></div>
            <p className='likes'>teste</p>
          </Sider>
          <Publi>
            <p className='username'>teste</p>
            <p className='text'>kasdnu caoisnjai aonhufa aondaind</p>
            <div className='linkPbli'>ikugxd</div>
          </Publi>
        </BoxPublication>
      </Windown>
    </>
  )
}
const Windown = styled.div`
  width:100vw;
  height:100vh;
  background-color: #333333;
`
const Title = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  margin-left: 17px;
  p {
    font-size: 33px;
    font-weight: 700;
    color: #FFFFFF;
  }
`
const BoxPost = styled.div`
  width: 100%;
  height: 164px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 4px 0px #00000040;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
  .question {
      width: calc(100vw - 30px);
      height: 35px;
      margin: 0 auto;
      text-align: center;
      font-size: 17px;
      font-weight: 300;
      color: #707070;
  }
  input {
    width: calc(100vw - 30px);
    border-radius: 5px;
    border: none;
    background-color: #EFEFEF;
    padding: 11px;
    ::placeholder {
      font-size: 13px;
      font-weight: 300;
      color: #949494;
    }
  }
  .link {    
    height: 30px;    
  }
  .description {
    height: 47px;
  }
`
const BoxButton = styled.div`
  width: calc(100vw - 30px);
  display: flex;
  justify-content: flex-end;
  button {
    width: 112px;
    height: 22px;
    border-radius: 5px;
    border: none;
    background-color: #1877F2;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 700;
  }
`
const BoxPublication = styled.div`
  width: 100%;
  height: 232px;
  background-color: #171717; 
  display: flex;
`
const Sider = styled.div`
    width: 69px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 40px;
      height: 40px; 
      background-color: #FFFFFF;
      border-radius: 50%;
      margin: 9px 0 17px;
    }
    .likes {
      font-size: 9px;
      font-weight: 400;
      color: #FFFFFF;
    }
    .icon {
      width: 17px;
      height: 15px;
      background-color: #FFFFFF;
      margin-bottom: 12px;
    }
`
const Publi = styled.div`
  width: 100%;
  height: 232px;
  .username {
    font-size: 18px;
    font-weight: 700;
    color: #FFFFFF;
    margin: 9px 0 17px;
  }
  .text {
    font-size: 15px;
    font-weight: 400;
    color: #B7B7B7;
  }
  .hash {
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
  }
  div {
    width: calc(100vw - 69px);
    height: 115px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    color: #CECECE;
    margin-top: 13px;
    padding: 11px;
  }
`