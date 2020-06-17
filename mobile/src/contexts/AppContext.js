import React, { createContext } from 'react';
 
const defaultValue = {
    accessToken: null,
    refreshToken: null,
    user: {
        name: "",
        avatar: ""
    }
};

const AppContext = createContext(defaultValue);

export default AppContext;