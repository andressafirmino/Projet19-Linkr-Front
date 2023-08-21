import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import Header from '../components/Header';
import { MenuContext } from "../context/MenuContext";
import { UserDataContext } from '../context/UserDataContext';
import { HashtagContext } from '../context/HashtagContext';
import Posts from '../components/Posts';
import Trending from '../components/Trending';

export default function HashtagPage() {
  const { hashtag } = useParams();
  const { userId } = useContext(UserDataContext);
  const { setOpen, setRotate } = useContext(MenuContext);
  const { tags, setTags } = useContext(HashtagContext);
  const [postsByTag, setPostsByTag] = useState([]);

  async function getPostByTag() {
    const url = `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}/${userId}`;
    try {
      const promise = await axios.get(url)
      console.log(promise.data);
      setPostsByTag(promise.data);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getPostByTag() }, [tags])

  return (

    <>
      <Header />
      <Windown
        onClick={() => {
          setOpen("none");
          setRotate("rotate(0)");
        }}>
        <Title data-test="hashtag-title">
          <p># {hashtag}</p>
        </Title>
        <Content>
          <PostColumn>
            {postsByTag.length === 0 ? (
              <p className="noPosts">Sem posts até o momento</p>
            ) : (
              postsByTag.map((postsByTag) => (
                <Posts key={postsByTag.id} post={postsByTag} like={postsByTag.liked} />
              ))
            )}
          </PostColumn>
          <TrendingWrapper>
            <Trending />
          </TrendingWrapper>
        </Content>
      </Windown>
    </>
  )
}

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
`
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

const TrendingWrapper = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
  margin-left: 17px;
`;

const Content = styled.div`
  display: flex;

`;

const PostColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;