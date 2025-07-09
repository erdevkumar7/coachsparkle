// src/context/UserContext.js
'use client';

import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useUser = () => useContext(UserContext);
