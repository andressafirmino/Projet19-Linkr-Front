import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { MenuContext } from "../context/MenuContext";
import { styled } from "styled-components";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import { ThreeDots } from "react-loader-spinner";
import Posts from "../components/Posts";

export default function TimeLinePage() {
  const { setOpen, setRotate } = useContext(MenuContext);
  const { token } = useContext(UserDataContext);
  const { userId } = useContext(UserDataContext);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [reload, setReload] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [reload]);

  function fetchPosts() {
    const url = `${process.env.REACT_APP_API_URL}/`;
    setLoading(true);

    axios
      .get(url)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((e) => {
        alert(
          "Houve uma falha ao obter os posts. Por favor, atualize a página."
        );
        console.log(e);
        setLoading(false);
      });
  }

  function publicPost(e) {
    e.preventDefault();

    setDisabled(true);
    const url = `${process.env.REACT_APP_API_URL}/timeline`;
    const body = {
      link,
      description,
      userId,
    };
    axios
      .post(url, body, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        setLink("");
        setDescription("");
        setDisabled(false);
        setReload(true);
      })
      .catch((e) => {
        alert("Houve um erro ao publicar seu link");
        setDisabled(false);
      });
  }

  return (
    <PageContainer>
      {loading ? <p>Carregando...</p> : null}
      <Header />
      <Windown
        onClick={() => {
          setOpen("none");
          setRotate("rotate(0)");
        }}
      >
        <Title>
          <p>timeline</p>
        </Title>
        <BoxPost data-test="publish-box">
          <p className="question">What are you going to share today?</p>
          <form onSubmit={publicPost}>
            <input
              className="link"
              placeholder="http://..."
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              disabled={disabled}
              data-test="link"
            />
            <input
              className="description"
              placeholder="Awesome article about #javascript"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={disabled}
              data-test="description"
            />
            <BoxButton>
              <button type="submit" disabled={disabled} data-test="publish-btn">
                {disabled ? <>Publishing...</> : <>Publish</>}
              </button>
            </BoxButton>
          </form>
        </BoxPost>
        {posts.map((posts) => (
          <Posts key={posts.id} post={posts} />
        ))}
      </Windown>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
  overflow: hidden;
`;
const Windown = styled.div`
  height: calc(100vh - 72px);
  background-color: #333333;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
const Title = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  margin-left: 17px;

  p {
    font-size: 33px;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    color: #ffffff;
  }
`;
const BoxPost = styled.div`
  width: 100%;
  height: 164px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px 0px #00000040;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  font-family: "Lato", sans-serif;

  .question {
    width: calc(100vw - 30px);
    height: 35px;
    margin: 0 auto;
    text-align: center;
    font-size: 17px;
    font-weight: 300;
    color: #707070;
  }
  form {
    width: calc(100vw - 30px);
  }
  input {
    width: calc(100vw - 30px);
    border-radius: 5px;
    border: none;
    background-color: #efefef;
    padding: 11px;
    margin-bottom: 5px;
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
`;
const BoxButton = styled.div`
  width: calc(100vw - 30px);
  display: flex;
  justify-content: flex-end;
  button {
    width: 112px;
    height: 22px;
    border-radius: 5px;
    border: none;
    background-color: #1877f2;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
