import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { MenuContext } from "../context/MenuContext";
import { styled } from "styled-components";
import axios from "axios";
import { TokenContext } from "../context/TokenContext";
import { ThreeDots } from "react-loader-spinner";
import Posts from "../components/Posts";

export default function TimeLinePage() {
  const { setOpen, setRotate } = useContext(MenuContext);
  const { token } = useContext(TokenContext);
  const [link, setLink] = useState("");
  const [descript, setDescript] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [reload, setReload] = useState(false);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetchPosts();
  // }, [reload]);

  // function fetchPosts() {
  //   const url = `${process.env.REACT_APP_API_URL}/posts`;
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //     });
  // }

  function publicPost(e) {
    e.preventDefault();

    setDisabled(true);
    const url = `${process.env.REACT_APP_API_URL}/timeline`;
    const body = {
      link,
      descript,
    };
    axios
      .post(url, body, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        setLink("");
        setDescript("");
        setDisabled(false);
        setReload(true);
      })
      .catch((e) => {
        alert(e.response.data.message);
        setDisabled(false);
      });
  }

  return (
    <>
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
        <BoxPost>
          <p className="question">What are you going to share today?</p>
          <form onSubmit={publicPost}>
            <input
              className="link"
              placeholder="http://..."
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              disabled={disabled}
            />
            <input
              className="description"
              placeholder="Awesome article about #javascript"
              value={descript}
              onChange={(e) => setDescript(e.target.value)}
              disabled={disabled}
            />
            <BoxButton>
              <button type="submit" disabled={disabled}>
                {disabled ? (
                  <ThreeDots
                    width={32}
                    height={21}
                    border-radius={4.5}
                    background-color="#1877F2"
                    color="#FFFFFF"
                    font-size={9}
                  />
                ) : (
                  <>Publish</>
                )}
              </button>
            </BoxButton>
          </form>
        </BoxPost>
        <Posts />
        {/* {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))} */}
      </Windown>
    </>
  );
}
const Windown = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
`;
const Title = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  margin-left: 17px;
  p {
    font-size: 33px;
    font-weight: 700;
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
  margin-bottom: 16px;
  padding: 15px;
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
