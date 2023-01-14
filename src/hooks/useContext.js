import React, { createContext, useContext, useState, useEffect } from 'react';
import { firestore } from '../Firebase/firebase';
import { onSnapshot, collection } from 'firebase/firestore';
const UserContext = createContext();

export const UseContextProvider = ({ children }) => {
  const [activePrebox, setActivePrevBox] = useState(false);
  const [url, setUrl] = useState(null);
  const [active, setActive] = useState(false);
  const [music, setMusic] = useState(null);
  const [data, setData] = useState();
  const [isloading, setIsloadding] = useState(true);
  const setViewImg = (img) => {
    setUrl(img);
  };

  useEffect(() => {
    const FetchData = onSnapshot(collection(firestore, 'Image'), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
      setIsloadding(false);
    });

    const fetchMusic = onSnapshot(
      collection(firestore, 'Audio'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setMusic(list);
        setIsloadding(false);
      }
    );

    return () => {
      FetchData();
      fetchMusic();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        activePrebox,
        setActivePrevBox,
        url,
        setViewImg,
        active,
        setActive,
        data,
        isloading,
        music,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserallState = () => {
  return useContext(UserContext);
};
