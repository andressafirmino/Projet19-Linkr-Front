import React, { createContext, useState } from "react";

export const HashtagContext = createContext();

export const HashtagProvider = ({ children }) => {
    const [tags, setTags] = useState(0);

    return (
        <HashtagContext.Provider value={{ tags, setTags }}>
            {children}
        </HashtagContext.Provider>
    )
}
