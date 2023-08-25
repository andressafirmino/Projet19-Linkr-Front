import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { HashtagContext } from "../context/HashtagContext";
import { MenuContext } from "../context/MenuContext";

function Posts({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const { userId, token, userImage } = useContext(UserDataContext);
  const { fetchPosts } = usePosts();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpenShared, setIsModalOpenShared] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [openComments, setOpenComments] = useState(false);
  const [comment, setComment] = useState("");
  const { setAtt } = useContext(HashtagContext);

  const textareaRef = useRef(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      borderRadius: "20px",
      backgroundColor: "#333333",
      width: "100%",
      maxWidth: "600px",
      height: "210px",
      display: "flex",
      justifyContent: "center",
    },
  };

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
        alert(
          "Não foi possível salvar as alterações. Tente novamente mais tarde."
        );
      });
  };
  const addComment = (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_API_URL}/comments`;
    const body = {
      comment,
      userId,
      postId: post.id,
    };
    axios
      .post(url, body, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        setComment("");
        setAtt(true);
        fetchPosts();
      })
      .catch((e) => {
        alert("There was an error publishing your comment");
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <ContainerPost>
      {post.repost[0].reposted === true ? (
        <RepostConteiner>
          <ion-icon name="repeat-outline" />
          <h1>
            Re-posted by{" "}
            {post.repost[0].userId == userId ? (
              <strong>you</strong>
            ) : (
              <strong>{post.repost[0].userName}</strong>
            )}
          </h1>
        </RepostConteiner>
      ) : (
        <></>
      )}

      <BoxPublication data-test="post">
        <Sider>
          <img className="profleImg" src={post.ownerImage} />
          {liked ? (
            <FavoriteOutlinedIcon
              data-test="like-btn"
              className="iconLiked"
              onClick={handleUnikeClick}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              data-test="like-btn"
              className="iconNotLiked"
              onClick={handleLikeClick}
            />
          )}
          <p data-test="counter" className="likes">
            {post.likes === 1 ? `${post.likes} like` : `${post.likes} likes`}
          </p>
          <ion-icon
            name="chatbubbles-outline"
            onClick={() => {
              setOpenComments(openComments ? false : true);
            }}
            data-test="comment-btn"
          />
          <p data-test="comment-counter">
            {post.comments.length === 1
              ? `${post.comments.length} comment`
              : `${post.comments.length} comments`}
          </p>
          <ion-icon
            data-test="repost-btn"
            onClick={() => setIsModalOpenShared(true)}
            name="repeat-outline"
          />
          <p data-test="repost-counter">{post.repost[0].repostCount} re-post</p>
        </Sider>
        <Publi>
          <Container>
            <p
              data-test="username"
              className="username"
              onClick={() => navigate(`/user/${post.userId}`)}
            >
              {post.ownerUsername}
            </p>
            {`${post.userId}` === userId && (
              <DeleteAndUpdate>
                <ModeEditIcon
                  className="iconEdit"
                  onClick={handleEditClick}
                  data-test="edit-btn"
                />
                <DeleteSharpIcon
                  className="iconDelete"
                  onClick={openModal}
                  data-test="delete-btn"
                />
              </DeleteAndUpdate>
            )}
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
            <p data-test="description" className="description">
              {post.description}{" "}
              {post.hashtags &&
                post.hashtags.map((hashtag, index) => (
                  <span
                    onClick={() => navigate(`/hashtag/${hashtag}`)}
                    key={index}
                    className="highlight"
                  >
                    #{hashtag}
                  </span>
                ))}
            </p>
          )}

          <div className="link" data-test="link">
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              {post.urlData.title !== null && post.urlData.title ? (
                <>
                  <div className="linkText">
                    <h2> {post.urlData.title}</h2>
                    <h3>{post.urlData.description}</h3>
                    <h4>{post.urlData.url}</h4>
                  </div>
                  <div className="linkImage">
                    <img src={post.urlData.images[0]} alt="linkImage" />
                  </div>
                </>
              ) : (
                <>
                  <div className="linkText">
                    <h1>{post.urlData.url}</h1>
                  </div>
                </>
              )}
            </a>
          </div>
        </Publi>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Delete Post Modal"
          style={customStyles}
        >
          <ModalContent>
            <p>Are you sure you want to delete this post?</p>
            <button
              onClick={closeModal}
              disabled={isDeleting}
              data-test="cancel"
            >
              No, go back
            </button>
            <button
              onClick={handleDeletePost}
              disabled={isDeleting}
              data-test="confirm"
            >
              {isDeleting ? "Deleting..." : "Yes, delete it"}
            </button>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isModalOpenShared}
          onRequestClose={() => {
            setIsModalOpenShared(false);
          }}
          contentLabel="Shared Post Modal"
          style={customStyles}
        >
          <ModalContent>
            <p>Do you want to re-post this link?</p>
            <button
              onClick={() => {
                setIsModalOpenShared(false);
              }}
              disabled={sharing}
              data-test="cancel"
            >
              No, cancel
            </button>
            <button
              onClick={() => {
                setSharing(true);

                axios
                  .put(
                    `${process.env.REACT_APP_API_URL}/repost/${post.id}/${userId}`
                  )
                  .then(() => {
                    setIsModalOpenShared(false);
                    fetchPosts();
                    setSharing(false);
                  })
                  .catch((error) => {
                    console.error("Erro ao deletar o post:", error);
                    setIsModalOpenShared(false);
                    setSharing(false);
                    alert(
                      "Não foi possivel re-postar. Tente novamente mais tarde."
                    );
                  });
              }}
              disabled={sharing}
              data-test="confirm"
            >
              {isDeleting ? "Deleting..." : "Yes, share!"}
            </button>
          </ModalContent>
        </Modal>
      </BoxPublication>
      {openComments && (
        <BoxComments data-test="comment-box">
          {post.comments &&
            post.comments.map((comment, index) => (
              <div className="comment" key={index} data-test="comment">
                <img src={comment.image} />
                <div>
                  <div className="box-user">
                    <p className="user">{comment.username} </p>
                    {comment.relationship === null && <></>}
                    {comment.relationship !== null && (
                      <p className="following"> • {comment.relationship}</p>
                    )}
                  </div>
                  <p className="comment-text">{comment.comment}</p>
                </div>
              </div>
            ))}
          <div className="add-comment">
            <img src={userImage} />
            <form onSubmit={addComment}>
              <input
                placeholder="write a comment..."
                type="text"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                data-test="comment-input"
              />
              <button type="submit" data-test="comment-submit">
                <ion-icon name="paper-plane-outline"></ion-icon>
              </button>
            </form>
          </div>
        </BoxComments>
      )}
    </ContainerPost>
  );
}

export default Posts;

const ContainerPost = styled.div`
  width: 100%;
  max-width: 611px;
  background-color: #1e1e1e;
  margin-top: 20px;
  @media (min-width: 611px) {
    border-radius: 16px;
  }
