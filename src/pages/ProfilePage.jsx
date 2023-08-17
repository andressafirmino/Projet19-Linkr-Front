import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { MenuContext } from "../context/MenuContext";
import styled from "styled-components";
import { UserDataContext } from "../context/UserDataContext";
import Posts from "../components/Posts";
import axios from "axios";
import Trending from "../components/Trending";

export default function ProfilePage() {
  const { setOpen, setRotate } = useContext(MenuContext);
  const { username, userId, userImage } = useContext(UserDataContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setOpen("none");
    setRotate("rotate(0)");

    fetchUserPosts(userId);
  }, [setOpen, setRotate, userId]);

  const fetchUserPosts = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`);
      setUserPosts(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <>
      <Header />
      <Window>
        <UserInfo>
          <Title>
            <UserImage src={userImage} alt={`${username}'s Profile Image`} />
            <p>{username}'s posts</p>
          </Title>
        </UserInfo>
        <Posts />
        {/* {userPosts.map((post) => (
          <Posts key={post.id} post={post} />
        ))} */}
        <Trending />
      </Window>
    </>
  );
}

const Window = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #333333;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 16px;
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