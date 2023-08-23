import React, { useContext, useState } from "react";
import { styled } from "styled-components";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate, useRevalidator } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";

export default function SearchUser() {
  const { closedSearch, setClosedSearch } = useContext(MenuContext);
  const { token, userId } = useContext(UserDataContext);
  const [usersList, setUsersList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function handleSearch(searchValue) {
    const user = searchValue;
    if (user.length < 3) {
      setUsersList([]);
    }
    if (user.length >= 3) {
      const url = `${process.env.REACT_APP_API_URL}/search`;
      axios
        .get(url, {
          headers: { authorization: `Bearer ${token}` },
          params: { user: user },
        })
        .then((response) => {
          setClosedSearch("block");
          setUsersList(response.data);
        })
        .catch((e) => {
          alert(e.response);
        });
    }
  }

  return (
    <SearchContainer>
      <BoxSearch
        data-test="search"
        onClick={() => {
          if (closedSearch === "none") setClosedSearch("block");
          else {
            setClosedSearch("none");
          }
        }}
      >
        <DebounceInput
          type="text"
          placeholder="Search for people and friends"
          debounceTimeout={300}
          onChange={(e) => {
            handleSearch(e.target.value);
            setSearchText(e.target.value);
          }}
          value={searchText}
        />
        <button type="button">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </BoxSearch>
      {!usersList && usersList.length === 0 && <></>}
      {usersList && (
        <Suggestions style={{ display: closedSearch }} data-test="user-search">
          {usersList.map((user) => (
            <div
              className="suggestion"
              key={user.id}
              onClick={() => navigate(`/user/${user.id}`)}
            >
              <img src={user.image} />
              <p>{user.username}</p>
            </div>
          ))}
        </Suggestions>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  width: calc(100vw - 30px);
  background-color: #e7e7e7;
  margin: 0 auto;
  border-radius: 8px;
  position: fixed;
  top: 82px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: 563px) {
    width: calc(100vw - 150px);
    max-width: 563px;
  }
  @media screen and (min-width: 864px) {
    width: 563px;
    top: 13px;
  }
`;
const BoxSearch = styled.form`
  width: calc(100vw - 30px);
  max-width: 563px;
  margin: 0 auto;
  position: relative;
  input {
    width: 100%;
    height: 45px;
    border-radius: 8px;
    border: none;
    padding-left: 16px;
    font-size: 17px;
    color: #515151;
  }
  input::placeholder {
    font-size: 17px;
    font-weight: 400;
    font-family: "Lato", sans-serif;
    color: #c6c6c6;
  }
  input:focus {
    outline: none;
  }
  button {
    right: 16px;
    top: 10px;
    position: absolute;
    border: none;
    background-color: #ffffff;
    cursor: pointer;
    ion-icon {
      color: #c6c6c6;
      font-size: 25px;
    }
  }
  @media screen and (min-width: 563px) {
    width: calc(100vw - 150px);
    max-width: 563px;
  }
  @media screen and (min-width: 864px) {
    width: 563px;
    input {
      font-size: 19px;
    }
    input::placeholder {
      font-size: 19px;
    }
  }
`;
const Suggestions = styled.div`
  width: calc(100vw - 30px);
  padding-left: 16px;
  margin: 0 auto;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  .suggestion {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    img {
      width: 39px;
      height: 39px;
      border-radius: 50%;
      margin: 13px 12px 13px 0;
    }
    p {
      font-size: 19px;
      font-weight: 400;
      font-family: "Lato", sans-serif;
      color: #515151;
    }
  }
  @media screen and (min-width: 563px) {
    width: 563px;
  }
`;