`;
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
  ion-icon {
    flex-shrink: 0;
    color: #ffffff;
    font-size: 25px;
    margin-top: 15px;
    margin-bottom: 2px;
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
  p {
    color: #fff;
    text-align: center;
    font-family: Lato;
    font-size: 11px;
    font-weight: 400;
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
    /* width: 100%;
        height: 115px; */

    display: flex;
    /* flex-direction: row; */

    border: 1px solid #4d4d4d;
    border-radius: 11px;
    margin-top: 7px;
    padding: 11px;

    overflow: hidden;

    width: 503px;
    height: 155px;
    flex-shrink: 0;

    a {
      width: 100%;
      height: 100%;
      color: #cecece;
      font-family: Lato;
      font-size: 9px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: flex;
      justify-content: space-around;
      position: relative;
    }

    .linkText {
      position: absolute;
      top: -12px;
      left: 0px;
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1 {
        margin-top: 24px;
        margin-left: 95px;
        color: #cecece;
        font-family: Lato;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: 250px;
      }
      h2 {
        margin-top: 24px;
        color: #cecece;
        font-family: Lato;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: 250px;
      }
      h3 {
        box-sizing: border-box;
        margin-top: 5px;
        color: #9b9595;
        font-family: Lato;
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: 302.816px;
        max-height: 38px;
      }
      h4 {
        margin-top: 13px;
        color: #cecece;
        font-family: Lato;
        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        width: 263.186px;
      }
    }

    .linkImage {
      position: absolute;
      top: -12px;
      left: 337px;
      width: 154px;
      height: 155px;
      flex-shrink: 0;
      img {
        width: 153.44px;
        height: 155px;
        flex-shrink: 0;
        border-radius: 0px 12px 13px 0px;
        margin-right: -11px;
      }
      /* width: 40%;
      display: flex;
      flex-direction: column; */
    }
  }
  @media (min-width: 640px) {
    font-size: 17px;
    .username {
      font-size: 19px;
    }
    .link {
      width: auto;
      width: 503px;
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
`;
const DeleteAndUpdate = styled.div`
  .iconEdit {
    color: #ffffff;
  }
  .iconDelete {
    color: #ffffff;
  }
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #333333;
  border-radius: 8px;
  max-width: 300px;

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  button {
    margin-top: 10px;
    padding: 8px 16px;
    border: none;
    background-color: #ffffff;
    color: #1877f2;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    color: #ffffff;
    background-color: #1877f2;
  }

  button:first-child {
    background-color: #e0e0e0;
    color: #333;
    margin-right: 10px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const RepostConteiner = styled.div`
  height: 33px;
  width: 611px;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background: #1e1e1e;

  display: flex;
  padding-left: 13px;
  padding-top: 4px;
  box-sizing: border-box;

  h1 {
    color: #fff;
    font-family: Lato;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    strong {
      color: #fff;
      font-family: Lato;
      font-size: 12px;
      font-style: normal;
      font-weight: bold;
      line-height: normal;
    }
  }

  ion-icon {
    font-size: 20px;
    margin-right: 6px;
  }
  @media (min-width: 611px) {
    border-radius: 16px;
  }
