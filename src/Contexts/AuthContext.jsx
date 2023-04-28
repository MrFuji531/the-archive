import React, {useState, useEffect, createContext} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
