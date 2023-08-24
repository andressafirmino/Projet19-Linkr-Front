import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { MenuContext } from "../context/MenuContext";
import styled from "styled-components";
import Posts from "../components/Posts";
import Trending from "../components/Trending";
import SearchUser from "../components/Search";
import { usePosts } from "../context/PostsContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProfilePage() {
  const { setOpen, setRotate } = useContext(MenuContext);
  const { id } = useParams();
  const { posts, fetchPosts } = usePosts();
  const [userProfile, setUserProfile] = useState(null);
  const [checkUser, setCheckUser] = useState(true);
  const { userId } = useContext(UserDataContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [disable, setDisable] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 10;
  const [dataSource, setDataSource] = useState([]);

  //console.log(posts);

  useEffect(() => {
    setOpen("none");
    setRotate("rotate(0)");
    fetchPosts(page);
  }, [setOpen, setRotate, fetchPosts, page]);

  const profileId = parseInt(id);

  const userPosts = posts.filter((post) => post.userId === profileId);
  //console.log(userPosts);

  const handleFollowClick = async () => {
    setDisable(true);
    try {
      const body = {
        userId: id,
        followerId: userId,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/follow`, body);
      setIsFollowing(true);
    } catch (error) {
      console.error("Erro ao seguir o usuário:", error);
      alert("Erro ao seguir o usuário. Tente novamente mais tarde.");
    } finally {
      setDisable(false);
    }
  };

  const handleUnfollowClick = async () => {
    setDisable(true);
    try {
      const body = {
        userId: id,
        followerId: userId,
      };

      await axios.delete(`${process.env.REACT_APP_API_URL}/unfollow`, {
        data: body,
      });
      setIsFollowing(false);
    } catch (error) {
      console.error("Erro ao deixar de seguir o usuário:", error);
      alert("Erro ao deixar de seguir o usuário. Tente novamente mais tarde.");
    } finally {
      setDisable(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${id}?userId=${userId}`
        );
        setUserProfile(response.data);
        setIsFollowing(response.data.isFollowing);
        fetchCheckUser(response.data);

        if (response.data.userPostsCount > (page + 1) * postsPerPage) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const fetchCheckUser = (profileData) => {
      if (profileData.id === userId) {
        setCheckUser(false);
      }
    };

    fetchUserProfile(userId);
  }, [id, userId]);

  /* useEffect(() => {
    const startIndex = page * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setPostsToRender(userPosts.slice(startIndex, endIndex));

  }, [userPosts, page]);

  const loadMorePosts = () => {
    setPage(page + 1);
  };

  const renderPosts = () => {
    if (postsToRender.length === 0) {
      return <p className="noPosts">No posts to display</p>;
    }

    return postsToRender.map((post) => (
      <Posts
        key={post.id}
        post={post}
        liked={post.liked}
      />
    ));
  }; */
  
  const fetchMoreData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/?userId=${userId}&page=${page + 1}`
      );

      if (response.data.length < 10) {
        setHasMore(false);
      } else {
        setPage(page + 1); // Aumente o número da página
        setUserProfile((prevProfile) => {
          // Atualize o estado userProfile com os novos posts
          if (prevProfile) {
            return {
              ...prevProfile,
              userPosts: [...prevProfile.userPosts, ...response.data],
            };
          }
          return prevProfile;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <PageContainer>
      <Header />
      <SearchUser />
      {userProfile ? (
        <UserInfo>
          <Title>
            <UserImage
              src={userProfile.image}
              alt={`${userProfile.username}'s Profile Image`}
            />
            <p>{userProfile.username}'s posts</p>
          </Title>
          {checkUser &&
            (isFollowing ? (
              <button
                className="unfollow"
                onClick={handleUnfollowClick}
                disabled={disable}
              >
                Unfollow
              </button>
            ) : (
              <button onClick={handleFollowClick} disabled={disable}>
                {isFollowing ? "Following..." : "Follow"}
              </button>
            ))}
        </UserInfo>
      ) : null}
      <Window>
        <ProfileContainer>
          {userProfile ? (
            <InfiniteScroll
              dataLength={userProfile.userPosts.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={<p>No more posts</p>}
            >
              {userProfile.userPosts.map((post) => (
                <Posts
                  key={post.id}
                  post={post}
                  liked={post.liked}
                />
              ))}
            </InfiniteScroll>
          ) : (
            <p className="noPosts">No posts to display</p>
          )}
        </ProfileContainer>
        <TrendingWrapper>
          <Trending />
        </TrendingWrapper>
      </Window>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
  overflow: hidden;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
`;

const Window = styled.div`
  height: calc(100vh - 72px);
  background-color: #333333;
  overflow-y: auto;

  display: flex;
  flex-direction: row;
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
    align-items: flex-start;
    justify-content: center;
    .noPosts {
      font-size: 43px;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 16px;
  button {
    width: 112px;
    height: 31px;
    border-radius: 5px;
    border: none;
    background-color: #1877f2;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 17px;
    cursor: pointer;
  }
  .unfollow {
    background-color: #ffffff;
    color: #1877f2;
  }
  @media (max-width: 640px) {
    margin-top: 65px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  margin-left: 17px;
  p {
    font-size: 33px;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    color: #ffffff;
  }
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 27px;
  margin-right: 10px;
`;

const TrendingWrapper = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
`;
