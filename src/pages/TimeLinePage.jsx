import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { MenuContext } from "../context/MenuContext";
import { styled } from "styled-components";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import { usePosts } from "../context/PostsContext";
import Posts from "../components/Posts";
import Trending from "../components/Trending";
import InfiniteScroll from "react-infinite-scroller";

export default function TimeLinePage() {
  const { posts, loading, fetchPosts, hasMore } = usePosts();
  const { setOpen, setRotate, setClosedSearch, closedComments, setClosedComments } = useContext(MenuContext);
  const { token, userId, userImage } = useContext(UserDataContext);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [followingUserIds, setFollowingUserIds] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [localClosedComments, setLocalClosedComments] = useState(closedComments);

  function publicPost(e) {
    e.preventDefault();

    if (link === "") {
      return alert("There was an error publishing your link");
    }

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
        fetchPosts();
      })
      .catch((e) => {
        alert("There was an error publishing your link");
        setDisabled(false);
      });
  }

  async function fetchFollowPosts(userId) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/following/${userId}`
      );
      const followingIds = response.data.following.map((user) => user.id);
      setFollowingUserIds(followingIds);
    } catch (error) {
      console.error("Erro ao obter os posts dos usuários seguidos:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await fetchPosts();
      await fetchFollowPosts(userId);
      setFiltering(true);
    }

    fetchData();
  }, [userId]);

  const filteredPosts = posts.filter((post) =>
    followingUserIds.includes(post.userId)
  );
  //console.log("followingUserIds", followingUserIds.length)
  //console.log("posts", posts.length)

  return (
    <PageContainer>
      <Header />

      <Windown
        onClick={() => {
          setOpen("none");
          setRotate("rotate(0)");
          setClosedSearch("none");
          setLocalClosedComments("none");
        }}
      >
        <Title>
          <p>timeline</p>
        </Title>
        <PageContent>
          <Content>
            <PostContainer data-test="publish-box">
              <BoxImage>
                <img src={userImage} />
              </BoxImage>
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
                    <button
                      type="submit"
                      disabled={disabled}
                      data-test="publish-btn"
                    >
                      {disabled ? <>Publishing...</> : <>Publish</>}
                    </button>
                  </BoxButton>
                </form>
              </BoxPost>
            </PostContainer>
            <InfiniteScroll
              pageStart={0}
              loadMore={fetchPosts}
              hasMore={hasMore}
              loader={loading ? <p>Loading ...</p> : null}
            >
              <PostList>
                {posts.length === 0 && followingUserIds.length > 0 ? (
                  <p className="noPosts" data-test="message">
                    No posts found from your friends
                  </p>
                ) : (
                  posts.map((post) => <Posts key={post.id} post={post} />)
                )}
                {posts.length === 0 && followingUserIds.length === 0 ? (
                  <p className="noPosts" data-test="message">
                    You don't follow anyone yet. Search for new friends!
                  </p>
                ) : (
                  <></>
                )}
              </PostList>
            </InfiniteScroll>
          </Content>
          <TrendingWrapper>
            <Trending />
          </TrendingWrapper>
        </PageContent>
      </Windown>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
  padding-top: 10px;
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

  .noPosts {
    color: #fff;
    font-family: Oswald;
    font-size: 33px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    text-align: -webkit-center;
  }
  @media (min-width: 640px) {
    .noPosts {
      font-size: 43px;
    }
  }
`;

const Title = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  margin-top: 45px;
  margin-left: 17px;

  p {
    font-size: 33px;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    color: #ffffff;
  }

  @media screen and (min-width: 640px) {
    width: 611px;
    margin: 50px auto 0;
    p {
      font-size: 43px;
    }
  }
`;
const PostContainer = styled.div`
  display: flex;
  margin: 0 auto;
  height: 164px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px 0px #00000040;
  @media screen and (min-width: 611px) {
    width: 611px;
    height: 209px;
    border-radius: 16px;
    box-shadow: 0px 4px 4px 0px #00000040;
    margin: 0 auto 16px;
  }
  @media screen and (min-width: 640px) {
  }
`;
const BoxImage = styled.div`
  width: 86px;
  height: 209px;
  display: flex;
  justify-content: center;
  display: none;
  padding: 16px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  @media screen and (min-width: 611px) {
    display: inline;
  }
`;
const BoxPost = styled.div`
  width: 100%;
  height: 164px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  font-family: "Lato", sans-serif;

  .question {
    width: calc(100vw - 30px);
    height: 35px;
    margin: 0 auto 10px;
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
  }
  input::placeholder {
    font-size: 13px;
    font-weight: 300;
    color: #949494;
  }
  input:focus {
    outline: none;
  }
  .link {
    height: 30px;
  }
  .description {
    height: 47px;
  }
  @media screen and (min-width: 611px) {
    width: 524px;
    height: 209px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0;
    .question {
      width: 445px;
      height: 35px;
      font: 20px;
      text-align: left;
      margin: 0;
    }
    form,
    input {
      width: 502px;
    }
    input::placeholder {
      font-size: 15px;
    }
    .description {
      height: 66px;
    }
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
    cursor: pointer;
  }
  @media screen and (min-width: 611px) {
    width: 502px;
  }
  button {
    height: 31px;
  }
`;

const TrendingWrapper = styled.div`
  margin-left: 16px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: row;
`;
