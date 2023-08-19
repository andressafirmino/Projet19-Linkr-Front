import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

function Posts({ post, like }) {
  const [liked, setLiked] = useState(like);
  const { userId, token } = useContext(UserDataContext);
  const { fetchPosts } = usePosts();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(post.description);

  const textareaRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLikeClick = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/like/${post.id}`, {
        userId: userId,
      })
      .then(() => {
        setLiked(true);
        fetchPosts();
      })
      .catch((error) => {
        console.error("Erro ao curtir o post:", error);
      });
  };

  const handleUnikeClick = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/unlike/${post.id}`, {
        data: {
          userId: userId,
        },
      })
      .then(() => {
        setLiked(false);
        fetchPosts();
      })
      .catch((error) => {
        console.error("Erro ao descurtir o post:", error);
      });
  };

    const handleDeletePost = () => {
    setIsDeleting(true);

    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${post.id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        closeModal();
        fetchPosts();
        setIsDeleting(false);
      })
      .catch((error) => {
        console.error("Erro ao deletar o post:", error);
        closeModal();
        setIsDeleting(false);
        alert("Não foi possível excluir o post. Tente novamente mais tarde.");
      });
  };

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setEditedDescription(post.description);
      setTimeout(() => {
        textareaRef.current.focus();
      }, 0);
    } else {
      setIsEditing(false);
    }
  };


  const handleCancelEditClick = () => {
    setIsEditing(false);
    setEditedDescription(post.description);
  };

  const handleEditKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      handleSaveEditClick(); 
    } else if (event.key === "Escape") {
      handleCancelEditClick(); 
    }
  };

  const handleSaveEditClick = () => {
    setIsEditing(false);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/post/${post.id}`,
        { description: editedDescription },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then(() => {
        fetchPosts();
      })
      .catch((error) => {
        console.error("Erro ao salvar a edição:", error);
        alert("Não foi possível salvar as alterações. Tente novamente mais tarde.");
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <BoxPublication>
      <Sider>
        <img className="profleImg" src={post.ownerImage} />
        {liked ? (
          <FavoriteOutlinedIcon
            className="iconLiked"
            onClick={handleUnikeClick}
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
        <Container>
          <p className="username" onClick={() => navigate(`/user/${post.userId}`)}>{post.ownerUsername}</p>
          <DeleteAndUpdate>
            <ModeEditIcon className="iconEdit" onClick={handleEditClick} data-test="edit-btn" />
            <DeleteSharpIcon className="iconDelete" onClick={openModal} data-test="delete-btn"/>
          </DeleteAndUpdate>
        </Container>
  
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            onKeyDown={handleEditKeyDown}
            rows="4"
            autoFocus
            data-test="edit-input"
          />
        ) : (
          <p className="description">
            {post.description}{" "}
            {post.hashtags.map((hashtag, index) => (
              <span onClick={() => navigate(`/hashtag/${hashtag}`)} key={index} className="highlight">
                #{hashtag}
              </span>
            ))}
          </p>
        )}

        <div className="link">
          <p>{post.link} </p>
        </div>
      </Publi>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Post Modal"
      >
        <ModalContent>
          <p>Are you sure you want to delete this post?</p>
          <button onClick={closeModal} disabled={isDeleting} data-test="cancel">
            No, go back
          </button>
          <button onClick={handleDeletePost} disabled={isDeleting} data-test="confirm" >
            {isDeleting ? "Deleting..." : "Yes, delete it"}
          </button>
        </ModalContent>
      </Modal>
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .username {
  color: #fff;
  font-family: Lato;
  font-size: 17px;
  font-weight: 400;

}
`
const DeleteAndUpdate = styled.div`
  .iconEdit {
    color: #ffffff;
  }
  .iconDelete {
    color: #ffffff;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #333333;
  border-radius: 8px;
  max-width: 600px;

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  button {
    margin-top: 10px;
    padding: 8px 16px;
    border: none;
    background-color: #ffffff;
    color: #1877F2;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover{
    color: #ffffff;
    background-color: #1877F2;
  }

  button:first-child {
    background-color: #e0e0e0;
    color: #333;
    margin-right: 10px;
  }
`;

