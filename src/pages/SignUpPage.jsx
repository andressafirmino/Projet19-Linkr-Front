import React from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !username || !image) {
      alert('Preencha todos os campos!');
      return;
    }

    const user = { email, password, username, image };
    setIsLoading(true);

    const url = "http://localhost:5000/sign-up";

    try {
      const res = await axios.post(`${url}`, user);
      console.log(res.data);

      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Já existe um usuário cadastrado com esse email!');
      } else {
        alert('Erro ao cadastrar! Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Conteiner>
      <ContainerText>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
      </ContainerText>
      <ContainerForm>
        <form onSubmit={handleSignUp}>
          <input
            data-test="email"
            placeholder="e-mail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            data-test="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            data-test="username"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            data-test="picture-url"
            placeholder="picture url"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button data-test="sign-up-btn" disabled={isLoading}>{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
        </form>
        <p data-test="login-link" onClick={() => navigate('/')}>Switch back to Log In</p>
      </ContainerForm>
    </Conteiner>
  );
}


const ContainerText = styled.div`
  width:63%;
  background-color:#151515;
  height:100vh;
  display:flex;
  flex-direction:column;
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

  @media (max-width: 640px) {
    display:flex;
    flex-direction:column;
    
    width:auto;


    div:first-child{
      width: auto;
      height: 26%;
      flex-shrink: 0;
      display:flex;
      flex-direction: column;
      align-items: center;

      h1{
        width:167px;
        margin-top:10px;

        color: #FFF;
        font-family: Passion One;
        font-size: 76px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 3.8px;
      }
      h2{
        width:250px;
        margin-bottom:27px;

        color: #FFF;
        text-align: center;
        font-family: Oswald;
        font-size: 23px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }

    div:last-child{
      width: auto;
      /* height:621px; */

      padding-top:35px;

      display:flex;
      align-items: center;
      justify-content: flex-start;
      form{
        
        input{
          width: 330px;
          height: 55px;
          flex-shrink: 0;
        }
        button{
          margin-top:9px;
          
          width: 345px;
          height: 55px;
          flex-shrink: 0;
        }
      }
    }
  }
`