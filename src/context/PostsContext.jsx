import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserDataContext } from "./UserDataContext";

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(UserDataContext);
  const [hasMore, setHasMore] = useState(true);

  async function fetchPosts(page) {
    const postsPerPage = 10;

    if (page < 0) return;

    const url = `${process.env.REACT_APP_API_URL}/posts/?userId=${userId}&page=${page}`;

    setLoading(true);
    try {
      const response = await axios.get(url);

      if (response.data.length > 0) {
        const newPosts = response.data;
  
        if (newPosts.length < postsPerPage) {
          setPosts([...posts, ...newPosts]);
          setHasMore(false);
        } else {
          setPosts([...posts, ...newPosts]);
          setHasMore(true);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      alert("Houve uma falha ao obter os posts. Por favor, atualize a página.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading, fetchPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
