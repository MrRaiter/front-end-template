import React, {
  useState, createContext, useEffect, ReactNode, useContext,
} from 'react';
import { User, UserContextStore } from '../constants/types';
import initialUser from '../constants/models';

// We create Context with <Partial> that allow us to make Context context optional
export const UserContext = createContext<Partial<UserContextStore>>({});

export const useUserContext = () => useContext(UserContext);

type Props = {
  children: ReactNode
};

const UserContextProvider = ({ children } : Props) => {
  const [user, setUser] = useState<User>(initialUser);

  useEffect(() => {
    setUser({ name: 'user', age: 12 });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
