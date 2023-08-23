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

export default function ProfilePage() {
  const { setOpen, setRotate } = useContext(MenuContext);
  const { id } = useParams();
  const { posts, fetchPosts } = usePosts();
  const [userProfile, setUserProfile] = useState(null);
  const [checkUser, setCheckUser] = useState(true);
  const { userId } = useContext(UserDataContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setOpen("none");
    setRotate("rotate(0)");
    fetchPosts();
  }, [setOpen, setRotate]);

  const profileId = parseInt(id);

  const userPosts = posts.filter((post) => post.userId === profileId);

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
    const fetchCheckUser = (id) => {
      if (id == userId) {
        setCheckUser(false);
      }
    };

    const fetchUserProfile = async (userId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${id}?userId=${userId}`
        );
        setUserProfile(response.data);
        setIsFollowing(response.data.isFollowing);
        fetchCheckUser(response.data.id);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchUserProfile(userId);
  }, [id, userId]);

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
          {userProfile && userPosts.length === 0 ? (
            <p className="noPosts">Sem posts até o momento</p>
          ) : null}
          {userProfile
            ? userPosts.map((post) => (
                <Posts key={post.id} post={post} like={post.liked} />
              ))
            : null}
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
