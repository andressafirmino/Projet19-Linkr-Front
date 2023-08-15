import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import axios from "axios";
import { TokenContext } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (token !== null) {
      navigate("/timeline")
    }
  }, [])

  function handleChange(event) {
    const newLogin = { ...login };
    newLogin[event.target.name] = event.target.value;
    setLogin(newLogin);
  }

  return (
    <Conteiner>
      <ContainerText>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </ContainerText>
      <ContainerForm>
        <form onSubmit={(event) => {
          event.preventDefault();

          if (login.email === "" || login.password === "") {
            alert("Preencha os campos corretamente")
            return
          }

          const URLLogin = "http://localhost:5000/"
          const promise = axios.post(URLLogin, login)
          promise.then(resposta => {
            setToken(resposta.data.token);
            localStorage.setItem("token", resposta.data.token);
            navigate("/timeline");
          })
          promise.catch(err => {
            if (err.response.status === 422) {
              alert("Dados Incorretos")
              return
            } else if (err.response.status === 401) {
              alert("Usuario não encontrado")
              return
            }
          })
        }}>
          <input onChange={handleChange} value={login.email} name='email' placeholder='e-mail' type="email" />
          <input onChange={handleChange} value={login.password} name='password' placeholder='password' type="password" />
          <button>Log In</button>
        </form>
        <p onClick={() => navigate("/sign-up")}>First time? Create an account!</p>
      </ContainerForm>
    </Conteiner>
  )
}

const ContainerText = styled.div`
  width:63%;
  background-color:#151515;
  height:100vh;
  display:flex;
  align-items: center;
  justify-content: center;

  h1{
    color: #FFF;
    font-family: Passion One;
    font-size: 106px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 5.3px;
  }
  h2{
    color: #FFF;
    font-family: Oswald;
    font-size: 43px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    width:55%;
  }
`
const ContainerForm = styled.div`
  width:37%;
  background-color:#333333;
  height:100vh;

  display:flex;
  flex-direction:column;

  justify-content: center;
  align-items: center;
  form{
    display:flex;
    flex-direction:column;

    justify-content: center;
    align-items: center;

    input{
      width: 429px;
      height: 65px;
      flex-shrink: 0;

      border-radius:6px;
      margin:8px;

      color: #9F9F9F;
      font-family: Oswald;
      font-size: 27px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

      padding-left:8px;
    }

    button{
      width: 443px;
      height: 65px;
      flex-shrink: 0;

      border-radius: 6px;
      background: #1877F2;

      color: #FFF;
      font-family: Oswald;
      font-size: 27px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

      margin:13px;
      margin-top:0px;

      appearance:none;
      border-width: none;
      border-style: none;
      border-color: none;
      border-image: none;
    }


  }
  
  p{
    color: #FFF;
    font-family: Lato;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
  }
`

const Conteiner = styled.div`
  
  display:flex;
`