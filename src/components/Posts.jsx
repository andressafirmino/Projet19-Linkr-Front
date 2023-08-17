import React from "react";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useState } from "react";

function Posts({ post }) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <BoxPublication>
      <Sider>
        <img className="profleImg" src={post.ownerImage} />
        {liked ? (
          <FavoriteOutlinedIcon
            className="iconLiked"
            onClick={handleLikeClick}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            className="iconNotLiked"
            onClick={handleLikeClick}
          />
        )}
        <p className="likes">
          {post.likes === 1 ? `${post.likes} like` : `${post.likes} likes`}
        </p>
      </Sider>
      <Publi>
        <p className="username">{post.ownerUsername}</p>
        <p className="description">
          {post.description}{" "}
          {post.hashtags.map((hashtag, index) => (
            <span key={index} className="highlight">
              #{hashtag}
            </span>
          ))}
        </p>

        <div className="link">
          <p>{post.link} </p>
        </div>
      </Publi>
    </BoxPublication>
  );
}

export default Posts;

const BoxPublication = styled.div`
  width: 100%;
  max-width: 611px;
  background-color: #171717;
  display: flex;
  flex-direction: row;
  padding: 10px 0 15px 0;

  line-height: normal;

  @media (min-width: 611px) {
    border-radius: 16px;
  }

  @media (min-width: 640px) {
    padding: 20px 0 20px 0;
  }
`;
const Sider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 50%;
    margin: 0 15px 17px;
  }
  .likes {
    color: #fff;
    text-align: center;
    font-family: Lato;
    font-size: 9px;
    font-weight: 400;

    margin-top: 12px;
  }
  .iconNotLiked {
    color: #ffffff;
  }
  .iconLiked {
    color: #ff0000;
  }
  @media (min-width: 640px) {
    img {
      width: 50px;
      height: 50px;
    }
    .likes {
      font-size: 11px;
    }
  }
`;
const Publi = styled.div`
  min-width: 288px;
  max-width: calc(100% - 60px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  font-size: 15px;
  margin-right: 18px;
  .username {
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-weight: 400;
  }
  .description {
    color: #b7b7b7;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
  }

  .highlight {
    color: #fff;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 5px;
  }
  .link {
    width: 100%;
    height: 115px;

    display: flex;

    border: 1px solid #4d4d4d;
    border-radius: 11px;
    margin-top: 7px;
    padding: 11px;

    overflow: hidden;

    p {
      width: calc(100% - 22px);
      color: #cecece;
      font-family: Lato;
      font-size: 9px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  @media (min-width: 640px) {
    font-size: 17px;
    .username {
      font-size: 19px;
    }
    .link {
      width: auto;
      max-width: 503px;
      font-size: 11px;
    }
  }
`;
