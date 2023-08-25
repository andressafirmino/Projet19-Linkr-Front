import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserDataContext } from "./UserDataContext";

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(UserDataContext);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  async function fetchPosts() {
    const url = `${process.env.REACT_APP_API_URL}/timeline?userId=${userId}&page=${page}`;


    setLoading(true);
    try {
      const response = await axios.get(url);

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        const newPosts = filterDuplicates([...posts, ...response.data]);

        setPosts(newPosts);
        setPage(page + 1);
        setHasMore(true);
      }
    } catch (error) {
      alert("Houve uma falha ao obter os posts. Por favor, atualize a página.");
      console.error(error);
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
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading, fetchPosts, hasMore }}>
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
