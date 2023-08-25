import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Header from "../components/Header";
import { MenuContext } from "../context/MenuContext";
import { HashtagContext } from "../context/HashtagContext";
import Posts from "../components/Posts";
import Trending from "../components/Trending";
import { usePosts } from "../context/PostsContext";

export default function HashtagPage() {
  
  const { setOpen, setRotate, setClosedSearch } = useContext(MenuContext);
  const { tags, postsByTag, getPostByTag, att, setAtt } = useContext(HashtagContext);
  const { hashtag } = useParams();
  const { fetchPosts } = usePosts();


  useEffect(() => {
    getPostByTag(hashtag);
    setAtt(false);
    fetchPosts();
  }, [tags, att]);

  return (
    <>
      <Header />
      <Windown
        onClick={() => {
          setOpen("none");
          setRotate("rotate(0)");
          setClosedSearch("none");
        }}
      >
        <Title data-test="hashtag-title">
          <p># {hashtag}</p>
        </Title>
        <Content>
          <PostColumn>
            {postsByTag.length === 0 ? (
              <p className="noPosts">Sem posts até o momento</p>
            ) : (
              postsByTag.map(
                (postByTag) => (
                  (<Posts key={postByTag.id} post={postByTag} />)
                )
              )
            )}
          </PostColumn>
          <TrendingWrapper>
            <Trending />
          </TrendingWrapper>
        </Content>
      </Windown>
    </>
  );
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
  width: 100%;
  max-width: 800px;
`;
