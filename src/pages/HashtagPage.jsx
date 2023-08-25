import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Header from "../components/Header";
import { MenuContext } from "../context/MenuContext";
import { UserDataContext } from "../context/UserDataContext";
import { HashtagContext } from "../context/HashtagContext";
import Posts from "../components/Posts";
import Trending from "../components/Trending";
import InfiniteScroll from 'react-infinite-scroller';

export default function HashtagPage() {
  const { hashtag } = useParams();
  const { userId } = useContext(UserDataContext);
  const { setOpen, setRotate } = useContext(MenuContext);
  const { tags } = useContext(HashtagContext);
  const [postsByTag, setPostsByTag] = useState([]);
  const [ hasMore, setHasMore ] = useState(true);
  const [ page, setPage ] = useState(1);
  const [ loading, setLoading ] = useState(false);

  async function getPostByTag() {
    const url = `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}/${userId}?page=${page}`;

    setLoading(true);
    try {
      const response = await axios.get(url);
      //console.log(response.data);

      if(response.data.length === 0) {
        setHasMore(false);
      } else {
        const newPosts = filterDuplicates([...postsByTag, ...response.data]);

        setPostsByTag(newPosts);
        setPage(page + 1);
        setHasMore(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  
  function compareObjects(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  function hasDuplicate(arr, obj) {
    for (let i = 0; i < arr.length; i++) {
        if (compareObjects(arr[i], obj)) {
            return true;
        }
    }
    return false;
  }

  function filterDuplicates(arr) {
    const uniqueObjects = [];

    for (let i = 0; i < arr.length; i++) {
        if (!hasDuplicate(uniqueObjects, arr[i])) {
            uniqueObjects.push(arr[i]);
        }
    }

    return uniqueObjects;
  }

  useEffect(() => {
    async function fetchData() {
      await getPostByTag();
    }
    fetchData();
  }, [tags, page]);

  return (
    <>
      <Header />
      <Windown
        onClick={() => {
          setOpen("none");
          setRotate("rotate(0)");
        }}
      >
        <Title data-test="hashtag-title">
          <p># {hashtag}</p>
        </Title>
        <Content>
          <InfiniteScroll
            pageStart={0}
            loadMore={getPostByTag}
            hasMore={hasMore}
            loader={loading ? <p>Loading ...</p> : null}
          >
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
          </InfiniteScroll>
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
