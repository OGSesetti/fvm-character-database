import React, { createContext, useContext, useState } from 'react';
const ApiContext = createContext();

export function ApiProvider({ children }) {
    const serverUrl = process.env.REACT_APP_API_URL;
    const localUrl = 'http://localhost:3000/';
    const endPoint = 'api/character/';
    const localHost = process.env.REACT_APP_LOCALHOST || '0';
    
    let baseUrl;

    if (localHost === '1') {
        baseUrl = localUrl;
    }
    else {
        baseUrl = serverUrl;
    }

    const apiUrl = new URL(endPoint, baseUrl).href;

    console.log('localHost:', localHost);
    console.log('baseUrl:', baseUrl);
    console.log('apiUrl:', apiUrl);


    return (<ApiContext.Provider value={apiUrl}>
        {children}
    </ApiContext.Provider>
    );
}

export function useApiUrl() {
    return useContext(ApiContext);
}