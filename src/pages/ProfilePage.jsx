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

export default function ProfilePage() {
  const { setOpen, setRotate } = useContext(MenuContext);
  const { id } = useParams();
  const { posts, loading: postsLoading, fetchPosts } = usePosts();
  const [userProfile, setUserProfile] = useState(null);


  useEffect(() => {
    setOpen("none");
    setRotate("rotate(0)");
    fetchPosts();
  }, [setOpen, setRotate]);

  const userId = parseInt(id);

  const userPosts = posts.filter((post) => post.userId === userId);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`);
        setUserProfile(response.data);
        
      } catch (error) {
        //console.error("Error fetching user profile:", error);
        console.log(error.response.data);
      }
    };

    fetchUserProfile();
  }, [id]);

  return (
    <PageContainer>
      <Header />
      <SearchUser />
      {userProfile ? (
        <UserInfo>
          <Title>
            <UserImage src={userProfile.image} alt={`${userProfile.username}'s Profile Image`} />
            <p>{userProfile.username}'s posts</p>
          </Title>
        </UserInfo>
      ) : null}
      <Window>
        <ProfileContainer>
          {userProfile && !postsLoading && userPosts.length === 0 ? (
            <p className="noPosts">Sem posts até o momento</p>
          ) : null}
          {userProfile && !postsLoading
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
  align-items: center;
  margin-left: 10px;
  margin-bottom: 16px;
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