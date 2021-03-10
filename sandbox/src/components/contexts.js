import React from 'react';

export const userTokenContext = React.createContext(!!sessionStorage.getItem('userToken'));