`;
const BoxComments = styled.div`
  width: 100%;
  max-width: 611px;
  display: flex;
  flex-direction: column;
  position: relative;
  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
  }
  input {
    width: calc(100vw - 101px);
    height: 39px;
    border-radius: 8px;
    border: none;
    background-color: #252525;
    padding-left: 15px;
    color: #acacac;
  }
  input::placeholder {
    font-size: 14px;
    font-weight: 400;
    font-style: italic;
    color: #575757;
  }
  input:focus {
    outline: none;
  }
  button {
    right: 35px;
    bottom: 23px;
    position: absolute;
    border: none;
    background-color: #252525;
    cursor: pointer;
    ion-icon {
      color: #c6c6c6;
      font-size: 16px;
    }
  }
  .comment {
    padding: 25px;
    display: flex;
    img {
      margin-right: 10px;
    }
  }
  .box-user {
    display: flex;
    flex-direction: row;
    margin-bottom: 4px;
  }
  .user {
    font-size: 14px;
    font-weight: 700;
    font-family: "Lato", sans-serif;
    color: #f3f3f3;
    margin-right: 10px;
  }
  .following {
    font-size: 14px;
    font-weight: 400;
    font-family: "Lato", sans-serif;
    color: #565656;
  }
  .comment-text {
    font-size: 14px;
    font-weight: 400;
    font-family: "Lato", sans-serif;
    color: #acacac;
  }
  .add-comment {
    height: 69px;
    padding: 0 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      margin-right: 10px;
    }
  }
  @media (min-width: 611px) {
    border-radius: 16px;
    input {
      width: 510px;
    }
  }
`;
