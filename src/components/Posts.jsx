import React from "react";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useState } from "react";

function Posts() {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <BoxPublication>
      <Sider>
        <img className="profleImg" />
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
        <p className="likes">13 likes</p>
      </Sider>
      <Publi>
        <p className="username">Juvenal Juvêncio</p>
        <p className="text">
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!{" "}
          <span className="highlight">#react</span>{" "}
          <span className="highlight">#material</span>
        </p>
        <div className="link">
          https://medium.com/edge-coders/all-the-fundamental-react-js-concepts-jammed-into-this-single-medium-article-c83f9b53eac2
        </div>
      </Publi>
    </BoxPublication>
  );
}

export default Posts;

const BoxPublication = styled.div`
  width: 100%;
  background-color: #171717;
  display: flex;
  flex-direction: row;
  padding: 10px 18px 15px 0;
`;
const Sider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    margin-top: 12px;
  }
  .iconNotLiked {
    color: #ffffff;
  }
  .iconLiked {
    color: #ff0000;
  }
`;
const Publi = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  .username {
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .text {
    color: #b7b7b7;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  span {
    color: #fff;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .hash {
    color: #cecece;
    font-family: Lato;
    font-size: 9px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  div {
    width: 100%;
    height: 115px;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    color: #cecece;
    margin-top: 7px;
    padding: 11px;
  }
`;
