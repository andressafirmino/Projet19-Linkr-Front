import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { UserDataContext } from "./UserDataContext";
import { useParams } from "react-router-dom";

export const HashtagContext = createContext();

export const HashtagProvider = ({ children }) => {
    const { userId } = useContext(UserDataContext);
    const [postsByTag, setPostsByTag] = useState([]);
    const [tags, setTags] = useState(0);
    const [att, setAtt] = useState(false);
    
    async function getPostByTag(hashtag) {
        const url = `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}/${userId}`;
        try {
          const promise = await axios.get(url);
          setPostsByTag(promise.data);
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <HashtagContext.Provider value={{ tags, setTags, postsByTag, getPostByTag, att, setAtt}}>
            {children}
        </HashtagContext.Provider>
    )
}
